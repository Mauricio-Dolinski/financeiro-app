package br.com.transdolinski.api.recurso;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Date;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Locale;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;
import br.com.transdolinski.api.entidade.RegistroPagamento;
import br.com.transdolinski.api.entidade.RegistroRecebimento;
import br.com.transdolinski.api.entidade.Despesa;

@Path("/api/dashboard")
public class DashboardRecurso {

    @POST
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public String getDashboard(@FormParam("dias") String str_dias) {

    	int dias = 30;
    	LocalDate today = LocalDate.now();

    	try {
            
            dias = Integer.valueOf(str_dias);
        } catch (Exception e) {
            return "Erro: int dias";
        }

        List<Despesa> despesas = Despesa.listAll();
        BigDecimal despesasPeriodo[] = new BigDecimal[9];

        for (int i = 0; i <= 8; i++){
        	despesasPeriodo[i] = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        }

        for (Despesa despesa : despesas) {
        	if (despesa.data_registro.isAfter(today.minusDays(dias+1)) &&
        		despesa.data_registro.isBefore(today.plusDays(1))){
        		switch(despesa.tipo) {
				  case "Combustível":
				    despesasPeriodo[0] = despesasPeriodo[0].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Manutenção":
				    despesasPeriodo[1] = despesasPeriodo[1].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Salário":
				    despesasPeriodo[2] = despesasPeriodo[2].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Encargo":
				    despesasPeriodo[3] = despesasPeriodo[3].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Seguro":
				    despesasPeriodo[4] = despesasPeriodo[4].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Imposto":
				    despesasPeriodo[5] = despesasPeriodo[5].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Emprestimo":
				    despesasPeriodo[6] = despesasPeriodo[6].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Administrativo":
				    despesasPeriodo[7] = despesasPeriodo[7].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  case "Outros":
				    despesasPeriodo[8] = despesasPeriodo[8].add(BigDecimal.valueOf(despesa.valor_total));
				    break;
				  default:
				    break;
				}
        	}
        }

        BigDecimal fluxoDiario[] = new BigDecimal[dias+1];
        BigDecimal projecao[] = new BigDecimal[7+1];

        for (int i = 0; i <= dias; i++){
        	fluxoDiario[i] = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        }

        for (int i = 0; i <= 7; i++){
        	projecao[i] = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        }


    	List<RegistroPagamento> registros_pagamento = RegistroPagamento.listAll();
    	List<RegistroPagamento> removeListPagamento = new ArrayList<RegistroPagamento>();
    	List<RegistroRecebimento> registros_recebimento = RegistroRecebimento.listAll();
    	List<RegistroRecebimento> removeListRecebimento = new ArrayList<RegistroRecebimento>();
    	
    	
    	BigDecimal contas_receber_atraso = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal contas_receber_aberto = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal contas_receber_hoje = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal contas_pagar_atraso = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal contas_pagar_aberto = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal contas_pagar_hoje = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal entradas = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal saidas = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal valor_caixa = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	BigDecimal valor_caixa_inicial = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
    	
    	for (RegistroRecebimento registroRecebimento : registros_recebimento) {
			if (null == registroRecebimento.recebido) {
				if (registroRecebimento.data_recebimento.isBefore(today.minusDays(dias))) {
            		removeListRecebimento.add(registroRecebimento);
				}
				if (registroRecebimento.data_recebimento.isAfter(today.minusDays(1)) &&
					registroRecebimento.data_recebimento.isBefore(today.plusDays(7+1))){
					long daysBetween = ChronoUnit.DAYS.between(today, registroRecebimento.data_recebimento);
					int dia = Math.toIntExact(daysBetween);
					projecao[dia] = projecao[dia].add(BigDecimal.valueOf(registroRecebimento.valor));
				}
			}
			else {
				valor_caixa = valor_caixa.add(BigDecimal.valueOf(registroRecebimento.valor));
				if (registroRecebimento.recebido.isAfter(today.minusDays(dias+1))){
					entradas = entradas.add(BigDecimal.valueOf(registroRecebimento.valor));
					if(registroRecebimento.recebido.isBefore(today) || registroRecebimento.recebido.isEqual(today)){
						long daysBetween = ChronoUnit.DAYS.between(registroRecebimento.recebido, today);
						int dia = Math.toIntExact(daysBetween);
						fluxoDiario[dias-dia] = fluxoDiario[dias-dia].add(BigDecimal.valueOf(registroRecebimento.valor));
					}
				}
			}
		}
    	
    	for (RegistroPagamento registroPagamento : registros_pagamento) {
			if (null == registroPagamento.pago) {
				if (registroPagamento.data_pagamento.isBefore(today.minusDays(dias))) {
            		removeListPagamento.add(registroPagamento);
				}
				if (registroPagamento.data_pagamento.isAfter(today.minusDays(1)) &&
					registroPagamento.data_pagamento.isBefore(today.plusDays(7+1))){
					long daysBetween = ChronoUnit.DAYS.between(today, registroPagamento.data_pagamento);
					int dia = Math.toIntExact(daysBetween);
					projecao[dia] = projecao[dia].subtract(BigDecimal.valueOf(registroPagamento.valor));
				}
			}
			else {
				valor_caixa = valor_caixa.subtract(BigDecimal.valueOf(registroPagamento.valor));
				if (registroPagamento.pago.isAfter(today.minusDays(dias+1))){
					saidas = saidas.add(BigDecimal.valueOf(registroPagamento.valor));
					if(registroPagamento.pago.isBefore(today) || registroPagamento.pago.isEqual(today)){
						long daysBetween = ChronoUnit.DAYS.between(registroPagamento.pago, today);
						int dia = Math.toIntExact(daysBetween);
						fluxoDiario[dias-dia] = fluxoDiario[dias-dia].subtract(BigDecimal.valueOf(registroPagamento.valor));
					}
				}
			}
		}

		valor_caixa_inicial = valor_caixa.add(saidas).subtract(entradas);

		for (int i = 0; i <= dias; i++){
        	//fluxoDiario[i] = fluxoDiario[i].add(valor_caixa_inicial);
        	if (i == 0){
        		fluxoDiario[i] = fluxoDiario[i].add(valor_caixa_inicial);
        	}
        	else {
        		fluxoDiario[i] = fluxoDiario[i].add(fluxoDiario[i-1]);
        	}
        }

        for (int i = 0; i <= 7; i++){
        	if (i == 0){
        		projecao[i] = projecao[i].add(valor_caixa);
        	}
        	else {
        		projecao[i] = projecao[i].add(projecao[i-1]);
        	}
        }

		registros_pagamento.removeAll(removeListPagamento);
		registros_recebimento.removeAll(removeListRecebimento);

		for (RegistroRecebimento registroRecebimento : registros_recebimento) {
			if (null == registroRecebimento.recebido) {
				contas_receber_aberto = contas_receber_aberto.add(BigDecimal.valueOf(registroRecebimento.valor));
				if (registroRecebimento.data_recebimento.isBefore(today)) {
					contas_receber_atraso = contas_receber_atraso.add(BigDecimal.valueOf(registroRecebimento.valor));
				}
				else if (registroRecebimento.data_recebimento.isEqual(today)) {
					contas_receber_hoje = contas_receber_hoje.add(BigDecimal.valueOf(registroRecebimento.valor));
				}
			}
		}
    	
    	for (RegistroPagamento registroPagamento : registros_pagamento) {
			if (null == registroPagamento.pago) {
				contas_pagar_aberto = contas_pagar_aberto.add(BigDecimal.valueOf(registroPagamento.valor));
				if (registroPagamento.data_pagamento.isBefore(today)) {
					contas_pagar_atraso = contas_pagar_atraso.add(BigDecimal.valueOf(registroPagamento.valor));
				}
				else if (registroPagamento.data_pagamento.isEqual(today)) {
					contas_pagar_hoje = contas_pagar_hoje.add(BigDecimal.valueOf(registroPagamento.valor));
				}
			}
		}
    	
    	NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
    	
    	return "{\n\t"
    			+ "\"valor_caixa\": \"" + nf.format(valor_caixa) + "\",\n\t"
        		+ "\"contas_receber_atraso\": \"" + nf.format(contas_receber_atraso) + "\",\n\t"
        		+ "\"contas_receber_aberto\": \"" + nf.format(contas_receber_aberto) + "\",\n\t"
        		+ "\"contas_receber_hoje\": \"" + nf.format(contas_receber_hoje) + "\",\n\t"
        		+ "\"contas_pagar_atraso\": \"" + nf.format(contas_pagar_atraso) + "\",\n\t"
        		+ "\"contas_pagar_aberto\": \"" + nf.format(contas_pagar_aberto) + "\",\n\t"
        		+ "\"entradas\": \"" + entradas + "\",\n\t"
        		+ "\"saidas\": \"" + saidas + "\",\n\t"
        		+ "\"valor_caixa_inicial\": \"" + valor_caixa_inicial + "\",\n\t"
        		+ "\"fluxoDiario\": " + Arrays.deepToString(fluxoDiario) + ",\n\t"
        		+ "\"projecao\": " + Arrays.deepToString(projecao) + ",\n\t"
        		+ "\"despesasPeriodo\": " + Arrays.deepToString(despesasPeriodo) + ",\n\t"
        		+ "\"contas_pagar_hoje\": \"" + nf.format(contas_pagar_hoje) + "\"\n"
        	    + "}\n";
    }
}

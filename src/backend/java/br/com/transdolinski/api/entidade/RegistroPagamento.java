package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.text.NumberFormat;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class RegistroPagamento extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Despesa despesa;

	@Column(nullable = false)
    public double valor;
    
	@Column(nullable = false)
	public int  parcela;
	
	@Column(nullable = false)
    public LocalDate data_pagamento;
    
	@Column(nullable = false)
    public String tipo_de_pagamento;
	
	@Column
    public String descricao;

	@Column
    public LocalDate pago;
	
    public static void add(Despesa despesa, double valor, int parcela, LocalDate data_pagamento,  String tipo_de_pagamento, String descricao, LocalDate pago) {
        RegistroPagamento registroPagamento = new RegistroPagamento();
        registroPagamento.despesa = despesa;
        registroPagamento.valor = valor;
        registroPagamento.parcela = parcela;
        registroPagamento.data_pagamento = data_pagamento;
        registroPagamento.tipo_de_pagamento = tipo_de_pagamento;
        registroPagamento.descricao = descricao;
        registroPagamento.pago = pago;
        if (registroPagamento.despesa != null) {
        	registroPagamento.despesa.addRegistroPagamento(registroPagamento);
        }
        registroPagamento.persist();
    }
    

    @Override    
    public String toString() {
		String status = "À pagar";
		
		LocalDate today = LocalDate.now();

        Long atraso = ChronoUnit.DAYS.between(data_pagamento, today);

        if (pago != null) {
			status = "Pago";
		}
		else if (atraso == 0){
			status += " hoje";
		}
		else if (atraso > 0){
			status += " - em atraso";
		}

        String str_atraso = atraso + " dias";
        if (atraso == 1) {
        	str_atraso = atraso + " dia";
        }

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));
        
        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"despesa_id\": \"" + despesa.id + "\",\n\t"
        		+ "\"data_registro\": \"" + despesa.data_registro.format(formatter) + "\",\n\t"
        		+ "\"data_pagamento\": \"" + data_pagamento.format(formatter) + "\",\n\t"
        		+ "\"valor\": \"" + nf.format(valor) + "\",\n\t"
        		+ "\"parcela\": \"" + parcela + " de " + this.despesa.parcelas + "\",\n\t"
        		+ "\"tipo_despesa\": \"" + despesa.tipo + "\",\n\t"
        		+ "\"tipo_pagamento\": \"" + tipo_de_pagamento + "\",\n\t"
        		+ "\"descricao\": \"" + descricao + "\",\n\t"
        		+ "\"atraso\": \"" + str_atraso + "\",\n\t"
        		+ "\"status\": \"" + status + "\"\n"
        	    + "}\n");    
    }
}

package br.com.transdolinski.api.recurso;


import java.util.List;
import java.util.ArrayList;
import java.util.Locale;
import jakarta.annotation.security.RolesAllowed;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.SecurityContext;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Context;
import br.com.transdolinski.api.entidade.RegistroPagamento;
import br.com.transdolinski.api.entidade.Despesa;
import br.com.transdolinski.api.entidade.Usuario;
import br.com.transdolinski.api.entidade.Motorista;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Path("/api/contas-a-pagar")
public class RegistroPagamentoRecurso {

    @GET
    @RolesAllowed({"Admin", "Operador", "Motorista"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<RegistroPagamento> get(@Context SecurityContext securityContext) {
    	List<RegistroPagamento> registros = RegistroPagamento.listAll();
        List<RegistroPagamento> removeList = new ArrayList<RegistroPagamento>();

        Usuario usuario = Usuario.find("nome_usuario", securityContext.getUserPrincipal().getName()).firstResult();

        if (usuario.nivel_acesso.equals("Motorista")){
            Motorista motorista = usuario.motorista;
            if (null != motorista){
                for(RegistroPagamento registro : registros){
                    if (!registro.despesa.tipo.equals("Salário")){
                        removeList.add(registro);
                    }
                    else{
                        if (null != registro.despesa.motorista){
                            if (registro.despesa.motorista != motorista){
                                removeList.add(registro);
                            }
                        }
                        else{
                            removeList.add(registro);
                        }
                    }
                }   
            }
        }

        registros.removeAll(removeList);
    	return registros;
    }


    @Transactional
    @PUT
    @Path("/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String update(
            @PathParam("id") Long id,
            @FormParam("tipo") String tipo) {
        if (tipo == null || 
            tipo.equals("")
            ) return "Preencha todos os campos requeridos";
        
        RegistroPagamento registroPagamento = RegistroPagamento.findById(id);
        if (null == registroPagamento) {
            return "Registro não existe";
        }

        Despesa despesa = registroPagamento.despesa;

        if (despesa.recorrente && null == registroPagamento.pago) {
            int i = registroPagamento.parcela + 1;
            Despesa despesaNova = Despesa.add(despesa.cliente, despesa.motorista, despesa.veiculo,  despesa.valor_total, despesa.parcelas, despesa.recorrente, despesa.tipo, despesa.descricao, registroPagamento.data_pagamento.plusMonths(1));
            Locale local = new Locale("pt", "BR");
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM", local);
            String descricao_parcelas = despesa.descricao + " - " + "Ref. " + formatter.format(registroPagamento.data_pagamento.plusMonths(1));
            RegistroPagamento.add(despesaNova, registroPagamento.valor, i, registroPagamento.data_pagamento.plusMonths(1), "", descricao_parcelas, null);
        }

        LocalDate pago = LocalDate.now();

        // tirar
        /*LocalDate today = LocalDate.now();
        if (registroPagamento.data_pagamento.isBefore(today)){
            pago = registroPagamento.data_pagamento;
        }*/

        registroPagamento.pago = pago;
        registroPagamento.tipo_de_pagamento = tipo;

        return "Confirmado";
    }
}

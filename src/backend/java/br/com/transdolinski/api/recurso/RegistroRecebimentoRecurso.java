package br.com.transdolinski.api.recurso;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
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
import jakarta.ws.rs.core.MediaType;
import br.com.transdolinski.api.entidade.RegistroRecebimento;
import br.com.transdolinski.api.entidade.Usuario;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.NumberFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Path("/api/contas-a-receber")
public class RegistroRecebimentoRecurso {

    @GET
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<RegistroRecebimento> get() {
    	List<RegistroRecebimento> registros = RegistroRecebimento.listAll();
    	return registros;
    }

    @POST
    @Path("/inadimplencia")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public String total(
            @FormParam("data_inicial") String str_data_inicial,
            @FormParam("data_final") String str_data_final) {
        List<RegistroRecebimento> registros = RegistroRecebimento.listAll();
        List<RegistroRecebimento> removeList = new ArrayList<RegistroRecebimento>();
        
        LocalDate data_inicial = LocalDate.now();
        LocalDate data_final = LocalDate.now();
        LocalDate today = LocalDate.now();

        BigDecimal valor_total = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            data_inicial = LocalDate.parse(str_data_inicial, formatter);
            data_final = LocalDate.parse(str_data_final, formatter);
        } catch (Exception e) {
            return "";
        }
        for (RegistroRecebimento registroRecebimento : registros) {
            if (null != registroRecebimento.recebido ||
            (registroRecebimento.data_recebimento.isBefore(data_inicial) || 
            registroRecebimento.data_recebimento.isAfter(data_final) ||
            registroRecebimento.data_recebimento.isAfter(today) || 
            registroRecebimento.data_recebimento.isEqual(today))) {
                removeList.add(registroRecebimento);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(registroRecebimento.valor));
            }
        }
        registros.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"registros\": " + registros.toString() + "\n"
                + "}\n";
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
        
        RegistroRecebimento registroRecebimento = RegistroRecebimento.findById(id);
        if (null == registroRecebimento) {
            return "Registro não existe";
        }


        LocalDate recebido = LocalDate.now();

        // tirar
        /*LocalDate today = LocalDate.now();
        if (registroRecebimento.data_recebimento.isBefore(today)){
            recebido = registroRecebimento.data_recebimento;
        }*/

        registroRecebimento.recebido = recebido;
        registroRecebimento.tipo_de_pagamento = tipo;
        return "Confirmado";
    }
}

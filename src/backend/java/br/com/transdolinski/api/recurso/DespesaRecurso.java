package br.com.transdolinski.api.recurso;


import java.math.BigDecimal;
import java.math.RoundingMode;
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
import br.com.transdolinski.api.entidade.Despesa;
import br.com.transdolinski.api.entidade.RegistroPagamento;
import br.com.transdolinski.api.entidade.Cliente;
import br.com.transdolinski.api.entidade.Motorista;
import br.com.transdolinski.api.entidade.Veiculo;
import br.com.transdolinski.api.entidade.Usuario;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.text.NumberFormat;

@Path("/api/despesas")
public class DespesaRecurso {

    @GET
    @RolesAllowed({"Admin", "Operador", "Motorista"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Despesa> get(@Context SecurityContext securityContext) {
    	List<Despesa> despesas = Despesa.listAll();
        List<Despesa> removeList = new ArrayList<Despesa>();

        Usuario usuario = Usuario.find("nome_usuario", securityContext.getUserPrincipal().getName()).firstResult();

        if (usuario.nivel_acesso.equals("Motorista")){
            Motorista motorista = usuario.motorista;
            if (null != motorista){
                for(Despesa despesa : despesas){

                    if (despesa.tipo.equals("Salário")){
                        removeList.add(despesa);
                    }
                    else if (despesa.tipo.equals("Encargo")){
                        removeList.add(despesa);
                    }
                    else if (null == despesa.motorista && null == despesa.veiculo){
                        removeList.add(despesa);
                    }
                    else if (null != despesa.motorista){
                        if (despesa.motorista != motorista){
                            removeList.add(despesa);
                        }
                    }
                    else if (null != despesa.veiculo){
                        boolean hasMatch = false;
                        for (Veiculo veiculo : motorista.veiculos){
                            if (despesa.veiculo == veiculo){
                                hasMatch = true;
                                break;
                            }
                        }
                        if (!hasMatch) removeList.add(despesa);
                    }
                }   
            }
        }

        despesas.removeAll(removeList);

    	return despesas;
    }
    
    @GET
    @Path("/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public Despesa get(@PathParam("id") Long id) {
    	Despesa despesa = Despesa.findById(id);
    	if (null == despesa) {
    		return null;
    	}
        return despesa;
    }

    @GET
    @Path("/options_cliente")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsCliente() {
        List<Cliente> clientes = Cliente.listAll();
        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";
        key += 0 + ",";
        name += "\"Sem Relação\",";
        value += "\"\",";
        for (int i = 1; i <= clientes.size(); i++ ) {
            Cliente cliente = clientes.get(i-1);
            key += i + ",";
            name += "\"" + cliente.nome  + "\",";
            value += "\"" + cliente.id + "\",";
        }
        key = key.substring(0, key.length() - 1) + " ],";
        name = name.substring(0, name.length() - 1) + " ],";
        value = value.substring(0, value.length() - 1) + " ]";
        str += key + name + value + "\n}";
        return str;
    }

    @GET
    @Path("/options_cliente/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsCliente(@PathParam("id") Long id) {

        Despesa despesa = Despesa.findById(id); 
        if (null == despesa) {
            return null;
        }

        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";

        List<Cliente> clientes = Cliente.listAll();
        if (null != despesa.cliente) {
            clientes.remove(despesa.cliente);
            clientes.add(0, despesa.cliente);
            for (int i = 0; i < clientes.size(); i++ ) {
                Cliente cliente = clientes.get(i);
                key += i + ",";
                name += "\"" + cliente.nome  + "\",";
                value += "\"" + cliente.id + "\",";
            }
            key += clientes.size() + ",";
            name += "\"Sem Relação\",";
            value += "\"\",";
        }
        else {
            key += 0 + ",";
            name += "\"Sem Relação\",";
            value += "\"\",";
            for (int i = 1; i <= clientes.size(); i++ ) {
                Cliente cliente = clientes.get(i-1);
                key += i + ",";
                name += "\"" + cliente.nome  + "\",";
                value += "\"" + cliente.id + "\",";
            }
        }
        key = key.substring(0, key.length() - 1) + " ],";
        name = name.substring(0, name.length() - 1) + " ],";
        value = value.substring(0, value.length() - 1) + " ]";
        str += key + name + value + "\n}";
        return str;
    }

    @GET
    @Path("/options_motorista")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsMotorista() {
        List<Motorista> motoristas = Motorista.listAll();
        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";
        key += 0 + ",";
        name += "\"Sem Relação\",";
        value += "\"\",";
        for (int i = 1; i <= motoristas.size(); i++ ) {
            Motorista motorista = motoristas.get(i-1);
            String nome = "";
            if (null != motorista.usuario){
                nome = motorista.usuario.nome + " - ";
            }
            key += i + ",";
            name += "\"" + nome + motorista.cpf + "\",";
            value += "\"" + motorista.id + "\",";
        }
        key = key.substring(0, key.length() - 1) + " ],";
        name = name.substring(0, name.length() - 1) + " ],";
        value = value.substring(0, value.length() - 1) + " ]";
        str += key + name + value + "\n}";
        return str;
    }

    @GET
    @Path("/options_motorista/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsMotorista(@PathParam("id") Long id) {

        Despesa despesa = Despesa.findById(id); 
        if (null == despesa) {
            return null;
        }

        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";

        List<Motorista> motoristas = Motorista.listAll();
        if (null != despesa.motorista) {
            motoristas.remove(despesa.motorista);
            motoristas.add(0, despesa.motorista);
            for (int i = 0; i < motoristas.size(); i++ ) {
                Motorista motorista = motoristas.get(i);
                String nome = "";
                if (null != motorista.usuario){
                    nome = motorista.usuario.nome + " - ";
                }
                key += i + ",";
                name += "\"" + nome + motorista.cpf + "\",";
                value += "\"" + motorista.id + "\",";
            }
            key += motoristas.size() + ",";
            name += "\"Sem Relação\",";
            value += "\"\",";
        }
        else {
            key += 0 + ",";
            name += "\"Sem Relação\",";
            value += "\"\",";
            for (int i = 1; i <= motoristas.size(); i++ ) {
                Motorista motorista = motoristas.get(i-1);
                String nome = "";
                if (null != motorista.usuario){
                    nome = motorista.usuario.nome + " - ";
                }
                key += i + ",";
                name += "\"" + nome + motorista.cpf + "\",";
                value += "\"" + motorista.id + "\",";
            }
        }
        
        key = key.substring(0, key.length() - 1) + " ],";
        name = name.substring(0, name.length() - 1) + " ],";
        value = value.substring(0, value.length() - 1) + " ]";
        str += key + name + value + "\n}";
        return str;
    }

    @GET
    @Path("/options_veiculo")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsVeiculo() {
        List<Veiculo> veiculos = Veiculo.listAll();
        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";
        key += 0 + ",";
        name += "\"Sem Relação\",";
        value += "\"\",";
        for (int i = 1; i <= veiculos.size(); i++ ) {
            Veiculo veiculo = veiculos.get(i-1);
            key += i + ",";
            name += "\"" + veiculo.placa + " - " + veiculo.modelo  + "\",";
            value += "\"" + veiculo.id + "\",";
        }
        key = key.substring(0, key.length() - 1) + " ],";
        name = name.substring(0, name.length() - 1) + " ],";
        value = value.substring(0, value.length() - 1) + " ]";
        str += key + name + value + "\n}";
        return str;
    }

    @GET
    @Path("/options_veiculo/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsVeiculo(@PathParam("id") Long id) {

        Despesa despesa = Despesa.findById(id); 
        if (null == despesa) {
            return null;
        }

        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";

        List<Veiculo> veiculos = Veiculo.listAll();
        if (null != despesa.veiculo) {
            veiculos.remove(despesa.veiculo);
            veiculos.add(0, despesa.veiculo);
            for (int i = 0; i < veiculos.size(); i++ ) {
                Veiculo veiculo = veiculos.get(i);
                key += i + ",";
                name += "\"" + veiculo.placa + " - " + veiculo.modelo  + "\",";
                value += "\"" + veiculo.id + "\",";
            }
            key += veiculos.size() + ",";
            name += "\"Sem Relação\",";
            value += "\"\",";
        }
        else {
            key += 0 + ",";
            name += "\"Sem Relação\",";
            value += "\"\",";
            for (int i = 1; i <= veiculos.size(); i++ ) {
                Veiculo veiculo = veiculos.get(i-1);
                key += i + ",";
                name += "\"" + veiculo.placa + " - " + veiculo.modelo  + "\",";
                value += "\"" + veiculo.id + "\",";
            } 
        }
        key = key.substring(0, key.length() - 1) + " ],";
        name = name.substring(0, name.length() - 1) + " ],";
        value = value.substring(0, value.length() - 1) + " ]";
        str += key + name + value + "\n}";
        return str;
    }
    
    @Transactional
    @POST
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String add(
            @FormParam("cliente_id") String cliente_id,
            @FormParam("motorista_id") String motorista_id,
            @FormParam("veiculo_id") String veiculo_id,
            @FormParam("valor_total") String str_valor_total, 
            @FormParam("parcelas") String str_parcelas,
            @FormParam("recorrente") String str_recorrente,  
            @FormParam("tipo") String tipo, 
            @FormParam("descricao") String descricao,
            @FormParam("data") String data) {
        if (str_valor_total == null || 
            str_parcelas == null || 
            str_recorrente == null ||
            tipo == null ||
            data == null || 
            str_valor_total.equals("") ||
            str_parcelas.equals("") || 
            str_recorrente.equals("") ||
            tipo.equals("") ||
            data.equals("")
        ) return "Preencha todos os campos requeridos"; 

        str_valor_total = str_valor_total.trim();
        str_valor_total = str_valor_total.replaceAll("\\\\", "");
        str_parcelas = str_parcelas.trim();
        str_parcelas = str_parcelas.replaceAll("\\\\", "");
        str_recorrente = str_recorrente.trim();
        str_recorrente = str_recorrente.replaceAll("\\\\", "");
        tipo = tipo.trim();
        tipo = tipo.replaceAll("\\\\", "");
        descricao = descricao.trim();
        descricao = descricao.replaceAll("\\\\", "");
        data = data.trim();
        data = data.replaceAll("\\\\", "");

        if (str_valor_total.equals("") ||
            str_parcelas.equals("") || 
            str_recorrente.equals("") ||
            tipo.equals("") ||
            data.equals("")
        ) return "Erro: Caracteres especiais não permitidos"; 

        str_valor_total = str_valor_total.trim();
        int str_valor_total_len = str_valor_total.length();
        int str_valor_total_virgula_len = (str_valor_total.replaceAll(",", "")).length();
        int str_valor_total_ponto_len = (str_valor_total.replaceAll("\\.", "")).length();

        if (str_valor_total_len >= 1){
            boolean hasVirgula = str_valor_total_len != str_valor_total_virgula_len;
            boolean hasPonto = str_valor_total_len != str_valor_total_ponto_len;
            if (hasVirgula && !hasPonto){
                if (str_valor_total_virgula_len + 1 == str_valor_total_len){
                    str_valor_total = str_valor_total.replaceAll(",", ".");
                }
                else {
                    return "Valor pode conter apenas uma virgula";
                }
            }
            else if (hasPonto && !hasVirgula){
                if (!(str_valor_total_ponto_len + 1 == str_valor_total_len)){
                    return "Valor pode conter apenas um ponto";
                }
            }
            else if (hasVirgula && hasPonto){
                str_valor_total = str_valor_total.replaceAll("\\.", "");
                if (str_valor_total_virgula_len + 1 == str_valor_total_len){
                    str_valor_total = str_valor_total.replaceAll(",", ".");
                }
                else {
                    return "Valor pode conter apenas uma virgula";
                }
            }
        }
        
        String descricao_parcelas = "";
        double valor_total = 0.0;
        int parcelas = 1;
        LocalDate data_pagamento = LocalDate.now();
        Boolean recorrente = false;
        
        try {
            valor_total = Double.valueOf(str_valor_total);
        } catch (Exception e) {
            return "Erro: Valor total deve ser um double";
        }

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            data_pagamento = LocalDate.parse(data, formatter);
        } catch (Exception e) {
            return "Erro: Data em formato errado";
        }

        try {
            
            parcelas = Integer.valueOf(str_parcelas);
            
            if (parcelas <= 0) {
                return "Valor das parcelas deve ser positivo";
            }
        } catch (Exception e) {
            return "Erro: Parcelas deve ser um int";
        }

        try {
            if (str_recorrente.contains("Sim")) {
                recorrente = true;
                parcelas = 1;
            }
        } catch (Exception e) {
            return "Erro: opção recorrente";
        }
        
        if (valor_total <= 0) {
            return "Valor total deve ser positivo";
        }

        //checkar relações

        Cliente cliente = null;
        if(null != cliente_id && cliente_id.length() > 0){
            cliente = Cliente.findById(cliente_id);
        }

        Motorista motorista = null;
        if(null != motorista_id && motorista_id.length() > 0){
            motorista = Motorista.findById(motorista_id);
        }

        Veiculo veiculo = null;
        if(null != veiculo_id && veiculo_id.length() > 0){
            veiculo = Veiculo.findById(veiculo_id);
        }

        if (tipo.equals("Salário") && null != motorista && null != motorista.usuario){

            descricao += " Motorista: " + motorista.usuario.nome;
        }

        if (tipo.equals("Seguro") && null != veiculo){

            descricao += " Veiculo: " + veiculo.placa;
        }
        
        LocalDate dt = LocalDate.now();
        Despesa despesa;

        // tirar
        /*LocalDate today = LocalDate.now();
        if (data_pagamento.isBefore(today)){
            dt = data_pagamento;
        }*/

        despesa = Despesa.add(cliente, motorista, veiculo,  valor_total, parcelas, recorrente, tipo, descricao, dt);
        
        if (parcelas == 1) {
            descricao_parcelas = descricao + " - " + "Parcela " + 1 + " de " + parcelas;
            if (recorrente){
                Locale local = new Locale("pt", "BR");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM", local);
                descricao_parcelas = descricao + " - " + "Ref. " + formatter.format(data_pagamento);
            }
            RegistroPagamento.add(despesa, valor_total, 1, data_pagamento,  "", descricao_parcelas, null);
            return "Cadastrado";
        }

        BigDecimal bd_valor_total = BigDecimal.valueOf(valor_total).setScale(2, RoundingMode.HALF_UP);
        BigDecimal bd_valor_parcelas = bd_valor_total.divide(new BigDecimal(parcelas), 2, RoundingMode.HALF_UP);
        
        for (int i = 1; i <= parcelas; i++) {
            descricao_parcelas = "Parcela " + i + " de " + parcelas + " - " + descricao;
        if (i == parcelas) {
                BigDecimal bd_valor_pago = bd_valor_parcelas.multiply(new BigDecimal(parcelas-1)).setScale(2, RoundingMode.HALF_UP);
                BigDecimal bd_valor_ultima_parcela = bd_valor_total.subtract(bd_valor_pago).setScale(2, RoundingMode.HALF_UP);
                RegistroPagamento.add(despesa, bd_valor_ultima_parcela.doubleValue(), i, data_pagamento.plusMonths(i-1), "", descricao_parcelas, null);
            }
            else {
                RegistroPagamento.add(despesa, bd_valor_parcelas.doubleValue(), i, data_pagamento.plusMonths(i-1), "", descricao_parcelas, null);
            }
        }

        return "Cadastrado";
    }

    @Transactional
    @PUT
    @Path("/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String update(
            @PathParam("id") Long id,
            @FormParam("cliente_id") String cliente_id,
            @FormParam("motorista_id") String motorista_id,
            @FormParam("veiculo_id") String veiculo_id,
            @FormParam("recorrente") String str_recorrente,  
            @FormParam("tipo") String tipo, 
            @FormParam("descricao") String descricao) {
        if (str_recorrente == null ||
            tipo == null ||
            str_recorrente.equals("") ||
            tipo.equals("")
        ) return "Preencha todos os campos requeridos"; 

        str_recorrente = str_recorrente.trim();
        str_recorrente = str_recorrente.replaceAll("\\\\", "");
        tipo = tipo.trim();
        tipo = tipo.replaceAll("\\\\", "");
        descricao = descricao.trim();
        descricao = descricao.replaceAll("\\\\", "");

        if (str_recorrente.equals("") ||
            tipo.equals("")
        ) return "Erro: Caracteres especiais não permitidos"; 

        Boolean recorrente = false;
        
        try {
            if (str_recorrente.contains("Sim")) {
                recorrente = true;
            }
        } catch (Exception e) {
            return "Erro: opção recorrente";
        }

        Despesa despesa = Despesa.findById(id);
        if (null == despesa) {
            return "Despesa não existe";
        }
        
        Cliente cliente = null;
        if(null != cliente_id && cliente_id.length() > 0){
            cliente = Cliente.findById(cliente_id);
        }

        Motorista motorista = null;
        if(null != motorista_id && motorista_id.length() > 0){
            motorista = Motorista.findById(motorista_id);
        }

        Veiculo veiculo = null;
        if(null != veiculo_id && veiculo_id.length() > 0){
            veiculo = Veiculo.findById(veiculo_id);
        }

        despesa.cliente = cliente;
        despesa.motorista = motorista;
        despesa.veiculo = veiculo;
        despesa.recorrente = recorrente;
        despesa.tipo = tipo;
        despesa.descricao = descricao;
        
        return "Editado";
    }

    @POST
    @Path("/veiculo")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public String relatorioVeiculo(
            @FormParam("veiculo_id") String veiculo_id,
            @FormParam("data_inicial") String str_data_inicial,
            @FormParam("data_final") String str_data_final) {

        if (veiculo_id == null
        ) return "Preencha todos os campos requeridos";

        Veiculo veiculo = null;
        if(null != veiculo_id && veiculo_id.length() > 0){
            veiculo = Veiculo.findById(veiculo_id);
        }
        if (null == veiculo) {
            return "Veiculo não existe";
        }

        List<Despesa> despesas = Despesa.list("veiculo", veiculo);
        List<Despesa> removeList = new ArrayList<Despesa>();
        
        LocalDate data_inicial = LocalDate.now();
        LocalDate data_final = LocalDate.now();
        LocalDate today = LocalDate.now();

        BigDecimal valor_total = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_parcial = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_restante = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            data_inicial = LocalDate.parse(str_data_inicial, formatter);
            data_final = LocalDate.parse(str_data_final, formatter);
        } catch (Exception e) {
            return "Erro de formatação de data";
        }

        for (Despesa despesa : despesas) {
            if (
                despesa.data_registro.isBefore(data_inicial) || 
                despesa.data_registro.isAfter(data_final)
                ) {
                    removeList.add(despesa);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(despesa.valor_total));

                double valor_pago = 0;
                for (RegistroPagamento registroPagamento : despesa.registrosPagamento) {
                    if (registroPagamento.pago != null) {
                        valor_pago += registroPagamento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_pago));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        despesas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + despesas.toString() + "\n"
                + "}\n";
    }

    @POST
    @Path("/motorista")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public String relatorioMotorista(
            @FormParam("motorista_id") String motorista_id,
            @FormParam("data_inicial") String str_data_inicial,
            @FormParam("data_final") String str_data_final) {

        if (motorista_id == null
        ) return "Preencha todos os campos requeridos";

        Motorista motorista = null;
        if(null != motorista_id && motorista_id.length() > 0){
            motorista = Motorista.findById(motorista_id);
        }
        if (null == motorista) {
            return "Motorista não existe";
        }

        List<Despesa> despesas = Despesa.list("motorista", motorista);
        List<Despesa> removeList = new ArrayList<Despesa>();
        
        LocalDate data_inicial = LocalDate.now();
        LocalDate data_final = LocalDate.now();
        LocalDate today = LocalDate.now();

        BigDecimal valor_total = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_parcial = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_restante = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            data_inicial = LocalDate.parse(str_data_inicial, formatter);
            data_final = LocalDate.parse(str_data_final, formatter);
        } catch (Exception e) {
            return "Erro de formatação de data";
        }

        for (Despesa despesa : despesas) {
            if (
                despesa.data_registro.isBefore(data_inicial) || 
                despesa.data_registro.isAfter(data_final)
                ) {
                    removeList.add(despesa);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(despesa.valor_total));

                double valor_pago = 0;
                for (RegistroPagamento registroPagamento : despesa.registrosPagamento) {
                    if (registroPagamento.pago != null) {
                        valor_pago += registroPagamento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_pago));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        despesas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + despesas.toString() + "\n"
                + "}\n";
    }

    @POST
    @Path("/cliente")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public String relatorioCliente(
            @FormParam("cliente_id") String cliente_id,
            @FormParam("data_inicial") String str_data_inicial,
            @FormParam("data_final") String str_data_final) {

        if (cliente_id == null
        ) return "Preencha todos os campos requeridos";

        Cliente cliente = null;
        if(null != cliente_id && cliente_id.length() > 0){
            cliente = Cliente.findById(cliente_id);
        }
        if (null == cliente) {
            return "Cliente não existe";
        }

        List<Despesa> despesas = Despesa.list("cliente", cliente);
        List<Despesa> removeList = new ArrayList<Despesa>();
        
        LocalDate data_inicial = LocalDate.now();
        LocalDate data_final = LocalDate.now();
        LocalDate today = LocalDate.now();

        BigDecimal valor_total = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_parcial = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_restante = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            data_inicial = LocalDate.parse(str_data_inicial, formatter);
            data_final = LocalDate.parse(str_data_final, formatter);
        } catch (Exception e) {
            return "Erro de formatação de data";
        }

        for (Despesa despesa : despesas) {
            if (
                despesa.data_registro.isBefore(data_inicial) || 
                despesa.data_registro.isAfter(data_final)
                ) {
                    removeList.add(despesa);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(despesa.valor_total));

                double valor_pago = 0;
                for (RegistroPagamento registroPagamento : despesa.registrosPagamento) {
                    if (registroPagamento.pago != null) {
                        valor_pago += registroPagamento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_pago));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        despesas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + despesas.toString() + "\n"
                + "}\n";
    }

    @POST
    @Path("/todos")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public String relatorioTodos(
            @FormParam("data_inicial") String str_data_inicial,
            @FormParam("data_final") String str_data_final) {

        List<Despesa> despesas = Despesa.listAll();
        List<Despesa> removeList = new ArrayList<Despesa>();
        
        LocalDate data_inicial = LocalDate.now();
        LocalDate data_final = LocalDate.now();
        LocalDate today = LocalDate.now();

        BigDecimal valor_total = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_parcial = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);
        BigDecimal valor_restante = BigDecimal.valueOf(0.0).setScale(2, RoundingMode.HALF_UP);

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            data_inicial = LocalDate.parse(str_data_inicial, formatter);
            data_final = LocalDate.parse(str_data_final, formatter);
        } catch (Exception e) {
            return "Erro de formatação de data";
        }

        for (Despesa despesa : despesas) {
            if (
                despesa.data_registro.isBefore(data_inicial) || 
                despesa.data_registro.isAfter(data_final)
                ) {
                    removeList.add(despesa);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(despesa.valor_total));

                double valor_pago = 0;
                for (RegistroPagamento registroPagamento : despesa.registrosPagamento) {
                    if (registroPagamento.pago != null) {
                        valor_pago += registroPagamento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_pago));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        despesas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + despesas.toString() + "\n"
                + "}\n";
    }
    
    @Transactional
    @DELETE
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    public String delete(@PathParam("id") Long id) {
    	Despesa despesa = Despesa.findById(id);
    	if (null == despesa) {
    		return "Despesa não existe";
    	}
    	despesa.delete();
    	return "Deletado";
    }
}

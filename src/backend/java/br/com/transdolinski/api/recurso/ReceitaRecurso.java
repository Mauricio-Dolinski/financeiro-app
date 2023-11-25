package br.com.transdolinski.api.recurso;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Date;
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
import jakarta.ws.rs.core.MediaType;
import br.com.transdolinski.api.entidade.Receita;
import br.com.transdolinski.api.entidade.Cliente;
import br.com.transdolinski.api.entidade.Veiculo;
import br.com.transdolinski.api.entidade.Motorista;
import br.com.transdolinski.api.entidade.RegistroRecebimento;
import br.com.transdolinski.api.entidade.Usuario;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.text.NumberFormat;

@Path("/api/receitas")
public class ReceitaRecurso {

    @GET
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Receita> get() {
    	List<Receita> receitas = Receita.listAll();
    	return receitas;
    }
    
    @GET
    @Path("/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public Receita get(@PathParam("id") Long id) {
    	Receita receita = Receita.findById(id);
    	if (null == receita) {
    		return null;
    	}
        return receita;
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

        Receita receita = Receita.findById(id); 
        if (null == receita) {
            return null;
        }

        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";

        List<Cliente> clientes = Cliente.listAll();
        if (null != receita.cliente) {
            clientes.remove(receita.cliente);
            clientes.add(0, receita.cliente);
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

        Receita receita = Receita.findById(id); 
        if (null == receita) {
            return null;
        }

        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";

        List<Veiculo> veiculos = Veiculo.listAll();
        if (null != receita.veiculo) {
            veiculos.remove(receita.veiculo);
            veiculos.add(0, receita.veiculo);
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
            @FormParam("veiculo_id") String veiculo_id,
    		@FormParam("valor_total") String str_valor_total, 
    		@FormParam("parcelas") String str_parcelas, 
    		@FormParam("tipo") String tipo, 
    		@FormParam("descricao") String descricao,
    		@FormParam("data") String data) {
    	if (str_valor_total == null || 
    		str_parcelas == null || 
    		tipo == null ||
    		data == null || 
    		str_valor_total.equals("") ||
    		str_parcelas.equals("") || 
    		tipo.equals("") ||
    		data.equals("")
    	) return "Preencha todos os campos requeridos"; 
    	
        str_valor_total = str_valor_total.trim();
        str_valor_total = str_valor_total.replaceAll("\\\\", "");
        str_parcelas = str_parcelas.trim();
        str_parcelas = str_parcelas.replaceAll("\\\\", "");
        tipo = tipo.trim();
        tipo = tipo.replaceAll("\\\\", "");
        descricao = descricao.trim();
        descricao = descricao.replaceAll("\\\\", "");
        data = data.trim();
        data = data.replaceAll("\\\\", "");

        if (str_valor_total.equals("") ||
            str_parcelas.equals("") || 
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

    	
        Cliente cliente = null;
        if(null != cliente_id && cliente_id.length() > 0){
            cliente = Cliente.findById(cliente_id);
        }

        Veiculo veiculo = null;
        if(null != veiculo_id && veiculo_id.length() > 0){
            veiculo = Veiculo.findById(veiculo_id);
        }

    	String descricao_parcelas = "";
    	double valor_total = 0.0;
    	int parcelas = 1;
    	LocalDate data_recebimento = LocalDate.now();
    	
    	try {
    		valor_total = Double.valueOf(str_valor_total);
    	} catch (Exception e) {
    		return "Erro: Valor total deve ser um double";
    	}

    	try {
    		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
			data_recebimento = LocalDate.parse(data, formatter);
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
    	
    	if (valor_total <= 0) {
    		return "Valor total deve ser positivo";
    	}
    	//checkar unique
    	
    	//checkar relações
    	
    	LocalDate dt = LocalDate.now();

        // tirar
        /*LocalDate today = LocalDate.now();
        if (data_recebimento.isBefore(today)){
            dt = data_recebimento;
        }*/
        
    	Receita receita = Receita.add(null, cliente, veiculo, valor_total, parcelas, tipo, descricao, dt);
    	
    	BigDecimal bd_valor_total = BigDecimal.valueOf(valor_total).setScale(2, RoundingMode.HALF_UP);

    	if (parcelas == 1) {
    		descricao_parcelas = "Parcela " + 1 + " de " + parcelas + " - " + descricao;
    		RegistroRecebimento.add(receita, bd_valor_total.doubleValue(), 1, data_recebimento, "", descricao_parcelas, null);
    		return "Cadastrado";
    	}

    	BigDecimal bd_valor_parcelas = bd_valor_total.divide(new BigDecimal(parcelas), 2, RoundingMode.HALF_UP);
    	
    	for (int i = 1; i <= parcelas; i++) {
    		descricao_parcelas = "Parcela " + i + " de " + parcelas + " - " + descricao;
    	if (i == parcelas) {
    			BigDecimal bd_valor_pago = bd_valor_parcelas.multiply(new BigDecimal(parcelas-1)).setScale(2, RoundingMode.HALF_UP);
    			BigDecimal bd_valor_ultima_parcela = bd_valor_total.subtract(bd_valor_pago).setScale(2, RoundingMode.HALF_UP);
    			RegistroRecebimento.add(receita, bd_valor_ultima_parcela.doubleValue(), i, data_recebimento.plusMonths(i-1), "", descricao_parcelas, null);
    		}
    		else {
    			RegistroRecebimento.add(receita, bd_valor_parcelas.doubleValue(), i, data_recebimento.plusMonths(i-1), "", descricao_parcelas, null);
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
            @FormParam("veiculo_id") String veiculo_id,
            @FormParam("tipo") String tipo, 
            @FormParam("descricao") String descricao) {
        if (tipo == null ||
            tipo.equals("")
        ) return "Preencha todos os campos requeridos"; 
        
        tipo = tipo.trim();
        tipo = tipo.replaceAll("\\\\", "");
        descricao = descricao.trim();
        descricao = descricao.replaceAll("\\\\", "");

        if (tipo.equals("")
        ) return "Erro: Caracteres especiais não permitidos"; 

        Receita receita = Receita.findById(id);
        if (null == receita) {
            return "Receita não existe";
        }
        
        Cliente cliente = null;
        if(null != cliente_id && cliente_id.length() > 0){
            cliente = Cliente.findById(cliente_id);
        }

        Veiculo veiculo = null;
        if(null != veiculo_id && veiculo_id.length() > 0){
            veiculo = Veiculo.findById(veiculo_id);
        }

        if (!receita.tipo.equals("Frete")){
            receita.tipo = tipo;
        }
        receita.cliente = cliente;
        receita.veiculo = veiculo;
        receita.descricao = descricao;
        
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

        List<Receita> receitas = Receita.list("veiculo", veiculo);
        List<Receita> removeList = new ArrayList<Receita>();
        
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

        for (Receita receita : receitas) {
            if (
                receita.data_registro.isBefore(data_inicial) || 
                receita.data_registro.isAfter(data_final)
                ) {
                    removeList.add(receita);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(receita.valor_total));

                double valor_recebido = 0;
                for (RegistroRecebimento registroRecebimento : receita.registrosRecebimento) {
                    if (registroRecebimento.recebido != null) {
                        valor_recebido += registroRecebimento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_recebido));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        receitas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + receitas.toString() + "\n"
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

        List<Receita> receitas = new ArrayList<Receita>();//Receita.list("veiculo", veiculo);
        List<Receita> removeList = new ArrayList<Receita>();
        
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

        if (null != motorista.veiculos){
            for (Veiculo veiculo : motorista.veiculos) {
                List<Receita> receitasTemp = Receita.list("veiculo", veiculo);
                for (Receita receitaTemp : receitasTemp){
                    receitas.add(receitaTemp);
                }
            }
        }

        for (Receita receita : receitas) {
            if (
                receita.data_registro.isBefore(data_inicial) || 
                receita.data_registro.isAfter(data_final)
                ) {
                    removeList.add(receita);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(receita.valor_total));

                double valor_recebido = 0;
                for (RegistroRecebimento registroRecebimento : receita.registrosRecebimento) {
                    if (registroRecebimento.recebido != null) {
                        valor_recebido += registroRecebimento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_recebido));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        receitas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + receitas.toString() + "\n"
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

        List<Receita> receitas = Receita.list("cliente", cliente);
        List<Receita> removeList = new ArrayList<Receita>();
        
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

        for (Receita receita : receitas) {
            if (
                receita.data_registro.isBefore(data_inicial) || 
                receita.data_registro.isAfter(data_final)
                ) {
                    removeList.add(receita);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(receita.valor_total));

                double valor_recebido = 0;
                for (RegistroRecebimento registroRecebimento : receita.registrosRecebimento) {
                    if (registroRecebimento.recebido != null) {
                        valor_recebido += registroRecebimento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_recebido));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        receitas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + receitas.toString() + "\n"
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

        List<Receita> receitas = Receita.listAll();
        List<Receita> removeList = new ArrayList<Receita>();
        
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

        for (Receita receita : receitas) {
            if (
                receita.data_registro.isBefore(data_inicial) || 
                receita.data_registro.isAfter(data_final)
                ) {
                    removeList.add(receita);
            }
            else {
                valor_total = valor_total.add(BigDecimal.valueOf(receita.valor_total));

                double valor_recebido = 0;
                for (RegistroRecebimento registroRecebimento : receita.registrosRecebimento) {
                    if (registroRecebimento.recebido != null) {
                        valor_recebido += registroRecebimento.valor;
                    }
                }
                valor_parcial = valor_parcial.add(BigDecimal.valueOf(valor_recebido));
            }
        }

        valor_restante = valor_total.subtract(valor_parcial);

        receitas.removeAll(removeList);

        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return "{\n\t"
                + "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
                + "\"valor_parcial\": \"" + nf.format(valor_parcial) + "\",\n\t"
                + "\"valor_restante\": \"" + nf.format(valor_restante) + "\",\n\t"
                + "\"registros\": " + receitas.toString() + "\n"
                + "}\n";
    }
    
    @Transactional
    @DELETE
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    public String delete(@PathParam("id") Long id) {
    	Receita receita = Receita.findById(id);
    	if (null == receita) {
    		return "Receita não existe";
    	}
    	receita.delete();
    	return "Deletado";
    }
}

package br.com.transdolinski.api.recurso;


import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
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
import br.com.transdolinski.api.entidade.Frete;
import br.com.transdolinski.api.entidade.Usuario;
import br.com.transdolinski.api.entidade.Cliente;
import br.com.transdolinski.api.entidade.Motorista;
import br.com.transdolinski.api.entidade.Veiculo;
import br.com.transdolinski.api.entidade.Receita;
import br.com.transdolinski.api.entidade.RegistroRecebimento;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.ArrayList;


@Path("/api/fretes")
public class FreteRecurso {

    @GET
    @RolesAllowed({"Admin", "Operador", "Motorista"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Frete> get(@Context SecurityContext securityContext) {
    	List<Frete> fretes = Frete.listAll();
        List<Frete> removeList = new ArrayList<Frete>();

        Usuario usuario = Usuario.find("nome_usuario", securityContext.getUserPrincipal().getName()).firstResult();

        if (usuario.nivel_acesso.equals("Motorista")){
            Motorista motorista = usuario.motorista;
            if (null != motorista){
                for(Frete frete : fretes){
                    if (null != frete.receita){
                        if (frete.receita.veiculo.motorista != motorista){
                            removeList.add(frete);
                        }
                    }
                    else{
                        removeList.add(frete);
                    }
                    
                }   
            }
        }

        fretes.removeAll(removeList);

    	return fretes;
    }
    
    @GET
    @Path("/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public Frete get(@PathParam("id") Long id) {
    	Frete frete = Frete.findById(id);
        return frete;
    }

    @GET
    @Path("/options_cliente")
    @RolesAllowed({"Admin", "Operador", "Motorista"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsCliente() {
        List<Cliente> clientes = Cliente.listAll();
        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";
        for (int i = 0; i < clientes.size(); i++ ) {
            Cliente cliente = clientes.get(i);
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

        Frete frete = Frete.findById(id); 
        if (null == frete) {
            return null;
        }
        List<Cliente> clientes = Cliente.listAll();
        if (null != frete.receita && null != frete.receita.cliente) {
            clientes.remove(frete.receita.cliente);
            clientes.add(0, frete.receita.cliente);
        }
        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";
        for (int i = 0; i < clientes.size(); i++ ) {
            Cliente cliente = clientes.get(i);
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
    @Path("/options_veiculo")
    @RolesAllowed({"Admin", "Operador", "Motorista"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptionsVeiculo(@Context SecurityContext securityContext) {
        List<Veiculo> veiculos = Veiculo.listAll();
        List<Veiculo> removeList = new ArrayList<Veiculo>();

        Usuario usuario = Usuario.find("nome_usuario", securityContext.getUserPrincipal().getName()).firstResult();

        if (usuario.nivel_acesso.equals("Motorista")){
            Motorista motorista = usuario.motorista;
            if (null != motorista){
                for(Veiculo veiculo : veiculos){
                    if (null != veiculo.motorista){
                        if (veiculo.motorista != motorista){
                            removeList.add(veiculo);
                        }
                    }
                    else{
                        removeList.add(veiculo);
                    }
                    
                }   
            }
        }

        veiculos.removeAll(removeList);

        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";
        for (int i = 0; i < veiculos.size(); i++ ) {
            Veiculo veiculo = veiculos.get(i);
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

        Frete frete = Frete.findById(id); 
        if (null == frete) {
            return null;
        }
        List<Veiculo> veiculos = Veiculo.listAll();
        if (null != frete.receita && null != frete.receita.veiculo) {
            veiculos.remove(frete.receita.veiculo);
            veiculos.add(0, frete.receita.veiculo);
        }
        String str = "{";
        String key = "\n\t\"key\": [ ";
        String name = "\n\t\"name\": [ ";
        String value = "\n\t\"value\": [ ";
        for (int i = 0; i < veiculos.size(); i++ ) {
            Veiculo veiculo = veiculos.get(i);
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

    @Transactional
    @POST
    @RolesAllowed({"Admin", "Operador", "Motorista"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String add(
            @FormParam("cliente_id") String cliente_id, 
            @FormParam("veiculo_id") String veiculo_id, 
            @FormParam("cte") String cte, 
            @FormParam("origem") String origem, 
            @FormParam("destino") String destino, 
            @FormParam("valor_total") String str_valor_total, 
            @FormParam("valor_adiantamento") String str_valor_adiantamento, 
            @FormParam("descricao") String descricao,
            @FormParam("data") String data) {
        if (cte == null ||
            origem == null ||
            destino == null ||
            str_valor_total == null || 
            str_valor_adiantamento == null || 
            data == null || 
            cte.equals("") ||
            origem.equals("") ||
            destino.equals("") ||
            str_valor_total.equals("") ||
            data.equals("")
        ) return "Preencha todos os campos requeridos";

        cte = cte.trim();
        cte = cte.replaceAll("\\\\", "");
        origem = origem.trim();
        origem = origem.replaceAll("\\\\", "");
        destino = destino.trim();
        destino = destino.replaceAll("\\\\", "");
        str_valor_total = str_valor_total.trim();
        str_valor_total = str_valor_total.replaceAll("\\\\", "");
        str_valor_adiantamento = str_valor_adiantamento.trim();
        str_valor_adiantamento = str_valor_adiantamento.replaceAll("\\\\", "");
        descricao = descricao.trim();
        descricao = descricao.replaceAll("\\\\", "");
        data = data.trim();
        data = data.replaceAll("\\\\", "");

        if (cte.equals("") ||
            origem.equals("") ||
            destino.equals("") ||
            str_valor_total.equals("") ||
            data.equals("")
        ) return "Erro: Caracteres especiais não permitidos";

        cte = cte.trim();
        cte = cte.replaceAll("\\/", "");
        cte = cte.replaceAll("\\.", "");
        cte = cte.replaceAll("-", "");
        if (cte.length() != 44 || !cte.matches("[0-9]+")){
            return "cte deve conter 44 numeros";
        }

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

        str_valor_adiantamento = str_valor_adiantamento.trim();
        int str_valor_adiantamento_len = str_valor_adiantamento.length();
        int str_valor_adiantamento_virgula_len = (str_valor_adiantamento.replaceAll(",", "")).length();
        int str_valor_adiantamento_ponto_len = (str_valor_adiantamento.replaceAll("\\.", "")).length();

        if (str_valor_adiantamento_len >= 1){
            boolean hasVirgula = str_valor_adiantamento_len != str_valor_adiantamento_virgula_len;
            boolean hasPonto = str_valor_adiantamento_len != str_valor_adiantamento_ponto_len;
            if (hasVirgula && !hasPonto){
                if (str_valor_adiantamento_virgula_len + 1 == str_valor_adiantamento_len){
                    str_valor_adiantamento = str_valor_adiantamento.replaceAll(",", ".");
                }
                else {
                    return "Valor pode conter apenas uma virgula";
                }
            }
            else if (hasPonto && !hasVirgula){
                if (!(str_valor_adiantamento_ponto_len + 1 == str_valor_adiantamento_len)){
                    return "Valor pode conter apenas um ponto";
                }
            }
            else if (hasVirgula && hasPonto){
                str_valor_adiantamento = str_valor_adiantamento.replaceAll("\\.", "");
                if (str_valor_adiantamento_virgula_len + 1 == str_valor_adiantamento_len){
                    str_valor_adiantamento = str_valor_adiantamento.replaceAll(",", ".");
                }
                else {
                    return "Valor pode conter apenas uma virgula";
                }
            }
        }
        
        if (!Frete.list("cte", cte).isEmpty()) {
            return "Conhecimento de Transporte já cadastrado";
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
        double valor_adiantamento = 0.0;
        double valor_total = 0.0;
        LocalDate data_recebimento = LocalDate.now();
        
        try {
            valor_adiantamento = Double.valueOf(str_valor_adiantamento);
        } catch (Exception e) {
            return "Erro: Valor adiantamento deve ser um double";
        }

        try {
            valor_total = Double.valueOf(str_valor_total);
        } catch (Exception e) {
            return "Erro: Valor total deve ter o formato de reais ex: 50,00";
        }

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            data_recebimento = LocalDate.parse(data, formatter);
        } catch (Exception e) {
            return "Erro: Data em formato errado";
        }
        
        if(valor_total < valor_adiantamento){
            return "Erro: Valor total deve ser maior que o valor do adiantamento";
        }

        if (valor_total <= 0) {
            return "Valor total deve ser positivo";
        }

        if (valor_adiantamento < 0) {
            return "Valor adiantamento deve ser positivo";
        }
        
        LocalDate dt = LocalDate.now();

        // tirar
        /*LocalDate today = LocalDate.now();
        if (data_recebimento.isBefore(today)){
            dt = data_recebimento;
        }*/

        Frete frete = Frete.add(cte, origem,  destino, dt);

        descricao = "id: "+ frete.id + " - " + descricao;

        Receita receita = Receita.add(frete, cliente, veiculo, valor_total, 2, "Frete", descricao, dt);
        
        BigDecimal bd_valor_total = BigDecimal.valueOf(valor_total).setScale(2, RoundingMode.HALF_UP);
        BigDecimal bd_valor_adiantamento = BigDecimal.valueOf(valor_adiantamento).setScale(2, RoundingMode.HALF_UP);

        if (valor_adiantamento == 0.0) {
            descricao_parcelas = descricao + " - Pagamento";
            RegistroRecebimento.add(receita, bd_valor_total.doubleValue(), 1, data_recebimento, "", descricao_parcelas, null);
            return "Cadastrado";
        }
        else if (bd_valor_total == bd_valor_adiantamento) {
            descricao_parcelas = descricao + " - Pagamento";
            RegistroRecebimento.add(receita, bd_valor_total.doubleValue(), 1, dt, "", descricao_parcelas, null);
            return "Cadastrado";
        }

        descricao_parcelas = descricao + " - Adiantamento";
        RegistroRecebimento.add(receita, bd_valor_adiantamento.doubleValue(), 1, dt, "", descricao_parcelas, null);

        descricao_parcelas = descricao + " - Pagamento";
        BigDecimal bd_valor_sobra = bd_valor_total.subtract(bd_valor_adiantamento).setScale(2, RoundingMode.HALF_UP);
        RegistroRecebimento.add(receita, bd_valor_sobra.doubleValue(), 2, data_recebimento, "", descricao_parcelas, null);

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
            @FormParam("cte") String cte, 
            @FormParam("origem") String origem, 
            @FormParam("destino") String destino) {
        if (cte == null ||
            origem == null ||
            destino == null ||
            cte.equals("") ||
            origem.equals("") ||
            destino.equals("")
        ) return "Preencha todos os campos requeridos"; 

        cte = cte.trim();
        cte = cte.replaceAll("\\\\", "");
        origem = origem.trim();
        origem = origem.replaceAll("\\\\", "");
        destino = destino.trim();
        destino = destino.replaceAll("\\\\", "");

        if (cte.equals("") ||
            origem.equals("") ||
            destino.equals("")
        ) return "Erro: Caracteres especiais não permitidos";
        
        cte = cte.trim();
        cte = cte.replaceAll("\\/", "");
        cte = cte.replaceAll("\\.", "");
        cte = cte.replaceAll("-", "");
        if (cte.length() != 44 || !cte.matches("[0-9]+")){
            return "cte deve conter 44 numeros";
        }

        Frete frete = Frete.findById(id);
        if (null == frete) {
            return "Frete não existe";
        }

        Cliente cliente = Cliente.findById(cliente_id);
        if (null == cliente) {
            return "Cliente não existe";
        }

        Veiculo veiculo = Veiculo.findById(veiculo_id);
        if (null == veiculo) {
            return "Veiculo não existe";
        }

        Frete frete_cte = Frete.find("cte", cte).firstResult();
        if (null != frete_cte && frete_cte != frete) {
            return "Conhecimento de Transporte já existe";
        }

        if (null != frete.receita){
            frete.receita.cliente = cliente;
            frete.receita.veiculo = veiculo;
        }
        
        frete.cte = cte;
        frete.origem = origem;
        frete.destino = destino;

        return "Editado";
    }
    
    @Transactional
    @DELETE
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    public String delete(@PathParam("id") Long id) {
    	Frete frete = Frete.findById(id);
    	if (frete == null) {
    		return "Frete não existe";
    	}
    	frete.delete();
    	return "Deletado";
    }
}

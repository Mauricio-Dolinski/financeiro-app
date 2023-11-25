package br.com.transdolinski.api.recurso;


import java.util.ArrayList;
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
import jakarta.ws.rs.core.MediaType;
import br.com.transdolinski.api.entidade.Motorista;
import br.com.transdolinski.api.entidade.Usuario;
import br.com.transdolinski.api.entidade.Veiculo;

@Path("/api/veiculos")
public class VeiculoRecurso {

    @GET
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Veiculo> get() {
    	List<Veiculo> veiculos = Veiculo.listAll();
    	return veiculos;
    }
    
    @GET
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Veiculo get(@PathParam("id") Long id) {
    	Veiculo veiculo = Veiculo.findById(id);
    	if (null == veiculo) {
    		return null;
    	}
        return veiculo;
    }

    @GET
    @Path("/options")
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptions() {
    	List<Motorista> motoristas = Motorista.listAll();
    	String str = "{";
    	String key = "\n\t\"key\": [ ";
    	String name = "\n\t\"name\": [ ";
    	String value = "\n\t\"value\": [ ";
    	for (int i = 0; i < motoristas.size(); i++ ) {
    		Motorista motorista = motoristas.get(i);
    		String nome_usuario = "";
    		if (motorista.usuario != null) {
    			nome_usuario = motorista.usuario.nome + " - ";
    		}
			key += i + ",";
			name += "\"" + nome_usuario + motorista.cpf  + "\",";
			value += "\"" + motorista.id + "\",";
		}
    	key = key.substring(0, key.length() - 1) + " ],";
    	name = name.substring(0, name.length() - 1) + " ],";
    	value = value.substring(0, value.length() - 1) + " ]";
    	str += key + name + value + "\n}";
        return str;
    }
    
    @GET
    @Path("/options/{id}")
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptions(@PathParam("id") Long id) {
    	Veiculo veiculo = Veiculo.findById(id);	
    	if (null == veiculo) {
    		return null;
    	}
    	List<Motorista> motoristas = Motorista.listAll();
    	if (null != veiculo.motorista) {
    		motoristas.remove(veiculo.motorista);
    		motoristas.add(0, veiculo.motorista);
    	}
    	String str = "{";
    	String key = "\n\t\"key\": [ ";
    	String name = "\n\t\"name\": [ ";
    	String value = "\n\t\"value\": [ ";
    	for (int i = 0; i < motoristas.size(); i++ ) {
    		Motorista motorista = motoristas.get(i);
    		String nome_usuario = "";
    		if (null != motorista.usuario) {
    			nome_usuario = motorista.usuario.nome + " - ";
    		}
			key += i + ",";
			name += "\"" + nome_usuario + motorista.cpf  + "\",";
			value += "\"" + motorista.id + "\",";
		}
    	key = key.substring(0, key.length() - 1) + " ],";
    	name = name.substring(0, name.length() - 1) + " ],";
    	value = value.substring(0, value.length() - 1) + " ]";
    	str += key + name + value + "\n}";
        return str;
    }
    
    @Transactional
    @POST
    @RolesAllowed({"Admin"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String add(
    		@FormParam("motorista_id") String motorista_id, 
    		@FormParam("placa") String placa, 
    		@FormParam("marca") String marca, 
    		@FormParam("modelo") String modelo,
    		@FormParam("ano") String str_ano,
    		@FormParam("renavam") String renavam,
    		@FormParam("tipo") String tipo,
    		@FormParam("capacidade") String str_capacidade) {
    	if (motorista_id == null ||
    		placa == null || 
    		marca == null || 
            str_ano == null || 
    		modelo == null ||
    		renavam == null ||
    		tipo == null ||
    		motorista_id.equals("") ||
    		placa.equals("") || 
    		marca.equals("") || 
            str_ano.equals("") || 
    		modelo.equals("") ||
    		renavam.equals("") ||
    		tipo.equals("")
    	) return "Preencha todos os campos requeridos";

        placa = placa.trim();
        placa = placa.replaceAll("\\\\", "");
        marca = marca.trim();
        marca = marca.replaceAll("\\\\", "");
        modelo = modelo.trim();
        modelo = modelo.replaceAll("\\\\", "");
        str_ano = str_ano.trim();
        str_ano = str_ano.replaceAll("\\\\", "");
        renavam = renavam.trim();
        renavam = renavam.replaceAll("\\\\", "");
        tipo = tipo.trim();
        tipo = tipo.replaceAll("\\\\", "");
        str_capacidade = str_capacidade.trim();
        str_capacidade = str_capacidade.replaceAll("\\\\", "");

        if (placa.equals("") || 
            marca.equals("") || 
            str_ano.equals("") || 
            modelo.equals("") ||
            renavam.equals("") ||
            tipo.equals("")
        ) return "Erro: Caracteres especiais não permitidos";
    	
        str_capacidade = str_capacidade.trim();
        int str_capacidade_len = str_capacidade.length();
        int str_capacidade_virgula_len = (str_capacidade.replaceAll(",", "")).length();
        int str_capacidade_ponto_len = (str_capacidade.replaceAll("\\.", "")).length();

        if (str_capacidade_len >= 1){
            boolean hasVirgula = str_capacidade_len != str_capacidade_virgula_len;
            boolean hasPonto = str_capacidade_len != str_capacidade_ponto_len;
            if (hasVirgula && !hasPonto){
                if (str_capacidade_virgula_len + 1 == str_capacidade_len){
                    str_capacidade = str_capacidade.replaceAll(",", ".");
                }
                else {
                    return "Capacidade pode conter apenas uma virgula";
                }
            }
            else if (hasPonto && !hasVirgula){
                if (!(str_capacidade_ponto_len + 1 == str_capacidade_len)){
                    return "Capacidade pode conter apenas um ponto";
                }
            }
            else if (hasVirgula && hasPonto){
                str_capacidade = str_capacidade.replaceAll("\\.", "");
                if (str_capacidade_virgula_len + 1 == str_capacidade_len){
                    str_capacidade = str_capacidade.replaceAll(",", ".");
                }
                else {
                    return "Capacidade pode conter apenas uma virgula";
                }
            }
        }
        
        placa = placa.trim();
        placa = placa.replaceAll("-", "");
        placa = placa.toUpperCase();
        if (placa.length() != 7){
            return "Placa deve possuir 7 caracteres";
        }
        if(!placa.matches("^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$")) {
            return "Placa não é válida";
        }

        renavam = renavam.trim();
        if (renavam.length() != 11 || !renavam.matches("[0-9]+")){
            return "Renavam deve conter 11 numeros";
        }
        else {
            // Remove o digito (11 posicao)
            // renavamSemDigito = 0063988496
            String renavamSemDigito = renavam.substring(0, 10);

            // Inverte os caracteres (reverso)
            // renavamReversoSemDigito = 69488936
            String renavamReversoSemDigito = new StringBuffer(renavamSemDigito).reverse().toString();

            int soma = 0;

            // Multiplica as strings reversas do renavam pelos numeros multiplicadores
            // para apenas os primeiros 8 digitos de um total de 10
            // Exemplo: renavam reverso sem digito = 69488936
            // 6, 9, 4, 8, 8, 9, 3, 6
            // * * * * * * * *
            // 2, 3, 4, 5, 6, 7, 8, 9 (numeros multiplicadores – sempre os mesmos [fixo])
            // 12 + 27 + 16 + 40 + 48 + 63 + 24 + 54
            // soma = 284
            for (int i = 0; i < 8; i++) {
                Integer algarismo = Integer.parseInt(renavamReversoSemDigito.substring(i, i + 1));
                Integer multiplicador = i + 2;
                soma += algarismo * multiplicador;
            }

            // Multiplica os dois ultimos digitos e soma
            soma += Character.getNumericValue(renavamReversoSemDigito.charAt(8)) * 2;
            soma += Character.getNumericValue(renavamReversoSemDigito.charAt(9)) * 3;

            // mod11 = 284 % 11 = 9 (resto da divisao por 11)
            int mod11 = soma % 11;

            // Faz-se a conta 11 (valor fixo) – mod11 = 11 – 9 = 2
            int ultimoDigitoCalculado = 11 - mod11;

            // ultimoDigito = Caso o valor calculado anteriormente seja 10 ou 11, transformo ele em 0
            // caso contrario, eh o proprio numero
            ultimoDigitoCalculado = (ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado);

            // Pego o ultimo digito do renavam original (para confrontar com o calculado)
            int digitoRealInformado = Integer.valueOf(renavam.substring(renavam.length() - 1, renavam.length()));

            // Comparo os digitos calculado e informado
            if (ultimoDigitoCalculado != digitoRealInformado) {
                return "Renavam não é válido";
            }
        }

        int ano = 0;
        try {
            ano = Integer.valueOf(str_ano);
        } catch (Exception e) {
            return "Erro: Ano deve ser um numero integral";
        }

        double capacidade = 0.0;
        try {
            if (str_capacidade.length() > 0)
            capacidade = Double.valueOf(str_capacidade);
        } catch (Exception e) {
            return "Capacidade deve ser um numero";
        }

    	if (!Veiculo.list("placa", placa).isEmpty()) {
    		return "Placa já cadastrada";
    	}
    	if (!Veiculo.list("renavam", renavam).isEmpty()) {
    		return "Renavam já cadastrado";
    	}
    	Motorista motorista = Motorista.findById(motorista_id);
    	Veiculo.add(motorista, placa, marca, modelo, ano, renavam, tipo, capacidade);
    	return "Cadastrado";
    }
    
    @Transactional
    @PUT
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String add(
    		@PathParam("id") Long id,
    		@FormParam("motorista_id") String motorista_id, 
    		@FormParam("placa") String placa, 
    		@FormParam("marca") String marca, 
    		@FormParam("modelo") String modelo,
    		@FormParam("ano") String str_ano,
    		@FormParam("renavam") String renavam,
    		@FormParam("tipo") String tipo,
    		@FormParam("capacidade") String str_capacidade) {
    	if (motorista_id == null ||
            placa == null || 
            marca == null || 
            str_ano == null || 
            modelo == null ||
            renavam == null ||
            tipo == null ||
            motorista_id.equals("") ||
            placa.equals("") || 
            marca.equals("") || 
            str_ano.equals("") || 
            modelo.equals("") ||
            renavam.equals("") ||
            tipo.equals("")
    	) return "Preencha todos os campos requeridos";
    	
        placa = placa.trim();
        placa = placa.replaceAll("\\\\", "");
        marca = marca.trim();
        marca = marca.replaceAll("\\\\", "");
        modelo = modelo.trim();
        modelo = modelo.replaceAll("\\\\", "");
        str_ano = str_ano.trim();
        str_ano = str_ano.replaceAll("\\\\", "");
        renavam = renavam.trim();
        renavam = renavam.replaceAll("\\\\", "");
        tipo = tipo.trim();
        tipo = tipo.replaceAll("\\\\", "");
        str_capacidade = str_capacidade.trim();
        str_capacidade = str_capacidade.replaceAll("\\\\", "");

        if (placa.equals("") || 
            marca.equals("") || 
            str_ano.equals("") || 
            modelo.equals("") ||
            renavam.equals("") ||
            tipo.equals("")
        ) return "Erro: Caracteres especiais não permitidos";

        str_capacidade = str_capacidade.trim();
        int str_capacidade_len = str_capacidade.length();
        int str_capacidade_virgula_len = (str_capacidade.replaceAll(",", "")).length();
        int str_capacidade_ponto_len = (str_capacidade.replaceAll("\\.", "")).length();

        if (str_capacidade_len >= 1){
            boolean hasVirgula = str_capacidade_len != str_capacidade_virgula_len;
            boolean hasPonto = str_capacidade_len != str_capacidade_ponto_len;
            if (hasVirgula && !hasPonto){
                if (str_capacidade_virgula_len + 1 == str_capacidade_len){
                    str_capacidade = str_capacidade.replaceAll(",", ".");
                }
                else {
                    return "Capacidade pode conter apenas uma virgula";
                }
            }
            else if (hasPonto && !hasVirgula){
                if (!(str_capacidade_ponto_len + 1 == str_capacidade_len)){
                    return "Capacidade pode conter apenas um ponto";
                }
            }
            else if (hasVirgula && hasPonto){
                str_capacidade = str_capacidade.replaceAll("\\.", "");
                if (str_capacidade_virgula_len + 1 == str_capacidade_len){
                    str_capacidade = str_capacidade.replaceAll(",", ".");
                }
                else {
                    return "Capacidade pode conter apenas uma virgula";
                }
            }
        }

        placa = placa.trim();
        placa = placa.replaceAll("-", "");
        placa = placa.toUpperCase();
        if (placa.length() != 7){
            return "Placa deve possuir 7 caracteres";
        }
        if(!placa.matches("^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$")) {
            return "Placa não é válida";
        }

        renavam = renavam.trim();
        if (renavam.length() != 11 || !renavam.matches("[0-9]+")){
            return "Renavam deve conter 11 numeros";
        }
        else {
            // Remove o digito (11 posicao)
            // renavamSemDigito = 0063988496
            String renavamSemDigito = renavam.substring(0, 10);

            // Inverte os caracteres (reverso)
            // renavamReversoSemDigito = 69488936
            String renavamReversoSemDigito = new StringBuffer(renavamSemDigito).reverse().toString();

            int soma = 0;

            // Multiplica as strings reversas do renavam pelos numeros multiplicadores
            // para apenas os primeiros 8 digitos de um total de 10
            // Exemplo: renavam reverso sem digito = 69488936
            // 6, 9, 4, 8, 8, 9, 3, 6
            // * * * * * * * *
            // 2, 3, 4, 5, 6, 7, 8, 9 (numeros multiplicadores – sempre os mesmos [fixo])
            // 12 + 27 + 16 + 40 + 48 + 63 + 24 + 54
            // soma = 284
            for (int i = 0; i < 8; i++) {
                Integer algarismo = Integer.parseInt(renavamReversoSemDigito.substring(i, i + 1));
                Integer multiplicador = i + 2;
                soma += algarismo * multiplicador;
            }

            // Multiplica os dois ultimos digitos e soma
            soma += Character.getNumericValue(renavamReversoSemDigito.charAt(8)) * 2;
            soma += Character.getNumericValue(renavamReversoSemDigito.charAt(9)) * 3;

            // mod11 = 284 % 11 = 9 (resto da divisao por 11)
            int mod11 = soma % 11;

            // Faz-se a conta 11 (valor fixo) – mod11 = 11 – 9 = 2
            int ultimoDigitoCalculado = 11 - mod11;

            // ultimoDigito = Caso o valor calculado anteriormente seja 10 ou 11, transformo ele em 0
            // caso contrario, eh o proprio numero
            ultimoDigitoCalculado = (ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado);

            // Pego o ultimo digito do renavam original (para confrontar com o calculado)
            int digitoRealInformado = Integer.valueOf(renavam.substring(renavam.length() - 1, renavam.length()));

            // Comparo os digitos calculado e informado
            if (ultimoDigitoCalculado != digitoRealInformado) {
                return "Renavam não é válido";
            }
        }

        int ano = 0;
        try {
            ano = Integer.valueOf(str_ano);
        } catch (Exception e) {
            return "Erro: Ano deve ser um numero integral";
        }

        double capacidade = 0.0;
        try {
            if (str_capacidade.length() > 0)
            capacidade = Double.valueOf(str_capacidade);
        } catch (Exception e) {
            return "Erro: Capacidade deve ser um numero";
        }

    	Veiculo veiculo = Veiculo.findById(id);
    	if (null == veiculo) {
    		return "Veiculo não existe";
    	}
    	
    	Veiculo veiculo_placa = Veiculo.find("placa", placa).firstResult();
    	if (null != veiculo_placa && veiculo_placa != veiculo) {
    		return "Placa já existe";
    	}
    	Veiculo veiculo_renavam = Veiculo.find("renavam", renavam).firstResult();
    	if (null != veiculo_renavam && veiculo_renavam != veiculo) {
    		return "Renavam já existe";
    	}

    	Motorista motorista = Motorista.findById(motorista_id);
    	veiculo.motorista = motorista;
    	veiculo.placa = placa;
    	veiculo.marca = marca;
    	veiculo.modelo = modelo;
    	veiculo.ano = ano;
    	veiculo.renavam = renavam;
    	veiculo.tipo = tipo;
    	veiculo.capacidade = capacidade;
    	return "Editado";
    }
    

    @Transactional
    @DELETE
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    public String delete(@PathParam("id") Long id) {
    	Veiculo veiculo = Veiculo.findById(id);
    	if (null == veiculo) {
    		return "Usuário não existe";
    	}
    	veiculo.removeReceitas();
    	veiculo.removeDespesas();
    	veiculo.delete();
    	return "Deletado";
    }
}

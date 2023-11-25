package br.com.transdolinski.api.recurso;


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
import br.com.transdolinski.api.entidade.Cliente;
import br.com.transdolinski.api.entidade.Motorista;
import br.com.transdolinski.api.entidade.Veiculo;
import br.com.transdolinski.api.entidade.Cliente;

@Path("/api/clientes")
public class ClienteRecurso {

    @GET
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Cliente> get() {
    	List<Cliente> clientes = Cliente.listAll();
    	return clientes;
    }
    
    @GET
    @Path("/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Produces(MediaType.APPLICATION_JSON)
    public Cliente get(@PathParam("id") Long id) {
    	Cliente cliente = Cliente.findById(id);
        return cliente;
    }
    
    @Transactional
    @POST
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String add(
    		@FormParam("cnpj") String cnpj, 
    		@FormParam("nome") String nome, 
    		@FormParam("telefone") String telefone, 
    		@FormParam("endereco") String endereco,
    		@FormParam("cidade") String cidade,
    		@FormParam("estado") String estado,
    		@FormParam("email") String email) {
    	if (cnpj == null ||
    		nome == null || 
    		telefone == null || 
    		email == null ||
    		cnpj.equals("") ||
    		nome.equals("") || 
    		telefone.equals("") || 
    		email.equals("")
    	) return "Preencha todos os campos requeridos";

        cnpj = cnpj.trim(); 
        cnpj = cnpj.replaceAll("\\\\", "");
        nome = nome.trim(); 
        nome = nome.replaceAll("\\\\", "");
        telefone = telefone.trim(); 
        telefone = telefone.replaceAll("\\\\", "");
        endereco = endereco.trim(); 
        endereco = endereco.replaceAll("\\\\", "");
        cidade = cidade.trim(); 
        cidade = cidade.replaceAll("\\\\", "");
        estado = estado.trim(); 
        estado = estado.replaceAll("\\\\", "");
        email = email.trim(); 
        email = email.replaceAll("\\\\", "");
    	
        cnpj = cnpj.trim();
        cnpj = cnpj.replaceAll("\\/", "");
        cnpj = cnpj.replaceAll("\\.", "");
        cnpj = cnpj.replaceAll("-", "");
        if (cnpj.length() != 14 || !cnpj.matches("[0-9]+")){
            return "CNPJ deve conter 14 numeros";
        }
        else {
            // Validação CNPJ
            if (cnpj.equals("00000000000000") || cnpj.equals("11111111111111")
                || cnpj.equals("22222222222222") || cnpj.equals("33333333333333")
                || cnpj.equals("44444444444444") || cnpj.equals("55555555555555")
                || cnpj.equals("66666666666666") || cnpj.equals("77777777777777")
                || cnpj.equals("88888888888888") || cnpj.equals("99999999999999") || (cnpj.length() != 14))
              return "CNPJ não é válido";
            char dig13, dig14;
            int sm, i, r, num, peso; // "try" - protege o código para eventuais
                                     // erros de conversao de tipo (int)
            try {
              // Calculo do 1o. Digito Verificador
              sm = 0;
              peso = 2;
              for (i = 11; i >= 0; i--) {
                // converte o i-ésimo caractere do CNPJ em um número: // por
                // exemplo, transforma o caractere '0' no inteiro 0 // (48 eh a
                // posição de '0' na tabela ASCII)
                num = (int) (cnpj.charAt(i) - 48);
                sm = sm + (num * peso);
                peso = peso + 1;
                if (peso == 10)
                  peso = 2;
              }

              r = sm % 11;
              if ((r == 0) || (r == 1))
                dig13 = '0';
              else
                dig13 = (char) ((11 - r) + 48);

              // Calculo do 2o. Digito Verificador
              sm = 0;
              peso = 2;
              for (i = 12; i >= 0; i--) {
                num = (int) (cnpj.charAt(i) - 48);
                sm = sm + (num * peso);
                peso = peso + 1;
                if (peso == 10)
                  peso = 2;
              }
              r = sm % 11;
              if ((r == 0) || (r == 1))
                dig14 = '0';
              else
                dig14 = (char) ((11 - r) + 48);
              // Verifica se os dígitos calculados conferem com os dígitos
              // informados.
              if ((dig13 == cnpj.charAt(12)) && (dig14 == cnpj.charAt(13)))
                cnpj = cnpj.substring(0, 2) + "." + cnpj.substring(2, 5) + "." + cnpj.substring(5, 8) + "/" + cnpj.substring(8, 12) + "-" + cnpj.substring(12);
              else
                return "CNPJ não é válido";
            } catch (Exception e) {
              return "CNPJ erro de validação";
            }
        }

        telefone = telefone.trim();
        telefone = telefone.replaceAll("\\(", "");
        telefone = telefone.replaceAll("\\)", "");
        telefone = telefone.replaceAll(" ", "");
        telefone = telefone.replaceAll("-", "");
        if (!(telefone.length() == 11 || telefone.length() == 10) || !telefone.matches("[0-9]+")){
            return ("Telefone deve conter 10 à 11 numeros" + telefone);
        }
        else {
            if (telefone.length() == 10){
                telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 6) + "-" + telefone.substring(6);
            }
            else if (telefone.length() == 11){
                telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 7) + "-" + telefone.substring(7);
            }
        }

        email = email.trim();
        email = email.toLowerCase();
        if(!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
            return "Formato de email invalido";
        }

    	if (!Cliente.list("cnpj", cnpj).isEmpty()) {
    		return "CNPJ já cadastrado";
    	}

    	Cliente.add(cnpj, nome, telefone, endereco, cidade, estado, email);
    	return "Cadastrado";
    }
    
    @Transactional
    @PUT
    @Path("/{id}")
    @RolesAllowed({"Admin", "Operador"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String add(
    		@PathParam("id") Long id,
    		@FormParam("cnpj") String cnpj, 
    		@FormParam("nome") String nome, 
    		@FormParam("telefone") String telefone, 
    		@FormParam("endereco") String endereco,
    		@FormParam("cidade") String cidade,
    		@FormParam("estado") String estado,
    		@FormParam("email") String email) {
    	if (cnpj == null ||
    		nome == null || 
    		telefone == null || 
    		email == null ||
    		cnpj.equals("") ||
    		nome.equals("") || 
    		telefone.equals("") || 
    		email.equals("")
    	) return "Preencha todos os campos requeridos";
    	
        cnpj = cnpj.trim(); 
        cnpj = cnpj.replaceAll("\\\\", "");
        nome = nome.trim(); 
        nome = nome.replaceAll("\\\\", "");
        telefone = telefone.trim(); 
        telefone = telefone.replaceAll("\\\\", "");
        endereco = endereco.trim(); 
        endereco = endereco.replaceAll("\\\\", "");
        cidade = cidade.trim(); 
        cidade = cidade.replaceAll("\\\\", "");
        estado = estado.trim(); 
        estado = estado.replaceAll("\\\\", "");
        email = email.trim(); 
        email = email.replaceAll("\\\\", "");

        cnpj = cnpj.trim();
        cnpj = cnpj.replaceAll("\\/", "");
        cnpj = cnpj.replaceAll("\\.", "");
        cnpj = cnpj.replaceAll("-", "");
        if (cnpj.length() != 14 || !cnpj.matches("[0-9]+")){
            return "CNPJ deve conter 14 numeros";
        }
        else {
            // Validação CNPJ
            if (cnpj.equals("00000000000000") || cnpj.equals("11111111111111")
                || cnpj.equals("22222222222222") || cnpj.equals("33333333333333")
                || cnpj.equals("44444444444444") || cnpj.equals("55555555555555")
                || cnpj.equals("66666666666666") || cnpj.equals("77777777777777")
                || cnpj.equals("88888888888888") || cnpj.equals("99999999999999") || (cnpj.length() != 14))
              return "CNPJ não é válido";
            char dig13, dig14;
            int sm, i, r, num, peso; // "try" - protege o código para eventuais
                                     // erros de conversao de tipo (int)
            try {
              // Calculo do 1o. Digito Verificador
              sm = 0;
              peso = 2;
              for (i = 11; i >= 0; i--) {
                // converte o i-ésimo caractere do CNPJ em um número: // por
                // exemplo, transforma o caractere '0' no inteiro 0 // (48 eh a
                // posição de '0' na tabela ASCII)
                num = (int) (cnpj.charAt(i) - 48);
                sm = sm + (num * peso);
                peso = peso + 1;
                if (peso == 10)
                  peso = 2;
              }

              r = sm % 11;
              if ((r == 0) || (r == 1))
                dig13 = '0';
              else
                dig13 = (char) ((11 - r) + 48);

              // Calculo do 2o. Digito Verificador
              sm = 0;
              peso = 2;
              for (i = 12; i >= 0; i--) {
                num = (int) (cnpj.charAt(i) - 48);
                sm = sm + (num * peso);
                peso = peso + 1;
                if (peso == 10)
                  peso = 2;
              }
              r = sm % 11;
              if ((r == 0) || (r == 1))
                dig14 = '0';
              else
                dig14 = (char) ((11 - r) + 48);
              // Verifica se os dígitos calculados conferem com os dígitos
              // informados.
              if ((dig13 == cnpj.charAt(12)) && (dig14 == cnpj.charAt(13)))
                cnpj = cnpj.substring(0, 2) + "." + cnpj.substring(2, 5) + "." + cnpj.substring(5, 8) + "/" + cnpj.substring(8, 12) + "-" + cnpj.substring(12);
              else
                return "CNPJ não é válido";
            } catch (Exception e) {
              return "CNPJ erro de validação";
            }
        }

        telefone = telefone.trim();
        telefone = telefone.replaceAll("\\(", "");
        telefone = telefone.replaceAll("\\)", "");
        telefone = telefone.replaceAll(" ", "");
        telefone = telefone.replaceAll("-", "");
        if (!(telefone.length() == 11 || telefone.length() == 10) || !telefone.matches("[0-9]+")){
            return ("Telefone deve conter 10 à 11 numeros" + telefone);
        }
        else {
            if (telefone.length() == 10){
                telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 6) + "-" + telefone.substring(6);
            }
            else if (telefone.length() == 11){
                telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 7) + "-" + telefone.substring(7);
            }
        }

        email = email.toLowerCase();
        if(!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
            return "Formato de email invalido";
        }

    	Cliente cliente = Cliente.findById(id);
    	if (null == cliente) {
    		return "Cliente não existe";
    	}
    	
    	Cliente cliente_cnpj = Cliente.find("cnpj", cnpj).firstResult();
    	if (cliente_cnpj != null && cliente_cnpj != cliente) {
    		return "CNPJ já existe";
    	}
    	
    	cliente.cnpj = cnpj;
        cliente.nome = nome;
        cliente.telefone = telefone;
        cliente.endereco = endereco;
        cliente.cidade = cidade;
        cliente.estado = estado;
        cliente.email = email;
    	return "Editado";
    }
    
    @Transactional
    @DELETE
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    public String delete(@PathParam("id") Long id) {
    	Cliente cliente = Cliente.findById(id);
    	if (cliente == null) {
    		return "Cliente não existe";
    	}
    	cliente.removeDespesas();
    	cliente.removeReceitas();
    	cliente.delete();
    	return "Deletado";
    }
}

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
import br.com.transdolinski.api.entidade.Motorista;
import br.com.transdolinski.api.entidade.Usuario;

@Path("/api/usuarios")
public class UsuarioRecurso {

    @GET
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Usuario> get() {
    	List<Usuario> usuarios = Usuario.listAll();
    	return usuarios;
    }
    
    @GET
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Usuario get(@PathParam("id") Long id) {
    	Usuario usuario = Usuario.findById(id);
    	if (null == usuario) {
    		return null;
    	}
        return usuario;
    }
    
    @Transactional
    @POST
    @RolesAllowed({"Admin"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String add(
    		@FormParam("username") String username, 
    		@FormParam("password") String password, 
    		@FormParam("role") String role, 
    		@FormParam("name") String name,  
    		@FormParam("email") String email) {
    	if (username == null ||
    		password == null || 
    		role == null || 
    		name == null || 
    		email == null ||
    		username.equals("") ||
    		password.equals("") || 
    		role.equals("") || 
    		name.equals("") || 
    		email.equals("")
    	) return "Preencha todos os campos requeridos";

        username = username.trim();
        username = username.replaceAll("\\\\", "");
        role = role.trim();
        role = role.replaceAll("\\\\", "");
        name  = name .trim();
        name  = name .replaceAll("\\\\", "");
        email = email.trim();
        email = email.replaceAll("\\\\", "");

        if (username.equals("") ||
            role.equals("") || 
            name.equals("") || 
            email.equals("")
        ) return "Erro: Caracteres especiais não permitidos";

        username = username.trim();
        if (username.length() < 5){
            return "Usuário deve possuir no minimo 5 caracteres";
        }
        if(!username.matches("[A-Za-z0-9]+")) {
            return "Nome de usuario deve conter apenas letras e numeros";
        }

        password = password.trim();
        if (password.length() < 5){
            return "Senha deve possuir no minimo 5 caracteres";
        }

        email = email.trim();
        email = email.toLowerCase();
        if(!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
            return "Formato de email invalido";
        }

    	if (!Usuario.list("nome_usuario", username).isEmpty()) {
    		return "Usuário já existe";
    	}
    	if (!Usuario.list("email", email).isEmpty()) {
    		return "Email já existe";
    	}
    	try {
    		Usuario.add(username, password, role, name, email);
		} catch (Exception e) {
			return "Erro: " + e;
		}
    	
    	return "Cadastrado";
    }
    
    @Transactional
    @PUT
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String update(
    		@PathParam("id") Long id,
    		@FormParam("role") String role, 
    		@FormParam("name") String name,  
    		@FormParam("email") String email) {
    	if (role == null || 
        	name == null || 
        	email == null ||
        	role.equals("") || 
        	name.equals("") || 
        	email.equals("")
        	) return "Preencha todos os campos requeridos";

        role = role.trim();
        role = role.replaceAll("\\\\", "");
        name  = name .trim();
        name  = name .replaceAll("\\\\", "");
        email = email.trim();
        email = email.replaceAll("\\\\", "");

        if (role.equals("") || 
            name.equals("") || 
            email.equals("")
        ) return "Erro: Caracteres especiais não permitidos";

        email = email.trim();
        email = email.toLowerCase();
        if(!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$")) {
            return "Formato de email invalido";
        }

    	Usuario usuario = Usuario.findById(id);
    	if (null == usuario) {
    		return "Usuário não existe";
    	}
    	
    	List<Usuario> usuarios2 = Usuario.list("email", email);
    	if (!usuarios2.isEmpty()) {
    		Usuario usuario2 = usuarios2.get(0);
    		if (usuario != usuario2) {
    			return "Email já existe";
    		}
    	}
    	else {
    		usuario.email = email;
    	}
    	usuario.nivel_acesso = role;
		usuario.nome = name;
		return "Editado";
    }
    
    @Transactional
    @DELETE
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    public String delete(@PathParam("id") Long id) {
    	Usuario usuario = Usuario.findById(id);
    	if (null == usuario) {
    		return "Usuário não existe";
    	}
    	usuario.removeMotorista();
    	usuario.delete();
    	return "Deletado";
    }
}

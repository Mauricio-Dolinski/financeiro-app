package br.com.transdolinski.api.recurso;


import java.util.List;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;
import br.com.transdolinski.api.entidade.Usuario;

@Path("/api/login")
public class LoginRecurso {

    @POST
    @RolesAllowed({"Admin", "Operador", "Motorista"})
    @Produces(MediaType.APPLICATION_JSON)
    public String me(@Context SecurityContext securityContext) {
    	List<Usuario> users = Usuario.list("nome_usuario", securityContext.getUserPrincipal().getName());
    	return users.get(0).toString();
    }
}

package br.com.transdolinski.api.recurso;


import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import io.smallrye.common.annotation.Blocking;

import jakarta.transaction.Transactional;
import jakarta.inject.Inject;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import java.time.LocalDate;
import io.quarkus.elytron.security.common.BcryptUtil;
import br.com.transdolinski.api.entidade.Usuario;

@Path("/api/recuperar")
public class RecuperarRecurso {


    @GET
    public String test(){
        return "Server Configurado.";
    }

    @Inject Mailer mailer;    
    @Transactional                                          
    @PUT                                                                
    @Blocking
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)                                                           
    public String sendEmail(@FormParam("email") String email,
                            @FormParam("codigo") String codigo,
                            @FormParam("senha") String senha) {
        

        if (email != null && email.length() == 0){
            return "Preencha o email";
        }

        Usuario usuario = Usuario.find("email", email).firstResult();
        if (null == usuario) {
            return "Email não cadastrado.";
        }

        LocalDate dt = LocalDate.now();

        if (codigo == null && senha == null){
            

            String hash = BcryptUtil.bcryptHash("" + usuario.nome_usuario + dt);
            String pass = hash.substring(hash.length() - 6).toUpperCase();
            usuario.senha_recuperacao = pass;
            usuario.data_recuperacao = dt;

            mailer.send(
                    Mail.withText(email,                     
                        "TransDolinski - Recuperação de senha",
                        "Recuperação de senha requerido em " + dt + 
                        " para o usuario: " + usuario.nome_usuario +
                        "\n\n" +
                        "Código: " + usuario.senha_recuperacao +
                        "\n\n" +
                        "Caso não tenha requerido a recuperação de senha ignorar este email"
                    )
            );

            return "Email de recuperação enviado";
        }
        else {
            if (codigo.length() == 0){
                return "Codigo não pode estar vazio";
            }
            senha = senha.trim();
            if (senha.length() < 5){
                return "Senha deve possuir no minimo 5 caracteres";
            }
        }

        if (codigo.length() > 0 && senha.length() > 0 ){
            if (!codigo.equals(usuario.senha_recuperacao)){
                return "Codigo de recuperação errado.";
            }

            if (!dt.isEqual(usuario.data_recuperacao)){
                return "Data do codigo muito antiga, peça novo codigo.";
            }

            usuario.setSenha(senha);

            return "Senha modificada com sucesso";
        }

        return "";
    }
}

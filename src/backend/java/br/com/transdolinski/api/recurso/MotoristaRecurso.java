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
import io.quarkus.hibernate.orm.panache.PanacheQuery;

@Path("/api/motoristas")
public class MotoristaRecurso {

    @GET
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public List<Motorista> get() {
    	List<Motorista> motoristas = Motorista.listAll();
    	return motoristas;
    }
    
    @GET
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public Motorista get(@PathParam("id") Long id) {
    	Motorista motorista = Motorista.findById(id);
    	if (null == motorista) {
    		return null;
    	}
        return motorista;
    }
    
    @GET
    @Path("/options")
    @RolesAllowed({"Admin"})
    @Produces(MediaType.APPLICATION_JSON)
    public String getOptions() {
    	List<Usuario> usuarios = Usuario.listAll();
    	List<Usuario> removeList = new ArrayList<Usuario>();
    	for (Usuario usuario : usuarios) {
    		boolean isMotorista = usuario.nivel_acesso.equals("Motorista");
			if (usuario.motorista != null || !isMotorista) {
				removeList.add(usuario);
			}
		}
    	usuarios.removeAll(removeList);
    	String str = "{";
    	String key = "\n\t\"key\": [ ";
    	String name = "\n\t\"name\": [ ";
    	String value = "\n\t\"value\": [ ";
    	for (int i = 0; i < usuarios.size(); i++ ) {
    		Usuario usuario = usuarios.get(i);
			key += i + ",";
			name += "\"" + usuario.nome  +  " - " + usuario.nome_usuario + "\",";
			value += "\"" + usuario.id + "\",";
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
    	Motorista motorista = Motorista.findById(id);
    	if (null == motorista) {
    		return null;
    	}
		List<Usuario> usuarios = Usuario.listAll();
		List<Usuario> removeList = new ArrayList<Usuario>();
    	for (Usuario usuario : usuarios) {
    		boolean isMotorista = usuario.nivel_acesso.equals("Motorista");
			if (null != usuario.motorista || !isMotorista) {
				removeList.add(usuario);
			}
		}
    	usuarios.removeAll(removeList);
    	if (null != motorista.usuario) {
    		usuarios.add(0, motorista.usuario);
    	}
    	String str = "{";
    	String key = "\n\t\"key\": [ ";
    	String name = "\n\t\"name\": [ ";
    	String value = "\n\t\"value\": [ ";
    	for (int i = 0; i < usuarios.size(); i++ ) {
    		Usuario usuario = usuarios.get(i);
			key += i + ",";
			name += "\"" + usuario.nome  +  " - " + usuario.nome_usuario + "\",";
			value += "\"" + usuario.id + "\",";
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
    		@FormParam("usuario_id") String usuario_id, 
    		@FormParam("cpf") String cpf, 
    		@FormParam("cnh") String cnh, 
    		@FormParam("telefone") String telefone) {
    	if (usuario_id == null ||
    		cpf == null || 
    		cnh == null || 
    		telefone == null ||
    		usuario_id.equals("") ||
    		cpf.equals("") || 
    		cnh.equals("") || 
    		telefone.equals("")
    	) return "Preencha todos os campos requeridos";

        cpf = cpf.trim();
        cpf = cpf.replaceAll("\\\\", "");
        cnh = cnh.trim();
        cnh = cnh.replaceAll("\\\\", "");
        telefone = telefone.trim();
        telefone = telefone.replaceAll("\\\\", "");

        if (cpf.equals("") || 
            cnh.equals("") || 
            telefone.equals("")
        ) return "Erro: Caracteres especiais não permitidos";

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

        cpf = cpf.trim();
        cpf = cpf.replaceAll("\\.", "");
        cpf = cpf.replaceAll("-", "");
        if (cpf.length() != 11 || !cpf.matches("[0-9]+")){
            return "CPF deve conter 11 numeros";
        }
        else {

            // Validação do CPF
            int d1, d2;
            int digito1, digito2, resto;
            int digitoCPF;
            String nDigResult;

            d1 = d2 = 0;
            digito1 = digito2 = resto = 0;

            for (int nCount = 1; nCount < cpf.length() - 1; nCount++) {
              digitoCPF = Integer.valueOf(cpf.substring(nCount - 1, nCount)).intValue();

              // multiplique a ultima casa por 2 a seguinte por 3 a seguinte por 4
              // e assim por diante.
              d1 = d1 + (11 - nCount) * digitoCPF;

              // para o segundo digito repita o procedimento incluindo o primeiro
              // digito calculado no passo anterior.
              d2 = d2 + (12 - nCount) * digitoCPF;
            };

            // Primeiro resto da divisão por 11.
            resto = (d1 % 11);

            // Se o resultado for 0 ou 1 o digito é 0 caso contrário o digito é 11
            // menos o resultado anterior.
            if (resto < 2)
              digito1 = 0;
            else
              digito1 = 11 - resto;

            d2 += 2 * digito1;

            // Segundo resto da divisão por 11.
            resto = (d2 % 11);

            // Se o resultado for 0 ou 1 o digito é 0 caso contrário o digito é 11
            // menos o resultado anterior.
            if (resto < 2)
              digito2 = 0;
            else
              digito2 = 11 - resto;

            // Digito verificador do CPF que está sendo validado.
            String nDigVerific = cpf.substring(cpf.length() - 2, cpf.length());

            // Concatenando o primeiro resto com o segundo.
            nDigResult = String.valueOf(digito1) + String.valueOf(digito2);

            // comparar o digito verificador do cpf com o primeiro resto + o segundo
            // resto.
            if (nDigVerific.equals(nDigResult)){
                cpf = cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9);
            }
            else{
                return "CPF não é válido";
            }
        }

        cnh = cnh.trim();
        if (cnh.length() != 11 || !cnh.matches("[0-9]+")){
            return "CNH deve conter 11 numeros";
        }
        else {
            long v = 0, j = 9;

            for (int i = 0; i < 9; ++i, --j) {
                v += ((cnh.charAt(i) - 48) * j);
            }

            long dsc = 0, vl1 = v % 11;

            if (vl1 >= 10) {
                vl1 = 0;
                dsc = 2;
            }

            v = 0;
            j = 1;

            for (int i = 0; i < 9; ++i, ++j) {
                v += ((cnh.charAt(i) - 48) * j);
            }

            long x = v % 11;
            long vl2 = (x >= 10) ? 0 : x - dsc;

            if (!(String.valueOf(vl1) + String.valueOf(vl2)).equals(cnh.substring(cnh.length() - 2))){
                return "CNH não é válida";
            }
        }

    	if (!Motorista.list("cpf", cpf).isEmpty()) {
    		return "CPF já cadastrado";
    	}
    	if (!Motorista.list("cnh", cnh).isEmpty()) {
    		return "CNH já cadastrado";
    	}
    	if (!Motorista.list("telefone", telefone).isEmpty()) {
    		return "Telefone já cadastrado";
    	}
    	Usuario usuario = Usuario.findById(usuario_id);
    	if (null == usuario) {
    		return "Usuário não existe";
    	}
    	if (null != usuario.motorista) {
    		return "Usuário já possui motorista";
    	}
    	Motorista.add(usuario, cpf, cnh, telefone);
    	return "Cadastrado";
    }
    
    @Transactional
    @PUT
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String update(
    		@PathParam("id") Long id,
    		@FormParam("usuario_id") String usuario_id, 
    		@FormParam("cpf") String cpf, 
    		@FormParam("cnh") String cnh, 
    		@FormParam("telefone") String telefone) {
    	if (usuario_id == null ||
    		cpf == null || 
    		cnh == null || 
    		telefone == null ||
    		usuario_id.equals("") ||
    		cpf.equals("") || 
    		cnh.equals("") || 
    		telefone.equals("")
    	) return "Preencha todos os campos requeridos";
    	
        cpf = cpf.trim();
        cpf = cpf.replaceAll("\\\\", "");
        cnh = cnh.trim();
        cnh = cnh.replaceAll("\\\\", "");
        telefone = telefone.trim();
        telefone = telefone.replaceAll("\\\\", "");

        if (cpf.equals("") || 
            cnh.equals("") || 
            telefone.equals("")
        ) return "Erro: Caracteres especiais não permitidos";

        telefone = telefone.trim();
        telefone = telefone.replaceAll("\\(", "");
        telefone = telefone.replaceAll("\\)", "");
        telefone = telefone.replaceAll(" ", "");
        telefone = telefone.replaceAll("-", "");
        if (!(telefone.length() == 11 || telefone.length() == 10) || !telefone.matches("[0-9]+")){
            return "Telefone deve conter 10 à 11 numeros" + telefone;
        }
        else {
            if (telefone.length() == 10){
                telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 6) + "-" + telefone.substring(6);
            }
            else if (telefone.length() == 11){
                telefone = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 7) + "-" + telefone.substring(7);
            }
        }

        cpf = cpf.trim();
        cpf = cpf.replaceAll("\\.", "");
        cpf = cpf.replaceAll("-", "");
        if (cpf.length() != 11 || !cpf.matches("[0-9]+")){
            return "CPF deve conter 11 numeros";
        }
        else {

            // Validação do CPF
            int d1, d2;
            int digito1, digito2, resto;
            int digitoCPF;
            String nDigResult;

            d1 = d2 = 0;
            digito1 = digito2 = resto = 0;

            for (int nCount = 1; nCount < cpf.length() - 1; nCount++) {
              digitoCPF = Integer.valueOf(cpf.substring(nCount - 1, nCount)).intValue();

              // multiplique a ultima casa por 2 a seguinte por 3 a seguinte por 4
              // e assim por diante.
              d1 = d1 + (11 - nCount) * digitoCPF;

              // para o segundo digito repita o procedimento incluindo o primeiro
              // digito calculado no passo anterior.
              d2 = d2 + (12 - nCount) * digitoCPF;
            };

            // Primeiro resto da divisão por 11.
            resto = (d1 % 11);

            // Se o resultado for 0 ou 1 o digito é 0 caso contrário o digito é 11
            // menos o resultado anterior.
            if (resto < 2)
              digito1 = 0;
            else
              digito1 = 11 - resto;

            d2 += 2 * digito1;

            // Segundo resto da divisão por 11.
            resto = (d2 % 11);

            // Se o resultado for 0 ou 1 o digito é 0 caso contrário o digito é 11
            // menos o resultado anterior.
            if (resto < 2)
              digito2 = 0;
            else
              digito2 = 11 - resto;

            // Digito verificador do CPF que está sendo validado.
            String nDigVerific = cpf.substring(cpf.length() - 2, cpf.length());

            // Concatenando o primeiro resto com o segundo.
            nDigResult = String.valueOf(digito1) + String.valueOf(digito2);

            // comparar o digito verificador do cpf com o primeiro resto + o segundo
            // resto.
            if (nDigVerific.equals(nDigResult)){
                cpf = cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9);
            }
            else{
                return "CPF não é válido.";
            }
        }

        cnh = cnh.trim();
        if (cnh.length() != 11 || !cnh.matches("[0-9]+")){
            return "CNH deve conter 11 numeros";
        }
        else {
            long v = 0, j = 9;

            for (int i = 0; i < 9; ++i, --j) {
                v += ((cnh.charAt(i) - 48) * j);
            }

            long dsc = 0, vl1 = v % 11;

            if (vl1 >= 10) {
                vl1 = 0;
                dsc = 2;
            }

            v = 0;
            j = 1;

            for (int i = 0; i < 9; ++i, ++j) {
                v += ((cnh.charAt(i) - 48) * j);
            }

            long x = v % 11;
            long vl2 = (x >= 10) ? 0 : x - dsc;

            if (!(String.valueOf(vl1) + String.valueOf(vl2)).equals(cnh.substring(cnh.length() - 2))){
                return "CNH não é válida";
            }
        }

    	Motorista motorista = Motorista.findById(id);
    	if (null == motorista) {
    		return "Motorista não existe";
    	}
    	
    	Usuario usuario = Usuario.findById(usuario_id);
    	if (null != usuario) {
    		if(null != usuario.motorista && usuario.motorista != motorista)
    		{
    			return "Usuário já possui motorista";
    		}
    	}
    	else {
    		return "Usuario não existe";
    	}
    	
    	Motorista motorista_cpf = Motorista.find("cpf", cpf).firstResult();
    	if (null != motorista_cpf && motorista_cpf != motorista) {
    		return "CPF já existe";
    	}
    	Motorista motorista_cnh = Motorista.find("cnh", cnh).firstResult();
    	if (null != motorista_cnh && motorista_cnh != motorista) {
    		return "CNH já existe";
    	}
    	Motorista motorista_telefone = Motorista.find("telefone", telefone).firstResult();
    	if (null != motorista_telefone && motorista_telefone != motorista) {
    		return "Telefone já existe";
    	}
    	
    	motorista.usuario = usuario;
    	motorista.cnh = cnh;
    	motorista.cpf = cpf;
    	motorista.telefone = telefone;

    	return "Editado";
    }
    
    @Transactional
    @DELETE
    @Path("/{id}")
    @RolesAllowed({"Admin"})
    public String delete(@PathParam("id") Long id) {
    	Motorista motorista = Motorista.findById(id);
    	if (null == motorista) {
    		return "Motorista não existe";
    	}
    	motorista.removeVeiculos();
        motorista.removeDespesas();
    	motorista.delete();
    	return "Deletado";
    }
}

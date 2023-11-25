package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import java.time.LocalDate;

@Entity
@Table
@UserDefinition
public class Usuario extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@Column(nullable = false, unique = true, updatable = false)
    @Username
    public String nome_usuario;
	
	@Column(nullable = false)
    @Password
    private String senha;
	
	@Column(nullable = false)
    @Roles
    public String nivel_acesso;
    
	@Column(nullable = false)
    public String nome;
    
	@Column(nullable = false, unique = true)
    public String email;

    @Column
    public String senha_recuperacao;

    @Column
    public LocalDate data_recuperacao;
	
	@OneToOne (fetch = FetchType.LAZY, mappedBy = "usuario")
	public Motorista motorista;
    
	
	public void addMotorista(Motorista motorista) {
        this.motorista = motorista;
    }
 
    public void removeMotorista() {
        if (this.motorista != null) {
        	this.motorista.setUsuario(null);
        	this.motorista = null;
        }
    }
    
    public static Usuario add(String nome_usuario, String senha, String nivel_acesso, String nome, String email) {
        Usuario usuario = new Usuario();
        usuario.nome_usuario = nome_usuario;
        usuario.senha = BcryptUtil.bcryptHash(senha);
        usuario.nivel_acesso = nivel_acesso;
        usuario.nome = nome;
        usuario.email = email;
        usuario.senha_recuperacao = null;
        usuario.data_recuperacao = null;
        usuario.motorista = null;
        usuario.persist();
        return usuario;
    }
    
    public void setSenha(String senha) {
    	this.senha = BcryptUtil.bcryptHash(senha);
    }
    
	@Override    
    public String toString() {    
        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"username\": \"" + nome_usuario + "\",\n\t"
        		+ "\"role\": \"" + nivel_acesso + "\",\n\t"
        		+ "\"name\": \"" + nome + "\",\n\t"
        		+ "\"email\": \"" + email + "\"\n"
        	    + "}\n");    
    }  
}

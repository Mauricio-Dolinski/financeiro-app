package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.ArrayList;
import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class Motorista extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@OneToOne
	@JoinColumn (unique = true)
	public Usuario usuario;
	
	@OneToMany (fetch = FetchType.LAZY, mappedBy = "motorista")
	public List<Veiculo> veiculos = new ArrayList<Veiculo>();

	@OneToMany (fetch = FetchType.LAZY, mappedBy = "motorista")
	public List<Despesa> despesas = new ArrayList<Despesa>();
	
	@Column(nullable = false, unique = true)
    public String cpf;
	
	@Column(nullable = false, unique = true)
    public String cnh;
	
	@Column(nullable = false, unique = true)
    public String telefone;
	
	public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
	
	public void addVeiculo(Veiculo veiculo) {
		veiculos.add(veiculo);
    }
 
    public void removeVeiculos() {
    	for (Veiculo veiculo : this.veiculos) {
    		veiculo.setMotorista(null);
		}
    	veiculos.clear();
    }

    public void addDespesa(Despesa despesa) {
		despesas.add(despesa);
    }
 
    public void removeDespesas() {
    	for (Despesa despesa : this.despesas) {
    		despesa.setMotorista(null);
		}
    	despesas.clear();
    }
	
    public static Motorista add(Usuario usuario, String cpf, String cnh, String telefone) {
        Motorista motorista = new Motorista();
        motorista.usuario = usuario;
        motorista.cpf = cpf;
        motorista.cnh = cnh;
        motorista.telefone = telefone;
        if (motorista.usuario != null) {
        	motorista.usuario.addMotorista(motorista);
        }
        
        motorista.persist();
        return motorista;
    }
    
	@Override    
    public String toString() {    
		String usuario_nome = "Não Consta";
		String usuario_email = "Não Consta";
		Long usuario_id = null;
		if (null != usuario) {
			usuario_nome = usuario.nome;
			usuario_email = usuario.email;
			usuario_id = usuario.id;
		}
		
        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"usuario_id\": \"" + usuario_id + "\",\n\t"
        		+ "\"nome\": \"" + usuario_nome + "\",\n\t"
        		+ "\"cpf\": \"" + cpf + "\",\n\t"
        		+ "\"cnh\": \"" + cnh + "\",\n\t"
        		+ "\"telefone\": \"" + telefone + "\",\n\t"
        		+ "\"email\": \"" + usuario_email + "\"\n"
        	    + "}\n");    
    } 
}

package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.ArrayList;
import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class Cliente extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@OneToMany (fetch = FetchType.LAZY, mappedBy = "cliente")
	public List<Despesa> despesas = new ArrayList<Despesa>();
	
	@OneToMany (fetch = FetchType.LAZY, mappedBy = "cliente")
	public List<Receita> receitas = new ArrayList<Receita>();

	@Column(nullable = false, unique = true)
    public String cnpj;
	
	@Column(nullable = false)
    public String nome;
    
	@Column(nullable = false)
    public String telefone;
	
	@Column
    public String endereco;
	
	@Column
    public String cidade;
	
	@Column
    public String estado;
	
	@Column(nullable = false)
    public String email;
	
	public void addDespesa(Despesa despesa) {
		despesas.add(despesa);
    }
 
    public void removeDespesas() {
    	for (Despesa despesa : this.despesas) {
    		despesa.setCliente(null);
		}
    	despesas.clear();
    }
    
    public void addReceita(Receita receita) {
    	receitas.add(receita);
    }
 
    public void removeReceitas() {
    	for (Receita receita : this.receitas) {
    		receita.setCliente(null);
		}
    	receitas.clear();
    }
	
    public static Cliente add( String cnpj, String nome,  String telefone, String endereco, String cidade, String estado, String email) {
        Cliente cliente = new Cliente();
        cliente.cnpj = cnpj;
        cliente.nome = nome;
        cliente.telefone = telefone;
        cliente.endereco = endereco;
        cliente.cidade = cidade;
        cliente.estado = estado;
        cliente.email = email;
        cliente.persist();
        return cliente;
    }
    

    @Override    
    public String toString() {    
        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"cnpj\": \"" + cnpj + "\",\n\t"
        		+ "\"nome\": \"" + nome + "\",\n\t"
        		+ "\"endereco\": \"" + endereco + "\",\n\t"
        		+ "\"cidade\": \"" + cidade + "\",\n\t"
        		+ "\"estado\": \"" + estado + "\",\n\t"
        		+ "\"telefone\": \"" + telefone + "\",\n\t"
        		+ "\"email\": \"" + email + "\"\n"
        	    + "}\n");    
    } 
}

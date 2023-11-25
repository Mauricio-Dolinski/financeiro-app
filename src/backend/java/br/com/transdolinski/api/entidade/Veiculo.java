package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.util.ArrayList;
import java.util.List;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class Veiculo extends PanacheEntityBase {
	
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Motorista motorista;
	
	@OneToMany (fetch = FetchType.LAZY, mappedBy = "veiculo")
	public List<Despesa> despesas = new ArrayList<Despesa>();
	
	@OneToMany (fetch = FetchType.LAZY, mappedBy = "veiculo")
	public List<Receita> receitas = new ArrayList<Receita>();
	
	@Column(nullable = false, unique = true)
    public String placa;
	
	@Column(nullable = false)
    public String marca;
	
	@Column(nullable = false)
    public String modelo;
	
	@Column(nullable = false)
    public int ano;
	
	@Column(nullable = false, unique = true)
    public String renavam;
	
	@Column(nullable = false)
    public String tipo;
	
	@Column
    public double capacidade;
	
	public void setMotorista(Motorista motorista) {
        this.motorista = motorista;
    }
	
	public void addDespesa(Despesa despesa) {
		despesas.add(despesa);
    }
 
    public void removeDespesas() {
    	for (Despesa despesa : this.despesas) {
    		despesa.setVeiculo(null);
		}
    	despesas.clear();
    }

    public void addReceita(Receita receita) {
		receitas.add(receita);
    }
 
    public void removeReceitas() {
    	for (Receita receita : this.receitas) {
    		receita.setVeiculo(null);
		}
    	receitas.clear();
    }

    public static Veiculo add(Motorista motorista, String placa, String marca, String modelo, int ano, String renavam, String tipo, double capacidade) {
        Veiculo veiculo = new Veiculo();
        veiculo.motorista = motorista;
        veiculo.placa = placa;
        veiculo.marca = marca;
        veiculo.modelo = modelo;
        veiculo.ano = ano;
        veiculo.renavam = renavam;
        veiculo.tipo = tipo;
        veiculo.capacidade = capacidade;
        if (veiculo.motorista != null) {
        	veiculo.motorista.addVeiculo(veiculo);
        }
        
        veiculo.persist();
        return veiculo;
    }
    

	@Override    
    public String toString() {
		String usuario_nome = "";
		Long motorista_id = null;
		if (motorista != null) {
			if (motorista.usuario != null) {
				usuario_nome = motorista.usuario.nome;
			}
			motorista_id = motorista.id;
		}
        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"motorista_id\": \"" + motorista_id + "\",\n\t"
        		+ "\"nome\": \"" + usuario_nome + "\",\n\t"
        		+ "\"placa\": \"" + placa + "\",\n\t"
        		+ "\"marca\": \"" + marca + "\",\n\t"
        		+ "\"ano\": \"" + ano + "\",\n\t"
        		+ "\"modelo\": \"" + modelo + "\",\n\t"
        		+ "\"renavam\": \"" + renavam + "\",\n\t"
        		+ "\"capacidade\": \"" + capacidade + "\",\n\t"
        		+ "\"tipo\": \"" + tipo + "\"\n"
        	    + "}\n");    
    } 
}

package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;

import java.text.NumberFormat;
import java.sql.Date;
import java.util.Locale;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class Frete extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@OneToOne (cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "frete")
	public Receita receita;
	
	@Column(nullable = false, unique = true)
    public String cte;
    
	@Column(nullable = false)
    public String origem;
    
	@Column(nullable = false)
    public String destino;
	
	@Column(nullable = false)
    public LocalDate data;
	
	public void addReceita(Receita receita) {
        this.receita = receita;
    }
	
	public static Frete add(String cte, String origem,  String destino, LocalDate data) {
        Frete frete = new Frete();
        frete.cte = cte;
        frete.origem = origem;
        frete.destino = destino;
        frete.data = data;
        frete.persist();
        return frete;
    }

	@Override    
    public String toString() {
		String nome_motorista = "Não Consta";
		String nome_cliente = "Não Consta";
		String placa_veiculo = "Não Consta";
		Long cliente_id = null;
		Long veiculo_id = null;
		String descricao = "";
		double valor_total = 0;
		if (null != receita){
			if (null != receita.veiculo) {
				veiculo_id = receita.veiculo.id;
				placa_veiculo = receita.veiculo.placa;
				if (null != receita.veiculo.motorista && null != receita.veiculo.motorista.usuario) {
					nome_motorista = receita.veiculo.motorista.usuario.nome;
				}
			}
			if (null != receita.cliente) {
				nome_cliente = receita.cliente.nome;
				cliente_id = receita.cliente.id;
			}
		}
		

		if (receita != null) {
			descricao = receita.descricao;
			valor_total = receita.valor_total;
		}

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"cte\": \"" + cte + "\",\n\t"
        		+ "\"data\": \"" + data.format(formatter) + "\",\n\t"
        		+ "\"placa\": \"" + placa_veiculo + "\",\n\t"
        		+ "\"origem\": \"" + origem + "\",\n\t"
        		+ "\"destino\": \"" + destino + "\",\n\t"
        		+ "\"cliente_id\": \"" + cliente_id + "\",\n\t"
        		+ "\"receita.veiculo_id\": \"" + veiculo_id + "\",\n\t"
        		+ "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
        		+ "\"descricao\": \"" + descricao + "\",\n\t"
        		+ "\"nome_cliente\": \"" + nome_cliente + "\",\n\t"
        		+ "\"nome_motorista\": \"" + nome_motorista + "\"\n"
        	    + "}\n");    
    }
}

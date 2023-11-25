package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class Receita extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@OneToMany (cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "receita")
	public List<RegistroRecebimento> registrosRecebimento = new ArrayList<RegistroRecebimento>();
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(unique = true)
	public Frete frete;

	@ManyToOne(fetch = FetchType.LAZY)
	public Cliente cliente;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Veiculo veiculo;

	@Column(nullable = false)
    public double valor_total;
	
	@Column(nullable = false)
    public int parcelas;
    
	@Column(nullable = false)
    public String tipo;
    
	@Column
    public String descricao;
	
	@Column(nullable = false)
    public LocalDate data_registro;
    
	public void addRegistroRecebimento(RegistroRecebimento registroRecebimento) {
		registrosRecebimento.add(registroRecebimento);
    }
	
	public void setFrete(Frete frete) {
        this.frete = frete;
    }
	
	public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

	public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

    public static Receita add(Frete frete, Cliente cliente, Veiculo veiculo, double valor_total, int parcelas, String tipo,  String descricao, LocalDate data_registro) {
        Receita receita = new Receita();
        receita.frete = frete;
        receita.cliente = cliente;
        receita.veiculo = veiculo;
        receita.valor_total = valor_total;
        receita.parcelas = parcelas;
        receita.tipo = tipo;
        receita.descricao = descricao;
        receita.data_registro = data_registro;
        if (null != receita.frete) {
        	receita.frete.addReceita(receita);
        }
        if (receita.cliente != null) {
        	receita.cliente.addReceita(receita);
		}
        if (receita.veiculo != null) {
			receita.veiculo.addReceita(receita);
		}
        receita.persist();
        return receita;
    }
    

	@Override    
    public String toString() {
		double valor_recebido = 0;
		String status = "À receber";
		String veiculo_placa = "";
		String usuario_nome = "";
		String cliente_nome = "";
		LocalDate data_vencimento = LocalDate.now();
		String relacao = "";
		String cnpj = "";
		String cpf = "";

		for (RegistroRecebimento registroRecebimento : registrosRecebimento) {
			if (registroRecebimento.recebido != null) {
				valor_recebido += registroRecebimento.valor;
			}
		}
		if (valor_recebido >= this.valor_total) {
			status = "Recebido";
		}
		else if (valor_recebido > 0) {
			status = "À receber - parcial";
		}

		if (null != veiculo){
			relacao = "Veiculo: " + veiculo.placa + " ";
			veiculo_placa = veiculo.placa;
			if (null != veiculo.motorista){
				cpf = veiculo.motorista.cpf;
				if (null != veiculo.motorista.usuario) {
					usuario_nome = veiculo.motorista.usuario.nome;
				}
			}
		}

		if (null != cliente) {
			relacao += "Cliente: " + cliente.nome;
			cliente_nome = cliente.nome;
			cnpj = cliente.cnpj;
		}

		if (null != registrosRecebimento){
			RegistroRecebimento registroRecebimento = registrosRecebimento.get(0);
			data_vencimento = registroRecebimento.data_recebimento;
		}
		
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"data_registro\": \"" + data_registro.format(formatter) + "\",\n\t"
        		+ "\"data_vencimento\": \"" + data_vencimento.format(formatter) + "\",\n\t"
        		+ "\"tipo\": \"" + tipo + "\",\n\t"
        		+ "\"placa\": \"" + veiculo_placa + "\",\n\t"
        		+ "\"parcelas\": \"" + parcelas + "\",\n\t"
        		+ "\"usuario_nome\": \"" + usuario_nome + "\",\n\t"
        		+ "\"cpf\": \"" + cpf + "\",\n\t"
        		+ "\"cliente_nome\": \"" + cliente_nome + "\",\n\t"
        		+ "\"cnpj\": \"" + cnpj + "\",\n\t"
        		+ "\"relacao\": \"" + relacao + "\",\n\t"
        		+ "\"descricao\": \"" + descricao + "\",\n\t"
        		+ "\"valor_total\": \"" + nf.format(valor_total) + "\",\n\t"
        		+ "\"valor_recebido\": \"" + nf.format(valor_recebido) + "\",\n\t"
        		+ "\"status\": \"" + status + "\"\n"
        	    + "}\n");    
    }
}

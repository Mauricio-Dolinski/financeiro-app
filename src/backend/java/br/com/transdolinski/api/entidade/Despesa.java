package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

import java.text.NumberFormat;
import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class Despesa extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@OneToMany (cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "despesa")
	public List<RegistroPagamento> registrosPagamento = new ArrayList<RegistroPagamento>();
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Cliente cliente;

	@ManyToOne(fetch = FetchType.LAZY)
	public Motorista motorista;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Veiculo veiculo;

	@Column(nullable = false)
    public double valor_total;
    
	@Column(nullable = false)
    public int parcelas;
    
	//TODO: adicionar script de verificar despesa recorrente
	@Column(nullable = false)
    public Boolean recorrente;
	
	@Column(nullable = false)
    public String tipo;
	
	@Column
    public String descricao;
	
	@Column(nullable = false)
    public LocalDate data_registro;
    
	public void addRegistroPagamento(RegistroPagamento registroPagamento) {
		registrosPagamento.add(registroPagamento);
    }
	
	public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public void setMotorista(Motorista motorista) {
        this.motorista = motorista;
    }
	
	public void setVeiculo(Veiculo veiculo) {
        this.veiculo = veiculo;
    }

    public static Despesa add(Cliente cliente, Motorista motorista, Veiculo veiculo, double valor_total, int parcelas,  Boolean recorrente, String tipo, String descricao, LocalDate data_registro) {
        Despesa despesa = new Despesa();
        despesa.cliente = cliente;
        despesa.motorista = motorista;
        despesa.veiculo = veiculo;
        despesa.valor_total = valor_total;
        despesa.parcelas = parcelas;
        despesa.recorrente = recorrente;
        despesa.tipo = tipo;
        despesa.descricao = descricao;
        despesa.data_registro = data_registro;
        if (despesa.cliente != null) {
        	despesa.cliente.addDespesa(despesa);
		}
		if (despesa.motorista != null) {
        	despesa.motorista.addDespesa(despesa);
		}
        if (despesa.veiculo != null) {
			despesa.veiculo.addDespesa(despesa);
		}
        despesa.persist();
        return despesa;
    }

    @Override    
    public String toString() {
		double valor_pago = 0;
		String status = "À pagar";
		String recorrente_text = "Não";
		String veiculo_placa = "";
		String usuario_nome = "";
		String cliente_nome = "";
		LocalDate data_vencimento = LocalDate.now();
		String relacao = "";
		String cnpj = "";
		String cpf = "";
		
		for (RegistroPagamento registroPagamento : registrosPagamento) {
			if (registroPagamento.pago != null) {
				valor_pago += registroPagamento.valor;
			}
		}
		if (valor_pago >= this.valor_total) {
			status = "Pago";
		}
		else if (valor_pago > 0) {
			status = "À pagar - parcial";
		}
		
		if (recorrente) {
			recorrente_text = "Sim";
			status = "Recorrente";
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

		if (null != motorista) {
			if (null != motorista.usuario) {
				usuario_nome = motorista.usuario.nome;
				relacao += "Motorista: " + motorista.usuario.nome;
			}
			cpf = motorista.cpf;
		}

		if (null != cliente) {
			relacao += "Cliente: " + cliente.nome;
			cliente_nome = cliente.nome;
			cnpj = cliente.cnpj;
		}

		if (null != registrosPagamento){
			RegistroPagamento registroPagamento = registrosPagamento.get(0);
			data_vencimento = registroPagamento.data_pagamento;
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
        		+ "\"valor_pago\": \"" + nf.format(valor_pago) + "\",\n\t"
        		+ "\"recorrente\": \"" + recorrente_text + "\",\n\t"
        		+ "\"status\": \"" + status + "\"\n"
        	    + "}\n");    
    }
}

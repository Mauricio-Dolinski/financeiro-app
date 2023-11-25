package br.com.transdolinski.api.entidade;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

@Entity
@Table
public class RegistroRecebimento extends PanacheEntityBase {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false, unique = true, updatable = false)
	public long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	public Receita receita;

	@Column(nullable = false)
    public double valor;
	
	@Column(nullable = false)
	public int parcela;
    
	@Column(nullable = false)
    public LocalDate data_recebimento;
    
	@Column(nullable = false)
    public String tipo_de_pagamento;
	
	@Column
    public String descricao;
	
	@Column
    public LocalDate recebido;

    public static void add(Receita receita, double valor, int parcela, LocalDate data_recebimento,  String tipo_de_pagamento, String descricao, LocalDate recebido) {
        RegistroRecebimento registroRecebimento = new RegistroRecebimento();
        registroRecebimento.receita = receita;
        registroRecebimento.valor = valor;
        registroRecebimento.parcela = parcela;
        registroRecebimento.data_recebimento = data_recebimento;
        registroRecebimento.tipo_de_pagamento = tipo_de_pagamento;
        registroRecebimento.descricao = descricao;
        registroRecebimento.recebido = recebido;
        if (registroRecebimento.receita != null) {
        	registroRecebimento.receita.addRegistroRecebimento(registroRecebimento);
        }
        registroRecebimento.persist();
    }
    
	@Override    
    public String toString() {
		
		String status = "À receber";
		String cliente_nome = "";
		String cliente_telefone = "";
		String cliente_email = "";

        LocalDate today = LocalDate.now();

        Long atraso = ChronoUnit.DAYS.between(data_recebimento, today);

        if (null != receita.cliente){
        	cliente_nome = receita.cliente.nome;
        	cliente_telefone = receita.cliente.telefone;
        	cliente_email = receita.cliente.email;
        }

        if (recebido != null) {
			status = "Recebido";
		}
		else if (atraso == 0){
			status += " hoje";
		}
		else if (atraso > 0){
			status += " - em atraso";
		}

        String str_atraso = atraso + " dias";
        if (atraso == 1) {
        	str_atraso = atraso + " dia";
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        NumberFormat nf = NumberFormat.getCurrencyInstance(new Locale("pt", "BR"));

        return ("{\n\t"
        		+ "\"id\": " + id + ",\n\t"
        		+ "\"receita_id\": \"" + receita.id + "\",\n\t"
        		+ "\"data_registro\": \"" + receita.data_registro.format(formatter) + "\",\n\t"
        		+ "\"data_recebimento\": \"" + data_recebimento.format(formatter) + "\",\n\t"
        		+ "\"cliente_nome\": \"" + cliente_nome + "\",\n\t"
        		+ "\"cliente_telefone\": \"" + cliente_telefone + "\",\n\t"
        		+ "\"cliente_email\": \"" + cliente_email + "\",\n\t"
        		+ "\"valor\": \"" + nf.format(valor) + "\",\n\t"
        		+ "\"parcela\": \"" + parcela + " de " + this.receita.parcelas + "\",\n\t"
        		+ "\"tipo_receita\": \"" + receita.tipo + "\",\n\t"
        		+ "\"tipo_pagamento\": \"" + tipo_de_pagamento + "\",\n\t"
        		+ "\"descricao\": \"" + descricao + "\",\n\t"
        		+ "\"atraso\": \"" + str_atraso + "\",\n\t"
        		+ "\"status\": \"" + status + "\"\n"
        	    + "}\n");    
    }
}

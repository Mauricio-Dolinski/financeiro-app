package br.com.transdolinski.api;

import jakarta.enterprise.event.Observes;
import jakarta.inject.Singleton;
import jakarta.transaction.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import br.com.transdolinski.api.entidade.Cliente;
import br.com.transdolinski.api.entidade.Despesa;
import br.com.transdolinski.api.entidade.Frete;
import br.com.transdolinski.api.entidade.Motorista;
import br.com.transdolinski.api.entidade.Receita;
import br.com.transdolinski.api.entidade.RegistroPagamento;
import br.com.transdolinski.api.entidade.RegistroRecebimento;
import br.com.transdolinski.api.entidade.Usuario;
import br.com.transdolinski.api.entidade.Veiculo;
import io.quarkus.runtime.StartupEvent;

@Singleton
public class Startup {
    @Transactional
    public void load(@Observes StartupEvent evt) {
        // resetar e adicionar os dados de teste no db
        
        /*
    	Usuario.deleteAll();
    	Motorista.deleteAll();
    	Veiculo.deleteAll();
    	RegistroPagamento.deleteAll();
    	RegistroRecebimento.deleteAll();
    	Despesa.deleteAll();
    	Receita.deleteAll();
    	Frete.deleteAll();
    	
    	Usuario.add("admin", "admin", "Admin", "Mauricio Dolinski", "mauriciompd@gmail.com");
        Usuario.add("operador", "operador", "Operador", "Davi Costa Oliveira", "operador@transdolinski.com.br");
        Usuario usuario3 = Usuario.add("motorista", "motorista", "Motorista", "Luiz Carlos Pereira", "mot.teste1@transdolinski.com");
        Usuario usuario4 = Usuario.add("motorista2", "motorista2", "Motorista", "João da Silva", "mot.teste2@transdolinski.com");
        
        Motorista motorista1 = Motorista.add(usuario3, "229.412.857-12", "73648291827", "(41) 99826-7113");
        Motorista motorista2 = Motorista.add(usuario4, "065.371.127-96", "19283746578", "(41) 99922-6312");
    	
        Veiculo veiculo1 = Veiculo.add(motorista1, "DBB-8272", "VW", "Constellation", 2015, "823872636672", "Carreta L", 14.00);
        Veiculo veiculo2 = Veiculo.add(motorista2, "ATD-0151", "Volvo", "FH 440", 2012, "95385728109", "Carreta LS", 21.00);

        Cliente cliente1 = Cliente.add("13.711.582/0001-66", "TransDolinski", "(41) 3232-3232", "Rua Manoel Eufrasio, 634", "Curitiba", "PR", "contato@transdolinski.com.br");
        Cliente cliente2 = Cliente.add("01.937.440/0012-95", "Transpanorama Transportes S/A", "(64) 2135-2121", "Rua Manoel Eufrasio, 634", "Curitiba", "PR", "contato@traspanorama.com.br");
        Cliente cliente3 = Cliente.add("24.168.115/0001-58", "Latas Industria de Embalagens e Aluminio do Brasil LTDA", "(75) 3457-7443", "Rua Celdo, 231", "Curitiba", "PR", "contato@latasbrasil.com.br");
        Cliente cliente4 = Cliente.add("02.547.420/0011-67", "Transportes Braga SA", "(75) 2512-1353", "Rua Celdo, 131", "Curitiba", "PR", "contato@transportesbraga.com.br");

        LocalDate today = LocalDate.now();
        */
        /*
    	
    	LocalDate dt = LocalDate.now();
    	Receita receita = Receita.add(null, null, null, 100, 2, "Entrada", "Receita teste", dt);
    	RegistroRecebimento.add(receita, 50, 1, dt, "Dinheiro", "Recebimento teste", null);
    	RegistroRecebimento.add(receita, 50, 2, dt, "Dinheiro", "Recebimento teste", null);
    	
    	Receita receita2 = Receita.add(null, null, null, 100, 1, "Entrada", "Receita teste2", dt);
    	RegistroRecebimento.add(receita2, 100, 1, dt, "Dinheiro", "Recebimento teste2", null);
    	
    	Despesa despesa = Despesa.add(null, null, null, 100, 1, false, "Reparo", "Reparo teste", dt);
    	RegistroPagamento.add(despesa, 100, 1, dt, "Pix", "", dt);
    	
    	Despesa despesa2 = Despesa.add(null, null, null, 5000, 1, false, "Salário", "Motorista", dt);
    	RegistroPagamento.add(despesa2, 5000, 1, dt, "Pix", "", dt);
    	
    	Frete frete = Frete.add("13243212312", "Curitiba - PR", "Brasilia - DF", dt);
    	Receita receita_frete = Receita.add(frete, cliente, veiculo, 8000, 2, "Frete", "", dt);
    	RegistroRecebimento.add(receita_frete, 2000, 1, dt, "Pix", "Adiantamento", null);
    	RegistroRecebimento.add(receita_frete, 6000, 2, dt, "Transferência", "Frete", null);
    	
    	
    	Frete frete2 = Frete.add("15243313321", "Rio de Janeiro - PR", "Curitiba - PR", dt);
    	Receita receita_frete2 = Receita.add(frete2, cliente2, veiculo2, 9000, 2, "Frete", "", dt);
    	RegistroRecebimento.add(receita_frete2, 3000, 1, dt, "Pix", "Adiantamento", null);
    	RegistroRecebimento.add(receita_frete2, 6000, 2, dt, "Transferência", "Frete", null);
    	
    	*/

    	
    	//receita.delete();
    }
}

import React, {useState } from "react";
import { Title } from "../components/Title";
import Box from "@mui/material/Box";
import { GerarButton } from "../components/GerarButton";
import { MySelect } from "../components/MySelect";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import 'dayjs/locale/pt-br';
import Typography from "@mui/material/Typography";
import Backdrop from '@mui/material/Backdrop';
import { FluxoDeCaixa } from "../components/FluxoDeCaixa";
import {Table} from "../components/Table";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const RelatoriosPage = () => {

  const colunas_inadimplencia = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Data de Validade',
        accessor: 'data_recebimento',
      },
      {
        Header: 'Atraso',
        accessor: 'atraso'
      },
      {
        Header: 'Tipo da Receita',
        accessor: 'tipo_receita',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Valor',
        accessor: 'valor'
      }
  ];

  const colunas_receita_veiculo = [
      {
        Header: 'ID Receita',
        accessor: 'id'
      },
      {
        Header: 'Data do 1º Vencimento',
        accessor: 'data_vencimento',
      },
      {
        Header: 'Placa',
        accessor: 'placa',
      },
      {
        Header: 'Motorista',
        accessor: 'nome'
      },
      {
        Header: 'Tipo de Receita',
        accessor: 'tipo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Parcelas',
        accessor: 'parcelas',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      },
      {
        Header: 'Valor Pago',
        accessor: 'valor_pago',
      },
  ];

  const colunas_despesa_veiculo = [
      {
        Header: 'ID Despesa',
        accessor: 'id'
      },
      {
        Header: 'Data do 1º Vencimento',
        accessor: 'data_vencimento',
      },
      {
        Header: 'Placa',
        accessor: 'placa',
      },
      {
        Header: 'Motorista',
        accessor: 'nome'
      },
      {
        Header: 'Tipo de Despesa',
        accessor: 'tipo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Parcelas',
        accessor: 'parcelas',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      },
      {
        Header: 'Valor Pago',
        accessor: 'valor_pago',
      },
  ];

  const colunas_receita_cliente = [
      {
        Header: 'ID Receita',
        accessor: 'id'
      },
      {
        Header: 'Data do 1º Vencimento',
        accessor: 'data_vencimento',
      },
      {
        Header: 'CNPJ',
        accessor: 'cnpj',
      },
      {
        Header: 'Nome',
        accessor: 'nome'
      },
      {
        Header: 'Tipo de Receita',
        accessor: 'tipo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Parcelas',
        accessor: 'parcelas',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      },
      {
        Header: 'Valor Pago',
        accessor: 'valor_pago',
      },
  ];

  const colunas_despesa_cliente = [
      {
        Header: 'ID Despesa',
        accessor: 'id'
      },
      {
        Header: 'Data do 1º Vencimento',
        accessor: 'data_vencimento',
      },
      {
        Header: 'CNPJ',
        accessor: 'cnpj',
      },
      {
        Header: 'Nome',
        accessor: 'nome'
      },
      {
        Header: 'Tipo de Despesa',
        accessor: 'tipo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Parcelas',
        accessor: 'parcelas',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      },
      {
        Header: 'Valor Pago',
        accessor: 'valor_pago',
      },
  ];

  const colunas_receita_todos = [
      {
        Header: 'ID Receita',
        accessor: 'id'
      },
      {
        Header: 'Data do 1º Vencimento',
        accessor: 'data_vencimento',
      },
      {
        Header: 'Relação',
        accessor: 'relacao',
      },
      {
        Header: 'Tipo de Receita',
        accessor: 'tipo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Parcelas',
        accessor: 'parcelas',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      },
      {
        Header: 'Valor Pago',
        accessor: 'valor_pago',
      },
  ];

  const colunas_despesa_todos = [
      {
        Header: 'ID Despesa',
        accessor: 'id'
      },
      {
        Header: 'Data do 1º Vencimento',
        accessor: 'data_vencimento',
      },
      {
        Header: 'Relação',
        accessor: 'relacao',
      },
      {
        Header: 'Tipo de Despesa',
        accessor: 'tipo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Parcelas',
        accessor: 'parcelas',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      },
      {
        Header: 'Valor Pago',
        accessor: 'valor_pago',
      },
  ];

  const options_tipo = 
  {
      "key": [
        0,
        1,
        2,
        3,
        4
      ],
      "name": [
        "",
        "Fluxo de Caixa",
        "Receita",
        "Despesa",
        "Inadimplência"
      ],
      "value": [
        "",
        "Fluxo de Caixa",
        "Receita",
        "Despesa",
        "Inadimplência"
      ]
  };

  const options_frequencia = 
  {
      "key": [
        0,
        1,
        2
      ],
      "name": [
        "Diário",
        "Semanal",
        "Mensal"
      ],
      "value": [
        "Diário",
        "Semanal",
        "Mensal"
      ]
  };

  const options_relacionado = 
  {
      "key": [
        0,
        1,
        2,
        3,
        4
      ],
      "name": [
        "",
        "Veiculo",
        "Motorista",
        "Cliente",
        "Todos"
      ],
      "value": [
        "",
        "Veiculo",
        "Motorista",
        "Cliente",
        "Todos"
      ]
  };


  const options_projecoes = 
  {
      "key": [
        0,
        1,
      ],
      "name": [
        "Sim",
        "Não"
      ],
      "value": [
        "Sim",
        "Não"
      ]
  };

  const [optionsCliente, setOptionsCliente] = useState({
    "key": [],
    "name": [],
    "value": []
  });

  const [optionsVeiculo, setOptionsVeiculo] = useState({
    "key": [],
    "name": [],
    "value": []
  });

  const entityName = "fretes";
  const url = 'http://localhost:8080/api/'+entityName;

  const { user } = useAuth();

  const [gerar, setGerar] = useState(false);
  const [titleText, setTitleText] = useState('Relatórios');
  const [isFluxoDeCaixa, setIsFluxoDeCaixa] = useState(false);
  const [isInadimplencia, setIsInadimplencia] = useState(false);
  
  const [isReceita, setIsReceita] = useState(false);
  const [isReceitaTodos, setIsReceitaTodos] = useState(false);
  const [receitaVeiculoOpen, setReceitaVeiculoOpen] = useState(false);
  const [receitaClienteOpen, setReceitaClienteOpen] = useState(false);
  const [receitaTodosOpen, setReceitaTodosOpen] = useState(false);

  const [isDespesa, setIsDespesa] = useState(false);
  const [isDespesaTodos, setIsDespesaTodos] = useState(false);
  const [despesaVeiculoOpen, setDespesaVeiculoOpen] = useState(false);
  const [despesaClienteOpen, setDespesaClienteOpen] = useState(false);
  const [despesaTodosOpen, setDespesaTodosOpen] = useState(false);

  const [inadimplenciaOpen, setInadimplenciaOpen] = useState(false);
  const [paramsRelatorio, setparamsRelatorio] = useState('');
  const [open, setOpen] = useState(false);

  const [isLoadingOptionsCliente, setIsLoadingOptionsCliente] = useState(true);
  const [isLoadingOptionsVeiculo, setIsLoadingOptionsVeiculo] = useState(true);
  

  const getOptionsCliente = async () => {
    let url_options = url+"/options_cliente";
    await axios.get(url_options, {
      auth: {
        username: user.user,
          password: user.password
      }
    }).then(response => {
      const optionsData  = response.data;
          setOptionsCliente({ ...optionsCliente, ...optionsData});
          setIsLoadingOptionsCliente(false);
          setGerar(true);
        }).catch(error => { 
      toast.error("e: "+ error);
        });
  }

  const getOptionsVeiculo = async () => {
    let url_options = url+"/options_veiculo";
    await axios.get(url_options, {
      auth: {
        username: user.user,
          password: user.password
      }
    }).then(response => {
      const optionsData  = response.data;
          setOptionsVeiculo({ ...optionsVeiculo, ...optionsData});
          setIsLoadingOptionsVeiculo(false);
          setGerar(true);
        }).catch(error => { 
      toast.error("e: "+ error);
        });
  }

  const handleSubmit = async (event) => {
  
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams(data);
    setparamsRelatorio(params);

    if (data) {
      if (isFluxoDeCaixa){
        setOpen(true);
      }
      else if (isInadimplencia){
        setInadimplenciaOpen(true);
        setTitleText('Relatório de Inadimplência');
      }
      else if (isDespesa){
        if (!isLoadingOptionsVeiculo){
          setDespesaVeiculoOpen(true);
        }
        if (!isLoadingOptionsCliente){
          setDespesaClienteOpen(true);
        }
        if (isDespesaTodos){
          setDespesaTodosOpen(true);
        }
        setTitleText('Relatório de Despesa');
      }
      else if (isReceita){
        if (!isLoadingOptionsVeiculo){
          setReceitaVeiculoOpen(true);
        }
        if (!isLoadingOptionsCliente){
          setReceitaClienteOpen(true);
        }
        if (isReceitaTodos){
          setReceitaTodosOpen(true);
        }
        setTitleText('Relatório de Receita');
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const funcOnChangeTipo = (event) => {
    const value = event.target.value;
    if (value === ""){
      setGerar(false);
    }
    else {
      setGerar(true);
    }
    if (value === "Fluxo de Caixa"){
      setIsFluxoDeCaixa(true);
    }
    else {
      setIsFluxoDeCaixa(false);
    }
    if (value === "Receita"){
      setIsLoadingOptionsCliente(true);
      setIsLoadingOptionsVeiculo(true);
      setIsReceita(true);
      setGerar(false);
    }
    else {
      setIsReceita(false);
    }
    if (value === "Despesa"){
      setIsLoadingOptionsCliente(true);
      setIsLoadingOptionsVeiculo(true);
      setIsDespesa(true);
      setGerar(false);
    }
    else {
      setIsDespesa(false);
    }
    if (value === "Inadimplência"){
      setIsInadimplencia(true);
    }
    else {
      setIsInadimplencia(false);
    }
  };

  const funcOnChangeDespesa = (event) => {
    const value = event.target.value;

    setIsLoadingOptionsCliente(true);
    setIsLoadingOptionsVeiculo(true);
    setGerar(false);

    if (value === "Veiculo"){
      getOptionsVeiculo();
    }
    else {
      
    }
    if (value === "Motorista"){
      
    }
    else {
      
    }
    if (value === "Cliente"){
      getOptionsCliente();
    }
    else {

    }
    if (value === "Todos"){
      setIsDespesaTodos(true);
      setGerar(true);
    }
    else {
      setIsDespesaTodos(false);
    }
  };

  const funcOnChangeReceita = (event) => {
    const value = event.target.value;

    setIsLoadingOptionsCliente(true);
    setIsLoadingOptionsVeiculo(true);
    setGerar(false);

    if (value === "Veiculo"){
      getOptionsVeiculo();
    }
    else {
      
    }
    if (value === "Motorista"){
      
    }
    else {
      
    }
    if (value === "Cliente"){
      getOptionsCliente();
    }
    else {

    }
    if (value === "Todos"){
      setIsReceitaTodos(true);
      setGerar(true);
    }
    else {
      setIsReceitaTodos(false);
    }
  };

  //Período Inicial e Final: Solicite ao usuário que especifique o intervalo de tempo para o qual eles desejam gerar o relatório de fluxo de caixa. Isso permitirá que o sistema calcule o fluxo de caixa para o período desejado.
  //Frequência de Atualização: Pergunte ao usuário com que frequência eles desejam atualizar o relatório (diariamente, semanalmente, mensalmente etc.). Isso pode afetar a granularidade das informações apresentadas no relatório.
  //Previsões ou Projeções Futuras: Se o sistema for capaz de gerar previsões financeiras, pergunte se os usuários desejam incluir projeções futuras no relatório, com base em cenários e estimativas.

  return (
    <>
      <Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
        <Title name={titleText} />
      </Box>
      {!inadimplenciaOpen && !despesaVeiculoOpen && !despesaClienteOpen && !despesaTodosOpen && !receitaVeiculoOpen && !receitaClienteOpen && !receitaTodosOpen &&
      <Box component="form" onSubmit={handleSubmit} gap="25px" sx={{ display: "flex", flexDirection: "column", m: "0px", p: "0px", alignItems: "flex-start" }}>
        <Box sx={{ width: "1000px", display: "flex", flexDirection: "row"}}>
          <Box sx={{ width: "800px", minWidth: "500px", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
            <Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginRight: "25px" }}>
              Período
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker
                  label="Período Inicial"
                  format="DD/MM/YYYY"
                  defaultValue={dayjs().subtract(1, 'month')}
                  slotProps={{ textField: { name: 'data_inicial' } }}
              />
            </LocalizationProvider>
            <Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginX: "20px" }}>
              {' - '}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
              <DatePicker
                  label="Período Final"
                  format="DD/MM/YYYY"
                  defaultValue={dayjs()}
                  slotProps={{ textField: { name: 'data_final' } }}
              />
            </LocalizationProvider>
          </Box>
          <MySelect name="tipo" label="Tipo de Relatório" options={options_tipo} funcOnChange={funcOnChangeTipo}/>
          {isDespesa && <>
            <Box sx={{ width: "100%", minWidth: "500px", display: "flex", flexDirection: "row"}}>
              <MySelect name="relacionado" label="Relacionado com" options={options_relacionado} funcOnChange={funcOnChangeDespesa}/>
            </Box>
            </>
          }
          {isReceita && <>
            <Box sx={{ width: "100%", minWidth: "500px", display: "flex", flexDirection: "row"}}>
              <MySelect name="relacionado" label="Relacionado com" options={options_relacionado} funcOnChange={funcOnChangeReceita}/>
            </Box>
            </>
          }
        </Box>
        {isFluxoDeCaixa && <>
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
            <MySelect name="frequencia" label="Frequencia dos Dados" options={options_frequencia}/>
            <MySelect name="projecoes" label="Projeções Futuras?" options={options_projecoes}/>
          </Box>
          </>
        }
        {isDespesa && <>
          <Box sx={{ width: "500px", display: "flex", flexDirection: "row"}}>
            {!isLoadingOptionsCliente && <MySelect name="cliente_id" label="Cliente" getValue={optionsCliente.value[0]} options={optionsCliente}/>}
            {!isLoadingOptionsVeiculo && <MySelect name="veiculo_id" label="Veiculo" getValue={optionsVeiculo.value[0]} options={optionsVeiculo}/>}
          </Box>
          </>
        }
        {isReceita && <>
          <Box sx={{ width: "500px", display: "flex", flexDirection: "row"}}>
            {!isLoadingOptionsCliente && <MySelect name="cliente_id" label="Cliente" getValue={optionsCliente.value[0]} options={optionsCliente}/>}
            {!isLoadingOptionsVeiculo && <MySelect name="veiculo_id" label="Veiculo" getValue={optionsVeiculo.value[0]} options={optionsVeiculo}/>}
          </Box>
          </>
        }
        <Box sx={{display: "flex", flexDirection: "row"}}>
          {gerar && <GerarButton />}
        </Box>
      </Box>}
      {inadimplenciaOpen && <Table url="contas-a-receber/inadimplencia" colunas={colunas_inadimplencia} params={paramsRelatorio} size='8'/>}
      {receitaVeiculoOpen && <Table url="receita/veiculo" colunas={colunas_receita_veiculo} params={paramsRelatorio} size='8'/>}
      {receitaClienteOpen && <Table url="receita/cliente" colunas={colunas_receita_cliente} params={paramsRelatorio} size='8'/>}
      {receitaTodosOpen && <Table url="receita/todos" colunas={colunas_receita_todos} params={paramsRelatorio} size='8'/>}
      {despesaVeiculoOpen && <Table url="despesas/veiculo" colunas={colunas_despesa_veiculo} params={paramsRelatorio} size='8'/>}
      {despesaClienteOpen && <Table url="despesas/cliente" colunas={colunas_despesa_cliente} params={paramsRelatorio} size='8'/>}
      {despesaTodosOpen && <Table url="despesas/todos" colunas={colunas_despesa_todos} params={paramsRelatorio} size='8'/>}

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box sx={{ width: "80%", height: "80%", display: "flex", flexDirection: "row", marginBottom: "25px"}}>
          <FluxoDeCaixa />
        </Box>
      </Backdrop>
      
    </>



  )
};

export default RelatoriosPage
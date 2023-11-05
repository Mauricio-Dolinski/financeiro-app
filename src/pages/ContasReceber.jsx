import { Title } from "../components/Title";
import {Table} from "../components/Table";
import Box from "@mui/material/Box";

const ContasReceber = () => {
  const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'ID Receita',
        accessor: 'receita_id'
      },
      {
        Header: 'Data de Registro',
        accessor: 'data_registro',
      },
      {
        Header: 'Data de Validade',
        accessor: 'data_recebimento',
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
        Header: 'Tipo de Pagamento',
        accessor: 'tipo_pagamento',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Valor',
        accessor: 'valor'
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Contas a Receber" />
	    </Box>
		<Table url="contas-a-receber" colunas={colunas}/>
	  </>
	)
};

export default ContasReceber
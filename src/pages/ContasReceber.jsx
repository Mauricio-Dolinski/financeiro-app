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
        Header: 'Data de Registro',
        accessor: 'data_registro',
      },
      {
        Header: 'Data de Recebimento',
        accessor: 'data_recebimento',
      },
      {
        Header: 'Valor',
        accessor: 'valor'
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Tipo da Receita',
        accessor: 'tipo_receita',
      },
      {
        Header: 'Tipo de Pagamento',
        accessor: 'tipo_pagamento',
      },
      {
        Header: 'Status',
        accessor: 'status',
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Contas a Receber" />
	    </Box>
		<Table url="contas-a-receber" colunas={colunas} size='6'/>
	  </>
	)
};

export default ContasReceber
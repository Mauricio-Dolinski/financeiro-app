import { Title } from "../components/Title";
import {Table} from "../components/Table";
import Box from "@mui/material/Box";

const ContasPagar = () => {
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
        Header: 'Data de Validade',
        accessor: 'data_pagamento',
      },
      {
        Header: 'Valor',
        accessor: 'valor'
      },
      {
        Header: 'Tipo de Despesa',
        accessor: 'tipo_despesa',
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
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Contas a Pagar" />
	    </Box>
		<Table url="contas-a-pagar" colunas={colunas}/>
	  </>
	)
};

export default ContasPagar
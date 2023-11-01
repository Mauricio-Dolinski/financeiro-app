import { Title } from "../components/Title";
import {Table} from "../components/Table";
import { AddButton } from "../components/AddButton";
import Box from "@mui/material/Box";

const DespesasPage = () => {
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
        Header: 'Tipo',
        accessor: 'tipo',
      },
      {
        Header: 'Descrição',
        accessor: 'descricao',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      },
      {
        Header: 'Valor Pago',
        accessor: 'valor_pago',
      },
      {
        Header: 'Recorrente?',
        accessor: 'recorrente'
      },
      {
        Header: 'Status',
        accessor: 'status',
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Despesas" />
	    	<AddButton />
	    </Box>
		<Table url="despesas" colunas={colunas}/>
	  </>
	)
};

export default DespesasPage
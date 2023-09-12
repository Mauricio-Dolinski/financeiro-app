import { Title } from "../components/Title";
import {Table} from "../components/Table";
import { AddButton } from "../components/AddButton";
import Box from "@mui/material/Box";

const ReceitasPage = () => {
  const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Data',
        accessor: 'data_registro',
      },
      {
        Header: 'Tipo',
        accessor: 'tipo',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total'
      },
      {
        Header: 'Valor Recebido',
        accessor: 'valor_recebido',
      },
      {
        Header: 'Status',
        accessor: 'status',
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Receitas" />
	    	<AddButton />
	    </Box>
		<Table url="receitas" colunas={colunas} size='6'/>
	  </>
	)
};

export default ReceitasPage
import { Title } from "../components/Title";
import {Table} from "../components/Table";
import { AddButton } from "../components/AddButton";
import Box from "@mui/material/Box";

const FretesPage = () => {
  const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        accessor: 'data',
        Header: 'Data Inicio',
        //Cell: (testasdas => testasdas + "test"),
      },
      {
        Header: 'Cliente',
        accessor: 'nome_cliente',
        filter: 'text'
      },
      {
        Header: 'Motorista',
        accessor: 'nome_motorista',
      },
      {
        Header: 'Veiculo',
        accessor: 'placa',
      },
      {
        Header: 'Origem',
        accessor: 'origem'
      },
      {
        Header: 'Destino',
        accessor: 'destino',
      },
      {
        Header: 'Valor Total',
        accessor: 'valor_total',
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Fretes" />
	    	<AddButton />
	    </Box>
		<Table url="fretes" colunas={colunas}/>
	  </>
	)
};

export default FretesPage
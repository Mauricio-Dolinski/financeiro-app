import { Title } from "../components/Title";
import {Table} from "../components/Table";
import { AddButton } from "../components/AddButton";
import Box from "@mui/material/Box";

const VeiculosPage = () => {
  const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Placa',
        accessor: 'placa',
      },
      {
        Header: 'Marca',
        accessor: 'marca',
      },
      {
        Header: 'Modelo',
        accessor: 'modelo'
      },
      {
        Header: 'Tipo',
        accessor: 'tipo',
      },
      {
        Header: 'Motorista',
        accessor: 'nome',
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Veiculos" />
	    	<AddButton />
	    </Box>
		<Table url="veiculos" colunas={colunas}/>
	  </>
	)
};

export default VeiculosPage
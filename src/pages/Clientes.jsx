import { Title } from "../components/Title";
import {Table} from "../components/Table";
import { AddButton } from "../components/AddButton";
import Box from "@mui/material/Box";

const ClientesPage = () => {
  const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'CNPJ',
        accessor: 'cnpj',
      },
      {
        Header: 'Nome',
        accessor: 'nome',
      },
      {
        Header: 'Telefone',
        accessor: 'telefone',
      },
      {
        Header: 'Email',
        accessor: 'email'
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Clientes" />
	    	<AddButton />
	    </Box>
		<Table url="clientes" colunas={colunas}/>
	  </>
	)
};

export default ClientesPage
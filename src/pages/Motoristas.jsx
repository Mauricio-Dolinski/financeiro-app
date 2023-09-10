import { Title } from "../components/Title";
import {Table} from "../components/Table";
import Box from "@mui/material/Box";
import { AddButton } from "../components/AddButton";

const MotoristasPage = () => {
	
	const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Nome',
        accessor: 'nome',
      },
      {
        Header: 'Telefone',
        accessor: 'telefone'
      },
      {
        Header: 'Email',
        accessor: 'email',
      }
  ];
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Motoristas" />
	    	<AddButton />
	    </Box>
		<Table url="motoristas" colunas={colunas} size='6'/>
	  </>
	)
};

export default MotoristasPage
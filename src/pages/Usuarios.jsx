import { Title } from "../components/Title";
import {Table} from "../components/Table";
import Box from "@mui/material/Box";
import { AddButton } from "../components/AddButton";

const UsuariosPage = () => {
	
	const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'Nome',
        accessor: 'name',
      },
      {
        Header: 'Usuário',
        accessor: 'username',
      },
      {
        Header: 'Nivel de Acesso',
        accessor: 'role'
      },
      {
        Header: 'Email',
        accessor: 'email',
      }
  ];
  
  return (
	  <>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	<Title name="Usuários" />
	    	<AddButton />
	    </Box>
		<Table url="usuarios" colunas={colunas} size='6'/>
	  </>
  )
};

export default UsuariosPage
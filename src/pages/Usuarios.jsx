import { Title } from "../components/Title";
import {Table} from "../components/Table";
import { LuEdit} from "react-icons/lu";
import {BsFillTrashFill} from "react-icons/bs";

//TODO: arrumar bug size 6 com 10 rows produz 12 rows 2da pagina com 6,  ultima repetindo os 2 ultimos rows

const UsuariosPage = () => {
	
	const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
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
	    <Title name="Usuários" />
		<Table url="usuarios" colunas={colunas} size='6'/>
	  </>
  )
};

export default UsuariosPage
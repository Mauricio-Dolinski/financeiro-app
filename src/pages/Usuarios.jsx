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
        Header: 'Nome',
        accessor: 'name'
      },
      {
        Header: 'Usuário',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Editar',
        Cell: <div className='div_acoes'>
        		<LuEdit className="edit-btn" />
        	  </div>
      },
      {
        Header: 'Excluir',
        Cell: <div className='div_acoes'>
        		<BsFillTrashFill className="delete-btn" />
        	  </div>
      }
  ];
  
  return (
	  <>
	    <Title name="Usuários" />
		<Table url="users" colunastest={colunas} size='6'/>
	  </>
  )
};

export default UsuariosPage
import { Title } from "../components/Title";
import {Table} from "../components/Table";
import Box from "@mui/material/Box";
import { useLocalStorage } from "./../hooks/useLocalStorage";

const ContasPagar = () => {
  const colunas = [
      {
        Header: 'ID',
        accessor: 'id'
      },
      {
        Header: 'ID Despesa',
        accessor: 'despesa_id'
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
      },
      {
        Header: 'Valor',
        accessor: 'valor'
      }
  ];

  var isMotorista = false;

  const [userData] = useLocalStorage("user", null);

  if (userData){
    if (userData.role === "Motorista"){
      isMotorista = true;
    }
  }
  
  return (
	<>
	  	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
	    	{!isMotorista && <Title name="Contas a Pagar" />}
        {isMotorista && <Title name="Salário" />}
	    </Box>
		<Table url="contas-a-pagar" colunas={colunas}/>
	  </>
	)
};

export default ContasPagar
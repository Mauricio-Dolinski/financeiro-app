import React from 'react'
import { Container, Content } from './styles'
import logo from "../../images/logo/logo max.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FaBars } from 'react-icons/fa'

const Sidebar = ({ active }) => {

  const closeSidebar = () => {
    active(false)
  }
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const goto = (path) => {
    if (path) {
      navigate(path);
    }
  };
  
        
  const pages = [
	  { label: 'Dashboard', path: "/dashboard" },
	  { label: 'Usuários', path: "/usuarios" },
	  { label: 'Motoristas', path: "/motoristas" },
	  { label: 'Veículos', path: "/veiculos" },
	  { label: 'Fretes', path: "/fretes" },
	  { label: 'Clientes', path: "/clientes" },
	  { label: 'Receitas', path: "/receitas" },
	  { label: 'Contas a receber', path: "/contas-a-receber" },
	  { label: 'Despesas', path: "/despesas" },
	  { label: 'Contas a pagar', path: "/contas-a-pagar" },
	  { label: 'Relatórios', path: "/relatorios" }
	  ];

  return (
    <Container sidebar={active}>
      <FaBars onClick={closeSidebar} />  
      <img src={logo} alt="TransDolinski"/>
        <Box  sx={{ display: "grid" }}>
            {pages?.map((page) => (
			  <Content>
	              <Button  sx={{ color: "white",
	              width: 340,
	              height: "40px",
	              borderRadius: "50px",
	               '&:hover': {
			          color: 'primary.main',
			        }
	               }}
	                key={page.label}
	                onClick={() => goto(page.path)}
	              >
	                {page.label}
	              </Button>
	          </Content>
            ))}
            {!!user && (
              <Button
                key={"logout"}
                onClick={logout}
                sx={{ position: "fixed", bottom: 0, color: "white", width: "400px" }}
              >
                {"sair"}
              </Button>
            )}
          </Box>
    </Container>
  )
}

export default Sidebar
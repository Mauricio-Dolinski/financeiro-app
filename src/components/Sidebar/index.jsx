import React from 'react';
import { Container, Content } from './styles';
import logo from "../../images/logo/logo max.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useLocalStorage } from "./../../hooks/useLocalStorage";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Person from "@mui/icons-material/Person";
import Typography from '@mui/material/Typography';



const Sidebar = ({ active }) => {

  const [userData] = useLocalStorage("user", null);
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  
  const goto = (path) => {
    if (path) {
      navigate(path);
    }
  };
        
  var pages;
  
  if (userData){
	  if (userData.role === "Admin"){
		  pages = [
	  { label: 'Dashboard', path: "/dashboard" , index: 0},
	  { label: 'Usuários', path: "/usuarios" , index: 1},
	  { label: 'Motoristas', path: "/motoristas" , index: 2},
	  { label: 'Veículos', path: "/veiculos" , index: 3},
	  { label: 'Fretes', path: "/fretes" , index: 4},
	  { label: 'Clientes', path: "/clientes" , index: 5},
	  { label: 'Receitas', path: "/receitas" , index: 6},
	  { label: 'Contas a receber', path: "/contas-a-receber" , index: 7},
	  { label: 'Despesas', path: "/despesas", index: 8 },
	  { label: 'Contas a pagar', path: "/contas-a-pagar", index: 9 },
	  { label: 'Relatórios', path: "/relatorios", index: 10 }
	  ];
	  }
	  else if (userData.role === "Operador"){
		  pages = [
	  { label: 'Dashboard', path: "/dashboard" , index: 0},
	  { label: 'Fretes', path: "/fretes" , index: 1},
	  { label: 'Clientes', path: "/clientes" , index: 2},
	  { label: 'Receitas', path: "/receitas", index: 3 },
	  { label: 'Contas a receber', path: "/contas-a-receber", index: 4 },
	  { label: 'Despesas', path: "/despesas", index: 5 },
	  { label: 'Contas a pagar', path: "/contas-a-pagar", index: 6 },
	  { label: 'Relatórios', path: "/relatorios", index: 7 }
	  ];
	  }
	  else if (userData.role === "Motorista"){
		  pages = [
	  { label: 'Dashboard', path: "/dashboard", index: 0 },
	  { label: 'Fretes', path: "/fretes", index: 1 },
	  { label: 'Contas a receber', path: "/contas-a-receber" , index: 2}, //TODO: arrumar contas a receber especifico para motorista
	  { label: 'Despesas', path: "/despesas", index: 3 },
	  ];
	  }
  }

  return (
    <Container sidebar={active}>
      <img src={logo} alt="TransDolinski"/>
        <Box  >
			  <List component="nav" sx={{ display: "flex", flexDirection: "column", alignItems: "center",gap: "5px"}}>
	            {pages?.map((page) => (
			        <ListItemButton sx={{
				        "&.Mui-selected": {
				          backgroundColor: "#ccccff",
				          color: "primary.main",
				          '& .MuiListItemIcon-root': {
					        color: 'primary.main',
					      },
						  '&:hover': {
						      backgroundColor: "#ccccff",
						   },
				        },
				        '&:hover': {
					      color: 'primary.main',
					      backgroundColor: 'white',
					      '& .MuiListItemIcon-root': {
					        color: 'primary.main',
					      },
					    },
				      color: 'white',  
		              width: 340,
		              height: "40px",
		              borderRadius: "50px",
	                 }}
			          selected={selectedIndex === page.index}
			          onClick={(event) => {
						  handleListItemClick(event, page.index);
						  goto(page.path);
					  }
				     }
			        >
			          <ListItemIcon sx={{ color: "white"}}>
			            <Person sx={{ m: "10px", width: "30px", height: "30px"}}/>
			          </ListItemIcon>
			          <ListItemText 
			          disableTypography
                       primary={<Typography variant="h6" style={{  }}>{page.label}</Typography>} />
			        </ListItemButton>
		        ))}
		        
		        
		      </List>
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
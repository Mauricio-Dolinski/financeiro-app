import React from 'react';
import { Container } from './styles';
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
import Groups from "@mui/icons-material/Groups";
import Typography from '@mui/material/Typography';
import {BiSolidDashboard} from "react-icons/bi";
import {BsFillBarChartLineFill, BsPersonBadge} from "react-icons/bs";
import {FaTruck, FaShippingFast} from "react-icons/fa";
import {LuReceipt} from "react-icons/lu";
import {GiReceiveMoney, GiPayMoney} from "react-icons/gi";




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
	  { label: 'Dashboard', path: "/dashboard" , index: 0, icon: <BiSolidDashboard className='icon' />},
	  { label: 'Usuários', path: "/usuarios" , index: 1, icon: <Person sx={{ m: "10px", width: "30px", height: "30px"}}/>},
	  { label: 'Motoristas', path: "/motoristas" , index: 2, icon: <BsPersonBadge className='icon' />},
	  { label: 'Veículos', path: "/veiculos" , index: 3, icon: <FaTruck className='icon' />},
	  { label: 'Fretes', path: "/fretes" , index: 4, icon: <FaShippingFast className='icon' />},
	  { label: 'Clientes', path: "/clientes" , index: 5, icon: <Groups sx={{ m: "10px", width: "30px", height: "30px"}}/>},
	  { label: 'Receitas', path: "/receitas" , index: 6, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a receber', path: "/contas-a-receber" , index: 7, icon: <GiReceiveMoney className='icon' />},
	  { label: 'Despesas', path: "/despesas", index: 8, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a pagar', path: "/contas-a-pagar", index: 9, icon: <GiPayMoney className='icon' />},
	  { label: 'Relatórios', path: "/relatorios", index: 10, icon: <BsFillBarChartLineFill className='icon'/>}
	  ];
	  }
	  else if (userData.role === "Operador"){
		  pages = [
	  { label: 'Dashboard', path: "/dashboard" , index: 0, icon: <BiSolidDashboard className='icon' />},
	  { label: 'Fretes', path: "/fretes" , index: 1, icon: <FaShippingFast className='icon' />},
	  { label: 'Clientes', path: "/clientes" , index: 2, icon: <Groups sx={{ m: "10px", width: "30px", height: "30px"}}/>},
	  { label: 'Receitas', path: "/receitas", index: 3, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a receber', path: "/contas-a-receber", index: 4, icon: <GiReceiveMoney className='icon' />},
	  { label: 'Despesas', path: "/despesas", index: 5, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a pagar', path: "/contas-a-pagar", index: 6, icon: <GiPayMoney className='icon' />},
	  { label: 'Relatórios', path: "/relatorios", index: 7, icon: <BsFillBarChartLineFill className='icon'/>}
	  ];
	  }
	  else if (userData.role === "Motorista"){
		  pages = [
	  { label: 'Dashboard', path: "/dashboard", index: 0, icon: <BiSolidDashboard className='icon' />},
	  { label: 'Fretes', path: "/fretes", index: 1, icon: <FaShippingFast className='icon' />},
	  { label: 'Contas a receber', path: "/contas-a-receber" , index: 2, icon: <GiReceiveMoney className='icon' />}, //TODO: arrumar contas a receber especifico para motorista
	  { label: 'Despesas', path: "/despesas", index: 3, icon: <LuReceipt className='icon' />},
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
			            {page.icon}
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
import React, { useState } from 'react';
import { Container } from './styles';
import logo from "../../images/logo/logo max.jpg";
import { useNavigate, useLocation } from "react-router-dom";
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
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillBarChartLineFill, BsPersonBadge } from "react-icons/bs";
import { FaTruck, FaShippingFast } from "react-icons/fa";
import { LuReceipt } from "react-icons/lu";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";



const Sidebar = ({ active }) => {

  const [userData] = useLocalStorage("user", null);
  
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  var initialIndex = 0;
  if (pathname.includes("dashboard")) initialIndex = 0;
  else if (pathname.includes("usuarios")) initialIndex = 1;
  else if (pathname.includes("motoristas")) initialIndex = 2;
  else if (pathname.includes("veiculos")) initialIndex = 3;
  else if (pathname.includes("fretes")) 	initialIndex = 4;
  else if (pathname.includes("clientes")) initialIndex = 5;
  else if (pathname.includes("receitas")) initialIndex = 6;
  else if (pathname.includes("contas-a-receber")) initialIndex = 7;
  else if (pathname.includes("despesas")) initialIndex = 8;
  else if (pathname.includes("contas-a-pagar")) initialIndex = 9;
  else if (pathname.includes("relatorios")) initialIndex = 10;
  
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  
  
  
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
	  { label: 'Dashboard', path: "/financeiro-app/dashboard" , index: 0, icon: <BiSolidDashboard className='icon' />},
	  { label: 'Usuários', path: "/financeiro-app/usuarios" , index: 1, icon: <Person className='icon' sx={{ m: "10px", width: "30px", height: "30px"}}/>},
	  { label: 'Motoristas', path: "/financeiro-app/motoristas" , index: 2, icon: <BsPersonBadge className='icon' />},
	  { label: 'Veículos', path: "/financeiro-app/veiculos" , index: 3, icon: <FaTruck className='icon' />},
	  { label: 'Fretes', path: "/financeiro-app/fretes" , index: 4, icon: <FaShippingFast className='icon' />},
	  { label: 'Clientes', path: "/financeiro-app/clientes" , index: 5, icon: <Groups className='icon' sx={{ m: "10px", width: "30px", height: "30px"}}/>},
	  { label: 'Receitas', path: "/financeiro-app/receitas" , index: 6, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a receber', path: "/financeiro-app/contas-a-receber" , index: 7, icon: <GiReceiveMoney className='icon' />},
	  { label: 'Despesas', path: "/financeiro-app/despesas", index: 8, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a pagar', path: "/financeiro-app/contas-a-pagar", index: 9, icon: <GiPayMoney className='icon' />},
	  { label: 'Relatórios', path: "/financeiro-app/relatorios", index: 10, icon: <BsFillBarChartLineFill className='icon'/>}
	  ];
	  }
	  else if (userData.role === "Operador"){
		  pages = [
	  { label: 'Dashboard', path: "/financeiro-app/dashboard" , index: 0, icon: <BiSolidDashboard className='icon' />},
	  { label: 'Fretes', path: "/financeiro-app/fretes" , index: 4, icon: <FaShippingFast className='icon' />},
	  { label: 'Clientes', path: "/financeiro-app/clientes" , index: 5, icon: <Groups className='icon' sx={{ m: "10px", width: "30px", height: "30px"}}/>},
	  { label: 'Receitas', path: "/financeiro-app/receitas", index: 6, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a receber', path: "/financeiro-app/contas-a-receber", index: 7, icon: <GiReceiveMoney className='icon' />},
	  { label: 'Despesas', path: "/financeiro-app/despesas", index: 8, icon: <LuReceipt className='icon' />},
	  { label: 'Contas a pagar', path: "/financeiro-app/contas-a-pagar", index: 9, icon: <GiPayMoney className='icon' />},
	  { label: 'Relatórios', path: "/financeiro-app/relatorios", index: 10, icon: <BsFillBarChartLineFill className='icon'/>}
	  ];
	  }
	  else if (userData.role === "Motorista"){
		  pages = [
	  { label: 'Fretes', path: "/financeiro-app/fretes", index: 4, icon: <FaShippingFast className='icon' />},
	  { label: 'Despesas', path: "/financeiro-app/despesas", index: 8, icon: <LuReceipt className='icon' />},
	  { label: 'Salário', path: "/financeiro-app/contas-a-pagar" , index: 9, icon: <GiReceiveMoney className='icon' />},
	  ];
	  }
  }

  return (
    <Container sidebar={active}>
      <img src={logo} alt="TransDolinski"/>
        <Box  sx={{bgcolor: "#8a8a8a"}}>
			  <List component="nav" sx={{ display: "flex", flexDirection: "column", alignItems: "center",gap: "5px"}}>
	            {pages?.map((page) => (
			        <ListItemButton className='itemButton' sx={{
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
                       primary={<Typography variant="h6" className='typography'>{page.label}</Typography>} />
			        </ListItemButton>
		        ))}

	            <ListItemButton className='itemButton' onClick={logout} sx={{
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
              marginTop: "30px"
             }}
				     
			        >
			          <ListItemIcon sx={{ color: "white"}}>
			            <BiLogOut className='icon'/>
			          </ListItemIcon>
			          <ListItemText 
			          disableTypography
                       primary={<Typography variant="h6" className='typography'>Sair</Typography>} />
			        </ListItemButton>
		        
		        
		      </List>
          </Box>
    </Container>
  )
}

export default Sidebar
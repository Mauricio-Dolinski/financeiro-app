import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { FluxoDeCaixa } from "../components/FluxoDeCaixa";
import { TiposDeDespesas } from "../components/TiposDeDespesas";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import {GiReceiveMoney, GiPayMoney} from "react-icons/gi";
import Icon from '@mui/material/Icon';

const DashboardPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [entity, setEntity] = useState([]);
	const { user } = useAuth();
	
	
	const getData = async () => {
		await axios.get("http://localhost:8080/api/dashboard", {
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
			const entityData  = response.data;
	        setEntity({ ...entity, ...entityData});
	        setIsLoading(false);
        }).catch(error => { 
			toast.error("e: "+ error);
        });
	}
	
	useEffect(() => {
		getData();
  	}, []);
	
	return (
		<>
		    <Title name="Dashboard" />
		    {!isLoading && <>
		    <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
		    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"15px", alignItems: 'center', color: '#757575', marginX: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginRight: "25px", color: '#1565c0'}}>
		    		 	<Icon sx={{fontSize: "50px"}}> <GiReceiveMoney /> </Icon>
		    		 	<Typography variant="h3" sx={{fontWeight: 'bold', fontSize: "20px"}}>
							Contas a receber em atraso
       					 </Typography>
		    		 </Box>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", color: '#1565c0'}}>
		    		 	 <Typography variant="h1" sx={{fontWeight: 'bold', fontSize: "40px"}}>
							{entity.contas_receber_atraso}
       					 </Typography>
		    		 </Box>
		    	</Box>
		    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"15px", alignItems: 'center', color: '#757575', marginX: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginRight: "25px", color: '#2e7d32'}}>
		    		 	<Icon sx={{fontSize: "50px"}}> <GiReceiveMoney /> </Icon>
		    		 	<Typography variant="h3" sx={{fontWeight: 'bold', fontSize: "20px"}}>
							Contas a receber
       					 </Typography>
		    		 </Box>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", color: '#2e7d32'}}>
		    		 	<Typography variant="h1" sx={{fontWeight: 'bold', fontSize: "40px"}}>
							{entity.contas_receber_aberto}
       					 </Typography>
		    		 </Box>
		    	</Box>
		    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"15px", alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginRight: "25px", color: '#d32f2f'}}>
		    		 	<Icon sx={{fontSize: "50px"}}> <GiPayMoney /> </Icon>
		    		 	<Typography variant="h3" sx={{fontWeight: 'bold', fontSize: "20px"}}>
							Contas a pagar
       					 </Typography>
		    		 </Box>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", color: '#d32f2f'}}>
		    		 	 <Typography variant="h1" sx={{fontWeight: 'bold', fontSize: "40px"}}>
							{entity.contas_pagar_aberto}
       					 </Typography>
		    		 </Box>
		    	</Box>
		    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"15px", alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginRight: "25px", color: '#ed6c02'}}>
		    		 	<Icon sx={{fontSize: "50px"}}> <GiPayMoney /> </Icon>
		    		 	<Typography variant="h3" sx={{fontWeight: 'bold', fontSize: "20px"}}>
							Contas a pagar em atraso
       					 </Typography>
		    		 </Box>
		    		 <Box sx={{ width: "100%", display: "flex", flexDirection: "row", color: '#ed6c02'}}>
		    		 	 <Typography variant="h1" sx={{fontWeight: 'bold', fontSize: "40px"}}>
							{entity.contas_pagar_atraso}
       					 </Typography>
		    		 </Box>
		    	</Box>
		    </Box>
		    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "row"}}>
		    	<FluxoDeCaixa />
		    	<TiposDeDespesas />
		    </Box>
		    <Box></Box>
		    </>}
		</>
	)
};

export default DashboardPage
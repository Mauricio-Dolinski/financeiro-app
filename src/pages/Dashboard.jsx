import { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { useNavigate } from "react-router-dom";
import { FluxoDeCaixa } from "../components/FluxoDeCaixa";
import { TiposDeDespesas } from "../components/TiposDeDespesas";
import { EntradasSaidas } from "../components/EntradasSaidas";
import { useLocalStorage } from "./../hooks/useLocalStorage";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import {GiReceiveMoney, GiPayMoney} from "react-icons/gi";
import Icon from '@mui/material/Icon';
import { MySelect } from "../components/MySelect";
import Tooltip from '@mui/material/Tooltip';

const DashboardPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [entity, setEntity] = useState([]);
	const { user } = useAuth();
	const { URL_API } = useAuth();
	const [timer, setTimer] = useState(false);
	const [days, setDays] = useState(30);
	const [userData] = useLocalStorage("user", null);
	const navigate = useNavigate();

	const delay = 30;

	const options_tempo = 
	{
	  "key": [
	    0,
	    1,
	    2
	  ],
	  "name": [
	    "Últimos 30 dias",
	    "Últimos 60 dias",
	    "Últimos 90 dias"
	  ],
	  "value": [
	    30,
	    60,
	    90
	  ]
	};

	

	const postData = async (value) => {
		const str = "dias="+value
		const config = {
					headers: {
		            	"content-type": "application/x-www-form-urlencoded"
		        	},
					auth: {
						username: user.user,
		  				password: user.password
					}
				};

		await axios.post(URL_API+"dashboard", str, config).then(response => {
					const entityData  = response.data;
			        setEntity({ ...entity, ...entityData});
			        setIsLoading(false);
			        setDays(value);
		        }).catch(error => { 
					toast.error("e: "+ error);
		        });
			}

	const funcOnChangeDias = (event) => {
    	const value = event.target.value;
    	postData(value);
  	};

	useEffect(() => {
		if (userData){
		  if (userData.role === "Motorista"){
			  navigate("/fretes", { replace: true });
		  }
		  else {
		  	postData(days);
		  }
	  	}
	},[]);
	
	return (
		<>	<Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
		    	<Title name="Dashboard" />
		    	{!isLoading && <EntradasSaidas entradas={entity.entradas} saidas={entity.saidas}/>}
		    	<MySelect name="dias" label="Período" options={options_tempo} funcOnChange={funcOnChangeDias} width="300px" size="small"/>
		    </Box>
		    {!isLoading && <>
		    <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
		    	<Tooltip title="Contas a receber - Entradas Hoje" arrow>
			    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center', color: '#757575', marginLeft: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			    		 <Typography variant="h3" sx={{ display: "flex", alignSelf: "center", fontWeight: 'bold', fontSize: "20px", color: '#2e7d32'}}>
							Hoje
	       				 </Typography>
		    		 	 <Typography variant="h1" sx={{display: "flex", alignSelf: "center", marginTop: "10px", fontWeight: 'bold', fontSize: "24px", color: '#2e7d32'}}>
							{entity.contas_receber_hoje}
	   					 </Typography>
			    	</Box>
		    	</Tooltip>
		    	<Tooltip title="Contas a receber - Entradas Em atraso" arrow>
			    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center', color: '#757575', marginLeft: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			    		 <Typography variant="h3" sx={{ display: "flex", alignSelf: "center", fontWeight: 'bold', fontSize: "20px", color: '#2e7d32'}}>
								Em atraso
	       				 </Typography>
		    		 	 <Typography variant="h1" sx={{display: "flex", alignSelf: "center", marginTop: "10px", fontWeight: 'bold', fontSize: "24px", color: '#2e7d32'}}>
							{entity.contas_receber_atraso}
	   					 </Typography>
			    	</Box>
		    	</Tooltip>
		    	<Tooltip title="Contas a receber - Entradas Total" arrow>
			    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center', color: '#757575', marginLeft: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			    		 <Typography variant="h3" sx={{ display: "flex", alignSelf: "center", fontWeight: 'bold', fontSize: "20px", color: '#2e7d32'}}>
								Total
	       				 </Typography>
		    		 	 <Typography variant="h1" sx={{display: "flex", alignSelf: "center", marginTop: "10px", fontWeight: 'bold', fontSize: "24px", color: '#2e7d32'}}>
							{entity.contas_receber_aberto}
	   					 </Typography>
			    	</Box>
		    	</Tooltip>
		    	<Tooltip title="Valor em Caixa " arrow>
			    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center', color: '#757575', marginLeft: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			    		 <Typography variant="h3" sx={{ display: "flex", alignSelf: "center", fontWeight: 'bold', fontSize: "20px", color: '#1565c0'}}>
								Caixa
	       				 </Typography>
		    		 	 <Typography variant="h1" sx={{display: "flex", alignSelf: "center", marginTop: "10px", fontWeight: 'bold', fontSize: "24px", color: '#1565c0'}}>
							{entity.valor_caixa}
	   					 </Typography>
			    	</Box>
		    	</Tooltip>
		    	<Tooltip title="Contas a pagar - Saídas Total" arrow>
			    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center',color: '#757575', marginLeft: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			    		 <Typography variant="h3" sx={{ display: "flex", alignSelf: "center", fontWeight: 'bold', fontSize: "20px", color: '#d32f2f'}}>
								Total
	       				 </Typography>
		    		 	 <Typography variant="h1" sx={{display: "flex", alignSelf: "center", marginTop: "10px", fontWeight: 'bold', fontSize: "24px", color: '#d32f2f'}}>
							{entity.contas_pagar_aberto}
	   					 </Typography>
			    	</Box>
		    	</Tooltip>
		    	<Tooltip title="Contas a pagar - Saídas Em atraso" arrow>
			    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center',color: '#757575', marginLeft: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			    		 <Typography variant="h3" sx={{ display: "flex", alignSelf: "center", fontWeight: 'bold', fontSize: "20px", color: '#d32f2f'}}>
							Em atraso
	       				 </Typography>
		    		 	 <Typography variant="h1" sx={{display: "flex", alignSelf: "center", marginTop: "10px", fontWeight: 'bold', fontSize: "24px", color: '#d32f2f'}}>
							{entity.contas_pagar_atraso}
	   					 </Typography>
			    	</Box>
		    	</Tooltip>
		    	<Tooltip title="Contas a pagar - Saídas Hoje" arrow>
			    	<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
			    		 <Typography variant="h3" sx={{ display: "flex", alignSelf: "center", fontWeight: 'bold', fontSize: "20px", color: '#d32f2f'}}>
								Hoje
	       				 </Typography>
		    		 	 <Typography variant="h1" sx={{display: "flex", alignSelf: "center", marginTop: "10px", fontWeight: 'bold', fontSize: "24px", color: '#d32f2f'}}>
							{entity.contas_pagar_hoje}
	   					 </Typography>
			    	</Box>
		    	</Tooltip>
		    </Box>
		    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", marginBottom: "25px"}}>
		    	<FluxoDeCaixa getFluxo={entity.fluxoDiario} getProjecao={entity.projecao} days={days}/>
		    	
		    	<TiposDeDespesas getData={entity.despesasPeriodo}/>
		    </Box>
		    </>}
		</>
	)
};

export default DashboardPage
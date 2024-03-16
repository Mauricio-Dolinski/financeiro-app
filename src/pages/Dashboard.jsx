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
import { MyDashItem } from "../components/MyDashItem";

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
			  navigate("/financeiro-app/fretes", { replace: true });
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
		    	<MyDashItem tooltip="Contas a receber - Entradas Hoje" title="Hoje" value={entity.contas_receber_hoje} />
		    	<MyDashItem tooltip="Contas a receber - Entradas Em atraso" title="Em atraso" value={entity.contas_receber_atraso} />
		    	<MyDashItem tooltip="Contas a receber - Entradas Total" title="Total" value={entity.contas_receber_aberto} />
		    	<MyDashItem tooltip="Valor em Caixa" title="Caixa" value={entity.valor_caixa} />
		    	<MyDashItem tooltip="Contas a pagar - Saídas Hoje" title="Hoje" value={entity.contas_pagar_hoje} />
		    	<MyDashItem tooltip="Contas a pagar - Saídas Em atraso" title="Em atraso" value={entity.contas_pagar_atraso} />
		    	<MyDashItem tooltip="Contas a pagar - Saídas Total" title="Total" value={entity.contas_pagar_aberto} />
		    </Box>
		    <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
		    	<FluxoDeCaixa getFluxo={entity.fluxoDiario} getProjecao={entity.projecao} days={days}/>
		    	<TiposDeDespesas getData={entity.despesasPeriodo}/>
		    </Box>
		    </>}
		</>
	)
};

export default DashboardPage
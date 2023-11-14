import React, { useEffect, useState } from "react";
import { Title } from "../components/Title";
import Box from "@mui/material/Box";
import { SaveButton } from "../components/SaveButton";
import { MyInput } from "../components/MyInput";
import { toast } from "react-toastify";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MySelect } from "../components/MySelect";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import 'dayjs/locale/pt-br';



const ReceitasCadastroPage = () => {
	
	const entityName = "despesas";
	const { URL_API } = useAuth();
	const options_parcelas = 
	{
		  "key": [
		    0,
		    1,
		    2,
		    3,
		    4,
		    5,
		    6,
		    7,
		    8,
		    9,
		  ],
		  "name": [
		    "1",
		    "2",
		    "3",
		    "4",
		    "5",
		    "6",
		    "7",
		    "8",
		    "9",
		    "10"
		  ],
		  "value": [
			"1",
		    "2",
		    "3",
		    "4",
		    "5",
		    "6",
		    "7",
		    "8",
		    "9",
		    "10"
		  ]
	};
	const options_tipo = 
	{
		  "key": [
		    0,
		    1,
		    2,
		    3,
		    4,
		    5,
		    6,
		    7,
		    8

		  ],
		  "name": [
		    "Combustível",
		    "Manutenção",
		    "Salário",
		    "Encargo",
		    "Seguro",
		    "Imposto",
		    "Emprestimo",
		    "Administrativo",
		    "Outros"
		  ],
		  "value": [
			"Combustível",
		    "Manutenção",
		    "Salário",
		    "Encargo",
		    "Seguro",
		    "Imposto",
		    "Emprestimo",
		    "Administrativo",
		    "Outros"
		  ]
	};
	const options_recorrente = 
	{
		  "key": [
		    0,
		    1,
		  ],
		  "name": [
		    "Não",
		    "Sim"
		  ],
		  "value": [
			"Não",
		    "Sim"
		  ]
	};

	const [optionsCliente, setOptionsCliente] = useState({
		"key": [],
		"name": [],
		"value": []
	});

	const [optionsMotorista, setOptionsMotorista] = useState({
		"key": [],
		"name": [],
		"value": []
	});

	const [optionsVeiculo, setOptionsVeiculo] = useState({
		"key": [],
		"name": [],
		"value": []
	});

	const url = URL_API+entityName;
	
	
	const [entity, setEntity] = useState([]);
	const { user } = useAuth();
	const location = useLocation();
	const id = location.pathname.split('/').pop();
	const isCadastro = isNaN(id);

    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isWaitingData, setIsWaitingData] = useState(false);
    const [isLoadingOptionsCliente, setIsLoadingOptionsCliente] = useState(true);
    const [isLoadingOptionsMotorista, setIsLoadingOptionsMotorista] = useState(true);
    const [isLoadingOptionsVeiculo, setIsLoadingOptionsVeiculo] = useState(true);
    
    
    const setLoading = () => {
		setIsLoading(false);
	}
	
	const showResponse = (toastId, options, response) => {
		setIsWaitingData(false);
		options.render = response.data;
		if (response.data === "Cadastrado" || response.data === "Editado"){
			options.type = "success";
			toast.update(toastId, options);
			navigate("/tcc/"+entityName, { replace: true });
		}
		else{
			toast.update(toastId, options);
		}
	}
	
	const showError = (toastId, options, error) => {
		setIsWaitingData(false);
		if (error.response && error.response.status === 401){
			options.render = "Acesso negado";
		}
		else {
			options.render = "Servidor de login offline";
		}
		toast.update(toastId, options);
	}

	const getOptionsCliente = async () => {
		let url_options = url+"/options_cliente";
		if (!isCadastro){
			url_options += "/" + id;
		}
		await axios.get(url_options, {
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
			const optionsData  = response.data;
	        setOptionsCliente({ ...optionsCliente, ...optionsData});
			setIsLoadingOptionsCliente(false);
        }).catch(error => { 
			toast.error("e: "+ error);
        });
	}

	const getOptionsMotorista = async () => {
		let url_options = url+"/options_motorista";
		if (!isCadastro){
			url_options += "/" + id;
		}
		await axios.get(url_options, {
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
			const optionsData  = response.data;
	        setOptionsMotorista({ ...optionsMotorista, ...optionsData});
			setIsLoadingOptionsMotorista(false);
        }).catch(error => { 
			toast.error("e: "+ error);
        });
	}

	const getOptionsVeiculo = async () => {
		let url_options = url+"/options_veiculo";
		if (!isCadastro){
			url_options += "/" + id;
		}
		await axios.get(url_options, {
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
			const optionsData  = response.data;
	        setOptionsVeiculo({ ...optionsVeiculo, ...optionsData});
			setIsLoadingOptionsVeiculo(false);
        }).catch(error => { 
			toast.error("e: "+ error);
        });
	}
    
    const getData = async () => {
		setIsWaitingData(true);
		await axios.get(url+"/"+id, {
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
			const entityData  = response.data;
	        setEntity({ ...entity, ...entityData});
	        setIsLoading(false);
	        setIsWaitingData(false);
        }).catch(error => { 
			toast.error("e: "+ error);
        });
	}
	
	
  	
  const handleSubmit = async (event) => {
	
	event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams(data);

	if (data){
		setIsWaitingData(true);
		const renderLabel = isCadastro ? "Cadastrando..." : "Editando...";
		const options = {render: renderLabel, 
						type: "error", 
						isLoading: false, 
						hideProgressBar: false, 
						autoClose: 3000, 
						closed: false};
		

		const toastId = toast.loading(renderLabel, {
  			closeButton: true, 
  			closeOnClick: true
		});

		const config = {
					headers: {
		            	"content-type": "application/x-www-form-urlencoded"
		        	},
					auth: {
						username: user.user,
		  				password: user.password
					}
				};
		
		if (isCadastro)
		{
		    await axios.post(url, params.toString(), config).then(response => {
				showResponse(toastId, options, response);
		      }).catch(error => { 
				  showError(toastId, options, error);
		      });
	      }
	      else
	      {
			 await axios.put(url+"/"+id, params.toString(), config).then(response => {
				showResponse(toastId, options, response);
		     }).catch(error => { 
				showError(toastId, options, error);
		     });
		  }
      }
  };
  
  useEffect(() => {
  	getOptionsCliente();
  	getOptionsMotorista();
  	getOptionsVeiculo();
 	if (!isCadastro){
		getData();
	}
	else {
		setLoading();
	}
  }, []);
  
  return (
	  <>
	    {isCadastro ?
	    <Title name="Despesas - Cadastrar " />
	    :
	   <Title name="Despesas - Editar " />
	    }
	  	<Box component="form" onSubmit={handleSubmit}  sx={{ display: "flex", flexDirection: "column", m: "0px", p: "0px", alignItems: "flex-start" }}>
	  	{!isLoading && !isLoadingOptionsCliente && !isLoadingOptionsMotorista && !isLoadingOptionsVeiculo && <>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MySelect name="tipo" label="Tipo de despesa" isCadastro={isCadastro} getValue={entity.tipo} options={options_tipo}/>
	  	  	<MySelect name="recorrente" label="Despesa é recorrente?" isCadastro={isCadastro} getValue={entity.recorrente} options={options_recorrente}/>
	  	  	<MySelect name="parcelas" label="Quantidade de parcelas" isDisabled={!isCadastro} isCadastro={isCadastro} getValue={entity.parcelas} options={options_parcelas}/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
			<MySelect name="cliente_id" label="Cliente" isRequired={false} isCadastro={isCadastro} getValue={optionsCliente.value[0]} options={optionsCliente}/>
			<MySelect name="motorista_id" label="Motorista" isRequired={false} isCadastro={isCadastro} getValue={optionsMotorista.value[0]} options={optionsMotorista}/>
	  	  	<MySelect name="veiculo_id" label="Veiculo" isRequired={false} isCadastro={isCadastro} getValue={optionsVeiculo.value[0]} options={optionsVeiculo}/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	 	<MyInput name="valor_total" label="Valor Total" isDisabled={!isCadastro} isCadastro={isCadastro} getValue={entity.valor_total}/>
            <MyInput name="descricao" label="Descricao" isCadastro={isCadastro} getValue={entity.descricao}/>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center',color: '#757575', margin: '1%', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
          	<Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginRight: "25px" }}>
          		Data da Primeira Parcela
        	</Typography>
          	<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        		<DatePicker
          			label="Data da Primeira Parcela"
          			format="DD/MM/YYYY"
          			defaultValue={dayjs()}
          			slotProps={{ textField: { name: 'data' } }}
          			disabled={!isCadastro}
        		/>
   		 	</LocalizationProvider>
          </Box>
          <Box sx={{display: "flex", alignItems: "flex-start", m: '1%'}} > 
		  	{isCadastro ?
		  	<SaveButton action='cadastrar' isWaitingData={isWaitingData}/>
		  	:
		  	<SaveButton isWaitingData={isWaitingData}/>
		  	}
		  </Box>
	  	
	  	</>}
	  	  
        </Box>
	  </>
  )
};

export default ReceitasCadastroPage
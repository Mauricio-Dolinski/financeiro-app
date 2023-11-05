import React, { useEffect, useState } from "react";
import { Title } from "../components/Title";
import Box from "@mui/material/Box";
import { SaveButton } from "../components/SaveButton";
import { MyInput } from "../components/MyInput";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MySelect } from "../components/MySelect";



const VeiculosCadastroPage = () => {
	
	const entityName = "veiculos";
	const { URL_API } = useAuth();
	/*const options_usuarios = 
	{
		  "key": [
		    0,
		    1,
		    2,
		    3,
		    4 
		  ],
		  "name": [
		    "Mauricio da Mota Porelli Dolinski",
		    "Sidney Dolinski",
		    "Luiz Carlos Graciano",
		    "Motorista Teste2",
		    "Motorista Teste3"
		  ],
		  "value": [
			1,
		    2,
		    3,
		    4,
		    5 
		  ]
	};*/
	const url = URL_API+entityName;
	
	const [options, setOptions] = useState({
		"key": [],
		"name": [],
		"value": []
	});
	const [entity, setEntity] = useState([])
	const { user } = useAuth();
	const location = useLocation();
	const id = location.pathname.split('/').pop();
	const isCadastro = isNaN(id);

    const navigate = useNavigate();

    
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingOptions, setIsLoadingOptions] = useState(true);
    const [isWaitingData, setIsWaitingData] = useState(false);
    
    const setLoading = () => {
		setIsLoading(false);
	}
	
	const showResponse = (toastId, options, response) => {
		setIsWaitingData(false);
		options.render = response.data;
		if (response.data === "Cadastrado" || response.data === "Editado"){
			options.type = "success";
			toast.update(toastId, options);
			navigate("/"+entityName, { replace: true });
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
	
	const getOptions = async () => {
		let url_options = url+"/options";
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
	        setOptions({ ...options, ...optionsData});
			setIsLoadingOptions(false);
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
	  	getOptions();
	 	if (!isCadastro){
			getData();
		}
		else {
			setIsLoading(false);
		}
  }, []);
  
  return (
	  <>
	    {isCadastro ?
	    <Title name="Veiculos - Cadastrar " />
	    :
	   <Title name="Veiculos - Editar " />
	    }
	  	<Box component="form" onSubmit={handleSubmit} gap="25px" sx={{ display: "flex", flexDirection: "column", m: "0px", p: "0px", alignItems: "flex-start" }}>
	  	{!isLoading && !isLoadingOptions && <>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MySelect name="motorista_id" label="Motorista" isCadastro={isCadastro} getValue={options.value[0]} options={options}/>
	  	  	
	  	  	<MyInput name="renavam" label="Renavam" isCadastro={isCadastro} getValue={entity.renavam}/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="placa" label="Placa" isCadastro={isCadastro} getValue={entity.placa}/>
	  	  	<MyInput name="marca" label="Marca" isCadastro={isCadastro} getValue={entity.marca}/>
	  	  	<MyInput name="modelo" label="Modelo" isCadastro={isCadastro} getValue={entity.modelo}/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="ano" label="Ano" isCadastro={isCadastro} getValue={entity.ano}/>
	  	  	<MyInput name="tipo" label="Tipo" isCadastro={isCadastro} getValue={entity.tipo}/>
	  	  	<MyInput name="capacidade" label="Capacidade" isCadastro={isCadastro} getValue={entity.capacidade}/>
	  	  </Box>
          <Box sx={{display: "flex", alignItems: "flex-start"}} > 
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

export default VeiculosCadastroPage
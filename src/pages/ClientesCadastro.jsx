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



const ClientesCadastroPage = () => {
	
	const entityName = "clientes";
	const { URL_API } = useAuth();
	/*const options_role = 
	{
		  "key": [
		    0,
		    1,
		    2
		  ],
		  "name": [
		    "Motorista",
		    "Operador",
		    "Admin"
		  ],
		  "value": [
			"Motorista",
		    "Operador",
		    "Admin"
		  ]
	};*/
	const url = URL_API+entityName;
	
	
	const [entity, setEntity] = useState([]);
	const { user } = useAuth();

	const location = useLocation();
	const id = location.pathname.split('/').pop();
	const isCadastro = isNaN(id);

    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(true);
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
	    <Title name="Clientes - Cadastrar " />
	    :
	   <Title name="Clientes - Editar " />
	    }
	  	<Box component="form" onSubmit={handleSubmit}  sx={{ display: "flex", flexDirection: "column", m: "0px", p: "0px", alignItems: "flex-start" }}>
	  	{!isLoading && <>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="cnpj" label="CNPJ" isCadastro={isCadastro} getValue={entity.cnpj}/>
	  	  	<MyInput name="nome" label="Nome" isCadastro={isCadastro} getValue={entity.nome}/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="endereco" label="Endereco" isCadastro={isCadastro} getValue={entity.endereco}/>
	  	  	<MyInput name="cidade" label="Cidade" isCadastro={isCadastro} getValue={entity.cidade}/>
	  	  	<MyInput name="estado" label="Estado" isCadastro={isCadastro} getValue={entity.estado}/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="telefone" label="Telefone" isCadastro={isCadastro} getValue={entity.telefone}/>
	  	  	<MyInput name="email" label="Email" isCadastro={isCadastro} getValue={entity.email}/>
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

export default ClientesCadastroPage
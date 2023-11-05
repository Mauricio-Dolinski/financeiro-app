import React, { useEffect, useState } from "react";
import { Title } from "../components/Title";
import Box from "@mui/material/Box";
import { SaveButton } from "../components/SaveButton";
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MyInput } from "../components/MyInput";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { MySelect } from "../components/MySelect";



const UsuariosCadastroPage = () => {
	
	const entityName = "usuarios";
	const { URL_API } = useAuth();
	const options_role = 
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
	};
	const url = URL_API+entityName;
	
	
	const [entity, setEntity] = useState([]);
	const [showPassword, setShowPassword] = React.useState(false);
	const { user } = useAuth();
	const location = useLocation();
	const id = location.pathname.split('/').pop();
	const isCadastro = isNaN(id);
	
	const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    	event.preventDefault();
    };
    
    
    
    const navigate = useNavigate();
    const bgColor = isCadastro ? '#fff' : '#ccc';
    const editColor = isCadastro ? 'success' : 'warning';
    
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
	    <Title name="Usuários - Cadastrar " />
	    :
	   <Title name="Usuários - Editar " />
	    }
	  	<Box component="form" onSubmit={handleSubmit} gap="25px" sx={{ display: "flex", flexDirection: "column", m: "0px", p: "0px", alignItems: "flex-start" }}>
	  	{!isLoading && <>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="name" label="Nome Completo" isCadastro={isCadastro} getValue={entity.name}/>
	  	  	<MyInput name="email" label="Email" isCadastro={isCadastro} getValue={entity.email}/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
            <MyInput name="username" label="Usuário" isCadastro={isCadastro} isDisabled={!isCadastro} getValue={entity.username}/>
            <Box sx={{width: "100%", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: bgColor, borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
	          <Typography variant="h6" sx={{display: "flex", fontWeight: 'bold', marginRight: "25px"}}>
	             Senha
	          </Typography>
	          <FormControl sx={{ width: 1 }} variant="outlined">
	          <InputLabel color={editColor} htmlFor="password">Senha *</InputLabel>
	          <OutlinedInput
	          	sx={{width: "100%"}}
	            id="password"
	            type={showPassword ? 'text' : 'password'}
	            color={editColor}
	            disabled={!isCadastro}
	            defaultValue={isCadastro ? '': 'password'}
	            endAdornment={
	              <InputAdornment position="end">
	                <IconButton
	                  aria-label="toggle password visibility"
	                  onClick={handleClickShowPassword}
	                  onMouseDown={handleMouseDownPassword}
	                  disabled={!isCadastro}
	                  edge="end"
	                >
	                  {showPassword ? <VisibilityOff /> : <Visibility />}
	                </IconButton>
	              </InputAdornment>
	            }
	            label="Senha"
	            required={isCadastro}
	            autoComplete="current-password"
	            name="password"
	          	/>
	        	</FormControl>
        	  </Box>
        	    <MySelect name="role" label="Nivel de Acesso" isCadastro={isCadastro} getValue={entity.role} options={options_role}/>
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

export default UsuariosCadastroPage
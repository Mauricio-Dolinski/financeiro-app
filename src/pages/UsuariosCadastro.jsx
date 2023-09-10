import React, { useEffect, useState } from "react";
import { Title } from "../components/Title";
import Box from "@mui/material/Box";
import { SaveButton } from "../components/SaveButton";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MyInput } from "../components/MyInput";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



const UsuariosCadastroPage = () => {
	
	const [entity, setEntity] = useState([]);
	const entityName = "usuarios";
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
    
    const setLoading = () => {
		setIsLoading(false);
	}
    
    const getData = async () => {
		await axios.get('http://localhost:8080/api/'+entityName+"/"+id, {
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
	
	
  	
  const handleSubmit = async (event) => {
	
	event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const params = new URLSearchParams(data);
    
    
	
	if (data){
		
		const renderLabel = isCadastro ? "Cadastrando..." : "Editando...";
		if (toast.isActive(entityName+"toast")){
			toast.update(entityName+"toast", {render: renderLabel, type: "loading", isLoading: true, hideProgressBar: true, autoClose: false, closed: false});
		}
		else{
			toast.loading(renderLabel, {
      			toastId: entityName+"toast", closeButton: true, closeOnClick: true
    		});
		}
		
		if (isCadastro)
		{
		    await axios.post('http://localhost:8080/api/'+entityName, params.toString(), {
				headers: {
	            	"content-type": "application/x-www-form-urlencoded"
	        	},
				auth: {
					username: user.user,
	  				password: user.password
				}
			}).then(response => {
				if (response.data === "Cadastrado"){
					toast.update(entityName+"toast", {render: response.data, type: "success", isLoading: false, hideProgressBar: false, autoClose: 1200});
	    			navigate("/"+entityName, { replace: true });
				}
				else{
					toast.update(entityName+"toast", {render: response.data, type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
				}
		        
		      }).catch(error => { 
				  if (error.response && error.response.status === 401){
					    toast.update(entityName+"toast", {render: "Acesso negado", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
				  }
				  else {
					  toast.update(entityName+"toast", {render: "Servidor de login offline", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
				  }
		      });
	      }
	      else
	      {
			  await axios.put('http://localhost:8080/api/'+entityName+"/"+id, params.toString(), {
				headers: {
	            	"content-type": "application/x-www-form-urlencoded"
	        	},
				auth: {
					username: user.user,
	  				password: user.password
				}
			}).then(response => {
				if (response.data === "Editado"){
					toast.update(entityName+"toast", {render: response.data, type: "success", isLoading: false, hideProgressBar: false, autoClose: 1200});
	    			navigate("/"+entityName, { replace: true });
				}
				else{
					toast.update(entityName+"toast", {render: response.data, type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
				}
		        
		      }).catch(error => { 
				  if (error.response && error.response.status === 401){
					    toast.update(entityName+"toast", {render: "Acesso negado", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
				  }
				  else {
					  toast.update(entityName+"toast", {render: "Servidor de login offline", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
				  }
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
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	{!isLoading && <MyInput name="name" label="Nome Completo" isCadastro={isCadastro} getValue={entity.name}/>}
	  	  	{!isLoading && <MyInput name="email" label="Email" isCadastro={isCadastro} getValue={entity.email}/>}
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
            {!isLoading && <MyInput name="username" label="Usuário" isCadastro={isCadastro} isDisabled={!isCadastro} getValue={entity.username}/>}
            <Box sx={{width: "100%", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: bgColor, borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
	          <Typography variant="h6" sx={{display: "flex", fontWeight: 'bold', marginRight: "25px"}}>
	             Senha
	          </Typography>
	          <FormControl sx={{mt: 1, width: 1 }} variant="outlined">
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
        	  {!isLoading && <MyInput name="role" label="Nivel de Acesso" isCadastro={isCadastro} getValue={entity.role}/>}
            </Box>
          <Box sx={{display: "flex", alignItems: "flex-start"}} > 
		  	{isCadastro ?
		  	<SaveButton action='cadastrar'/>
		  	:
		  	<SaveButton />
		  	}
		  </Box>
        </Box>
	  </>
  )
};

export default UsuariosCadastroPage
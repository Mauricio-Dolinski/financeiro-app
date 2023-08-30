import React from "react";
import { Title } from "../components/Title";
import Box from "@mui/material/Box";
import { SaveButton } from "../components/SaveButton";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MyInput } from "../components/MyInput";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const UsuariosCadastroPage = () => {
	
	const [showPassword, setShowPassword] = React.useState(false);
	const { user } = useAuth();
	
	const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    	event.preventDefault();
    };
    
    const navigate = useNavigate();
  	
  const handleSubmit = async (event) => {
	
	event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entity = "usuarios";
    const params = new URLSearchParams(data);
	
	if (data){
		if (toast.isActive(entity+"toast")){
			toast.update(entity+"toast", {render: "Cadastrando...", type: "loading", isLoading: true, hideProgressBar: true, autoClose: false, closed: false});
		}
		else{
			toast.loading("Cadastrando...", {
      			toastId: entity+"toast", closeButton: true, closeOnClick: true
    		});
		}
	    await axios.post('http://localhost:8080/api/'+entity, params.toString(), {
			headers: {
            	"content-type": "application/x-www-form-urlencoded"
        	},
			auth: {
				username: user.user,
  				password: user.password
			}
		}).then(response => {
			if (response.data === "Cadastrado"){
				toast.update(entity+"toast", {render: response.data, type: "success", isLoading: false, hideProgressBar: false, autoClose: 1200});
    			navigate("/"+entity, { replace: true });
			}
			else{
				toast.update(entity+"toast", {render: response.data, type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			}
	        
	      }).catch(error => { 
			  if (error.response && error.response.status === 401){
				    toast.update(entity+"toast", {render: "Acesso negado", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			  }
			  else {
				  toast.update(entity+"toast", {render: "Servidor de login offline", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			  }
	      });
    }
  };
  
  return (
	  <>
	  	<Title name="Usuários - Cadastrar" />
	  	<Box component="form" onSubmit={handleSubmit} gap="25px" sx={{ display: "flex", flexDirection: "column", m: "0px", p: "0px", alignItems: "flex-start" }}>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="name" label="Nome Completo" color="success"/>
	  	  	<MyInput name="email" label="Email" color="success"/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
            <MyInput name="username" label="Usuário" color="success"/>
            <MyInput name="role" label="Nivel de Acesso" color="success"/>
            <Box sx={{width: "100%", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
	          <Typography variant="h6" sx={{display: "flex", fontWeight: 'bold', marginRight: "25px"}}>
	             Senha
	          </Typography>
	          <FormControl sx={{mt: 1, width: 1 }} variant="outlined">
	          <InputLabel color="success" htmlFor="password">Senha *</InputLabel>
	          <OutlinedInput
	          	sx={{width: "100%"}}
	            id="password"
	            type={showPassword ? 'text' : 'password'}
	            color="success"
	            endAdornment={
	              <InputAdornment position="end">
	                <IconButton
	                  aria-label="toggle password visibility"
	                  onClick={handleClickShowPassword}
	                  onMouseDown={handleMouseDownPassword}
	                  edge="end"
	                >
	                  {showPassword ? <VisibilityOff /> : <Visibility />}
	                </IconButton>
	              </InputAdornment>
	            }
	            label="Senha"
	            required
	            autoComplete="current-password"
	            name="password"
	          	/>
	        	</FormControl>
        	  </Box>
            </Box>
          <Box sx={{display: "flex", alignItems: "flex-start"}} > 
		  	<SaveButton />
		  </Box>
        </Box>
	  </>
  )
};

export default UsuariosCadastroPage
import React from "react";
import { Title } from "../components/Title";
import {Table} from "../components/Table";
import Box from "@mui/material/Box";
import { AddButton } from "../components/AddButton";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MyInput } from "../components/MyInput";


const UsuariosCadastroPage = () => {
	
	const [showPassword, setShowPassword] = React.useState(false);
	
	const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    	event.preventDefault();
    };
	  
	const handleSubmit = (event) => {
    	event.preventDefault();
    	const data = new FormData(event.currentTarget);
  	};
  
  return (
	  <>
	  	<Title name="Usuários - Cadastrar" />
	  	<Box component="form" onSubmit={handleSubmit} gap="25px" noValidate sx={{ display: "flex", flexDirection: "column", m: "0px", p: "0px", alignItems: "flex-start" }}>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
	  	  	<MyInput name="name" label="Nome Completo" color="success"/>
	  	  	<MyInput name="email" label="Email" color="success"/>
	  	  </Box>
	  	  <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
            <MyInput name="user" label="Usuário" color="success"/>
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
		  	<AddButton />
		  </Box>
        </Box>
	  </>
  )
};

export default UsuariosCadastroPage
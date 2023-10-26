import logo from "../images/logo/logo max.jpg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, {useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const RecoverPage = () => {
	const navigate = useNavigate();

  const [submitText, setSubmitText] = useState('Enviar Email de Recuperação');
  const [emailHidden, setEmailHidden] = useState('normal');
  const [senhaHidden, setSenhaHidden] = useState('none');
  const [isCodigo, setIsCodigo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isWaitingData, setIsWaitingData] = useState(false);

  const url = 'http://localhost:8080/api/'

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const showResponse = (toastId, options, response) => {
    setIsWaitingData(false);
    options.render = response.data;
    if (response.data === "Senha modificada com sucesso"){
      options.type = "success";
      toast.update(toastId, options);
      navigate("/tcc", { replace: true });
    }
    else if (response.data === "Email de recuperação enviado"){
      options.type = "success";
      toast.update(toastId, options);
      setEmailHidden('none');
      setSubmitText('Recuperar Senha');
      setSenhaHidden('normal');
      setIsCodigo(true);
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

  const handleSubmit = async (event) => {
  
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams(data);

    if (data) {
      setIsWaitingData(true);
      const renderLabel = "Enviando...";
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
        }
      };
      await axios.put(url+"recuperar", params.toString(), config).then(response => {
        showResponse(toastId, options, response);
        
      }).catch(error => { 
        showError(toastId, options, error);
      });
      
    }
  };
	
  return (
	  <Container  maxWidth="xs">
	  <Grid container>
        <Grid item>
          <ArrowBackIosOutlinedIcon onClick={() => navigate("/")} color="primary" sx={{ cursor: "pointer" }}/>
        </Grid>
      </Grid>
	  
      <Box
        sx={{
          marginTop: 4.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
      
        <img src={logo} alt="Logo" width="400" height="120" />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField sx={{mt: 1, width: 1, display: { xl: emailHidden }}}
            margin="normal"
            required
            disabled={isWaitingData}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          {isCodigo && <TextField sx={{mt: 1, display: { xl: senhaHidden }}}
            margin="normal"
            required
            fullWidth
            id="codigo"
            label="Código de Recuperação"
            name="codigo"
            autoComplete="codigo"
          />}
          
          {isCodigo && <FormControl sx={{mt: 1, width: 1, display: { xl: senhaHidden }}} variant="outlined">
            <InputLabel htmlFor="password">Nova Senha *</InputLabel>
            <OutlinedInput
              id="senha"
              type={showPassword ? 'text' : 'password'}
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
              fullWidth
              name="senha"
            />
          </FormControl>}
          <Button
            type="submit"
            fullWidth
            disabled={isWaitingData}
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {submitText}
          </Button>
        </Box>  
      </Box>
    </Container>
   );
};

export default RecoverPage
import logo from "../images/logo/logo max.jpg";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { useNavigate } from "react-router-dom";

const RecoverPage = () => {
	const navigate = useNavigate();
	
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email1"
            label="Email"
            name="email1"
            autoComplete="email"
            autoFocus
          />
          <TextField sx={{mt: 1, width: 1 }}
            margin="normal"
            required
            fullWidth
            id="email2"
            label="Repetir Email"
            name="email2"
            autoComplete="email"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Recuperar senha
          </Button>
        </Box>  
      </Box>
    </Container>
   );
};

export default RecoverPage
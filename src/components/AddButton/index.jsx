
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import {FaPlus} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AddButton = () => {
	
	const navigate = useNavigate();
	
  return (
      <Box sx={{border: 'solid 2px', borderColor: '#2e7d32', alignSelf: 'center', margin: "1%", p: '0px',  bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      	<Button onClick={() => {
						  navigate('cadastrar')
					  }} sx={{ display: 'flex', height: '100%', borderRadius: 5, paddingX: '15px'}}>
      		<Avatar sx={{ marginRight: "10px", p: '0px', height: "30px", width: '30px', bgcolor: "#2e7d32"}}>
                  <FaPlus className="plusicon" />
            </Avatar>
	        <Typography color="#2e7d32" variant="h6" sx={{fontWeight: 'bold'}}>
	          Cadastrar
	        </Typography>
        </Button>
      </Box>
  );
};

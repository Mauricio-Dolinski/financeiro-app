
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";

export const SaveButton = ({action, isWaitingData=false}) => {
	
	const bgColor = action === "cadastrar" ? '#2e7d32' : '#f4b400';
	
  return (
    <Box sx={{ width: "100%", display: "flex", m: "1%"}}>
      <Box sx={{border: 'solid 2px', borderColor: bgColor, alignSelf: 'center', margin: '1%', p: '0px',  bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      	<Button type="submit" disabled={isWaitingData} sx={{ display: 'flex', height: '100%', borderRadius: 5, paddingX: '15px'}}>
      		
      		<Avatar sx={{ marginRight: "10px", p: '0px', height: "30px", width: '30px', bgcolor: bgColor}}>
      			  {action === "cadastrar" ? 
                  <FaPlus />
                  :
                  <RiEditBoxLine />
                  }
            </Avatar>
	        <Typography color={bgColor} variant="h6" sx={{fontWeight: 'bold'}}>
	          Salvar
	        </Typography>
        </Button>
      </Box>
    </Box>
  );
};

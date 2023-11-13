import "./styles.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from '@mui/material/Tooltip';

export const MyDashItem = ({tooltip="", title="", value=null}) => {

  let cor = 'blue';
  if (tooltip.includes("receber")){ 
    cor = 'green';
  }
  else if (tooltip.includes("pagar")){
    cor = 'red';
  }

  return (
    <>
      <Tooltip title={tooltip} arrow>
        <Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap:"5px", alignItems: 'center', color: '#757575', margin: '1%', p: "1%", bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
           <h5 className={cor} >
          {title}
             </h5>
           <h3 className={cor+"2"}>
          {value}
           </h3>
        </Box>
      </Tooltip>
    </>
  );
};

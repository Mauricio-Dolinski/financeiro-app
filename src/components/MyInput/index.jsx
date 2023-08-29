
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export const MyInput = ({ name, label, color}) => {
  return (
      <Box sx={{ width: "100%", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      	<Typography variant="h6" sx={{display: "flex", fontWeight: 'bold'}}>
          {label}
        </Typography>
        <TextField
            margin="0px"
            required
            id={name}
            label={label}
            name={name}
            autoComplete={name}
            color={color}
            sx={{ width: "100%", marginLeft: "25px" }}
          />
      </Box>
  );
};

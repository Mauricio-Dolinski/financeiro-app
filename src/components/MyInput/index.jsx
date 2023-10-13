
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export const MyInput = ({ name, label, isCadastro=true, isDisabled=false, isRequired=true, getValue}) => {
	
	const bgColor = isDisabled ? '#ccc' : '#fff';
    const editColor = isCadastro ? 'success' : 'warning';

    
	if (isDisabled){
		isRequired = false;
	}

  return (
      <Box sx={{ width: "100%", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: bgColor, borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      	<Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginRight: "25px" }}>
          {label}
        </Typography>
        <TextField
            margin="0px"
            required={isRequired}
            id={name}
            label={label}
            disabled={isDisabled}
            type="{isHidden}"
            name={name}
            defaultValue={getValue}
            autoComplete={name}
            color={editColor}
            sx={{ width: "100%"}}
          />
      </Box>
      
  );
};

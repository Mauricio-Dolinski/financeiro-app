
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

export const MySelect = ({ name, label, isCadastro=true, isDisabled=false, isRequired=true, getValue, options}) => {
	
	const bgColor = isDisabled ? '#ccc' : '#fff';
    const editColor = isCadastro ? 'success' : 'warning';
    
    
    
	if (isDisabled){
		isRequired = false;
	}
	
	if (isCadastro){
		getValue = options[0];
	}

  return (
      <Box sx={{ width: "100%", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: bgColor, borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      	<Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginRight: "25px" }}>
          {label}
        </Typography>
        <FormControl fullWidth>
				  <InputLabel id="role_label">Nivel de Acesso</InputLabel>
				  <Select
				  	margin="0px"
				  	required={isRequired}
				    id="role"
				    label="Nivel de Acesso"
				    disabled={isDisabled}
				    name="role"
				    defaultValue={getValue}
				    autoComplete={name}
            		color={editColor}
				    sx={{ width: "100%"}}
				  >
				  {options.map((option) => {
					    return (
					       <MenuItem value={option}>{option}</MenuItem>
					      )
					 })}
				  </Select>
				</FormControl>
      </Box>
      
  );
};

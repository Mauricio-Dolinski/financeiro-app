
import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";

export const MySelect = ({ name, label, isCadastro=true, isDisabled=false, isRequired=true, getValue, options, funcOnChange=null,  width="100%", size="medium"}) => {
	
	const bgColor = isDisabled ? '#ccc' : '#fff';
    const editColor = isCadastro ? 'success' : 'warning';
    var isReq = false;
    
	if (isDisabled){
		isRequired = false;
	}
	
	if (isCadastro){
		getValue = options.value[0];
	}

  return (
      <Box sx={{ width: {width}, display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: bgColor, borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      	<Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginRight: "25px" }}>
          {label}
        </Typography>
        <FormControl fullWidth>
				  <InputLabel id={label}>{label}</InputLabel>
				  <Select
				  	margin="0px"
				  	required={isRequired}
				    id={name}
				    label={label}
				    disabled={isDisabled}
				    name={name}
				    size={size}
				    defaultValue={getValue}
				    onChange={funcOnChange}
				    autoComplete={name}
            color={editColor}
				    sx={{ width: "100%"}}
				  >
				  {options.key.map((key) => {
					    return (
					       <MenuItem value={options.value[key]}>{options.name[key]}</MenuItem>
					      )
					 })}
				  </Select>
				</FormControl>
      </Box>
      
  );
};

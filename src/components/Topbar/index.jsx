import React from 'react'
import { Container } from './styles'
import Person from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { useLocalStorage } from "./../../hooks/useLocalStorage";
import { IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { useAuth } from "../../hooks/useAuth";

const Topbar = () => {
	
	const [userData] = useLocalStorage("user", null);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { logout } = useAuth();

	
	  const handleMenu = (event) => {
	    setAnchorEl(event.currentTarget);
	  };
	
	  const handleClose = () => {
	    setAnchorEl(null);
	  };

  return (
    <Container>
    	
      <Box
		sx={{
          display: 'flex',
          alignSelf: 'flex-start',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '64px',
          flexDirection: 'row-reverse',
          borderRadius: "50px",
        }}
       >
       <Toolbar sx={{ display: "flex", width:'80px', m: "0px", p: "0px"}}>
          {(
            <Box sx={{ m: "0px", p: "0px"}}>
              <IconButton size="40px" onClick={handleMenu} sx={{ m: "0px", p: "0px"}}>
                <Avatar sx={{ m: "0px", p: '0px', height: "40px", width: '40px', bgcolor: "primary.suspended"}}>
                  <Person sx={{ height: "30px", width: '30px'}}/>
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem key={"logout"} onClick={logout}>Sair</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
        {userData && <Typography variant="h6" color='#8a8a8a' 
        sx={{
          m: "0px"
        }}
        >{userData.name}  -  {userData.role}</Typography>}
      </Box>
      
    </Container>
  )
}

export default Topbar
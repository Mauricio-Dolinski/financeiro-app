import React, { useState } from 'react'
import { Container } from './styles'
import { FaBars } from 'react-icons/fa'
import Sidebar from '../Sidebar'
import Person from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

const Topbar = () => {
  const [sidebar, setSidebar] = useState(false)

  const showSiderbar = () => setSidebar(!sidebar)

  return (
    <Container>
    
      <FaBars onClick={showSiderbar} />
      {sidebar && <Sidebar active={setSidebar} />}
      <Box position="fixed" right="0px"
		sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          borderRadius: "50px",
        }}
       >
        <Avatar sx={{ m: "10px", width: "30px", height: "30px", bgcolor: "primary.suspended"}}><Person /></Avatar>
        <Typography color='text.secondary' 
        sx={{
          m: "12.5px",
        }}
        > Mauricio da Mota Porelli Dolinski - Administrador </Typography>
      </Box>
      
    </Container>
  )
}

export default Topbar
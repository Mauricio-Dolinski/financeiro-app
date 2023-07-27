import Container from "@mui/material/Container";
//import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Title = ({ name}) => {
  return (
    <Container component="main" maxWidth="100%" sx={{ float: "left" }}>
      <Box sx={{ m: 2, p: 1, bgcolor: "#ffffff", float: "right", borderRadius: 5, boxShadow: "2px 2px 3px 0px"}}>
        <Typography variant="h5">
          {name}
        </Typography>
      </Box>
    </Container>
  );
};

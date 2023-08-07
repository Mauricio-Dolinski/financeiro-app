import Container from "@mui/material/Container";
//import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Title = ({ name}) => {
  return (
    <Container component="title" maxWidth="100%" sx={{ margin: 0}}>
      <Box sx={{ m: 2, p: 1, bgcolor: "#ffffff", float: "left", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
        <Typography variant="h5">
          {name}
        </Typography>
      </Box>
    </Container>
  );
};

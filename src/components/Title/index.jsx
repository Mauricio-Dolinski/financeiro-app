
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Title = ({ name}) => {
  return (
      <Box sx={{ color: '#757575', alignSelf: 'start', marginX: '25px', p: 2, bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
        <Typography variant="h5" sx={{fontWeight: 'bold'}}>
          {name}
        </Typography>
      </Box>
  );
};

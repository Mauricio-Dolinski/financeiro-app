
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Title = ({ name}) => {
  return (
      <Box sx={{ color: '#333', alignSelf: 'start', marginX: '25px', p: 2, bgcolor: "#ffffff", borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
        <Typography variant="h5">
          {name}
        </Typography>
      </Box>
  );
};

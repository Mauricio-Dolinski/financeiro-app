import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from "@mui/material";

export const EntradasSaidas = ({ entradas=70, saidas=30 }) => {

  var data = [entradas, saidas ];


  const currencyFormatter = (v) => {
    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v.value);

  }

  return (
      <Box noWrap sx={{ width: "100%", display: 'flex', maxWidth: "15vw",  maxHeight: "15vh", color: '#757575', maxWidth: "230px", margin: '1%', minWidth: "0", p: 0, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: data[0], label: 'Entradas', color: "#2e7d32"},
              { id: 1, value: data[1], label: 'Saídas', color: "#d32f2f"},
            ],
            valueFormatter: (v) => {
              return currencyFormatter(v);
            },
            highlightScope: { faded: 'global', highlighted: 'item' },
            innerRadius: 10,
            outerRadius: 30,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: 360,
            endAngle: 0,
          }

          ]}
      />
      </Box>
  );
};

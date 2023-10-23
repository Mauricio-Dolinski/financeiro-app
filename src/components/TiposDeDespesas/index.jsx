import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from "@mui/material";

export const TiposDeDespesas = ({ getData=null }) => {

  var data = getData;

  if (data === null)
  {
    data = [55, 20, 10, 5, 10, 0, 0, 0];
  }

  const currencyFormatter = (v) => {
    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v.value);

  }

  return (
      <Box sx={{ width: "60%", display: 'flex', flexDirection: "column", maxWidth: "550px",  maxHeight: "550px", alignItems: "center", color: '#757575', marginX: '25px', minWidth: "0", p: 0, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      <Typography variant="h3" sx={{fontWeight: 'bold', fontSize: "24px", paddingTop: "20px"}}>
          Despesas
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: data[0], label: 'Combustível' },
              { id: 1, value: data[1], label: 'Salário' },
              { id: 2, value: data[2], label: 'Encargo' },
              { id: 3, value: data[3], label: 'Seguro' },
              { id: 4, value: data[4], label: 'Imposto' },
              { id: 5, value: data[5], label: 'Emprestimo' },
              { id: 6, value: data[6], label: 'Administrativo', color: "#42c5F4"},
              { id: 7, value: data[7], label: 'Outros', color: "#32c5a4" },
            ],
            valueFormatter: (v) => {
              return currencyFormatter(v);
            },
            highlightScope: { faded: 'global', highlighted: 'item' },
            innerRadius: 30,
            outerRadius: 130,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
          }

          ]}
      />
      </Box>
  );
};

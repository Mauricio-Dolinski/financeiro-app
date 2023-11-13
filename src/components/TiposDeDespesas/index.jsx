import "./styles.css";
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from "@mui/material";

export const TiposDeDespesas = ({ getData=null }) => {

  var data = getData;

  if (data === null)
  {
    data = [55, 10 , 20, 5, 5, 10, 0, 0, 0];
  }

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  const outer = (vw / 100) * 8;
  const inner = (vw / 100) * 2;

  const currencyFormatter = (v) => {
    return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(v.value);

  }

  return (
      <Box className="TipoDeDespesas" sx={{ width: "60%", display: 'flex', flexDirection: "column", maxWidth: "55vw",  maxHeight: "50vh", minWidth: "30vw", minHeight: "30vh", alignItems: "center", color: '#757575', margin: '1%', minWidth: "0", p: 0, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
      <Typography variant="h3" sx={{fontWeight: 'bold', fontSize: "20px", paddingTop: "20px"}}>
          Despesas Criadas
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: data[0], label: 'Combustível' },
              { id: 1, value: data[1], label: 'Manutenção' },
              { id: 2, value: data[2], label: 'Salário' },
              { id: 3, value: data[3], label: 'Encargo' },
              { id: 4, value: data[4], label: 'Seguro' },
              { id: 5, value: data[5], label: 'Imposto' },
              { id: 6, value: data[6], label: 'Emprestimo', color: "#22f5c4"},
              { id: 7, value: data[7], label: 'Administrativo', color: "#42c5F4"},
              { id: 8, value: data[8], label: 'Outros', color: "#32c5a4" },
            ],
            valueFormatter: (v) => {
              return currencyFormatter(v);
            },
            highlightScope: { faded: 'global', highlighted: 'item' },
            innerRadius: inner,
            paddingAngle: 2,
            cornerRadius: 5,
            startAngle: 0,
            endAngle: 360,
          }

          ]}
          sx={{m: "2%", p: "2%"}}
      />
      </Box>
  );
};

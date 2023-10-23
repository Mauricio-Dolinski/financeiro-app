import { LineChart } from '@mui/x-charts/LineChart';
import Box from "@mui/material/Box";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

export const FluxoDeCaixa = () => {

  const days = 30;
  const data = [
    28129.00, 28129.00, 28294.26, 28619.80, 28336.16, 28907.97, 29418.86, 29736.64, 30341.80,
    31323.78, 32284.61, 33409.68, 33920.98, 34152.73, 34292.03, 35093.82,
    35495.46, 36166.16, 36845.68, 36761.79, 35534.92, 36086.72, 36691.00, 36571.00,
    36632.00, 36527.00, 36827.00, 37124.00, 37895.00, 38515.91, 39515.91, 40515.91, 40515.91, 41515.91, 41215.91, 41715.91, 41515.91
  ];

  const data_projecao = [
    28000, 28000, 28000, 28000, 28000, 28000, 28000, 28000, 28000,
    28000, 28000, 28000, 28000, 28000, 28000, 28000, 28000,
    28000, 28000, 28000, 28000, 28000, 28000, 28000, 28000,
    28000, 28000, 28000, 28000, 28000,
    39515.91, 40515.91, 40515.91, 41515.91, 41215.91, 41715.91, 41515.91
  ];

  const today = dayjs().startOf('date');

  const time = [
  today.subtract(29, 'day').toDate(),
  today.subtract(28, 'day').toDate(),
  today.subtract(27, 'day').toDate(),
  today.subtract(26, 'day').toDate(),
  today.subtract(25, 'day').toDate(),
  today.subtract(24, 'day').toDate(),
  today.subtract(23, 'day').toDate(),
  today.subtract(22, 'day').toDate(),
  today.subtract(21, 'day').toDate(),
  today.subtract(20, 'day').toDate(),
  today.subtract(19, 'day').toDate(),
  today.subtract(18, 'day').toDate(),
  today.subtract(17, 'day').toDate(),
  today.subtract(16, 'day').toDate(),
  today.subtract(15, 'day').toDate(),
  today.subtract(14, 'day').toDate(),
  today.subtract(13, 'day').toDate(),
  today.subtract(12, 'day').toDate(),
  today.subtract(11, 'day').toDate(),
  today.subtract(10, 'day').toDate(),
  today.subtract(9, 'day').toDate(),
  today.subtract(8, 'day').toDate(),
  today.subtract(7, 'day').toDate(),
  today.subtract(6, 'day').toDate(),
  today.subtract(5, 'day').toDate(),
  today.subtract(4, 'day').toDate(),
  today.subtract(3, 'day').toDate(),
  today.subtract(2, 'day').toDate(),
  today.subtract(1, 'day').toDate(),
  today.toDate(),
  today.add(1, 'day').toDate(),
    today.add(2, 'day').toDate(),
    today.add(3, 'day').toDate(),
    today.add(4, 'day').toDate(),
    today.add(5, 'day').toDate(),
    today.add(6, 'day').toDate(),
    today.add(7, 'day').toDate()
];


  const options = { month: 'numeric', day: 'numeric' };

  const formatter = (v) => {
    if (v === null) return "";
    return v.toLocaleString('pt-BR', options);
  }

  const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format;

  return (
      <Box sx={{ width: "100%", maxHeight: "550px", display: 'flex',color: '#757575', marginX: '25px', p: 2, minWidth: "0",  bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
        <LineChart
          sx={{ color: '#1565c0'}}
          xAxis={[{ 
            scaleType: 'time', 
            data: time,
            valueFormatter: (v) => {
              return formatter(v);
            }
            }]}
          series={[
            {
              color: '#1565c0', showMark: false, label: 'Fluxo de Caixa', data: data,
              valueFormatter: currencyFormatter,
            },
            {
              color: '#F4B400', showMark: false, label: 'Projeção Futura (7 dias)', data: data_projecao,
              valueFormatter: currencyFormatter,
            },
          ]}
        />
      </Box>
  );
};

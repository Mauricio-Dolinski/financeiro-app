import { LineChart } from '@mui/x-charts/LineChart';
import Box from "@mui/material/Box";
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import React, { useState } from "react";


export const FluxoDeCaixa = ({ getFluxo, getProjecao, days=30 }) => {

  const data = getFluxo;

  const projecao = getProjecao;

  /*
  if (data === null)
  {
    data = [
      28129.00, 28129.00, 28294.26, 28619.80, 28336.16, 28907.97, 29418.86, 29736.64, 30341.80,
      31323.78, 32284.61, 33409.68, 33920.98, 34152.73, 34292.03, 35093.82,
      35495.46, 36166.16, 36845.68, 36761.79, 35534.92, 36086.72, 36691.00, 36571.00,
      36632.00, 36527.00, 36827.00, 37124.00, 37895.00, 38515.91
    ];
  }

  if (data_projecao === null){
    data_projecao = [
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    38915.91,  39515.91, 40515.91, 40515.91, 41515.91, 41215.91, 41715.91, 41515.91
    ];
  }*/

  const today = dayjs().startOf('date');

  const getTime = () => {
    if (days === 30)
      return [
    today.subtract(30, 'day').toDate(),
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
    else if (days === 60)
    return [
    today.subtract(60, 'day').toDate(),
    today.subtract(59, 'day').toDate(),
    today.subtract(58, 'day').toDate(),
    today.subtract(57, 'day').toDate(),
    today.subtract(56, 'day').toDate(),
    today.subtract(55, 'day').toDate(),
    today.subtract(54, 'day').toDate(),
    today.subtract(53, 'day').toDate(),
    today.subtract(52, 'day').toDate(),
    today.subtract(51, 'day').toDate(),
    today.subtract(50, 'day').toDate(),
    today.subtract(49, 'day').toDate(),
    today.subtract(48, 'day').toDate(),
    today.subtract(47, 'day').toDate(),
    today.subtract(46, 'day').toDate(),
    today.subtract(45, 'day').toDate(),
    today.subtract(44, 'day').toDate(),
    today.subtract(43, 'day').toDate(),
    today.subtract(42, 'day').toDate(),
    today.subtract(41, 'day').toDate(),
    today.subtract(40, 'day').toDate(),
    today.subtract(39, 'day').toDate(),
    today.subtract(38, 'day').toDate(),
    today.subtract(37, 'day').toDate(),
    today.subtract(36, 'day').toDate(),
    today.subtract(35, 'day').toDate(),
    today.subtract(34, 'day').toDate(),
    today.subtract(33, 'day').toDate(),
    today.subtract(32, 'day').toDate(),
    today.subtract(31, 'day').toDate(),
    today.subtract(30, 'day').toDate(),
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
    else if (days === 90)
    return [
    today.subtract(90, 'day').toDate(),
    today.subtract(89, 'day').toDate(),
    today.subtract(88, 'day').toDate(),
    today.subtract(87, 'day').toDate(),
    today.subtract(86, 'day').toDate(),
    today.subtract(85, 'day').toDate(),
    today.subtract(84, 'day').toDate(),
    today.subtract(83, 'day').toDate(),
    today.subtract(82, 'day').toDate(),
    today.subtract(81, 'day').toDate(),
    today.subtract(80, 'day').toDate(),
    today.subtract(79, 'day').toDate(),
    today.subtract(78, 'day').toDate(),
    today.subtract(77, 'day').toDate(),
    today.subtract(76, 'day').toDate(),
    today.subtract(75, 'day').toDate(),
    today.subtract(74, 'day').toDate(),
    today.subtract(73, 'day').toDate(),
    today.subtract(72, 'day').toDate(),
    today.subtract(71, 'day').toDate(),
    today.subtract(70, 'day').toDate(),
    today.subtract(69, 'day').toDate(),
    today.subtract(68, 'day').toDate(),
    today.subtract(67, 'day').toDate(),
    today.subtract(66, 'day').toDate(),
    today.subtract(65, 'day').toDate(),
    today.subtract(64, 'day').toDate(),
    today.subtract(63, 'day').toDate(),
    today.subtract(62, 'day').toDate(),
    today.subtract(61, 'day').toDate(),
    today.subtract(60, 'day').toDate(),
    today.subtract(59, 'day').toDate(),
    today.subtract(58, 'day').toDate(),
    today.subtract(57, 'day').toDate(),
    today.subtract(56, 'day').toDate(),
    today.subtract(55, 'day').toDate(),
    today.subtract(54, 'day').toDate(),
    today.subtract(53, 'day').toDate(),
    today.subtract(52, 'day').toDate(),
    today.subtract(51, 'day').toDate(),
    today.subtract(50, 'day').toDate(),
    today.subtract(49, 'day').toDate(),
    today.subtract(48, 'day').toDate(),
    today.subtract(47, 'day').toDate(),
    today.subtract(46, 'day').toDate(),
    today.subtract(45, 'day').toDate(),
    today.subtract(44, 'day').toDate(),
    today.subtract(43, 'day').toDate(),
    today.subtract(42, 'day').toDate(),
    today.subtract(41, 'day').toDate(),
    today.subtract(40, 'day').toDate(),
    today.subtract(39, 'day').toDate(),
    today.subtract(38, 'day').toDate(),
    today.subtract(37, 'day').toDate(),
    today.subtract(36, 'day').toDate(),
    today.subtract(35, 'day').toDate(),
    today.subtract(34, 'day').toDate(),
    today.subtract(33, 'day').toDate(),
    today.subtract(32, 'day').toDate(),
    today.subtract(31, 'day').toDate(),
    today.subtract(30, 'day').toDate(),
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
  }

  const proj = () => {
    if (days === 30)
    return [
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    projecao[0],  projecao[1], projecao[2], projecao[3], projecao[4], projecao[5], projecao[6], projecao[7]
    ];
    else if (days === 60)
    return [
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    projecao[0],  projecao[1], projecao[2], projecao[3], projecao[4], projecao[5], projecao[6], projecao[7]
    ];
    else if (days === 90)
    return [
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    undefined, undefined, undefined, undefined, undefined, 
    projecao[0],  projecao[1], projecao[2], projecao[3], projecao[4], projecao[5], projecao[6], projecao[7]
    ];
  }
  


  const options = { month: 'numeric', day: 'numeric' };

  const formatter = (value) => {
    if (value === null) return "";
    return value.toLocaleString('pt-BR', options);
  }

  const currencyFormatter = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  //procurando min e max dos array

  var min = Infinity;
  var max = -Infinity;
  for (let item of data) {
      
      // Find minimum value
      if (item !== undefined && item < min)
      min = item;
                  
      // Find maximum value
      if (item !== undefined && item > max)
      max = item;
  }

  for (let item of projecao) {
      
      // Find minimum value
      if (item !== undefined && item < min)
      min = item;
                  
      // Find maximum value
      if (item !== undefined && item > max)
      max = item;
  }

  min = min - 1000;
  max = max + 1000;


  return (
      <Box sx={{ width: "100%", maxHeight: "550px", display: 'flex',color: '#757575', marginX: '25px', p: 2, minWidth: "0",  bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
        <LineChart
          sx={{p: 5, color: '#1565c0'}}
          xAxis={[{ 
            scaleType: 'time', 
            data: getTime(),
            valueFormatter: (value) => {
              return formatter(value);
            }
            }]}
          yAxis={[{ 
            scaleType: 'linear', 
            min: min, 
            max: max,
            valueFormatter: (value) => {
              if (value == null || value == undefined) {
                  return undefined;
              }
              else {
                return currencyFormatter(value);
              }
            }
            }]}
          series={[
            {
              color: '#1565c0', showMark: false, label: 'Fluxo de Caixa', data: data,
              valueFormatter: (value) => {
                if (value == null || value == undefined) {
                  return undefined;
                }
                else {
                  return currencyFormatter(value);
                }
              }
            },
            {
              color: '#F4B400', showMark: false, label: 'Projeção Futura (7 dias)', data: proj(),
              valueFormatter: (value) => {
                if (value == null || value == undefined) {
                  return undefined;
                }
                else {
                  return currencyFormatter(value);
                }
              }
            },
          ]}
        />
      </Box>
  );
};

import React, {useState } from "react";
import { Title } from "../components/Title";
import Box from "@mui/material/Box";
import { GerarButton } from "../components/GerarButton";
import { MySelect } from "../components/MySelect";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import 'dayjs/locale/pt-br';
import Typography from "@mui/material/Typography";
import Backdrop from '@mui/material/Backdrop';
import { FluxoDeCaixa } from "../components/FluxoDeCaixa";

const RelatoriosPage = () => {

  const [gerar, setGerar] = useState(false);
  const [isFluxoDeCaixa, setIsFluxoDeCaixa] = useState(false);
  const [open, setOpen] = useState(false);

  const options_tipo = 
  {
      "key": [
        0,
        1,
        2
      ],
      "name": [
        " ",
        "Fluxo de Caixa",
        "Outros"
      ],
      "value": [
        " ",
        "Fluxo de Caixa",
        "Outros"
      ]
  };

  const options_frequencia = 
  {
      "key": [
        0,
        1,
        2
      ],
      "name": [
        "Diário",
        "Semanal",
        "Mensal"
      ],
      "value": [
        "Diário",
        "Semanal",
        "Mensal"
      ]
  };

  const options_projecoes = 
  {
      "key": [
        0,
        1,
      ],
      "name": [
        "Sim",
        "Não"
      ],
      "value": [
        "Sim",
        "Não"
      ]
  };

  const handleSubmit = async (event) => {
  
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams(data);

    if (data && isFluxoDeCaixa) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const funcOnChangeTipo = (event) => {
    const value = event.target.value;
    if (value === " "){
      setGerar(false);
    }
    else {
      setGerar(true);
    }
    if (value === "Fluxo de Caixa"){
      setIsFluxoDeCaixa(true);
    }
    else {
      setIsFluxoDeCaixa(false);
    }
  };

  //Período Inicial e Final: Solicite ao usuário que especifique o intervalo de tempo para o qual eles desejam gerar o relatório de fluxo de caixa. Isso permitirá que o sistema calcule o fluxo de caixa para o período desejado.
  //Frequência de Atualização: Pergunte ao usuário com que frequência eles desejam atualizar o relatório (diariamente, semanalmente, mensalmente etc.). Isso pode afetar a granularidade das informações apresentadas no relatório.
  //Previsões ou Projeções Futuras: Se o sistema for capaz de gerar previsões financeiras, pergunte se os usuários desejam incluir projeções futuras no relatório, com base em cenários e estimativas.

  return (
    <>
      <Box sx={{display: 'flex', alignSelf: 'start', margin: '0px', width: '100%', p: 0, justifyContent: 'space-between'}}>
        <Title name="Relatórios" />
      </Box>
      <Box sx={{ width: "500px", display: "flex", flexDirection: "row"}}>
        <MySelect name="tipo" label="Tipo de Relatório" options={options_tipo} funcOnChange={funcOnChangeTipo}/>
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
        {isFluxoDeCaixa && <>
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row"}}>
            <Box sx={{ width: "500px", minWidth: "500px", display: 'flex', alignItems: 'center',color: '#757575', marginX: '25px', p: 2, bgcolor: '#fff', borderRadius: 5, boxShadow: "2px 2px 10px -3px"}}>
              <Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginRight: "25px" }}>
                Período
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                    label="Período Inicial"
                    format="DD/MM/YYYY"
                    defaultValue={dayjs().subtract(1, 'month')}
                    slotProps={{ textField: { name: 'data_inicial' } }}
                />
              </LocalizationProvider>
              <Typography variant="h6" sx={{display: "flex", flexGrow: "10", fontWeight: 'bold', marginX: "20px" }}>
                {' - '}
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                <DatePicker
                    label="Período Final"
                    format="DD/MM/YYYY"
                    defaultValue={dayjs()}
                    slotProps={{ textField: { name: 'data_final' } }}
                />
              </LocalizationProvider>
            </Box>
            <MySelect name="frequencia" label="Frequencia dos Dados" options={options_frequencia}/>
            <MySelect name="projecoes" label="Projeções Futuras?" options={options_projecoes}/>
          </Box>
          </>
        }
        <Box sx={{display: "flex", flexDirection: "row", marginTop: "25px"}}>
          {gerar && <GerarButton />}
        </Box>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Box sx={{ width: "80%", height: "80%", display: "flex", flexDirection: "row", marginBottom: "25px"}}>
          <FluxoDeCaixa />
        </Box>
      </Backdrop>

      
    </>



  )
};

export default RelatoriosPage
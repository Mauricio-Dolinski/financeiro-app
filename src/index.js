import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import { ptBR } from '@mui/material/locale';

import { router } from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme(
  {
    palette: {
      primary: { main: '#3a34d2' },
    },
  },
  ptBR,
);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
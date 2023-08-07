import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer
} from "react-router-dom";
import LoginPage from "./pages/Login";
import RecoverPage from "./pages/Recover";
import DashboardPage from "./pages/Dashboard";
import UsuariosPage from "./pages/Usuarios";
import MotoristasPage from "./pages/Motoristas";
import VeiculosPage from "./pages/Veiculos";
import FretesPage from "./pages/Fretes";
import ClientesPage from "./pages/Clientes";
import ReceitasPage from "./pages/Receitas";
import ContasReceberPage from "./pages/ContasReceber";
import DespesasPage from "./pages/Despesas";
import ContasPagarPage from "./pages/ContasPagar";
import RelatoriosPage from "./pages/Relatorios";

import MainLayout from "./components/MainLayout";
import LoginLayout from "./components/LoginLayout";
import AuthLayout from "./components/AuthLayout";
import "./App.css";

//TODO: ideally this would be an API call to server to get logged in user data

const getUserData = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const userData = window.localStorage.getItem("user");
      const userObject = JSON.parse(userData);

      if (userObject && userObject.user === "admin" && userObject.password === "admin") {
		  
		  resolve(userData);
	  } 
	  else  if (userObject && userObject.user === "operador" && userObject.password === "operador") {
		  
		  resolve(userData);
	  } 
	  else  if (userObject && userObject.user === "motorista" && userObject.password === "motorista") {
		  
		  resolve(userData);
	  } 
      else if (userObject === null){
		  resolve(userData);
	  }
	  
	  else {
		  reject("Error");
	  }
    }, 300)
  );

// for error
// const getUserData = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       reject("Error");
//     }, 3000)
//   );

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<LoginLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/recuperar" element={<RecoverPage />} />
        <Route path="*" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/motoristas" element={<MotoristasPage />} />
        <Route path="/veiculos" element={<VeiculosPage />} />
        <Route path="/fretes" element={<FretesPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/receitas" element={<ReceitasPage />} />
        <Route path="/contas-a-receber" element={<ContasReceberPage />} />
        <Route path="/despesas" element={<DespesasPage />} />
        <Route path="/contas-a-pagar" element={<ContasPagarPage />} />
        <Route path="/relatorios" element={<RelatoriosPage />} />
      </Route>
    </Route>
  )
);


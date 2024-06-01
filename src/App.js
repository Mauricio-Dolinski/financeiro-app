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
import UsuariosCadastroPage from "./pages/UsuariosCadastro";
import MotoristasPage from "./pages/Motoristas";
import MotoristasCadastroPage from "./pages/MotoristasCadastro";
import VeiculosPage from "./pages/Veiculos";
import VeiculosCadastroPage from "./pages/VeiculosCadastro";
import FretesPage from "./pages/Fretes";
import FretesCadastroPage from "./pages/FretesCadastro";
import ClientesPage from "./pages/Clientes";
import ClientesCadastroPage from "./pages/ClientesCadastro";
import ReceitasPage from "./pages/Receitas";
import ReceitasCadastroPage from "./pages/ReceitasCadastro";
import ContasReceberPage from "./pages/ContasReceber";
import DespesasPage from "./pages/Despesas";
import DespesasCadastroPage from "./pages/DespesasCadastro";
import ContasPagarPage from "./pages/ContasPagar";
import RelatoriosPage from "./pages/Relatorios";

import MainLayout from "./components/MainLayout";
import LoginLayout from "./components/LoginLayout";
import AuthLayout from "./components/AuthLayout";
import "./App.css";


import axios from 'axios';

  const auth = async () => {

	  const userData = window.localStorage.getItem("user");
    const userObject = JSON.parse(userData);
	  if (userObject){
	    await axios.post('https://financeiro-api-1-eaad692ff6da.herokuapp.com/api/login', { }, {
			auth: {
				username: userObject.user,
  				password: userObject.password
			}
		}).then(response => {
          window.localStorage.setItem("user", userData);
          window.localStorage.setItem("usuarios", []);
          window.localStorage.setItem("motoristas", []);
          window.localStorage.setItem("veiculos", []);
          window.localStorage.setItem("fretes", []);
          window.localStorage.setItem("clientes", []);
          window.localStorage.setItem("receitas", []);
          window.localStorage.setItem("contas-a-receber", []);
          window.localStorage.setItem("despesas", []);
          window.localStorage.setItem("contas-a-pagar", []);
	        return new Promise((resolve, reject) => resolve(userObject));
      }).catch(error => { 
		  //
      window.localStorage.clear();
		  return new Promise((resolve, reject) => reject("Error"));
      });
    }
    window.localStorage.setItem("user", userData);
    window.localStorage.setItem("usuarios", []);
    window.localStorage.setItem("motoristas", []);
    window.localStorage.setItem("veiculos", []);
    window.localStorage.setItem("fretes", []);
    window.localStorage.setItem("clientes", []);
    window.localStorage.setItem("receitas", []);
    window.localStorage.setItem("contas-a-receber", []);
    window.localStorage.setItem("despesas", []);
    window.localStorage.setItem("contas-a-pagar", []);
    return new Promise((resolve, reject) => resolve(userObject));
  };

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      element={<AuthLayout />}
      loader={() => defer({ userPromise: auth() })}
    >
      <Route element={<LoginLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/financeiro-app/recuperar" element={<RecoverPage />} />
        <Route path="/financeiro-app" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/financeiro-app/dashboard" element={<DashboardPage />} />
        <Route path="/financeiro-app/usuarios" element={<UsuariosPage />} />
        <Route path="/financeiro-app/usuarios/cadastrar" element={<UsuariosCadastroPage />} />
        <Route path="/financeiro-app/usuarios/editar/:id" element={<UsuariosCadastroPage />} />
        <Route path="/financeiro-app/motoristas" element={<MotoristasPage />} />
        <Route path="/financeiro-app/motoristas/cadastrar" element={<MotoristasCadastroPage />} />
        <Route path="/financeiro-app/motoristas/editar/:id" element={<MotoristasCadastroPage />} />
        <Route path="/financeiro-app/veiculos" element={<VeiculosPage />} />
        <Route path="/financeiro-app/veiculos/cadastrar" element={<VeiculosCadastroPage />} />
        <Route path="/financeiro-app/veiculos/editar/:id" element={<VeiculosCadastroPage />} />
        <Route path="/financeiro-app/fretes" element={<FretesPage />} />
        <Route path="/financeiro-app/fretes/cadastrar" element={<FretesCadastroPage />} />
        <Route path="/financeiro-app/fretes/editar/:id" element={<FretesCadastroPage />} />
        <Route path="/financeiro-app/clientes" element={<ClientesPage />} />
        <Route path="/financeiro-app/clientes/cadastrar" element={<ClientesCadastroPage />} />
        <Route path="/financeiro-app/clientes/editar/:id" element={<ClientesCadastroPage />} />
        <Route path="/financeiro-app/receitas" element={<ReceitasPage />} />
        <Route path="/financeiro-app/receitas/cadastrar" element={<ReceitasCadastroPage />} />
        <Route path="/financeiro-app/receitas/editar/:id" element={<ReceitasCadastroPage />} />
        <Route path="/financeiro-app/contas-a-receber" element={<ContasReceberPage />} />
        <Route path="/financeiro-app/despesas" element={<DespesasPage />} />
        <Route path="/financeiro-app/despesas/cadastrar" element={<DespesasCadastroPage />} />
        <Route path="/financeiro-app/despesas/editar/:id" element={<DespesasCadastroPage />} />
        <Route path="/financeiro-app/contas-a-pagar" element={<ContasPagarPage />} />
        <Route path="/financeiro-app/relatorios" element={<RelatoriosPage />} />
      </Route>
    </Route>
  )
);


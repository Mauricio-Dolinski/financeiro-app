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
	    await axios.post('https://shielded-journey-60376-d85de0c32e4c.herokuapp.com/api/login', { }, {
			auth: {
				username: userObject.user,
  				password: userObject.password
			}
		}).then(response => {
	        return new Promise((resolve, reject) => resolve(userObject));
      }).catch(error => { 
		  window.localStorage.setItem("user", null);
		  return new Promise((resolve, reject) => reject("Error"));
      });
    }
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
        <Route path="recuperar" element={<RecoverPage />} />
        <Route path="/tcc" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="usuarios" element={<UsuariosPage />} />
        <Route path="usuarios/cadastrar" element={<UsuariosCadastroPage />} />
        <Route path="usuarios/editar/:id" element={<UsuariosCadastroPage />} />
        <Route path="motoristas" element={<MotoristasPage />} />
        <Route path="motoristas/cadastrar" element={<MotoristasCadastroPage />} />
        <Route path="motoristas/editar/:id" element={<MotoristasCadastroPage />} />
        <Route path="veiculos" element={<VeiculosPage />} />
        <Route path="veiculos/cadastrar" element={<VeiculosCadastroPage />} />
        <Route path="veiculos/editar/:id" element={<VeiculosCadastroPage />} />
        <Route path="fretes" element={<FretesPage />} />
        <Route path="fretes/cadastrar" element={<FretesCadastroPage />} />
        <Route path="fretes/editar/:id" element={<FretesCadastroPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="clientes/cadastrar" element={<ClientesCadastroPage />} />
        <Route path="clientes/editar/:id" element={<ClientesCadastroPage />} />
        <Route path="receitas" element={<ReceitasPage />} />
        <Route path="receitas/cadastrar" element={<ReceitasCadastroPage />} />
        <Route path="contas-a-receber" element={<ContasReceberPage />} />
        <Route path="despesas" element={<DespesasPage />} />
        <Route path="despesas/cadastrar" element={<DespesasCadastroPage />} />
        <Route path="contas-a-pagar" element={<ContasPagarPage />} />
        <Route path="relatorios" element={<RelatoriosPage />} />
      </Route>
    </Route>
  )
);


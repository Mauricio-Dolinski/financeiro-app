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
        <Route path="/tcc/recuperar" element={<RecoverPage />} />
        <Route path="/tcc" element={<LoginPage />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/tcc/dashboard" element={<DashboardPage />} />
        <Route path="/tcc/usuarios" element={<UsuariosPage />} />
        <Route path="/tcc/usuarios/cadastrar" element={<UsuariosCadastroPage />} />
        <Route path="/tcc/usuarios/editar/:id" element={<UsuariosCadastroPage />} />
        <Route path="/tcc/motoristas" element={<MotoristasPage />} />
        <Route path="/tcc/motoristas/cadastrar" element={<MotoristasCadastroPage />} />
        <Route path="/tcc/motoristas/editar/:id" element={<MotoristasCadastroPage />} />
        <Route path="/tcc/veiculos" element={<VeiculosPage />} />
        <Route path="/tcc/veiculos/cadastrar" element={<VeiculosCadastroPage />} />
        <Route path="/tcc/veiculos/editar/:id" element={<VeiculosCadastroPage />} />
        <Route path="/tcc/fretes" element={<FretesPage />} />
        <Route path="/tcc/fretes/cadastrar" element={<FretesCadastroPage />} />
        <Route path="/tcc/fretes/editar/:id" element={<FretesCadastroPage />} />
        <Route path="/tcc/clientes" element={<ClientesPage />} />
        <Route path="/tcc/clientes/cadastrar" element={<ClientesCadastroPage />} />
        <Route path="/tcc/clientes/editar/:id" element={<ClientesCadastroPage />} />
        <Route path="/tcc/receitas" element={<ReceitasPage />} />
        <Route path="/tcc/receitas/cadastrar" element={<ReceitasCadastroPage />} />
        <Route path="/tcc/receitas/editar/:id" element={<ReceitasCadastroPage />} />
        <Route path="/tcc/contas-a-receber" element={<ContasReceberPage />} />
        <Route path="/tcc/despesas" element={<DespesasPage />} />
        <Route path="/tcc/despesas/cadastrar" element={<DespesasCadastroPage />} />
        <Route path="/tcc/despesas/editar/:id" element={<DespesasCadastroPage />} />
        <Route path="/tcc/contas-a-pagar" element={<ContasPagarPage />} />
        <Route path="/tcc/relatorios" element={<RelatoriosPage />} />
      </Route>
    </Route>
  )
);


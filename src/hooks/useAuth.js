import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const URL_API = "https://shielded-journey-60376-d85de0c32e4c.herokuapp.com/api/";

  const login = async (data) => {
	
	if (data){
		// API call para checar o login se estiver ok o login entrar
		if (toast.isActive("logintoast")){
			toast.update("logintoast", {render: "Autenticando...", type: "loading", isLoading: true, hideProgressBar: true, autoClose: false, closed: false});
		}
		else{
			toast.loading("Autenticando...", {
      			toastId: "logintoast", closeButton: true, closeOnClick: true
    		});
		}
		
		
	    await axios.post(URL_API + 'login', { }, {
			auth: {
				username: data.user,
  				password: data.password
			}
		}).then(response => {
	        data.role = response.data.role;
	        data.name = response.data.name;
	        setUser(data);
	        toast.update("logintoast", {render: "Autenticado", type: "success", isLoading: false, hideProgressBar: false, autoClose: 1200});
    		navigate("/tcc/dashboard", { replace: true });
	      }).catch(error => { 
			  if (error.response && error.response.status === 401){
				    toast.update("logintoast", {render: "Usuário ou senha incorretos", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			  }
			  else {
				  toast.update("logintoast", {render: "Servidor de login offline", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			  }
	      });
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/tcc", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      URL_API
    }),
    [user]
  );

  return (
	  <>
	  	<ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
	    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	    
	  </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

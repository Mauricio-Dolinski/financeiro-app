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

  const login = async (data) => {
	
	if (data){
		// API call para checar o login se estiver ok o login entrar
		toast.loading("Autenticando...", {
      		toastId: "logintoast"
    	});
		
	    await axios.post('http://localhost:8080/api/login', { }, {
			auth: {
				username: data.user,
  				password: data.password
			}
		}).then(response => {
	        data.role = response.data.role;
	        data.name = response.data.name;
	        setUser(data);
	        toast.update("logintoast", {render: "Autenticado", type: "success", isLoading: false, hideProgressBar: false, autoClose: 1500});
    		navigate("/dashboard", { replace: true });
	      }).catch(error => { 
			  if (error.response && error.response.status === 401){
				    toast.update("logintoast", {render: "Usuário ou senha incorretos", type: "error", isLoading: false, hideProgressBar: false, autoClose: 3000});
			  }
			  else {
				  toast.update("logintoast", {render: "Servidor de login offline", type: "error", isLoading: false, hideProgressBar: false,autoClose: 3000 });
			  }
	      });
    }
	
	/* mudado pro backend
	if (data && data.user === "admin" && data.password === "a") {
		data.role = "Admin";
		data.name = "Mauricio da Mota Porelli Dolinski"
		setUser(data);
    	navigate("/dashboard", { replace: true });  
	}
	else if (data && data.user === "operador" && data.password === "a") {
		data.role = "Operador";
		data.name = "Sidney Dolinski"
		setUser(data);
    	navigate("/dashboard", { replace: true });  
	} 
	else if (data && data.user === "motorista" && data.password === "a") {
		data.role = "Motorista";
		data.name = "Luiz Carlos Graciano"
		setUser(data);
    	navigate("/dashboard", { replace: true });  
	} 
	 
	//se o login não for achado msg de erro ou ir para tela de recuperação
	else {
	  //navigate("/recuperar", { replace: false });  
	  toast.error("Usuário ou senha incorretos");
	}*/
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
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

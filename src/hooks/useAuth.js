import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const login = async (data) => {
	//TODO: API call para checar o login se estiver ok o login entrar
	if (data && data.user === "admin" && data.password === "admin") {
		data.role = "Admin";
		data.name = "Mauricio da Mota Porelli Dolinski"
		setUser(data);
    	navigate("/dashboard", { replace: true });  
	}
	else if (data && data.user === "operador" && data.password === "operador") {
		data.role = "Operador";
		data.name = "Sidney Dolinski"
		setUser(data);
    	navigate("/dashboard", { replace: true });  
	} 
	else if (data && data.user === "motorista" && data.password === "motorista") {
		data.role = "Motorista";
		data.name = "Luiz Carlos Graciano"
		setUser(data);
    	navigate("/dashboard", { replace: true });  
	} 
	 
	//se o login não for achado msg de erro ou ir para tela de recuperação
	else {
	  //navigate("/recuperar", { replace: false });  
	}
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

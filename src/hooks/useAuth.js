import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();
  

  const login = async (data) => {
	  
	//TODO: API call para checar o login se estiver ok o login entrar
	if (data && data.user === "admin" && data.password === "aaaaaa") {
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

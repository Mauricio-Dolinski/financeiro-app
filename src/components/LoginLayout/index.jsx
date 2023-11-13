import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import caminhoes from "../../images/caminhoes.jpg";
import "./styles.css";



 const LoginLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet(); 

  if (user) {
    return <Navigate to="/tcc/dashboard" replace />;
  }

  return (
    <div className="login-container">
      <div className="login-first-div">
        <img src={caminhoes} alt="Caminhões"/>
      </div>
      <div className="login-second-div">
        {outlet}
      </div>
    </div>
  );
};

export default LoginLayout
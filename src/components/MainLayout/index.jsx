import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Topbar  from "../Topbar";
//import Sidebar  from "../Sidebar";
import React from "react";
//import Container from "@mui/material/Container";

 const MainLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Topbar />
      {outlet}
    </div>
  );
};

export default MainLayout
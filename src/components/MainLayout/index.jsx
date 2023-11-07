import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Topbar  from "../Topbar";
import Sidebar  from "../Sidebar";
import React, { useState } from 'react'
import "./styles.css";
import { FaBars } from 'react-icons/fa';

 const MainLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  
  
  const [sidebar, setSidebar] = useState(true)
  const showSiderbar = () => setSidebar(!sidebar)
  

  if (!user) {
    return <Navigate to="/tcc" />;
  }

  return (
    <div className="app-container">
      <div className="sidebar-container">
        {sidebar && <Sidebar active={setSidebar} />}
        {sidebar && <FaBars className="testfabars" onClick={showSiderbar} />}
        {!sidebar && <FaBars className="testfabars2" onClick={showSiderbar} />}
      </div>
      <div className="content-container">
        <Topbar />
        {outlet}
      </div>
    </div>
  );
};

export default MainLayout
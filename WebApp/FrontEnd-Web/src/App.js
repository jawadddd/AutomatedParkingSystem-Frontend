
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginApplyPage from './Pages/LoginApplyPage';
import SuperAdminHomePage from './Pages/SuperAdminHomePage';
import RegisteredCompanies from './Pages/RegisteredCompanies';
import RejectedCompanies from './Pages/RejectedCompanies';

import CompanyAdminHomePage from './Pages/CompanyAdminHomePage';
import ApplicationDetail from './Pages/ApplicationDetail';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';


library.add(faBars);

function App() {
  return (
    <>
      <Router>
        <div className="pages">
          <Routes>
            <Route path="/" element={<LoginApplyPage />} />
            <Route path="/SuperAdminHomePage" element={<SuperAdminHomePage />} />
            <Route path="/SuperAdminHomePage/ApplicationDetail" element={<ApplicationDetail />} />

            <Route path="/SuperAdminHomePage/RegisteredCompanies" element={<RegisteredCompanies />} />
            <Route path="/SuperAdminHomePage/RegisteredCompanies/ApplicationDetail" element={<ApplicationDetail />} />
            <Route path="/SuperAdminHomePage/RejectedCompanies" element={<RejectedCompanies />} />
            <Route path="/SuperAdminHomePage/RejectedCompanies/ApplicationDetail" element={<ApplicationDetail />} />
            <Route path="/CompanyAdminHomePage" element={<CompanyAdminHomePage />} />
            
          
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

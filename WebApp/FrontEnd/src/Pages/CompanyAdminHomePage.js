import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import { SERVERURL } from "../ServerUrl";
import AdminSidebar from "../components/AdminSideBar";
import CompanyHeader from '../components/CompanyHeader';
import CompanyDashboard from '../components/CompanyDashboard';
import Logout from '../components/CompanyLogout';
import MapRange from "../components/MapRange";
import AvailableSlots from "../components/AvailableSlots";
import FilledSlots from "../components/FilledSlots";
import BookedSlots from "../components/BookedSlots";
import SetCost from "../components/SetCost";
import FindVehicle from "../components/FindVehicle";
import EditFloors from "../components/EditFloors";
import EditSlots from "../components/EditSlots";
const CompanyAdminHomePage = () => {
  const location = useLocation();
  const { state } = location;
  const [admin, setAdmin] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/api/v1/getAdminObjectByEmail`, {
          params: {
            email: state
          }
        });
        setAdmin(response.data.adminIs);
      } catch (error) {
        console.error("Error fetching Super admin data:", error.message);
      }
    };
  
    fetchAdmin();
  }, [state]);
  const handleCancelLogout = () => {
    setSelectedComponent('Dashboard'); // Set selectedComponent to 'Dashboard'
  };
  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Dashboard':
        return <CompanyDashboard  adminIs={admin} />;
      case 'Available Slots':
        return <AvailableSlots adminIs={admin}/>;
      case 'Booked Slots':
          return <BookedSlots  adminIs={admin}/>;
      case 'Filled Slots':
          return <FilledSlots  adminIs={admin}/>;
      case 'Set Cost':
          return <SetCost  adminIs={admin}/>;
      case 'MapRange':
          return <MapRange  adminIs={admin}/>;
      case 'Find Vehicle':
          return <FindVehicle  adminIs={admin}/>;
      case 'Edit Floors':
          return <EditFloors />;
      case 'Edit Slots':
          return <EditSlots />;
      case 'Logout':
        return <Logout onCancel={handleCancelLogout}/>;
      default:
        return <CompanyDashboard className="padtopp" adminIs={admin} />;
    }
  };

  return (
    <div className=" h-screen bg-white adminPages">
      {/* Sidebar */}
      <div className="bg-gray-900 fixed top-0 left-0 h-full z-50">
        <AdminSidebar setSelectedComponent={setSelectedComponent} />
      </div>

      {/* Content */}
      {
        admin && (
          <div>
            <div >
              <CompanyHeader adminIs={admin} />
              {renderComponent()}
            </div>
          </div>
        )
      }

     
    </div>
  );
};

export default CompanyAdminHomePage;

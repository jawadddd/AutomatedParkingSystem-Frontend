import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { CodeIcon } from "./Icons";
import '@fortawesome/fontawesome-free/css/all.css';
import { SERVERURL } from "../ServerUrl";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const AcceptConfirmationDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="confirmation-dialog">
      <div className="confirmation-content ">
        <p>Do you want to Logout?</p>
        <button onClick={onConfirm} className="specialCase3">
          Yes
        </button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};


function NavBar(props) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const profilePhotoRef = useRef(null);

  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const [isAcceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);

  const handleClickNav1 = () => {
    navigate("/SuperAdminHomePage", { state: props.email });
  };

  const handleClickNav2 = () => {
    navigate("/SuperAdminHomePage/RegisteredCompanies", { state: props.email });
  };

  const handleClickNav3 = () => {
    navigate("/SuperAdminHomePage/RejectedCompanies", { state: props.email });
  };

  
  const handleClickNavRadius = () => {
    navigate("/SuperAdminHomePage/setRadius", { state: props.email });
  };

  const handleClickNav4 = () => {
    navigate("/SuperAdminHomePage/EditRequests", { state: props.email });
  };

  const handleLogout = () => {
    navigate("/");
    // You can also add logout functionality here
  };

  const handleClickOutside = (event) => {
    if (profilePhotoRef.current && !profilePhotoRef.current.contains(event.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const openAcceptConfirmation = () => {
    setAcceptConfirmationOpen(true);
  };

  const closeAcceptConfirmation = () => {
    setAcceptConfirmationOpen(false);
  };
  const handleConfirmAccept = async() => {
    Cookies.remove('token');
    navigate("/");
      closeAcceptConfirmation();
    
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/SuperAdminHomePage" onClick={handleClickNav1} className="nav-logo">
            <span className="icon">
              <b>Super Admin</b>
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item nav-item2">
              <NavLink
                exact
                to="/SuperAdminHomePage"
                activeClassName="active"
                className="nav-links"
                onClick={handleClickNav1}
              >
                Companies Requests
              </NavLink>
            </li>
            <li className="nav-item nav-item2">
              <NavLink
                exact
                to="/SuperAdminHomePage/RegisteredCompanies"
                onClick={handleClickNav2}
                activeClassName="active"
                className="nav-links"
              >
                Registered Companies
              </NavLink>
            </li>
            <li className="nav-item smalll">
              <NavLink
                exact
                to="/SuperAdminHomePage/EditRequests"
                activeClassName="active"
                className="nav-links"
                onClick={handleClickNav4}
              >
                Edit Requests
              </NavLink>
            </li>

            <li className="nav-item nav-item2">
              <NavLink
                exact
                to="/SuperAdminHomePage/RejectedCompanies"
                activeClassName="active"
                className="nav-links"
                onClick={handleClickNav3}
              >
                Rejected Companies
              </NavLink>
            </li>

            <li className="nav-item nav-item2">
              <NavLink
                exact
                to="/SuperAdminHomePage/setRadius"
                activeClassName="active"
                className="nav-links"
                onClick={handleClickNavRadius}
              >
                Set Radius
              </NavLink>
            </li>

          </ul>

          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>

          <div ref={profilePhotoRef} className="profilePhoto cursor-pointer" onClick={() => setIsPopupOpen(!isPopupOpen)}>
            <img src={SERVERURL + '/uploads/' + props.profilePhoto} className='logoclass' alt="Profile" />
            {isPopupOpen && (
              <div className="absolute12345">
                <button className="  custom-button px-4 py-2 text-gray-800 hover:bg-gray-300 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 cursor-pointer" onClick={() => openAcceptConfirmation()}>
                  Logout
              </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <AcceptConfirmationDialog
        open={isAcceptConfirmationOpen}
        onClose={closeAcceptConfirmation}
        onConfirm={handleConfirmAccept}
      />
    </>
  );
}

export default NavBar;

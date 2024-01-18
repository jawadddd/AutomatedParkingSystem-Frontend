import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { CodeIcon } from "./Icons";
import '@fortawesome/fontawesome-free/css/all.css';
import { SERVERURL } from "../ServerUrl";
//import logoImage from "../assets/Full-Logo.png";
//, HamburgetMenuClose, HamburgetMenuOpen
import { useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleClickNav1 = () =>{
    navigate("/SuperAdminHomePage", { state: props.email});
  };
  const handleClickNav2 = () =>{
    navigate("/SuperAdminHomePage/RegisteredCompanies", { state: props.email});
  };
  const handleClickNav3 = () =>{
    navigate("/SuperAdminHomePage/RejectedCompanies", { state: props.email});
  };


  

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
         
          <NavLink exact to="/SuperAdminHomePage" onClick={handleClickNav1} className="nav-logo" >
            
            {/* <i className="fas fa-code"></i> */}
            <span className="icon">
         <b>Super Admin</b>
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
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
            <li className="nav-item">
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
            <li className="nav-item">
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
          </ul>

          <div className="nav-icon" onClick={handleClick}>
        

            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>

            {/* {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )} */}
          </div>
          <div className="profilePhoto">
          <img src={SERVERURL+'/uploads/'+props.profilePhoto}  className='logoclass'></img>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;

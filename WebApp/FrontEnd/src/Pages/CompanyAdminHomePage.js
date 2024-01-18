import React ,{ useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { SERVERURL } from "../ServerUrl";
const CompanyAdminHomePage = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const { state } = location;
    setEmail(state);
  }, [location]);

  return (
    <>
        {/* <NavBar/> */}
    <div>
      <h1>Company admin mail: {email}</h1>
      {/* <img src={SERVERURL+'/uploads/'+companyAdmin.profilePhoto}  className='logoclass'></img> */}
      {/* Your super admin home page content can go here */}
    </div>
    </>
  );
};

export default CompanyAdminHomePage;
import React ,{ useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVERURL } from "../ServerUrl";
import './SuperAdminHomePanel.css';
import loadingGif from '../images/ZKZg.gif';
import Swal from 'sweetalert2';
  
const SetRadius = () => {
   // 'accepted','rejected'
    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', adminsData.superAdmin.email);
      formData.append('MapRange', searchTerm.toString());

      const response = await axios.post(`${SERVERURL}/api/v1/setMapRange`, formData);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error('Error setting cost:', error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An Error Occured",
      });
    } finally {
      setIsLoading(false);
    }
  };
   const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [adminsData, setAdminsData] = useState(null);
  const [filteredCompanyAdmins, setFilteredCompanyAdmins] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isRejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);


  const handleNav = (companyAdmin,superAdminPhoto) => {
    console.log('Company Admin:', companyAdmin);
    console.log('Profile Photo:', superAdminPhoto);
    // Add your additional attribute to the state
    let from="EditRequests";
    const stateObject = {
      companyAdmin,
      superAdminPhoto,
      from,
    };
    // Use navigate to redirect to the "/ApplicationDetail" route with additional attributes in state
    navigate("/SuperAdminHomePage/RegisteredCompanies/ApplicationDetail", { state: stateObject });
  };






  const openRejectConfirmation = (companyId) => {
    setSelectedCompany(companyId);
    setRejectConfirmationOpen(true);
  };const closeRejectConfirmation = () => {
    setSelectedCompany(null);
    setRejectConfirmationOpen(false);
  };
  const handleConfirmReject = async() => {
    console.log("Rejected company :", selectedCompany);

    try {
      // Call your API for accepting
      const response = await axios.post(`${SERVERURL}/api/v1/reject`, {
        name1: selectedCompany.userName, // Pass the name or any required data
        email1: selectedCompany.email, // Assuming selectedCompany is the email
      });

      console.log("API Response:", response.status);
      if(response.status===200)
      {
        setFilteredCompanyAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.email !== selectedCompany.email)
      );

      }
      setAdminsData((prevData) => ({
        ...prevData,
        companyAdmins: prevData.companyAdmins.filter(
          (admin) => admin.email !== selectedCompany.email
        ),
        companyAdminsCount: prevData.companyAdminsCount - 1,
      }));
      closeRejectConfirmation();
      // Close the confirmation dialog
    } catch (error) {
      console.error("Error accepting:", error.message);
    }

};


  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        //use email here to fetch the data and make backend route also and authorize also
        // Make an API request to your server to get the company admin data
        const response = await axios.get(`${SERVERURL}/api/v1/getModifiedRequests`);
        
        // Assuming the response.data contains the company admin data
        const superAdminData = response.data.superAdmin;
        const companyAdminsData = response.data.companyAdmins;
        const acceptedCompanyAdmins = companyAdminsData.filter(
            (companyAdmin) => companyAdmin.status === 'accepted'
          );
        // Create the complete object
        const completeAdminsData = {
          superAdmin: superAdminData,
          companyAdmins: acceptedCompanyAdmins,
          companyAdminsCount:acceptedCompanyAdmins.length,
        };
console.log(completeAdminsData);
        // Set the state with the complete object
        
        setAdminsData(completeAdminsData);
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching Super admin data:", error.message);
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    // Call the function to fetch company admin data when the component mounts
    fetchAdmins();

  }, []);
  useEffect(() => {
    // Update filteredCompanyAdmins whenever adminsData is updated
    if (adminsData) {
      setFilteredCompanyAdmins(adminsData.companyAdmins);
    }
  }, [adminsData]);


  return (
    <>
   

{!adminsData ? ( // Display loading GIF if isLoading is true
        <div className="loading-container">
          <img src={loadingGif} alt="Loading" className="loadingGif" />
        </div>
      ) : (
        <>
        <NavBar setOption profilePhoto={adminsData.superAdmin.profilePhoto} email={adminsData.superAdmin.email} userName={adminsData.superAdmin.userName} />
<div className="SuperAdminPanel">
 
 <div className="centre23">
 
     
   <div className="centreTop">
   <div className="centreTop">
            </div>
 
   </div>
 
 
   <div className="centreBottom">
   <h2 className="text-2xl mb-4">Set Radius of Circle to be Used in Map of Mobile App</h2>
  <form onSubmit={handleSubmit} className="myform">
                  <input type="number" value={searchTerm} onChange={(e) => {
    // Check if the input value is greater than or equal to 1
    if (e.target.value >= 1) {
      setSearchTerm(e.target.value);
    }
  }}  placeholder="Enter range" required min="1" className="border border-gray-300 rounded-md p-2 mr-2" />
                  <button type="submit" className="bg-blue-500 text-white  mt-4 px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
                </form>

 
 
   </div>
 </div>
 </div>
 </>
 
            )
          }
     

    

    </>
  );
};

export default SetRadius;
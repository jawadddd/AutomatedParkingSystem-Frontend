import React ,{ useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVERURL } from "../ServerUrl";
import './SuperAdminHomePanel.css';
import loadingGif from '../images/ZKZg.gif';


const AcceptConfirmationDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="confirmation-dialog">
      <div className="confirmation-content ">
        <p>Do you want to accept?</p>
        <button onClick={onConfirm} className="specialCase3">
          Yes
        </button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};


const RejectConfirmationDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="confirmation-dialog">
      <div className="confirmation-content ">
        <p>Do you want to reject?</p>
        <button onClick={onConfirm} className="specialCase3">
          Yes
        </button>
        <button onClick={onClose}>No</button>
      </div>
    </div>
  );
};

const SuperAdminHomePage = () => {
  const location = useLocation();
  const { state } = location;
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const [adminsData, setAdminsData] = useState(null);
  const [filteredCompanyAdmins, setFilteredCompanyAdmins] = useState([]);


  const [isAcceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);
  const [isRejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const openAcceptConfirmation = (companyId) => {
    setSelectedCompany(companyId);
    setAcceptConfirmationOpen(true);
  };

  const openRejectConfirmation = (companyId) => {
    setSelectedCompany(companyId);
    setRejectConfirmationOpen(true);
  };

  const closeAcceptConfirmation = () => {
    setSelectedCompany(null);
    setAcceptConfirmationOpen(false);
  };

  const closeRejectConfirmation = () => {
    setSelectedCompany(null);
    setRejectConfirmationOpen(false);
  };

  const handleConfirmAccept = async() => {
    // Call your API for accepting
    console.log("Accepted company:", selectedCompany.userName);

    try {
      // Call your API for accepting
      const response = await axios.post(`${SERVERURL}/api/v1/accept`, {
        name1: selectedCompany.userName, // Pass the name or any required data
        email1: selectedCompany.email, // Assuming selectedCompany is the email
      });

      console.log("API Response:", response.data);
      setAdminsData((prevData) => ({
        ...prevData,
        companyAdmins: prevData.companyAdmins.filter(
          (admin) => admin.email !== selectedCompany.email
        ),
        companyAdminsCount: prevData.companyAdminsCount - 1,
      }));
      // Close the confirmation dialog
      
      closeAcceptConfirmation();
    } catch (error) {
      console.error("Error accepting:", error.message);
    }
  };

  const handleConfirmReject = async() => {
    // Call your API for rejecting
    console.log("Rejected company :", selectedCompany);

    try {
      // Call your API for accepting
      const response = await axios.post(`${SERVERURL}/api/v1/reject`, {
        name1: selectedCompany.userName, // Pass the name or any required data
        email1: selectedCompany.email, // Assuming selectedCompany is the email
      });

      console.log("API Response:", response.status);
      
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
        const response = await axios.get(`${SERVERURL}/api/v1/getAdmins`);
        
        // Assuming the response.data contains the company admin data
        const superAdminData = response.data.superAdmin;
        const companyAdminsData = response.data.companyAdmins;
        const requests = companyAdminsData.filter(
          (companyAdmin) => companyAdmin.status === 'pending'
        );
        // Create the complete object
        const completeAdminsData = {
          superAdmin: superAdminData,
          companyAdmins: requests,
          companyAdminsCount:requests.length,
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

  const handleSearch = () => {
    const updatedList = adminsData.companyAdmins.filter(
      (companyAdmin) =>
        companyAdmin.userName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCompanyAdmins(updatedList);
  };
  

  // const setOption = () => {
  //   const updatedList = adminsData.companyAdmins.filter(
  //     (companyAdmin) =>
  //       companyAdmin.userName.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  //   setFilteredCompanyAdmins(updatedList);
  // };
  const handleNav = (companyAdmin,superAdminPhoto) => {
    console.log('Company Admin:', companyAdmin);
    console.log('Profile Photo:', superAdminPhoto);
    // Add your additional attribute to the state
    let from="homePage";
    const stateObject = {
      companyAdmin,
      superAdminPhoto,
      from,
    };

    console.log("from is ",stateObject);
    // Use navigate to redirect to the "/ApplicationDetail" route with additional attributes in state
    navigate("/SuperAdminHomePage/ApplicationDetail", { state: stateObject });
  };
  


  return (
    <>
    { adminsData&&(
    <NavBar setOption profilePhoto={adminsData.superAdmin.profilePhoto} email={adminsData.superAdmin.email} userName={adminsData.superAdmin.userName} />
    )}



<div className="SuperAdminPanel">
{isLoading ? ( // Display loading GIF if isLoading is true
        <div className="loading-container">
          <img src={loadingGif} alt="Loading" className="loadingGif" />
        </div>
      ) : (
 <div className="centre">
 
     
   <div className="centreTop">
 
 <div className="centreTopOne">
   {adminsData&&(<h2>{adminsData.companyAdminsCount} {adminsData.companyAdminsCount == 1 || adminsData.companyAdminsCount == 0? 'Request' : 'Requests'}</h2>)}
 </div>
 <div className="centreTopTwo">
   <input type="text" placeholder="Search Requests"   value={searchValue}
                 onChange={(e) => setSearchValue(e.target.value)}
 ></input>
 </div>
 <div className="centreTopThree"><button onClick={handleSearch}>Search</button></div>
 
   </div>
 
 
   <div className="centreBottom">
 
   <div className="RegisteredcentreBottomUp centreBottomUp">
 
   <div className="centreBottomUp1">
     <h3>Username</h3>
   </div>
 
   <div className="centreBottomUp2">
   <h3>Email</h3>
   </div>
 
   <div className="centreBottomUp3">
   <h3>Contact No</h3>
   </div>
 
   <div className="centreBottomUp4">
   <h3>Action</h3>
   </div>
 
   </div>
   
 
 {adminsData && filteredCompanyAdmins && (
               <div>
                 {filteredCompanyAdmins.map((companyAdmin) => (
                   <div key={companyAdmin._id} className="centreBottomDown">
                     <div className="centreBottomDown1">{companyAdmin.userName}</div>
                     <a className="centreBottomDown2"  
                     href={`mailto:${companyAdmin.email}`} >
{companyAdmin.email}</a>
                     <div className="RegisteredcentreBottomDown3 centreBottomDown3">{companyAdmin.contactNumber}</div>
                     <div className="RegisteredcentreBottomDown4 centreBottomDown4">
                     <div className="centreBottomDown41">
                         <button onClick={() => handleNav(companyAdmin,adminsData.superAdmin.profilePhoto)}>View</button>
                       </div>

                       <div className="centreBottomDown41">
                         <button onClick={() => openAcceptConfirmation(companyAdmin)}>Accept</button>
                       </div>
                       <div className="centreBottomDown42">
                         <button onClick={() => openRejectConfirmation(companyAdmin)}>Reject</button>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}
 
 
 
   </div>
 </div>
 
            )}
     
     </div>
     <AcceptConfirmationDialog
        open={isAcceptConfirmationOpen}
        onClose={closeAcceptConfirmation}
        onConfirm={handleConfirmAccept}
      />
      <RejectConfirmationDialog
        open={isRejectConfirmationOpen}
        onClose={closeRejectConfirmation}
        onConfirm={handleConfirmReject}
      />
    </>
  );
};

export default SuperAdminHomePage;
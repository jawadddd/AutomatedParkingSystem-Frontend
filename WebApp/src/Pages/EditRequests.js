import React ,{ useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVERURL } from "../ServerUrl";
import './SuperAdminHomePanel.css';
import loadingGif from '../images/ZKZg.gif';

  
const EditRequests = () => {
  const [option, setOption] = useState('requests');
   // 'accepted','rejected'
   const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [searchValue, setSearchValue] = useState('');

  const [adminsData, setAdminsData] = useState(null);
  const [filteredCompanyAdmins, setFilteredCompanyAdmins] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isRejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator



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
   {adminsData&&(<h2>{adminsData.companyAdminsCount} {adminsData.companyAdminsCount == 1 || adminsData.companyAdminsCount == 0? 'Modified' : 'Modified'}</h2>)}
 </div>
 <div className="centreTopTwo">
   <input type="text" placeholder="Search Here"   value={searchValue}
                 onChange={(e) => setSearchValue(e.target.value)}
 ></input>
 </div>
 <div className="centreTopThree"><button onClick={handleSearch}>Search</button></div>
 
   </div>
 
 
   <div className="centreBottom">
 
   <div className="centreBottomUp">
 
   <div className="centreBottomUp1">
     <h3>Username</h3>
   </div>
 
   <div className="centreBottomUp2">
   <h3>Email</h3>
   </div>
 
   <div className="centreBottomUp3">
   <h3>Contact No</h3>
   </div>
 
   <div className="centreBottomUp4 specialCase">
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
                     <div className="centreBottomDown3">{companyAdmin.contactNumber}</div>
                     <div className="centreBottomDown4">
                       <div className="centreBottomDown41">
                         <button onClick={() => handleNav(companyAdmin,adminsData.superAdmin.profilePhoto)}>View</button>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
             )}
 
 
 
   </div>
 </div>
 
            )
          }
     
     </div>

    

    </>
  );
};

export default EditRequests;
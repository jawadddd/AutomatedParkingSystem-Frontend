import React ,{ useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVERURL } from "../ServerUrl";
import './SuperAdminHomePanel.css';
const RejectedCompanies = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const [searchValue, setSearchValue] = useState('');

  const [adminsData, setAdminsData] = useState(null);
  const [filteredCompanyAdmins, setFilteredCompanyAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        //use email here to fetch the data and make backend route also and authorize also
        // Make an API request to your server to get the company admin data
        const response = await axios.get(`${SERVERURL}/api/v1/getAdmins`);
        
        // Assuming the response.data contains the company admin data
        const superAdminData = response.data.superAdmin;
        const companyAdminsData = response.data.companyAdmins;
        const rejectedCompanyAdmins = companyAdminsData.filter(
            (companyAdmin) => companyAdmin.status === 'rejected'
          );
        // Create the complete object
        const completeAdminsData = {
          superAdmin: superAdminData,
          companyAdmins: rejectedCompanyAdmins,
          companyAdminsCount:rejectedCompanyAdmins.length,
        };
console.log(completeAdminsData);
        // Set the state with the complete object
        
        setAdminsData(completeAdminsData);

      } catch (error) {
        console.error("Error fetching Super admin data:", error.message);
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
    const stateObject = {
      companyAdmin,
      superAdminPhoto,
    };
    // Use navigate to redirect to the "/ApplicationDetail" route with additional attributes in state
    navigate("/SuperAdminHomePage/RegisteredCompanies/ApplicationDetail", { state: stateObject });
  };



  return (
    <>
    { adminsData&&(
    <NavBar setOption profilePhoto={adminsData.superAdmin.profilePhoto} email={adminsData.superAdmin.email} userName={adminsData.superAdmin.userName} />
    )}


  <div className="SuperAdminPanel">
   
   <div className="centre">
   
       
     <div className="centreTop">
   
   <div className="centreTopOne">
     {adminsData&&(<h2>{adminsData.companyAdminsCount} {adminsData.companyAdminsCount == 1 || adminsData.companyAdminsCount == 0? 'Rejected' : 'Rejected'}</h2>)}
   </div>
   <div className="centreTopTwo">
     <input type="text" placeholder="Search Requests"   value={searchValue}
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
                       <div className="centreBottomDown3 specialCase2">{companyAdmin.contactNumber}</div>
                       <div className="centreBottomDown4">
                         
                         <div className="centreBottomDown42">
                           <button onClick={() => handleNav(companyAdmin,adminsData.superAdmin.profilePhoto)}>View</button>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               )}  
     </div>
   </div>    
       </div> 

    </>
  );
};

export default RejectedCompanies;
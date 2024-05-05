import React ,{ useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVERURL } from "../ServerUrl";
import './SuperAdminHomePanel.css';
import Swal from 'sweetalert2';
import loadingGif from '../images/ZKZg.gif';
import CompanyMap from '../components/CompanyMap';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax 
mapboxgl.accessToken = 'pk.eyJ1IjoiamF3YWRkZCIsImEiOiJjbHNya2h2a2wwNGw1Mm5tbHdvd3d6bTZoIn0.s_p93Jzwa_4NdtUFgqMhYA';


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
const ApplicationDetail = () => {
  const [hoveredSlotCost, setHoveredSlotCost] = useState(null); // State variable to store hovered slot's cost

  const [adminData, setAdminData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;
  console.log("state is ", state.companyAdmin);
  console.log("state is ", state.superAdminPhoto);
  console.log("stateonly is ", state);
  const [loading, setLoading] = useState(true);

  const [responseIs, setResponseIs] = useState(null);  
  const [message, setMessage] = useState('');
  const [isAcceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);
  const [isRejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [noOfSlots, setNoOFSlots] = useState(0);
  
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
    console.log("Accepted company:", selectedCompany);
let response=null;
    try {
      // Call your API for accepting

if(state.from === "homePage")
{
   response = await axios.post(`${SERVERURL}/api/v1/accept`, {
    name1: state.companyAdmin.userName, // Pass the name or any required data
    email1: state.companyAdmin.email, // Assuming selectedCompany is the email
  });


}
else
{
  if(state.from=== "EditRequests")
  {
     response = await axios.post(`${SERVERURL}/api/v1/acceptModification`, {
      name1: state.companyAdmin.userName, // Pass the name or any required data
      email1: state.companyAdmin.email, // Assuming selectedCompany is the email
    });

  }
}
      console.log("API Response:", response.data);
     
      closeAcceptConfirmation();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Accepted Successfully",
      });
      navigate("/SuperAdminHomePage");

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An Error Occured",
      });
      console.error("Error accepting:", error.message);
    }
  };

  const handleConfirmReject = async() => {
    // Call your API for rejecting
    console.log("Rejected company :", selectedCompany);
let response=null;
    try {
      // Call your API for accepting

if(state.from === "homePage")
{
    response = await axios.post(`${SERVERURL}/api/v1/reject`, {
    name1: state.companyAdmin.userName, // Pass the name or any required data
    email1: state.companyAdmin.email, // Assuming selectedCompany is the email
  });

}
else
{
  if( state.from=== "EditRequests" )
  {
    response = await axios.post(`${SERVERURL}/api/v1/rejectModification`, {
      name1: state.companyAdmin.userName, // Pass the name or any required data
      email1: state.companyAdmin.email, // Assuming selectedCompany is the email
    });
  }
}  
      console.log("API Response:", response.status);
     
      closeRejectConfirmation();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Rejected Successfully",
      });
      navigate("/SuperAdminHomePage");

      // Close the confirmation dialog
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An Error Occured",
      });
      console.error("Error accepting:", error.message);
    }

  };





  const handleMail = async () => {
    try {
      // Assuming you have a route like '/sendMessage' on your server
      const response = await axios.post(`${SERVERURL}/api/v1/sendMessage`, {
        userEmail: state.companyAdmin.email,
        message,
      });

      if (response.status === 200) {
        console.log('Message sent successfully');
        // Optionally, you can reset the message state or perform any other action
        setMessage('');
        setResponseIs('success');
      } else {
        console.error('Failed to send message');
        setResponseIs('error');
      }


    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const renderGrid = () => {
    if (!adminData) return null; // Return null if adminData is not yet available

    return adminData.map((floor, floorIndex) => (
      
<div className="ViewPageGrid" key={floorIndex}>
      <p>Floor {floorIndex + 1}</p>
      <div className="grid-container">
        {floor.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className="grid-row" 
            style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
          >
            {row.map((cell, columnIndex) => (
              <div 
                className="grid-cell" 
                key={columnIndex}
                onMouseEnter={() => {
                  if (cell.name === "Slot") {
                    setHoveredSlotCost(cell.slotCost); // Set hovered slot's cost to state variable
                  }
                }}
                onMouseLeave={() => {
                  if (cell.name === "Slot") {
                    setHoveredSlotCost(null); // Reset hovered slot's cost when mouse leaves
                  }
                }}
              >
                {cell.name === "Slot" ? cell.slotNo : cell.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      {hoveredSlotCost && <p className="slot-cost">{`Cost: ${hoveredSlotCost}`}</p>} {/* Display hovered slot's cost */}
    </div>
      ));
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/api/v1/getAdminByEmail?email=${state.companyAdmin.email}`);
        if(response.data.completeObject.modifiedStatus === "true" && state.from === "EditRequests")
        {
          setNoOFSlots(response.data.completeObject.modifiedNoOfSlots);
          setAdminData(response.data.completeObject.modifiedFloorsPlan);        
        }
        else
        {
          setNoOFSlots(response.data.completeObject.noOfSlots);
          setAdminData(response.data.completeObject.floorsPlan);        
        }
        
setLoading(false);
      } catch (error) {
        console.error("Error fetching Admin Details:", error.message);
        setLoading(false);
      }
    };

    // Call the function to fetch company admin data when the component mounts
    fetchAdmin();

  }, []);

  return (
    <>
    { state.companyAdmin &&(
    <NavBar setOption profilePhoto={state.superAdminPhoto} email={state.companyAdmin.email} userName={state.companyAdmin.userName} />//email and userName are for no reason
    )}

{ state.companyAdmin &&(
  <div className="SuperAdminPanelDetail">
<div className="SuperAdminPanelDetailOne">
<img src={SERVERURL+'/uploads/'+state.companyAdmin.profilePhoto}  className='logoclass'></img>
<div className="one">
<div><h2>{state.companyAdmin.userName}</h2>
<a href={`mailto:${state.companyAdmin.email}`}>Click here to Drop Message!</a>
<p>{state.companyAdmin.contactNumber}</p></div>
</div>

</div>
<div className="loadingContainer">

{
loading ? (
  <img className="loadingGif" src={loadingGif} alt="loading..." /> // Show loading animation
) : (
  <>

{state.companyAdmin.longitude && state.companyAdmin.latitude ? <CompanyMap coordinates={[state.companyAdmin.longitude, state.companyAdmin.latitude]} /> : null}


  <div className="heading-container">
            <h1 className="heading">Floors plan for Automated Parking System</h1>
          </div>

<div className="floorsPlann">

<div className="SuperAdminPanelDetailTwo"> 
 {renderGrid()}
 </div>


<div className="SuperAdminPanelDetailThree">
{adminData && (
  <>
  

<div className="five">
{state.from === "registeredCompanies"?(
  <div><h2>Total Number of Slots Present: </h2></div>

) : (
  <div><h2>Total Number of Slots Required: </h2></div>

)}

<div><h2> { noOfSlots}</h2></div>
</div>
{(state.from === "homePage" || state.from=== "EditRequests") && (
  <div className="AcceptReject">

{state.from=== "EditRequests" ? (
        <h2>What do You Want About this Modified Structure?</h2>
      ) : (
        <h2>What do You Want About this Parking Contract?</h2>
)}

    <div className="centreBottomDown413">
      <button onClick={() => openAcceptConfirmation(state.companyAdmin.email)}>Accept</button>
    </div>
    <div className="centreBottomDown423">
      <button onClick={() => openRejectConfirmation(state.companyAdmin.email)}>Reject</button>
    </div>
  </div>
)}

                       {/* <div class="message-container">
  <h2 class="form-header">Drop Message</h2>
  <div class="message-box">
    <textarea class="message-input" rows="5" placeholder="Write your message..." value={message}
            onChange={(e) => setMessage(e.target.value)}></textarea>
    <div className="last"><button class="send-button" onClick={handleMail}>Send</button>
    {responseIs === 'success' && <h2>Successfully Sent!</h2>}
            {responseIs === 'error' && <h2>Message could not send!</h2>}
    </div>
  </div>
</div> */}
</>
)}


 </div>
 </div>
 </>
)}
</div>

 </div>

 
)}




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

export default ApplicationDetail;
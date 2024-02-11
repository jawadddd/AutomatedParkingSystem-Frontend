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
const ApplicationDetail = () => {
  const [adminData, setAdminData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;
  console.log("state is ", state.companyAdmin);
  console.log("state is ", state.superAdminPhoto);
  const [loading, setLoading] = useState(true);

  const [responseIs, setResponseIs] = useState(null);  
  const [message, setMessage] = useState('');
  const [isAcceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);
  const [isRejectConfirmationOpen, setRejectConfirmationOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
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

    try {
      // Call your API for accepting
      const response = await axios.post(`${SERVERURL}/api/v1/accept`, {
        name1: state.companyAdmin.userName, // Pass the name or any required data
        email1: state.companyAdmin.email, // Assuming selectedCompany is the email
      });

      console.log("API Response:", response.data);
     
      closeAcceptConfirmation();
      navigate("/SuperAdminHomePage");

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
        name1: state.companyAdmin.userName, // Pass the name or any required data
        email1: state.companyAdmin.email, // Assuming selectedCompany is the email
      });

      console.log("API Response:", response.status);
     
      closeRejectConfirmation();
      navigate("/SuperAdminHomePage");

      // Close the confirmation dialog
    } catch (error) {
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
      
<div className="ViewPageGrid">
<p>Floor {floorIndex + 1}</p>
      <div key={floorIndex} className="grid-container">
        {floor.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row" style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
             {row.map((cell, columnIndex) => (
              <div className="grid-cell" key={columnIndex}>
                {cell.name === "Slot" ? cell.slotNo : cell.name}
              </div>
            ))}
          </div>
        ))}
      </div>
      </div>
    ));
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/api/v1/getAdminByEmail?email=${state.companyAdmin.email}`);
        setAdminData(response.data.floorsPlan);        
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
<div><h2>Total Number of Slots Required: </h2></div>
<div><h2> { state.companyAdmin.noOfSlots}</h2></div>
</div>
{state.from === "homePage" && (
  <div className="AcceptReject">
    <h2>What do You Want About this Parking Contract?</h2>
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
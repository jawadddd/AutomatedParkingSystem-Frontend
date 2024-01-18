import React ,{ useEffect,useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { SERVERURL } from "../ServerUrl";
import './SuperAdminHomePanel.css';




const ApplicationDetail = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const location = useLocation();
  const { state } = location;
  console.log("state is ", state.companyAdmin);
  console.log("state is ", state.superAdminPhoto);


  const [responseIs, setResponseIs] = useState(null);  
  const [message, setMessage] = useState('');

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



  useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         //use email here to fetch the data and make backend route also and authorize also
//         // Make an API request to your server to get the company admin data
//         const response = await axios.get(`${SERVERURL}/api/v1/getAdmins`);
        
//         // Assuming the response.data contains the company admin data
//         const superAdminData = response.data.superAdmin;
//         const companyAdminsData = response.data.companyAdmins;
//         const requests = companyAdminsData.filter(
//           (companyAdmin) => companyAdmin.status === 'pending'
//         );
//         // Create the complete object
//         const completeAdminsData = {
//           superAdmin: superAdminData,
//           companyAdmins: requests,
//           companyAdminsCount:requests.length,
//         };
// console.log(completeAdminsData);
//         // Set the state with the complete object
        

//       } catch (error) {
//         console.error("Error fetching Super admin data:", error.message);
//       }
//     };

//     // Call the function to fetch company admin data when the component mounts
//     fetchAdmins();

  }, []);

  return (
    <>
    { state.companyAdmin &&(
    <NavBar setOption profilePhoto={state.superAdminPhoto} email={state.companyAdmin.email} userName={state.companyAdmin.userName} />//email and userName are for no reason
    )}

{ state.companyAdmin &&(
  <div className="SuperAdminPanelDetail">

<div className="SuperAdminPanelDetailLeft">
<img src={SERVERURL+'/uploads/'+state.companyAdmin.profilePhoto}  className='logoclass'></img>
</div>


<div className="SuperAdminPanelDetailRight">

<div className="one">
<div><h2>{state.companyAdmin.userName}</h2></div>
</div>

<div className="two">
<div><h2>{state.companyAdmin.email}</h2></div>
</div>

<div className="three">
<div><h2>{state.companyAdmin.contactNumber}</h2></div>
</div>

<div className="four">
<div><h2>No of Floors required : </h2></div>
<div><h2>{state.companyAdmin.noOfFloors}</h2></div>
</div>

<div className="five">
<div><h2>No of Slots required : </h2></div>
<div><h2>{state.companyAdmin.noOfSlots}</h2></div>
</div>
                       <div class="message-container">
  <h2 class="form-header">Drop Message</h2>
  <div class="message-box">
    <textarea class="message-input" rows="5" placeholder="Write your message..." value={message}
            onChange={(e) => setMessage(e.target.value)}></textarea>
    <div className="last"><button class="send-button" onClick={handleMail}>Send</button>
    {responseIs === 'success' && <h2>Successfully Sent!</h2>}
            {responseIs === 'error' && <h2>Message could not send!</h2>}
    </div>
  </div>
</div>
 </div>
 </div> 
 
)}







    </>
  );
};

export default ApplicationDetail;
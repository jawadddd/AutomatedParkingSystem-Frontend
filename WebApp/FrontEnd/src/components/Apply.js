import React ,{ useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Apply.css';
const Apply = ({setLogin}) => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password:'',
        contactNumber: '',
   //     noOfFloors: '',
   //     noOfSlots: '',
        profilePhoto:null,
      });

      const handleImageChange = (e) => {
        const selected = e.target.files[0];
        // console.log("AHSAM2",selected);
        const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg","image/PNG", "image/JPEG", "image/JPG"];
        if (selected && ALLOWED_TYPES.includes(selected.type)) {
          setFormData((prevData) => ({
            ...prevData,
            profilePhoto: selected,
          }));
        }
       
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit  = async (e) => {
        e.preventDefault();
        navigate("/ApplyForParkingSystem", { state: formData });
      };
  return (
    <div>
 <form className="register-form" onSubmit={handleSubmit}>
      <div className="form-group">
      <h2>Apply</h2>
        <input
          type="text"
          id="userName"
          placeholder="UserName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
      
        <input
          type="email"
          id="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
      
        <input
          type="password"
          id="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>


      <div className="form-group">
      
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          placeholder="Contact Number"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />
      </div>

    
      <div className="form-group">
      <input
        type="file"
        id="file"
        accept="image/png , image/jpeg, image/jpg, image/webp"
        class="inputfile"
        onChange={handleImageChange}
      />
      </div>


      <div className="form-group">
        <button type="submit">Continue</button>
      </div>
      <div className="form-group">
        <p>Already have an account? <span className="link" onClick={setLogin}>Login</span> </p>
      </div>


    </form>
    </div>
  );
};

export default Apply;
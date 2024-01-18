import React ,{ useEffect,useState } from "react";
import axios from "axios";
import './Apply.css';
const Apply = ({setLogin}) => {
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password:'',
        contactNumber: '',
        noOfFloors: '',
        noOfSlots: '',
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
        try {
          console.log(formData.profilePhoto);
          console.log("formData is"+formData);
          if(formData.profilePhoto!==null)
          {
            const form = new FormData();
            form.append("userName", formData.userName);
            form.append("email", formData.email);
            form.append("password", formData.password);
            form.append("contactNumber", formData.contactNumber);
            form.append("noOfFloors", formData.noOfFloors);
            form.append("noOfSlots", formData.noOfSlots);
            form.append("profilePhoto", formData.profilePhoto);
            const response = await axios.post('http://localhost:4000/api/v1/register', form);
    
            if (response.status === 200) {
              console.log('Registration Successful:', response.data.message);
              // You can handle the successful registration here, e.g., redirect to a login page
              setLogin();
            } else {
              console.error('Registration Failed:', response.data.message);
            }
  
          }
          else
          {
            alert("Must include profile photo of jpg, png or jpeg type!");
          }
        } catch (error) {
          console.error('Error during registration:', error.message);
        }

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
          type="number"
          id="noOfFloors"
          placeholder="Number of Floors"
          name="noOfFloors"
          value={formData.noOfFloors}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
      
        <input
          type="number"
          id="noOfSlots"
          placeholder="Number of Slots"
          name="noOfSlots"
          value={formData.noOfSlots}
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
        <button type="submit">Apply</button>
      </div>
      <div className="form-group">
        <p>Already have an account? <span className="link" onClick={setLogin}>Login</span> </p>
      </div>


    </form>
    </div>
  );
};

export default Apply;
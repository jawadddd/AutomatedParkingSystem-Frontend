import React ,{ useEffect,useState } from "react";
import axios from "axios";
import "./Login.css";
import Cookies from "js-cookie";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const Login = ({setApply}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
      });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', formData);

      if (response.status === 200) {
        console.log('Login Successful:', response.data.message);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        });
        // Save the token in cookies
        Cookies.set('token', response.data.token);    
        
        console.log("Useris: "+response.data.User.email);
if(response.data.User.role==="companyAdmin")
{
  navigate("/CompanyAdminHomePage", { state: response.data.User.email});
}
else
{
  navigate("/SuperAdminHomePage", { state: response.data.User.email});
}
 

        // You can redirect or perform other actions upon successful login
      } else {
        console.error('Login Failed:', response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message,
        });

      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An Error Occured",
      });
      console.error('Error during login:', error.message);
    }
  };


  return (
    <div>
 <form className="register-form" onSubmit={handleSubmit}>
      
      <div className="form-group">
      <h2>Login</h2>

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
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <button type="submit" className="lastbut">Login</button>
      </div>
      <div className="form-group">
        <p>Don't have an account? <span className="link" onClick={setApply}>Apply</span> </p>
      </div>
    </form>    </div>
  );
};

export default Login;
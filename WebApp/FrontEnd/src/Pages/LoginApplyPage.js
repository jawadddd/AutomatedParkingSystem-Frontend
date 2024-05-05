import React ,{ useState, useEffect } from "react";
import Login from '../components/Login';
import Apply from '../components/Apply';
import pic1 from '../images/blog-why-reverse-parking-hero.jpg'
import './LoginApply.css';
const LoginApplyPage = () => {
    const [activeButton, setActiveButton] = useState('login'); // 'login' or 'apply'

    const setLogin = () => {
      setActiveButton('login');
    };
  
    const setApply = () => {
      setActiveButton('apply');
    };
  return (
    
    <div className="loginApply">
      <div className="loginApplyL">
      <div className="backgroundImageContainer">
                    <img src={pic1} alt="Background" className="backgroundImage" />
                    
        </div>

    </div>
<div className="loginApplyR">    
{activeButton === 'login' ? <Login setApply={setApply}  /> : <Apply setLogin={setLogin} />}
</div>
    </div>
   
  );
};

export default LoginApplyPage;
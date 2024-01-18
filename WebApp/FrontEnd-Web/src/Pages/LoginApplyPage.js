import React ,{ useState, useEffect } from "react";
import Login from '../components/Login';
import Apply from '../components/Apply';
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
      <div className="loginApplyLC">
        <h1>Login/Apply</h1>
      <div className="loginApplyLbottom">
        <button onClick={setLogin} className={activeButton === 'login' ? 'active' : ''} >
            Login
        </button>
        <button onClick={setApply} className={activeButton === 'apply' ? 'active' : ''}>
            Apply
        </button>
        </div>
        </div>
    </div>
<div className="loginApplyR">    
{activeButton === 'login' ? <Login setApply={setApply}  /> : <Apply setLogin={setLogin} />}
</div>
    </div>
   
  );
};

export default LoginApplyPage;
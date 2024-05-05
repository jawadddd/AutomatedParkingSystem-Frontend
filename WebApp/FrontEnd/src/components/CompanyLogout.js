import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import Cookies from 'js-cookie';
const Logout = ({ onCancel }) => {
  
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("cooky:",Cookies.get('token'));
    Cookies.remove('token');
    console.log("cooky:",Cookies.get('token'));

    console.log("Logging out...");
    navigate('/'); // Navigate to '/' when Logout Button is clicked
  };

  const handleCancel = () => {
    console.log("Logout canceled...");
    onCancel(); // Call the onCancel callback from props
    
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-center items-center h-screen bg-gray-100 imp6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Logout</h2>
        <p className="text-center mb-4">Are you sure you want to logout?</p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <button 
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mr-2"
            >
              Logout
            </button>
            <button 
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 ml-2"
              onClick={handleCancel}  >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Logout;

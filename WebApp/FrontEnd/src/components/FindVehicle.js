import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SERVERURL } from '../ServerUrl';
const FindVehicle = ({adminIs}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${SERVERURL}/api/v1/findVehicle`, {
        params: {
          emailIs: adminIs.email,
          VehicleIs:searchTerm
        }
      });
      const data = response.data;

      if (data.success) {
        setSearchResult(data.matchingCell);
        setErrorMessage('');
      } else {
        setSearchResult(null);
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error searching for vehicle:', error);
      setErrorMessage('Internal Server Error');
    }
  };
  return (
<motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 lg:p-12 imp4 container spac"
    >
      <h2 className="text-2xl font-bold mb-4">Find Vehicle</h2>
      
      <div className="mb-4">
        <input 
          type="text" 
          placeholder="Enter Vehicle ID" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-3 w-full"
        />
      </div>

      <motion.button 
  className="bg-gradient-to-r from-gray-700 to-blue-500 text-white p-2 rounded"
  whileHover={{ scale: 1.05 }} // Increases the size of the button on hover
  whileTap={{ scale: 0.95 }}   // Decreases the size of the button when pressed
  onClick={handleSearch}
>
  Search
</motion.button>
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {searchResult && (

// Inside your component's JSX
// Inside your component's JSX
<div className="mt-8 border-t pt-6 relative">
  <h3 className="font-semibold text-xl mb-4">Matching Cell Details:</h3>
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="grid grid-cols-2 gap-4 rounded-lg shadow-md bg-gradient-to-br from-gray-900 to-gray-600 p-6"
  >
    <div className="text-white">
      <p className="text-lg font-semibold">Floor:</p>
      <p className="text-gray-200">{searchResult.floor}</p>
    </div>
    <div className="text-white">
      <p className="text-lg font-semibold">Row:</p>
      <p className="text-gray-200">{searchResult.row}</p>
    </div>
    <div className="text-white">
      <p className="text-lg font-semibold">Column:</p>
      <p className="text-gray-200">{searchResult.col}</p>
    </div>
    <div className="text-white">
      <p className="text-lg font-semibold">Slot:</p>
      <p className="text-gray-200">{searchResult.Slot}</p>
    </div>
  </motion.div>
</div>
      )}

    </motion.div>
  );
};

export default FindVehicle;

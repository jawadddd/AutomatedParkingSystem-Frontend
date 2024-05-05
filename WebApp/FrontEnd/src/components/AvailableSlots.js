import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SERVERURL } from '../ServerUrl';
const AvailableSlots = ({adminIs}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/api/v1/getAvailableSlots`, {
          params: {
            emailIs: adminIs.email, // Replace with the actual email
          },
        });
        if (response.data.success) {
          setSlots(response.data.MatchingCells);
        } else {
          setSlots([]);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    };

    fetchAvailableSlots();
  }, [searchTerm]);

  const filteredSlots = slots.filter((slot) =>
    `${slot.floor} ${slot.row} ${slot.Status} ${slot.Slot}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 lg:p-12 imp4 container spac">
      <h2 className="text-2xl font-bold mb-4">Available Slots</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-3 w-full"
        />
      </div>
      <div className="overflow-x-auto">
  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="py-4 px-4 border-b border-gray-700">Floor</th>
        <th className="py-4 px-4 border-b border-gray-700">Row</th>
        <th className="py-4 px-4 border-b border-gray-700">Status</th>
        <th className="py-4 px-4 border-b border-gray-700">Slot</th>
      </tr>
    </thead>
    <tbody className="text-gray-700">
      {filteredSlots.map((slot, index) => (
        <tr 
          key={index} 
          className="hover:bg-gray-100 transition duration-300 ease-in-out border-b border-gray-300"
        >
          <td className="py-4 px-4">{slot.floor}</td>
          <td className="py-4 px-4">{slot.row}</td>
          <td className="py-4 px-4">{slot.Status}</td>
          <td className="py-4 px-4">{slot.Slot}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </motion.div>
  );
};

export default AvailableSlots;

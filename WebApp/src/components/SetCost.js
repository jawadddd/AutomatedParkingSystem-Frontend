import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SERVERURL } from '../ServerUrl';

const SetCost = ({ adminIs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [slots, setSlots] = useState([]);
  const [newCost, setNewCost] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/api/v1/getSlots`, {
          params: {
            emailIs: adminIs.email,
          },
        });
        if (response.data.success) {
          setSlots(response.data.MatchingCells);
        } else {
          setSlots([]);
        }
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    };

    fetchAvailableSlots();
  }, [searchTerm]);

  const filteredSlots = slots.filter((slot) =>
    `${slot.floor} ${slot.row} ${slot.Status} ${slot.Slot}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSetCost = async () => {
    try {
      const formData = new FormData();
      formData.append('floorNo', selectedSlot.floor);
      formData.append('rowNo', selectedSlot.row);
      formData.append('slotNo', selectedSlot.Slot);
      formData.append('email', adminIs.email);
      formData.append('newCost', newCost.toString());
  
      const response = await axios.post(`${SERVERURL}/api/v1/setCost`, formData);
      if (response.data.success) {
        // Update the cost of the selected slot in filteredSlots
        const updatedSlots = filteredSlots.map((slot) => {
          if (slot.Slot === selectedSlot.Slot && slot.floor === selectedSlot.floor && slot.row === selectedSlot.row) {
            return {
              ...slot,
              cost: newCost.toString(),
            };
          }
          return slot;
        });
  
        setSlots(updatedSlots);
        setSelectedSlot(null); // Clear selectedSlot after updating
        setNewCost(''); // Clear newCost after updating
        window.location.reload();
      } else {
        console.error('Failed to set cost');
      }
    } catch (error) {
      console.error('Error setting cost:', error);
    }
  };
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 lg:p-12 imp4 container spac">
      <h2 className="text-2xl font-bold mb-4">Set Cost of Slots</h2>
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
              <th className="py-4 px-4 border-b border-gray-700">Slot</th>
              <th className="py-4 px-4 border-b border-gray-700">Floor</th>
              <th className="py-4 px-4 border-b border-gray-700">Row</th>
              <th className="py-4 px-4 border-b border-gray-700">Status</th>
              <th className="py-4 px-4 border-b border-gray-700">Cost</th>
              <th className="py-4 px-4 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredSlots.map((slot, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-100 transition duration-300 ease-in-out border-b border-gray-300"
              >
                <td className="py-4 px-4">{slot.Slot}</td>
                <td className="py-4 px-4">{slot.floor}</td>
                <td className="py-4 px-4">{slot.row}</td>
                <td className="py-4 px-4">{slot.Status}</td>
                <td className="py-4 px-4">{slot.cost}</td>
                <td className="py-4 px-4 flexin">
                  <button 
                    className="bg-gradient-to-r from-gray-700 to-blue-500 text-white p-2 rounded"
                    onClick={() => {
                      setSelectedSlot(slot);
                      setNewCost('');
                    }}
                  >
                    Set Cost
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for setting new cost */}
      {selectedSlot && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Set New Cost</h3>
            <input 
              type="number"
              placeholder="New Cost"
              value={newCost}
              onChange={(e) => {
                // Check if the input value is greater than or equal to 0
                if (e.target.value >= 0) {
                  setNewCost(e.target.value);
                }
              }}
              className="border p-3 w-full mb-4"
            />
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
              onClick={handleSetCost}
            >
              Confirm
            </button>
            <button 
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={() => setSelectedSlot(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SetCost;

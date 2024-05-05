import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EditSlots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [slots, setSlots] = useState([
    { id: 1, date: '2024-04-01', time: '10:00 AM', status: 'Available' },
    { id: 2, date: '2024-04-02', time: '11:00 AM', status: 'Available' },
    { id: 3, date: '2024-04-03', time: '12:00 PM', status: 'Booked' },
    { id: 4, date: '2024-04-04', time: '01:00 PM', status: 'Available' },
  ]);

  const filteredSlots = slots.filter((slot) =>
    `${slot.date} ${slot.time} ${slot.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 lg:p-12 imp4 container">
      <h2 className="text-2xl font-bold mb-4">Edit Slots</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredSlots.map((slot) => (
              <tr key={slot.id}>
                <td className="py-2 px-4">{slot.date}</td>
                <td className="py-2 px-4">{slot.time}</td>
                <td className="py-2 px-4">{slot.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default EditSlots;

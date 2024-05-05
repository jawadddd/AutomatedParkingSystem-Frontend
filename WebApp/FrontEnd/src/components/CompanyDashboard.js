import React from 'react';
import { motion } from 'framer-motion';

const CompanyDashboard = ({ adminIs }) => {
  const netProfit = 16000;

  const tableData1 = [
    { id: 1, title: 'Product A', revenue: '$10,000', expenses: '$5,000', profit: '$5,000' },
    { id: 2, title: 'Product B', revenue: '$15,000', expenses: '$7,000', profit: '$8,000' },
    { id: 3, title: 'Product C', revenue: '$12,000', expenses: '$6,000', profit: '$6,000' },
  ];

  const tableData2 = [
    { id: 1, name: 'John Doe', role: 'Manager', department: 'Sales' },
    { id: 2, name: 'Jane Smith', role: 'Developer', department: 'IT' },
    { id: 3, name: 'Emily Brown', role: 'Designer', department: 'Marketing' },
  ];

  return (
    <div className="container mx-auto p-4 imp4 spac">
      <h1 className="text-2xl font-bold mb-4">Parking Dashboard</h1>
      <div
  className="bg-gradient-to-r from-gray-700 to-blue-600 text-white p-4 md:p-6 rounded-lg shadow-md mb-8 text-center"
>
  <h2 className="text-xl md:text-2xl font-semibold mb-2">Net Profit</h2>
  <p className="text-2xl md:text-4xl font-bold">PKR {netProfit.toLocaleString()}</p>
</div>
      {/* ... rest of the code remains the same */}
    </div>
  );
};

export default CompanyDashboard;

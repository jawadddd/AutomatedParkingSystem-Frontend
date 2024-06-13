import React from 'react';

const CompanyHeader = ({ adminIs }) => {
  return (
    <div className="bg-white borderrr font-sans fix">
      <div className="container myy mx-auto imp3 flexjustify-enditems-center p-1 md:p-4">
        <h2 className=" md:text-2xl justify-end impHeader font-bold tracking-wide text-gray-700">Welcome Back, {adminIs.userName}</h2>
        <div className="flex items-center  space-x-1 md:space-x-3">
          <div className="rounded-full overflow-hidden">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRemiRC1qmff-ZcN0Pfez_oKqUCA1u5V6q-mw&usqp=CAU" 
              alt="Profile" 
              className="h-12 w-12 md:h-16 md:w-16 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyHeader;

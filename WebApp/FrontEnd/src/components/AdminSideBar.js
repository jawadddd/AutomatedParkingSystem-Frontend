import React from 'react';
import { useState } from "react";
import { useHistory } from "react-router-dom"; // Import useHistory
import pic1 from './assets/control.png';
import pic2 from './assets/logo.png';
import pic3 from './assets/Chart_fill.png';
import pic4 from './assets/Chat.png';
import pic5 from './assets/User.png';
import pic6 from './assets/Calendar.png';
import pic7 from './assets/Search.png';
import pic8 from './assets/Chart.png';
import pic9 from './assets/Folder.png';
import pic10 from './assets/Setting.png';

const AdminSidebar = ({ setSelectedComponent }) => {
    const [open, setOpen] = useState(false);

    const Menus = [
      { title: "Dashboard", src: pic3, action: () => setSelectedComponent('Dashboard') },
      { title: "Find Vehicle", src: pic7, action: () => setSelectedComponent('Find Vehicle') },
      { title: "Set Cost ", src: pic6, action: () => setSelectedComponent('Set Cost') },
      { title: "View Available Slots", src: pic8, action: () => setSelectedComponent('Available Slots') },
      { title: "View Booked Slots", src: pic9,  action: () => setSelectedComponent('Booked Slots') },
      { title: "View Filled Slots", src: pic9,  action: () => setSelectedComponent('Filled Slots') },
      { title: "Edit Structure", src: pic10, action: () => setSelectedComponent('Edit Floors') },
      { title: "Logout", src: pic5,  action: () => setSelectedComponent('Logout') },
    ];
  
    return (
      <div className="flex">
        <div
          className={` ${
            open ? "w-72" : "w-20 "
          } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
        >
          <img
            src={pic1}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src={pic2}
              className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Admin Panel
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
                onClick={() => {
                  Menu.action(); // Call the action function when clicked
                  setOpen(false); // Close the sidebar
                }}
              >
                <img src={Menu.src} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default AdminSidebar;

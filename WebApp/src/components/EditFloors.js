import { motion } from 'framer-motion';
import React, { useEffect, useState,useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './SuperAdminHomePanel.css';
import axios from "axios";
import Swal from 'sweetalert2';
import { SERVERURL } from "../ServerUrl";
import loadingGif from '../images/ZKZg.gif';

const EditFloors = () => {

  const [hoveredSlotCost, setHoveredSlotCost] = useState(null); // State variable to store hovered slot's cost

  const [adminData, setAdminData] = useState([]);
  const [rerenderKey, setRerenderKey] = useState(Date.now());
  const [rows, setRows] = useState([5]);
  const [columns, setColumns] = useState([5]);
  const [noOfFloors, setNoOfFloors] = useState(1);
  const [floorIndex1, setFloorIndex1] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [cost, setCost] = useState(1);
  
  const [selectedBlock, setSelectedBlock] = useState("Enter");
  const [loading, setLoading] = useState(true);

const navigate = useNavigate();
const location = useLocation();
const { state } = location;
console.log("staaate is:",state);
const [grid, setGrid] = useState([]);
const [showDialog, setShowDialog] = useState(false);
const [slotNumberInput, setSlotNumberInput] = useState("");
const [selectedCellIndex, setSelectedCellIndex] = useState(null);

useEffect(() => {
  const fetchAdmin = async () => {
    try {
      const response = await axios.get(`${SERVERURL}/api/v1/getAdminByEmail?email=${state}`);
      setAdminData(response.data.completeObject.floorsPlan);        
      
setLoading(false);
    } catch (error) {
      console.error("Error fetching Admin Details:", error.message);
      setLoading(false);
    }
  };

  // Call the function to fetch company admin data when the component mounts
  fetchAdmin();

}, []);

const renderGrid = () => {
  if (!adminData) return null; // Return null if adminData is not yet available

  return adminData.map((floor, floorIndex) => (
    


    <div key={floorIndex} className="FormHeading">
            <h1 className='text-2xl font-bold mb-4'>Floor {floorIndex + 1}</h1>
            <div className="FormLeftRightSide">
              <div className="FormLeftSide">
                <div className="form-group">
                  <label htmlFor={`rows${floorIndex}`}>Rows:</label>
                  <input
                    type="number"
                    id={`rows${floorIndex}`}
                    name="rows"
                    value={floor.length || rows[floorIndex]}
                    onChange={(e) => handleChange(e, floorIndex)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`columns${floorIndex}`}>Columns:</label>
                  <input
                    type="number"
                    id={`columns${floorIndex}`}
                    name="columns"
                    value={(floor[0].length || columns[floorIndex])}
                    onChange={(e) => handleChange(e, floorIndex)}
                    required
                  />
                </div>
              </div>
              {/* <div className="FormRightSide">
                <div key={`grid${floorIndex}`} className="grid-container">
                  {floor.map((row, rowIndex) => (
                    <div className="grid-row" key={rowIndex} style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}>
                      {row.map((cell, columnIndex) => (
                        <div className="grid-cell" key={columnIndex} onClick={() => handleCellClick(floorIndex, rowIndex, columnIndex)}>
                          {cell.name === "Slot" ? cell.slotNo : cell.name}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div> */}
{
loading ? (
  <img className="loadingGif" src={loadingGif} alt="loading..." /> // Show loading animation
) : (
  <>

<div className="floorsPlann">

<div className="SuperAdminPanelDetailTwo"> 
{floor.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className="grid-row" 
          style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
        >
          {row.map((cell, columnIndex) => (
            <div 
              className="grid-cell" 
              onClick={() => handleCellClick(floorIndex,rowIndex,columnIndex)}
              key={columnIndex}
              onMouseEnter={() => {
                if (cell.name === "Slot") {
                  setHoveredSlotCost(cell.slotCost); // Set hovered slot's cost to state variable
                }
              }}
              onMouseLeave={() => {
                if (cell.name === "Slot") {
                  setHoveredSlotCost(null); // Reset hovered slot's cost when mouse leaves
                }
              }}
            >
              {cell.name === "Slot" ? cell.slotNo : cell.name}
            </div>
          ))}
        </div>
      ))}
 </div>


 </div>
 </>
)}

            </div>
          </div>
        



    
    ));
};


const handleChange = (e, floorIndex) => {
  const { name, value } = e.target;

  switch (name) {
    case "noOfFloors":
      if(Number(value) > 0 )
      {
        setFloorIndex1(floorIndex);
        setNoOfFloors(Number(value));
        setRerenderKey(Date.now());
        console.log(rows[floorIndex]);
      } 
      break;
    case "cost":
      if(Number(value) > 0)
      {
        setFloorIndex1(floorIndex);
        setCost(Number(value));
      }
      break;
    case "rows":
      if(Number(value) > 0)
      {
        setFloorIndex1(floorIndex);
        setRows(prevRows => {
          const updatedRows = [...prevRows];
  console.log("floor index",floorIndex);
          updatedRows[floorIndex] = value;
          console.log("floorindex",floorIndex);
          console.log("updated rows",updatedRows[floorIndex]);
          return updatedRows;
        });
      }
      break;
    case "columns":
      if(Number(value) > 0)
      {
        setFloorIndex1(floorIndex);
        setColumns(prevColumns => {
          const updatedColumns = [...prevColumns];
          updatedColumns[floorIndex] = value;
          return updatedColumns;
        });

      }
      break;
    default:
      break;
  }
};



  useEffect(() => {
    const updatedGrid = [...adminData];
  
    // If the number of floors is increasing
    while (updatedGrid.length < noOfFloors) {
      // Add a new floor with default rows and columns
      updatedGrid.push(Array.from({ length: 5 }, () =>
        Array.from({ length: 5 }, () => ({
          name: "",
          status: "",
          slotNo: "",
          cost: "",
          vehicle: ""
        }))
      ));
    }
  
    // If the number of floors is decreasing
    while (updatedGrid.length > noOfFloors) {
      // Remove the last floor
      updatedGrid.pop();
    }
  
    // Update the adminData state with the modified grid
    setAdminData(updatedGrid);
  }, [noOfFloors,rerenderKey]);








useEffect(() => {
  const updatedGrid = [...adminData];

  updatedGrid.forEach((floor, index) => {
    console.log("here");
    if(index === floorIndex1)
    {
      console.log("index=floorIndex1", index);
      const numRows = rows[index] || floor.length || 5; // Use the existing number of rows if available
    const numColumns =  floor[0]?.length || columns[index] || 5; // Use the existing number of columns if available
    while (floor.length < numRows) {
      floor.push(Array.from({ length: numColumns }, () => ({
        name: "",
        status: "",
        slotNo: "",
        cost: "",
        vehicle: ""
      })));
    }

    while (floor.length > numRows) {
      floor.pop();
    }

    }
    

    });

  setAdminData(updatedGrid);
}, [rows]);

useEffect(() => {
  const updatedGrid = [...adminData];
  console.log("here");
  updatedGrid.forEach((floor, index) => {
    // Only update the columns for the selected floor
    if (index === floorIndex1) {
      console.log("index=floorIndex1", index);
      const numColumns = columns[index] || floor[0]?.length || 5; // Use the existing number of columns if available

      floor.forEach(row => {
        while (row.length < numColumns) {
          row.push({
            name: "",
            status: "",
            slotNo: "",
            cost: "",
            vehicle: ""
          });
        }

        while (row.length > numColumns) {
          row.pop();
        }
      });
    }
  });

  setAdminData(updatedGrid);
}, [columns]);


const handleCellClick = (floorIndex, rowIndex, columnIndex) => {
  if (selectedBlock === "Slot") {
    const updatedGrid = [...adminData];
    setShowDialog(true);
    setSelectedCellIndex({ floorIndex, rowIndex, columnIndex });
    updatedGrid[floorIndex][rowIndex][columnIndex].name = selectedBlock;
    updatedGrid[floorIndex][rowIndex][columnIndex].status = "available"; // Assuming the status should be set to "available"
    //convert cost which is number to String form
    updatedGrid[floorIndex][rowIndex][columnIndex].cost = cost.toString();



    updatedGrid[floorIndex][rowIndex][columnIndex].cost = cost;
    setAdminData(updatedGrid);
  } else {
    const updatedGrid = [...adminData];
    updatedGrid[floorIndex][rowIndex][columnIndex].name = selectedBlock;
    setAdminData(updatedGrid);
  }
};

const handleDialogClose = () => {
  setShowDialog(false);
  setSelectedCellIndex(null);
  setSlotNumberInput("");
};

const handleSlotNumberInput = (e) => {
  setSlotNumberInput(e.target.value);
};

const handleSaveSlotNumber = () => {
  const { floorIndex, rowIndex, columnIndex } = selectedCellIndex;
  const updatedGrid = [...adminData];
  updatedGrid[floorIndex][rowIndex][columnIndex].slotNo = "Slot"+slotNumberInput;
  setAdminData(updatedGrid);
  handleDialogClose();
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let totalSlots=0;

    if(state!==null)
    {
          // Print each object in JSON form using map
          console.log("No of Floors:"+adminData.length);
          adminData.map((floor, floorIndex) => {
            console.log(`Floor Number${floorIndex + 1}:`);
            console.log("Number of rows:"+floor.length);
            floor.map((row, rowIndex) => {
              console.log("Number of cols:"+row.length);
              row.map((cell, columnIndex) => {
                console.log(`Cell [${floorIndex}, ${rowIndex}, ${columnIndex}]:`, cell);
                if (cell.name === "Slot") {
                  totalSlots++;
                }
              });
            });
          });        
console.log("TotalSlots are:"+totalSlots);
      const form = new FormData();

      //here calculated the number of slots by traversing all the indexes in grid and check where cell.name==="Slot"
  
      form.append("email", state);
      form.append("noOfSlots", totalSlots);
      form.append("noOfFloors", noOfFloors);
      form.append("modifiedFloorsPlan", JSON.stringify(adminData));
      const response = await axios.post('http://localhost:4000/api/v1/modify', form);

      if (response.status === 200) {
        console.log('Request Successful:', response.data.message);
        //dialogue box of successful registration here
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        });
  
      } else {
        console.error('Request Failed:', response.data.message);
        //dialogue box of registration failed here
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message,
        });
      }

    }
    else
    {
      alert("Must include profile photo of jpg, png or jpeg type!");
    }
  } catch (error) {
    console.error('Error during registration:', error.message);
  }

  // ...


};

  return (
    
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 lg:p-12 imp4 container spac">
      <h2 className="text-2xl font-bold mb-4">Edit Your Parking Structure & Submit Modification Request to Admin</h2>
      <div className="form-group form-group2">
          <h2>Number Of Floors You Want for Your Parking?</h2>
          <input
            type="number"
            id="noOfFloors"
            placeholder="Enter Number here"
            name="noOfFloors"
            value={adminData.length || noOfFloors}
            onChange={(e) => handleChange(e, 0)}
            required
          />
        </div>
        <div className="form-group form-group2 buttonslist">
          <h2>Choose here and Click cells in grid to assign them Values</h2>
          <button className={selectedBlock !== "Enter" ? "block1 abc1" : "block1 abc2"} onClick={() => setSelectedBlock("Enter")}>Enter</button>
            <button className={selectedBlock !== "Exit" ? "blocktype abc1" : "blocktype abc2"} onClick={() => setSelectedBlock("Exit")}>Exit</button>
            <button className={selectedBlock !== "Slot" ? "blocktype abc1" : "blocktype abc2"} onClick={() => setSelectedBlock("Slot")}>Slot</button>
            <button className={selectedBlock !== "Hurdle" ? "blocktype abc1" : "blocktype abc2"} onClick={() => setSelectedBlock("Hurdle")}>Hurdle</button>
            <button className={selectedBlock !== "Road" ? "lastblock abc1" : "lastblock abc2"} onClick={() => setSelectedBlock("Road")}>Road</button>

        </div>

{
loading ? (<div className='loadingContainer'>
  <img className="loadingGif" src={loadingGif} alt="loading..." />
</div>
) : (
  <>

<div className="floorsPlann">

<div className="SuperAdminPanelDetailTwo"> 
 {renderGrid()}
 </div>


 </div>
 <button className="submitButton" onClick={handleSubmit}>Submit Request</button>

 </>
)}


      
        {showDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>Enter Slot Number:</h2>
            <input type="number" value={slotNumberInput} onChange={handleSlotNumberInput} />
            <div className="dialog-buttons">
              <button onClick={handleSaveSlotNumber}>Save</button>
              <button onClick={handleDialogClose}>Cancel</button>
            </div>
          </div>
        </div>

      )}
    </motion.div>
  );
};

export default EditFloors;

import React, { useEffect, useState,useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SuperAdminHomePanel.css";
import axios from "axios";
import { SERVERURL } from "../ServerUrl";
import Map from '../components/Map';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax 
mapboxgl.accessToken = 'pk.eyJ1IjoiamF3YWRkZCIsImEiOiJjbHNya2h2a2wwNGw1Mm5tbHdvd3d6bTZoIn0.s_p93Jzwa_4NdtUFgqMhYA';
 
const ApplicationFormPage = () => {
  const [rows, setRows] = useState([5]);
  const [columns, setColumns] = useState([5]);
  const [noOfFloors, setNoOfFloors] = useState(1);
  const [cost, setCost] = useState(1);
  
    const [selectedBlock, setSelectedBlock] = useState("Enter");

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [grid, setGrid] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [slotNumberInput, setSlotNumberInput] = useState("");
  const [selectedCellIndex, setSelectedCellIndex] = useState(null);
  const coordinates = [74.341045, 31.509866];
  const handleChange = (e, floorIndex) => {
    const { name, value } = e.target;

    switch (name) {
      case "noOfFloors":
        if (Number(value) > 0)
        {
          setNoOfFloors(Number(value));
          console.log(rows[floorIndex]);  
        }
        break;
      case "cost":
        if (Number(value) > 0)
        {
          setCost(Number(value));
        }
        break;
      case "rows":
        if (Number(value) > 0)
        {
          setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[floorIndex] = value;
            return updatedRows;
          });
        }
        break;
      case "columns":
        if(Number(value) > 0)
        {
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
    const updatedGrid = [...grid];
  
    // Adjust the number of floors
    while (updatedGrid.length < noOfFloors) {
      updatedGrid.push(Array.from({ length: 5 }, () =>
        Array.from({ length: 5 }, () => ({
          name: "",
          status: "",
          slotNo: "",
          cost: "",
          vehicle: ""
        }))
      ));
      // Add default values of 5 to rows and columns when adding a new floor
      setRows(prevRows => [...prevRows, 5]);
      setColumns(prevColumns => [...prevColumns, 5]);
    }
  
    while (updatedGrid.length > noOfFloors) {
      updatedGrid.pop();
      // Remove the last element from rows and columns when removing a floor
      setRows(prevRows => prevRows.slice(0, -1));
      setColumns(prevColumns => prevColumns.slice(0, -1));
    }
  
    // Adjust the rows and columns of each floor
    updatedGrid.forEach((floor, index) => {
      const numRows = rows[index] || 5;
      const numColumns = columns[index] || 5;
  
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
    });
  
    setGrid(updatedGrid);
  }, [noOfFloors, rows, columns]);

  const handleCellClick = (floorIndex, rowIndex, columnIndex) => {
    if (selectedBlock === "Slot") {
      const updatedGrid = [...grid];
      setShowDialog(true);
      setSelectedCellIndex({ floorIndex, rowIndex, columnIndex });
      updatedGrid[floorIndex][rowIndex][columnIndex].name = selectedBlock;
      updatedGrid[floorIndex][rowIndex][columnIndex].status = "Available"; // Assuming the status should be set to "available"
      //convert cost which is number to String form
      updatedGrid[floorIndex][rowIndex][columnIndex].cost = cost.toString();



      updatedGrid[floorIndex][rowIndex][columnIndex].cost = cost;
      setGrid(updatedGrid);
    } else {
      const updatedGrid = [...grid];
      updatedGrid[floorIndex][rowIndex][columnIndex].name = selectedBlock;
      updatedGrid[floorIndex][rowIndex][columnIndex].slotNo=selectedBlock;
      setGrid(updatedGrid);
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
    const updatedGrid = [...grid];
    updatedGrid[floorIndex][rowIndex][columnIndex].slotNo = ""+slotNumberInput;
    setGrid(updatedGrid);
    handleDialogClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("again is,",locationCoordinates);
      const [longitude, latitude] = locationCoordinates;
      let totalSlots=0;
      console.log(state.email);
      if(state.profilePhoto!==null)
      {
            // Print each object in JSON form using map
            console.log("No of Floors:"+grid.length);
            grid.map((floor, floorIndex) => {
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
        form.append("userName", state.userName);
        form.append("email", state.email);
        form.append("password", state.password);
        form.append("contactNumber", state.contactNumber);
        form.append("profilePhoto", state.profilePhoto);
        //here calculated the number of slots by traversing all the indexes in grid and check where cell.name==="Slot"
        form.append("noOfSlots", totalSlots);
        form.append("noOfFloors", noOfFloors);
        form.append("floorsPlan", JSON.stringify(grid));
        form.append("longitude", longitude);
    form.append("latitude", latitude);
    
        
        const response = await axios.post(`${SERVERURL}/api/v1/register`, form);

        if (response.status === 200) {
          console.log('Registration Successful:', response.data.message);
          //dialogue box of successful registration here
          // You can handle the successful registration here, e.g., redirect to a login page
          //setLogin();
          navigate("/");

        } else {
          console.error('Registration Failed:', response.data.message);
          //dialogue box of registration failed here
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
   
  const [locationCoordinates, setLocationCoordinates] = useState([74.341045, 31.509866]);

  const handleMarkerMove = (center) => {
    console.log("on marker move",center );
    setLocationCoordinates([center[0], center[1]]);
  };
  return (
    <>
      <div className="ApplicationFormPage">
       <div className="outerShadow"> <h1>Application Form</h1>
        
<Map coordinates={["72.0","42.4"]} onMarkerMove={handleMarkerMove} />

        <div className="form-group form-group2">
          <h2>Tell Us Number Of Floors of Your Parking</h2>
          <input
            type="number"
            id="noOfFloors"
            placeholder="Enter Number here"
            name="noOfFloors"
            value={noOfFloors}
            onChange={(e) => handleChange(e, 0)}
            required
          />
        </div>
<div className="form-group form-group2">
          <h2>Cost of Slot in PKR</h2>
          <input
            type="number"
            id="cost"
            placeholder="Enter Number here"
            name="cost"
            value={cost}
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

        {grid.map((floor, floorIndex) => (
          <div key={floorIndex} className="FormHeading">
            <h2>Floor {floorIndex + 1}</h2>
            <div className="FormLeftRightSide">
              <div className="FormLeftSide">
                <div className="form-group">
                  <label htmlFor={`rows${floorIndex}`}>Rows:</label>
                  <input
                    type="number"
                    id={`rows${floorIndex}`}
                    name="rows"
                    value={rows[floorIndex]}
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
                    value={columns[floorIndex]}
                    onChange={(e) => handleChange(e, floorIndex)}
                    required
                  />
                </div>
              </div>
              <div className="FormRightSide">
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
              </div>
            </div>
          </div>
        ))}

        <button className="submitButton" onClick={handleSubmit}>Submit Application</button>
         
      </div>

      {/* Dialog for entering slot number */}
      {showDialog && (
        <div className="dialog">
          <div className="dialog-content">
            <h2>Enter Slot Number:</h2>
            <input type="text" value={slotNumberInput} onChange={handleSlotNumberInput} />
            <div className="dialog-buttons">
              <button onClick={handleSaveSlotNumber}>Save</button>
              <button onClick={handleDialogClose}>Cancel</button>
            </div>
          </div>
        </div>

      )}
        </div>      
    </>
  );
};

export default ApplicationFormPage;

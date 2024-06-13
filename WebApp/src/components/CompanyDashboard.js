import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { SERVERURLPYTHON } from '../ServerUrl';
import Chart from "react-apexcharts";
import Swal from 'sweetalert2';
import { SERVERURL } from '../ServerUrl';
const CompanyDashboard = ({ adminIs }) => {
  console.log("admin is: ", adminIs._id);
  const [state, setState] = useState({
    options: {
      colors: ["#1f77b4", "#ff7f2e"],
      chart: {
        id: "basic-bar",
        height: 400,
        toolbar: {
          show: true,
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              chart: {
                width: "100%"
              }
            }
          }
        ]
      },
      xaxis: {
        categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        labels: {
          rotate: -45,
          style: {
            fontSize: '12px'
          }
        }
      },
    },
    series: [
      {
        name: "Number of Vehicles",
        data: [0, 0, 0, 0, 0],
      },
    ],
  });

  const [state2, setState2] = useState({
    options: {
      colors: ["#1f77b4", "#ff7f2e"],
      chart: {
        id: "basic-bar",
        height: 400,
        toolbar: {
          show: true,
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              chart: {
                width: "100%"
              }
            }
          }
        ]
      },
      xaxis: {
        categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        labels: {
          rotate: -45,
          style: {
            fontSize: '12px'
          }
        }
      },
    },
    series: [
      {
        name: "Number of Vehicles",
        data: [0, 0, 0, 0, 0],
      },
    ],
  });

  const [peakHours, setPeakHours] = useState({
    options: {
      chart: {
        id: "peak-hours",
        height: 400,
        toolbar: {
          show: true,
        },
      },
      xaxis: {
        categories: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        labels: {
          style: {
            fontSize: '12px'
          }
        }
      },
    },
    series: [
      {
        name: "Number of Vehicles",
        data: Array(24).fill(0),
      },
    ],
  });

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [bool1, setBool1] = useState(false); // New state variable to indicate prediction success
  const fileInputRef = useRef(null);
  const [netProfit, setNetProfit] = useState(adminIs.netProfit || 0);  

  // State variables for checkboxes
  const [filters, setFilters] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const response = await axios.get(`${SERVERURL}/api/v1/getCompanyReservations`, {
//           params: {
//             companyEmail: adminIs.email
//           }
//         });
// console.log("aya tw hai nawww",adminIs.email);
//         if (response.status === 200) {
//           const reservations = response.data.userReservations;
//           console.log("came here",response.data.userReservations);
  

//           // const monday = new Date(2024, 5, 10);  // June 10, 2024 (Monday)
//           // const tuesday = new Date(2024, 5, 11); // June 11, 2024 (Tuesday)
//           // const wednesday = new Date(2024, 5, 12); // June 12, 2024 (Wednesday)
//           // const thursday = new Date(2024, 5, 13); // June 13, 2024 (Thursday)
//           // const friday = new Date(2024, 5, 14); // June 14, 2024 (Friday)
//           // const saturday = new Date(2024, 5, 15); // June 15, 2024 (Saturday)
//           // const sunday = new Date(2024, 5, 16); // June 16, 2024 (Sunday)



//           const today = new Date();

//           // const today = sunday;


//           console.log("today",today);
//           const dayOfWeek = today.getDay();
//           console.log("today",dayOfWeek);
//           const reservationCounts = [0, 0, 0, 0, 0]; // Monday to Friday
  
//           let startMonday, endFriday;
//           switch (dayOfWeek) {
//             case 0: // Sunday
//             startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 );
//             endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() );
//             console.log("start Monday",startMonday);
//             console.log("END Friday",endFriday);  
//             console.log("Sunday,Saturday")
//               break;
//             case 6: // Saturday
//             startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 6);
//             endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);              console.log("Sunday,Saturday")
//             console.log("start Monday",startMonday);
//             console.log("END Friday",endFriday);
//             break;
//             case 5: // Friday
//               startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 5);
//               endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 5);
//               console.log("start Monday",startMonday);
//               console.log("END Friday",endFriday);
//               console.log("friday,Saturday")
//               break;
//             case 4: // Thursday
//               startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 4);
//               endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 4);
//               console.log("start Monday",startMonday);
//               console.log("END Friday",endFriday);
//               console.log("thursday,Saturday")
//               break;
//             case 3: // Wednesday
//             startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 3);
//             endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 3);
            
//               console.log("start Monday",startMonday);
//               console.log("END Friday",endFriday);
//               console.log("wednesday,Saturday")
//               break;
//             case 2: // Tuesday
//               startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()  - 7 + 2);
//               endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 2);
//               console.log("start Monday",startMonday);
//               console.log("END Friday",endFriday);
//               console.log("tuesday,Saturday")
//               break;
//             case 1: // Monday
//               startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7+1);
//               endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
//               console.log("start Monday",startMonday);
//               console.log("END Friday",endFriday);
//               console.log("monday,Saturday")
//               break;
//             default:
//               break;
//           }
  
//           // Filter reservations for the specified date range
//           const prevWeekReservations = reservations.filter((reservation) => {
//             const reservationDate = new Date(reservation.date);
//             return reservationDate >= startMonday && reservationDate <= endFriday;
//           });
  
//           // Count reservations for each day
//           prevWeekReservations.forEach((reservation) => {
//             const reservationDate = new Date(reservation.date);
//             const dayIndex = reservationDate.getDay() - 1; // 0-indexed, Monday is 0
//             if (dayIndex >= 0 && dayIndex < 5) { // Only count Monday to Friday
//               reservationCounts[dayIndex]++;
//             }
//           });
  
//           console.log("reservations:", reservationCounts);
//           setState2((prevState) => ({
//             ...prevState,
//             series: [{ ...prevState.series[0], data: reservationCounts }],
//           }));
//         } else {
//           Swal.fire({
//             icon: 'error',
//             title: 'Error!',
//             text: 'Failed to fetch reservations.',
//           });
//         }
//       } catch (error) {
//         console.error('Error fetching reservations:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: 'An error occurred while fetching reservations.',
//         });
//       }
//     };
  
//     fetchReservations();
//   }, []);


  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/api/v1/getCompanyReservations`, {
          params: {
            companyEmail: adminIs.email
          }
        });
        console.log("aya tw hai nawww", adminIs.email);
        if (response.status === 200) {
          const reservations = response.data.userReservations;
          console.log("came here", response.data.userReservations);
  
          const today = new Date();
          const dayOfWeek = today.getDay();
          const reservationCounts = [0, 0, 0, 0, 0]; // Monday to Friday
          const peakHourCounts = Array(24).fill(0); // 24 hours

          let startMonday, endFriday;
          switch (dayOfWeek) {
            case 0: // Sunday
              startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7);
              endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
              console.log("start Monday", startMonday);
              console.log("END Friday", endFriday);  
              console.log("Sunday, Saturday");
              break;
            case 6: // Saturday
              startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 6);
              endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
              console.log("start Monday", startMonday);
              console.log("END Friday", endFriday);
              console.log("Saturday, Sunday");
              break;
            case 5: // Friday
              startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 5);
              endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 5);
              console.log("start Monday", startMonday);
              console.log("END Friday", endFriday);
              console.log("Friday, Saturday");
              break;
            case 4: // Thursday
              startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 4);
              endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 4);
              console.log("start Monday", startMonday);
              console.log("END Friday", endFriday);
              console.log("Thursday, Friday");
              break;
            case 3: // Wednesday
              startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 3);
              endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 3);
              console.log("start Monday", startMonday);
              console.log("END Friday", endFriday);
              console.log("Wednesday, Thursday");
              break;
            case 2: // Tuesday
              startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 2);
              endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 2);
              console.log("start Monday", startMonday);
              console.log("END Friday", endFriday);
              console.log("Tuesday, Wednesday");
              break;
            case 1: // Monday
              startMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() - 7 + 1);
              endFriday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
              console.log("start Monday", startMonday);
              console.log("END Friday", endFriday);
              console.log("Monday, Tuesday");
              break;
            default:
              break;
          }
  
          // Filter reservations for the specified date range
          const prevWeekReservations = reservations.filter((reservation) => {
            const reservationDate = new Date(reservation.date);
            return reservationDate >= startMonday && reservationDate <= endFriday;
          });
  
          // Count reservations for each day and each hour
          prevWeekReservations.forEach((reservation) => {
            const reservationDate = new Date(reservation.date);
            const dayIndex = reservationDate.getDay() - 1; // 0-indexed, Monday is 0
            if (dayIndex >= 0 && dayIndex < 5) {
              console.log("days:",dayIndex,reservationDate)
              // Only count Monday to Friday
              reservationCounts[dayIndex]++;
              let entryHour = parseInt(reservation.entryTime.split(":")[0], 10);
              console.log("entry",entryHour)
              let exitHour = parseInt(reservation.exitTime.split(":")[0], 10);
              console.log("exit",exitHour)
              for (let hour = entryHour; hour <= exitHour; hour++) {
                console.log("hour",hour)
                peakHourCounts[hour]++;
              }
            }
          });
  
          console.log("reservations:", reservationCounts);
          console.log("peak hours:", peakHourCounts);
          setState2((prevState) => ({
            ...prevState,
            series: [{ ...prevState.series[0], data: reservationCounts }],
          }));
          setPeakHours((prevState) => ({
            ...prevState,
            series: [{ ...prevState.series[0], data: peakHourCounts }],
          }));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Failed to fetch reservations.',
          });
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'An error occurred while fetching reservations.',
        });
      }
    };
    fetchReservations();
  }, [adminIs]);


  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(`${SERVERURLPYTHON}/predict`, {
          params: { id: adminIs._id }
        });
        if (response.data.success) {
          const predictions = response.data.predictions;
          const newSeries = [
            filters.monday ? parseInt(predictions["Day_1_Event_1"]) : parseInt(predictions["Day_1_Event_0"]),
            filters.tuesday ? parseInt(predictions["Day_2_Event_1"]) : parseInt(predictions["Day_2_Event_0"]),
            filters.wednesday ? parseInt(predictions["Day_3_Event_1"]) : parseInt(predictions["Day_3_Event_0"]),
            filters.thursday ? parseInt(predictions["Day_4_Event_1"]) : parseInt(predictions["Day_4_Event_0"]),
            filters.friday ? parseInt(predictions["Day_5_Event_1"]) : parseInt(predictions["Day_5_Event_0"])
          ];
          setState(prevState => ({
            ...prevState,
            series: [{ ...prevState.series[0], data: newSeries }]
          }));
          setBool1(true); // Set bool1 to true when prediction is successful
        }
      } catch (error) {
        console.error('Error fetching predictions', error);
      }
    };

    fetchPredictions();
  }, [adminIs._id, filters]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('idIs', adminIs._id);

    try {
      const response = await axios.post(`${SERVERURLPYTHON}/uploadExcelFile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        console.log('Request Successful:', response.data.message);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        });

      } else {
        console.error('Request Failed:', response.data.message);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.message,
        });
      }

      if (response.data.success) {
        setFile(null);
        fileInputRef.current.value = '';
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `File Uploaded Successfully with Training result of ${response.data.result.mae} MAE & ${response.data.result.mse} MSE.`,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Error Uploading File.",
        });
      }
    }
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An Error Occurred.",
      });
    }
  };

  const handlePredict = async () => {
    try {
      const response = await axios.get(`${SERVERURLPYTHON}/predict`, {
        params: { id: adminIs._id }
      });
      if (response.data.success) {
        const predictions = response.data.predictions;

        const newSeries = [
          filters.monday ? parseInt(predictions["Day_1_Event_1"]) : parseInt(predictions["Day_1_Event_0"]),
          filters.tuesday ? parseInt(predictions["Day_2_Event_1"]) : parseInt(predictions["Day_2_Event_0"]),
          filters.wednesday ? parseInt(predictions["Day_3_Event_1"]) : parseInt(predictions["Day_3_Event_0"]),
          filters.thursday ? parseInt(predictions["Day_4_Event_1"]) : parseInt(predictions["Day_4_Event_0"]),
          filters.friday ? parseInt(predictions["Day_5_Event_1"]) : parseInt(predictions["Day_5_Event_0"])
        ];

        setState(prevState => ({
          ...prevState,
          series: [{ ...prevState.series[0], data: newSeries }]
        }));
        setBool1(true); // Set bool1 to true when prediction is successful

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Prediction Successful"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: response.data.error || "An error occurred while predicting.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred.",
      });
    }
  };

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  return (
    <div className="container mx-auto p-4 imp4 spac">
      <h1 className="text-2xl font-bold mb-4">Parking Dashboard</h1>
      <div className="bg-gradient-to-r from-gray-700 to-blue-600 text-white p-4 md:p-6 rounded-lg shadow-md mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">Net Profit</h2>
        <p className="text-2xl md:text-4xl font-bold">PKR {netProfit.toLocaleString()}</p>
      </div>

      
        <div className="flex flex-col lg:flex-row flex-wrap justify-between">
          <div className="lg:w-1/2 w-full p-2">
            <h2 className="chart-heading">Previous Traffic</h2>
            <Chart
              options={state2.options}
              series={state2.series}
              type="bar"
              width="100%"
            />
          </div>
          {bool1 && (
            <>
          <div className="lg:w-1/2 w-full p-2">
            <h2 className="chart-heading">Predicted Traffic</h2>
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
    <h2 className="text-xl font-semibold mb-4">Mention special days coming in next week:</h2>
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          name="monday"
          checked={filters.monday}
          onChange={handleFilterChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2">Monday</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="tuesday"
          checked={filters.tuesday}
          onChange={handleFilterChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2">Tuesday</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="wednesday"
          checked={filters.wednesday}
          onChange={handleFilterChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2">Wednesday</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="thursday"
          checked={filters.thursday}
          onChange={handleFilterChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2">Thursday</label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          name="friday"
          checked={filters.friday}
          onChange={handleFilterChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2">Friday</label>
      </div>
    </div>
  </div>
  </>

)}

          <div className="lg:w-1/1 w-full p-2">
            <h2 className="chart-heading">Peak Hours of Previous Week</h2>
            <Chart
              options={peakHours.options}
              series={peakHours.series}
              type="area"
              height={400}
            />
          </div>
        </div>
    

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Do you want to upload new Data to train your Prediction Model?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <button
                     type="submit"
                     className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
                   >
            Submit
            </button>
            </form>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg">
    <h2 className="text-xl font-semibold mb-4">Next Week Prediction</h2>
    <div className="mb-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handlePredict}>Predict</button>
    </div>
  </div>



</div>);
}
export default CompanyDashboard;
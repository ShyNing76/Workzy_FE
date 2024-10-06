import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const ManagerAssign = () => {
  const [buildings, setBuildings] = useState ([
    { 
      id: Bu01,
      name: "Building A",
      staffAssigned: null 
    },
    { id: Bu02,
      name: "Building B",
      staffAssigned: null 
    },
    {
      id: Bu03,
      name: "Building C",
      staffAssigned: null
    }
  ])

  const [staff, setStaff] = useState ([
    {
      id: St01,
      name: "Duy Long Do",
    },

    {
      id: St02,
      name: "Le Hoang Trong",
    },

    {
      id: St03,
      name: "Quang Tran",
    }
  ])

  const [selectedBuilding, setSelectedBuilding] = useState (null)
  const [filterLocation, setFilterLocation] = useState("")
  

  
  return (
     <div>
      
     </div>
  );
};

export default ManagerAssign;

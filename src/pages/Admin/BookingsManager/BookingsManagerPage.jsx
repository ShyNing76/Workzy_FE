import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";
import { getBookingByBuildingId } from "../../../config/api.admin.js";
import { getBuilding } from "../../../config/api.admin.js" // Assuming similar structure to getBooking

const BookingsManagerPage = () => {
  const location = useLocation();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State lỗi
  const [building, setBuilding] = useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState('');

  // const [searchTerm, setSearchTerm] = useState("");
  // const [showAddModal, setShowAddModal] = useState(false);
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [bookingToDelete, setBookingToDelete] = useState(null);
  // const [successMessage, setSuccessMessage] = useState("");
  const [newBooking, setNewBooking] = useState({
    booking_id: '',
    workspace_id: '',
    start_time: '',
    end_time: '',
    total_price: ''
  });

  const [responseData, setResponseData] = useState(null);

    //Hiện data lên table
    
    useEffect(() => {
      const fetchBooking = async () => {
        if (!selectedBuildingId) {
          setBooking([]); // Clear bookings if no building is selected
          return;
        }
    
        setLoading(true); // Start loading state while fetching
        try {
          
          const res = await getBookingByBuildingId(selectedBuildingId);
          console.log('Fetching bookings for building:', selectedBuildingId)
          
          if (res && res.data && res.data.err === 0) { // Validate structure and success
            const rows = res.data.rows;
            setBooking(res.data.rows);
            console.log('Abs')
          } else {
            console.error('Unexpected data format or error from API:', res);
            setBooking([]); // Initialize with empty array if data is not as expected
          }
        } catch (err) {
          console.error('Error fetching bookings:', err);
          setError(err);
          setBooking([]); // Optionally reset bookings on error
        } finally {
          setLoading(false); // End loading state
        }
      };
    
      fetchBooking();
    }, [selectedBuildingId]);

useEffect(() => {
  const fetchBuildings = async () => {
    try {
      const res = await getBuilding();
      if (res && res.data) {
        setBuilding(res.data.rows || res.data); // Adjust based on your response structure
      }
    } catch (err) {
      console.error('Failed to fetch buildings:', err);
    }
  };

  fetchBuildings();
}, []);

  // const handleInputChange = (e) => {

  // };

  // const generateBookingId = () => {
  //   const lastId =
  //     bookings.length > 0 ? bookings[bookings.length - 1].id : "BK00";
  //   const newId = `BK${parseInt(lastId.substring(2)) + 1}`;
  //   return newId;
  // };

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const closeSuccessMessage = () => {
  //   setSuccessMessage("");
  // };

  // const filteredBookings = bookings.filter((booking) => {
  //     return(
  //       booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.customerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       booking.workspaceID.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   }
  // );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-black mb-4">Manage Bookings</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          // searchTerm={searchTerm}
          // handleSearchChange={handleSearchChange}
          // placeholder="Search by ID, name, or status"
        />

        {/* Add Button */}
        <div className="ml-2">
          {/* <AddButton
            onClick={() => setShowAddModal(true)}
            label="Add Booking"
          /> */}
        </div>
      </div>

        <div>
          {/* <SuccessAlert
            message={successMessage}
            onClose={closeSuccessMessage}
          /> */}
        </div>
        
        <select
  className="select select-bordered select-sm w-full max-w-xs"
  value={selectedBuildingId}
  onChange={(e) => setSelectedBuildingId(e.target.value)}
>
  <option value="">All Buildings</option>
  {building.map((building) => (
    <option key={building.building_id} value={building.building_id}>
      {building.building_name}
    </option>
  ))}
</select>

        <div className="overflow-x-auto flex flex-1">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Workspace ID</th>
                <th>Total Price</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(booking) && booking.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.booking_id}</td>
                    <td>{booking.workspace_id}</td>
                    <td>{booking.total_price}</td>
                    <td>{booking.start_time}</td>
                    <td>{booking.end_time}</td>
                    <td className="flex space-x-2">
                      {/* Update Button */}
                      {/* <UpdateButton
                        onClick={() => {
                          setCurrentBooking({ 
                            ...booking, 
                            oldId: booking.id 
                          });
                          setShowUpdateModal(true);
                        }}
                      /> */}

                      {/* Delete Button */}
                      {/* <DeleteButton
                        onClick={() => {
                          setBookingToDelete(booking);
                          setShowDeleteModal(true);
                        }}
                      /> */}
                    </td>
                  </tr>
                ))}
              
            </tbody>
          </table>
        </div>

        {/* Add, Update, Delete, Success Modals */}
        {/* <AddModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddBookingSubmit}
          currentItem={currentBooking}
          onInputChange={handleInputChange}
          fields={addBookingFields}
        /> */}

        {/* <UpdateModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdateBookingSubmit}
          currentItem={currentBooking}
          onInputChange={handleInputChange}
          fields={updateBookingFields}
        />

        <DeleteModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteBooking}
          itemToDelete={bookingToDelete}
          itemType="booking"
        /> */}
    </div>
  );
};

export default BookingsManagerPage;

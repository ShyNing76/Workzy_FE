import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import SearchBar from "../../../components/layout/Admin/SearchBar/SearchBar.jsx";
import AddModal from "../../../components/layout/Admin/Modals/AddModal.jsx";
import DeleteModal from "../../../components/layout/Admin/Modals/DeleteModal.jsx";
import UpdateModal from "../../../components/layout/Admin/Modals/UpdateModal.jsx";
import AddButton from "../../../components/layout/Admin/Buttons/AddButton.jsx";
import UpdateButton from "../../../components/layout/Admin/Buttons/UpdateButton.jsx";
import DeleteButton from "../../../components/layout/Admin/Buttons/DeleteButton.jsx";
import SuccessAlert from "../../../components/layout/Admin/SuccessAlert/SuccessAlert.jsx";

const BookingsManagerPage = () => {
  const location = useLocation();

  const [bookings, setBookings] = useState(
    {
      id: "BK01",
      customerID: "MB01",
      totalAmenitiesPrice: "100000",
      totalWorkspacePrice: "200000",
      totalBrokenPrice: "0",
      totalPrice: "300000",
      startTimeDate: "",
      endTimeDate: "",
      workspaceID: "WS01",
    },
    {
      id: "BK02",
      customerID: "MB02",
      totalAmenitiesPrice: "200000",
      totalWorkspacePrice: "300000",
      totalBrokenPrice: "400000",
      totalPrice: "900000",
      startTimeDate: "",
      endTimeDate: "",
      workspaceID: "WS02",
    },
    {
      id: "BK03",
      customerID: "V01",
      totalAmenitiesPrice: "300000",
      totalWorkspacePrice: "400000",
      totalBrokenPrice: "0",
      totalPrice: "700000",
      startTimeDate: "",
      endTimeDate: "",
      workspaceID: "WS03",
    }
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState({
    id: "",
    customerID: "",
    totalAmenitiesPrice: "",
    totalWorkspacePrice: "",
    totalBrokenPrice: "",
    totalPrice: "",
    startTimeDate: "",
    endTimeDate: "",
    workspaceID: "",
  });
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const addBookingFields = [
    { label: "Customer ID", name: "customerID", type: "text" },
    {
      label: "Total Amenities Price",
      name: "totalAmenitiesPrice",
      type: "number",
    },
    {
      label: "Total Workspace Price",
      name: "totalWorkspacePrice",
      type: "number",
    },
    { label: "Total Broken Price", name: "totalBrokenPrice", type: "number" },
    { label: "Total Price", name: "totalPrice", type: "number" },
    { label: "Start Time Date", name: "startTimeDate", type: "datetime" },
    { label: "End Time Date", name: "endTimeDate", type: "datetime" },
    { label: "Workspace ID", name: "workspaceID", type: "text" },
  ];

  const updateBookingFields = [
    { label: "Booking ID", name: "id", type: "text" },
    { label: "Customer ID", name: "customerID", type: "text" },
    {
      label: "Total Amenities Price",
      name: "totalAmenitiesPrice",
      type: "number",
    },
    {
      label: "Total Workspace Price",
      name: "totalWorkspacePrice",
      type: "number",
    },
    { label: "Total Broken Price", name: "totalBrokenPrice", type: "number" },
    { label: "Total Price", name: "totalPrice", type: "number" },
    { label: "Start Time Date", name: "startTimeDate", type: "datetime" },
    { label: "End Time Date", name: "endTimeDate", type: "datetime" },
    { label: "Workspace ID", name: "workspaceID", type: "text" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBooking((prev) => ({ ...prev, [name]: value }));
  };

  const generateBookingId = () => {
    const lastId =
      bookings.length > 0 ? bookings[bookings.length - 1].id : "BK00";
    const newId = `BK${(parseInt(lastId.substring(2)) + 1)
      .toString()
      .padStart(2, "0")}`;
    return newId;
  };

  const handleAddBookingSubmit = (e) => {
    e.preventDefault();
    const newBooking = { ...currentBooking, id: generateBookingId() };
    setBookings([...bookings, newBooking]);
    setShowAddModal(false);
    setSuccessMessage("Booking added successfully!");
    setCurrentBooking({
      id: "",
      customerID: "",
      totalAmenitiesPrice: "",
      totalWorkspacePrice: "",
      totalBrokenPrice: "",
      totalPrice: "",
      startTimeDate: "",
      endTimeDate: "",
      workspaceID: "",
    });
  };

  const handleUpdateBookingSubmit = (e) => {
    e.preventDefault();
    setBookings((prevBookings) => {
      const bookingIndex = prevBookings.findIndex(
        (booking) => booking.id === currentBooking.id
      );
      if (bookingIndex !== -1) {
        const updatedBookings = [...prevBookings];
        updatedBookings[bookingIndex] = { ...currentBooking };
        return updatedBookings;
      }
      return prevBookings;
    });
    setShowUpdateModal(false);
    setSuccessMessage("Booking updated successfully!");
    setCurrentBooking({
      id: "",
      customerID: "",
      totalAmenitiesPrice: "",
      totalWorkspacePrice: "",
      totalBrokenPrice: "",
      totalPrice: "",
      startTimeDate: "",
      endTimeDate: "",
      workspaceID: "",
    });
  };

  const handleDeleteBooking = () => {
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingToDelete.id)
    );
    setShowDeleteModal(false);
    setSuccessMessage("Booking deleted successfully!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const closeSuccessMessage = () => {
    setSuccessMessage("");
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customerID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.workspaceID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <h1 className="text-4xl font-black mb-4">Manage Bookings</h1>

      <div className="grid grid-cols-2">
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          placeholder="Search by ID, name, or status"
        />

        {/* Add Button */}
        <div className="ml-2">
          <AddButton
            onClick={() => setShowAddModal(true)}
            label="Add Booking"
          />
        </div>

        <div>
          <SuccessAlert
            message={successMessage}
            onClose={closeSuccessMessage}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Customer ID</th>
                <th>Total Amenities Price</th>
                <th>Total Workspace Price</th>
                <th>Total Broken Price</th>
                <th>Total Price</th>
                <th>Start Time Date</th>
                <th>End Time Date</th>
                <th>Workspace ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customerID}</td>
                    <td>{booking.totalAmenitiesPrice}</td>
                    <td>{booking.totalWorkspacePrice}</td>
                    <td>{booking.totalBrokenPrice}</td>
                    <td>{booking.startTimeDate}</td>
                    <td>{booking.endTimeDate}</td>
                    <td>{booking.workspaceID}</td>
                    <td>
                      {/* Update Button */}
                      <UpdateButton
                        onClick={() => {
                          setCurrentBooking({ ...booking, oldId: booking.id });
                          setShowUpdateModal(true);
                        }}
                      />

                      {/* Delete Button */}
                      <DeleteButton
                        onClick={() => {
                          setBookingToDelete(booking);
                          setShowDeleteModal(true);
                        }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Booking Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add, Update, Delete, Success Modals */}
        <AddModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddBookingSubmit}
          currentItem={currentBooking}
          onInputChange={handleInputChange}
          fields={addBookingFields}
        />

        <UpdateModal
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
        />
      </div>
    </div>
  );
};

export default BookingsManagerPage;

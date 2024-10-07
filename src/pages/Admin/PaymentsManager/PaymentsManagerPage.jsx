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
import { set } from "date-fns";

const PaymentsManagerPage = () => {
    const location = useLocation();

    const [payments, setPayments] = useState([
        {
            id: "PM01",
            bookingId: "BK01",
            paymentMethod: "Cash",
            paymentDate: "",
            paymentType: "type1",
            amount: 100000,
        },
        {
            id: "PM02",
            bookingId: "BK02",
            paymentMethod: "Paypal",
            paymentDate: "",
            paymentType: "type2",
            amount: 200000,
        },
        {
            id: "PM03",
            bookingId: "BK03",
            paymentMethod: "Paypal",
            paymentDate: "",
            paymentType: "type3",
            amount: 300000,
        },
    ]);

    const [bookings, setBookings] = useState([
        { id: "BK01", customerName: "Le Van A" },
        { id: "BK02", customerName: "Luu Thuy B" },
        { id: "BK03", customerName: "Do Duy C" },
    ]);

    const [paymentMethods, setPaymentMethods] = useState([
        { id: "PMM01", name: "Cash" },
        { id: "PMM02", name: "Paypal" },
    ]);

    const addPaymentFields = [
        { label: "Booking ID", name: "bookingId", type: "select", 
            options: bookings.map((booking) => ({
                label: booking.id + " - " + booking.customerName,
                value: booking.id,
            })),
            className: "select select-bordered w-full",
        },
        { label: "Payment Method", name: "paymentMethod", type: "select",
            options: paymentMethods.map((paymentMethods) => ( {
                label: paymentMethods.id + " - " + paymentMethods.name,
                value: paymentMethods.id,
         }))},
        { label: "Payment Date", name: "paymentDate", type: "date" },
        { label: "Payment Type", name: "paymentType", type: "text" },
        { label: "Amount", name: "amount", type: "number" },
    ];

    const updatePaymentFields = [
        { label: "Payment ID", name: "id", type: "text" },
        { label: "Booking ID", name: "bookingId", type: "select", 
            options: bookings.map((booking) => ({
                label: booking.id + " - " + booking.customerName,
                value: booking.id,
            })),
            className: "select select-bordered w-full",
        },
        { label: "Payment Method", name: "paymentMethod", type: "select",
            options: paymentMethods.map((paymentMethods) => ( {
                label: paymentMethods.id + " - " + paymentMethods.name,
                value: paymentMethods.id,
         }))},
        { label: "Payment Date", name: "paymentDate", type: "date" },
        { label: "Payment Type", name: "paymentType", type: "text" },
        { label: "Amount", name: "amount", type: "number" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPayment, setCurrentPayment] = useState({
        id: "",
        bookingId: "",
        paymentMethod: "",
        paymentDate: "",
        paymentsType: "",
        amount: "",
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [paymentToDelete, setPaymentToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    
    const handleInputChange = (e) => {
        const { name, value, type, number } = e.target;
        setCurrentPayment((prev) => ({...prev, [name]: value}));
    };

    
    const generatePaymentId = () => {
        const lastId = 
            payments.length > 0 ? payments[payments.length - 1].id : "PM00";
        const newId = `PM${parseInt(lastId.slice(2)) + 1}`;
        return newId;
    };

    const handleAddPayment = (e) => {
        e.preventDefault();
        const newPayment = {
            ...currentPayment,
            id: generatePaymentId(),
        };

        setPayments([...payments, newPayment])
        setShowAddModal(false);
        setSuccessMessage("Payment Added Successfully");
        setCurrentPayment({
            id: "",
            bookingId: "",
            paymentMethod: "",
            paymentDate: "",
            paymentsType: "",
            amount: "",
        });
    };

    const handleUpdatePayment = (e) => {
        e.preventDefault();
        setPayments((prevPayments) => {
            const paymentIndex = prevPayments.findIndex(
                (payment) => payment.id === currentPayment.oldId
            );
            if (paymentIndex !== -1) {
                const updatedPayments = [...prevPayments];
                updatedPayments[paymentIndex] = {...currentPayment };
                return updatedPayments;
            }
            return prevPayments; 
        });
        setShowUpdateModal(false);
        setSuccessMessage("Payment Updated Successfully");
        setCurrentPayment({
            id: "",
            bookingId: "",
            paymentMethod: "",
            paymentDate: "",
            paymentsType: "",
            amount: "",
        });
    };

    const handleDeletePayment = () => {
        setPayments((prevPayments) => 
            prevPayments.filter(
                (payment) => payment.id !== paymentToDelete.id)
            )
            setShowDeleteModal(false);
            setSuccessMessage("Payment Deleted Successfully");
    };

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const closeSuccessMessage = () => setSuccessMessage("");

    const filteredPayments = payments.filter((payment) => {
        return (
          payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.paymentDate.includes(searchTerm) ||
          payment.paymentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.amount.toString().includes(searchTerm)
        );
      });
      

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-4xl font-black mb-4">Manage Payments</h1>
  
        <div className="grid grid-cols-2">
          <SearchBar
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            placeholder="Search payments"
          />
  
          {/* Add Button */}
          <div className="ml-2">
            <AddButton onClick={setShowAddModal} label="Add Payments" />
          </div>
        </div>
  
        <div>
          <SuccessAlert message={successMessage} onClose={closeSuccessMessage} />
        </div>

        <div className="overflow-x-auto flex flex-1">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Booking ID</th>
              <th>Payment Method</th>
              <th>Payment Date</th>
              <th>Payment Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.bookingId}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{payment.paymentDate}</td>
                  <td>{payment.paymentType}</td>
                  <td>{payment.amount}</td>
                  <td className="flex space-x-2">
                    <UpdateButton
                      onClick={() => {
                        setCurrentPayment({
                          ...payment,
                          oldId: payment.id,
                        });
                        setShowUpdateModal(true);
                      }}
                    />

                    {/* Delete Button */}
                    <DeleteButton
                      onClick={() => {
                        setPaymentToDelete(payment);
                        setShowDeleteModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No payment found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddPayment}
        currentItem={currentPayment}
        onInputChange={handleInputChange}
        fields={addPaymentFields}
      />

      <UpdateModal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleUpdatePayment}
        currentItem={currentPayment}
        onInputChange={handleInputChange}
        fields={updatePaymentFields}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeletePayment}
        itemToDelete={paymentToDelete}
        itemType="payment"
      />

    </div>
    )


};

export default PaymentsManagerPage;

import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';  // Import SweetAlert
import { getCustomerById, sendNotification } from '../../../../config/api.staff';

const ViewWishlist = () => {
  const location = useLocation();
  const initialCustomers = useMemo(() => location.state?.customers || [], [location.state?.customers]);
  const [customers, setCustomers] = useState([]);
  const [customerZycoins, setCustomerZycoins] = useState({});
  const [notifiedWishlists, setNotifiedWishlists] = useState(() => {
    const storedNotifications = localStorage.getItem('notifiedWishlists');
    return storedNotifications ? new Set(JSON.parse(storedNotifications)) : new Set();
  });

  useEffect(() => {
    const fetchCustomerZycoins = async () => {
      const zycoinsData = {};
      for (const customer of initialCustomers) {
        try {
          const response = await getCustomerById(customer.id);
          zycoinsData[customer.id] = response.data.point;
        } catch (error) {
          console.error(`Error fetching data for customer ${customer.id}:`, error);
          zycoinsData[customer.id] = 0;
        }
      }
      setCustomerZycoins(zycoinsData);

      const sortedCustomers = [...initialCustomers].sort((a, b) => {
        const zycoinA = zycoinsData[a.id] || 0;
        const zycoinB = zycoinsData[b.id] || 0;
        return zycoinB - zycoinA;
      });

      setCustomers(sortedCustomers);
    };

    fetchCustomerZycoins();
  }, [initialCustomers]);

  const handleSendNotification = async (wishlist_id, customerName) => {
    const description = `Notification for ${customerName}'s wishlist item`;
    try {
      await sendNotification(wishlist_id, description);

      setNotifiedWishlists(prev => {
        const updated = new Set(prev).add(wishlist_id);
        localStorage.setItem('notifiedWishlists', JSON.stringify(Array.from(updated)));
        return updated;
      });

      // Display success message using SweetAlert with the customer's name
      Swal.fire(
        'Success',
        `Notification sent for ${customerName}`,
        'success'
      );
    } catch (error) {
      console.error(`Failed to send notification for wishlist ID: ${wishlist_id}`, error);

      // Display error message using SweetAlert with the customer's name
      Swal.fire(
        'Error',
        `Failed to send notification for ${customerName}`,
        'error'
      );
    }
  };

  return (
    <div className="view-wishlist flex gap-5">
      <div className="flex-none w-1/3 ml-5">
        <div className="artboard artboard-demo shadow-lg" style={{ overflow: 'hidden' }}>
          <figure className="w-full h-full">
            <img 
              src="https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg" 
              alt="Sample" 
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </div>
      <div className="flex-grow w-1/2 overflow-x-auto p-4">
        <h2 className="text-4xl font-bold mb-5">Wishlist</h2>
        <table className="table table-xl" >
          <thead>
            <tr style={{ fontSize: '18px' }}>
              <th>Index</th>
              <th>Name</th>
              <th>ZyCoin</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id} style={{ fontSize: '15px' }}>
                <th>{index + 1}</th>
                <td>{customer.name}</td>
                <td>{customerZycoins[customer.id]}</td>
                <td>
                  <button 
                    className="btn btn-accent" 
                    onClick={() => handleSendNotification(customer.wishlist_id, customer.name)}
                    disabled={notifiedWishlists.has(customer.wishlist_id)}
                  >
                    {notifiedWishlists.has(customer.wishlist_id) ? 'Notification Sent' : 'Send Notification'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewWishlist;
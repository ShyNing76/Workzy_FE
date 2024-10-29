import React from 'react';
import { useLocation } from 'react-router-dom';

const ViewWishlist = () => {
  const location = useLocation();
  const customerNames = location.state?.customerNames || [];

  return (
    <div className="view-wishlist overflow-x-auto">
      <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Customer Names</h2>
      <table className="table table-xs">
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {customerNames.map((name, index) => (
            <tr key={index}>
              <th>{index + 1}</th> 
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewWishlist;

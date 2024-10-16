import React from 'react';


const DetailModal = ({ booking, onClose }) => {
    if (!booking) return null;

    return (
        <dialog className='modal' open>
            <div className='modal-box'>
                <h3 className='font-bold text-lg'>Detail</h3>
                <ul className='list-none mt-4'>
                    <li className='flex justify-between mb-2'>
                        <span>1. Create Booking</span>
                        <span>{booking.createdAt}</span> 
                    </li>
                    <li className='flex justify-between mb-2'>
                        <span>2. Amenities</span>
                        <span></span> 
                    </li>
                    <li className='flex justify-between mb-2'>
                        <span>3. Workspace Price</span>
                        <span>{booking.workspace_price}</span>
                    </li>
                    <li className='flex justify-between mb-2'>
                        <span>4. Additional utilities price</span>
                        <span>{booking.additionalPrice}</span>
                    </li>
                    <li className='flex justify-between mb-2'>
                        <span>5. Broken Price</span>
                        <span>{booking.brokenPrice}</span> 
                    </li>
                    <li className='flex justify-between mb-2'>
                        <span>6. Total Price</span>
                        <span>{booking.total_price}</span> 
                    </li>
                </ul>
                <div className='modal-action'>
                    <button onClick={onClose} className='px-4 py-2 mt-4 bg-gray-300 rounded'>Close</button>
                </div>
            </div>
        </dialog>
    );
};

export default DetailModal;

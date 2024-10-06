import React from 'react';

const UtilitiesModal = ({ booking, onCheckUtility, onDone, onClose }) => {
    if (!booking) return null;

    return (
        <dialog className='modal' open>
            <div className='modal-box'>
                <h3 className='font-bold text-lg'>Select Utilities</h3>
                <div>
                    <div>
                        <input type="checkbox" id="printer" onChange={() => onCheckUtility(1)} checked={booking.utilitiesChecked.includes(1)} />
                        <label htmlFor="printer">Printer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="papershredder" onChange={() => onCheckUtility(2)} checked={booking.utilitiesChecked.includes(2)} />
                        <label htmlFor="papershredder">Paper Shredder</label>
                    </div>
                    <div>
                        <input type="checkbox" id="faxmachine" onChange={() => onCheckUtility(3)} checked={booking.utilitiesChecked.includes(3)} />
                        <label htmlFor="faxmachine">Fax Machine</label>
                    </div>
                    <div>
                        <input type="checkbox" id="computer" onChange={() => onCheckUtility(4)} checked={booking.utilitiesChecked.includes(4)} />
                        <label htmlFor="computer">Computer</label>
                    </div>
                    <div>
                        <input type="checkbox" id="monitor" onChange={() => onCheckUtility(5)} checked={booking.utilitiesChecked.includes(5)} />
                        <label htmlFor="monitor">Monitor</label>
                    </div>
                </div>
                <div className='modal-action'>
                    <button onClick={onDone}>Done</button>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </dialog>
    );
};

export default UtilitiesModal;

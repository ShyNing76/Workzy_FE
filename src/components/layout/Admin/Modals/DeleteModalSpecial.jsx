import React from 'react';
import PropTypes from 'prop-types';
import { CiCircleQuestion } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const DeleteModalSpecial = ({ show, onClose, onDelete, itemToDelete, itemType }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <div className='flex flex-row'>
          <div className="text-center text-8xl"><CiCircleQuestion/></div>
          <div className='ml-6 mt-2'>
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p>Are you sure you want to delete {itemToDelete && itemToDelete.name}? Deleting it will affect your active {itemType}.</p>
          </div>
        </div>
    
        <div className="modal-action">
          <button className="btn btn-error btn-sm" onClick={onDelete}><GoTrash/>Yes</button>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><RxCross2/>Cancel</button>
        </div>
      </div>
    </div>
  );
};

DeleteModalSpecial.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  itemToDelete: PropTypes.object,
  itemType: PropTypes.string.isRequired,
};

export default DeleteModalSpecial;

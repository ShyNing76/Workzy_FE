import React from 'react';
import PropTypes from 'prop-types';

const DeleteModal = ({ show, onClose, onDelete, itemToDelete, itemType }) => {
  if (!show) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p>Are you sure you want to delete this {itemType}: {itemToDelete && itemToDelete.name}?</p>
        <div className="modal-action">
          <button className="btn btn-error" onClick={onDelete}>Yes</button>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  itemToDelete: PropTypes.object,
  itemType: PropTypes.string.isRequired,
};

export default DeleteModal;

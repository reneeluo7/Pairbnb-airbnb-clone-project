import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ListingForm from './ListingForm';

function ListingFormmModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create New Listing</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListingForm />
        </Modal>
      )}
    </>
  );
}

export default ListingFormmModal;
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ListingForm from './ListingForm';

function ListingFormModal({spotId, formUsage}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>{formUsage}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ListingForm onClose={() => setShowModal(false)} spotId={spotId} formUsage={formUsage} />
        </Modal>
      )}
    </>
  );
}

export default ListingFormModal;
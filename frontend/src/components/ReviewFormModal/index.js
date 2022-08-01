import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './ReviewForm';
import './ReviewForm.css'

function ReviewFormModal({ reviewId, formUsage, spotId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>{formUsage}</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ReviewForm onClose={() => setShowModal(false)} reviewId={reviewId} formUsage={formUsage} spotId={spotId}/>
                </Modal>
            )}
        </>
    );
}

export default ReviewFormModal;
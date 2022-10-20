import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UploadImageForm from './UploadImageForm.js'

function UploadImageModal({spotId}) {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
       <div className="each-image-card" onClick={() => setShowModal(true)} >
            <div className="upload-sign-container">
                <i className="fa-solid fa-plus"></i>
                {/* <i className="fa-solid fa-upload"></i> */}
                <p>Upload More Images</p>
            </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <UploadImageForm onClose={() => setShowModal(false)} spotId={spotId} />
          </Modal>
        )}
                </div>
       
      </>
    );
  }
  
  export default UploadImageModal;
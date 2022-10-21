import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal({formUsage}) {
  const [showModal, setShowModal] = useState(false);
  if (!formUsage) formUsage="Log In"


  return (
    <>
      <button onClick={() => setShowModal(true)}>{formUsage}</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
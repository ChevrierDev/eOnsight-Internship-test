import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onRequestClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }, 300); 
    }
  }, [isOpen]);

  return (
    <div ref={modalRef}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Confirmation Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-4">
          <h2 className="text-lg font-lato font-bold mb-4 tracking-wide">Confirm Deletion</h2>
          <p className='font-lato'>Are you sure you want to delete this bridge?</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button className="px-6 py-3 bg-gray-300 text-gray-800 rounded hover:scale-95 hover:bg-gray-200 duration-200 ease-out" onClick={onRequestClose}>Cancel</button>
            <button className="px-6 py-3 bg-red-600 text-white rounded hover:scale-95 hover:bg-red-500 duration-200 ease-out" onClick={onConfirm}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;

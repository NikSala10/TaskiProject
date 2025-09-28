import type { ModalProps } from '../../types/Modal';
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='modal-background'>
      <div className='modal-content'>
        <div className='modal-header'>
          <button onClick={onClose}>X</button>
        </div>
        <div >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

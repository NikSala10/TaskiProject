import type { ModalProps } from '../../types/Modal';

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <button onClick={onClose}>X</button>
      </div>
        <div>
          {children}
        </div>
     
    </div>
  );
};

export default Modal;

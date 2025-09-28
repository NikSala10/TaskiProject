import type { ModalProps } from '../../types/Modal';

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h3>{title}</h3>
        <button onClick={onClose}>X</button>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

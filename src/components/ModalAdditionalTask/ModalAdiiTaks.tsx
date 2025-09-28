import type { ModalProps } from '../../types/ModalTasksType';



const ModalAddiitonalTasks = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <header>
          <h3>{title}</h3>
          <button onClick={onClose}>X</button>
        </header>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalAddiitonalTasks;

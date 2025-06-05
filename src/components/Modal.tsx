// components/Modal.tsx
import React from 'react';

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-neutral-900 p-6 rounded-xl shadow-xl w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
      <div className="flex justify-end gap-4 pt-4">
        <button onClick={onClose} className="bg-red-600 px-4 py-2 rounded">
          Bekor qilish
        </button>
      </div>
    </div>
  </div>
);

export default Modal;

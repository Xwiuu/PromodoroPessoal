"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const Modal = ({ isOpen, onClose, title, message }: ModalProps) => {
  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

  return (
    // Backdrop (fundo semi-transparente)
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      {/* Conteúdo do Modal */}
      <div className="bg-neutral-800 text-white rounded-lg shadow-xl p-8 max-w-sm mx-auto text-center border border-neutral-700">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;

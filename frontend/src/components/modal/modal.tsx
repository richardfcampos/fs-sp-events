import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="relative bg-white p-6 rounded-lg shadow-lg z-10">
                <div className="mb-5">
                    <button
                        className="absolute top-2 right-2 text-3xl font-bold text-gray-600 hover:text-gray-800 focus:outline-none"
                        aria-label="Close"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                {children}
            </div>
        </div>

    );
};

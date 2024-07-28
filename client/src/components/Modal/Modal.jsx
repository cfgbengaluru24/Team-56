import React from 'react';

function Modal({ onClose, children }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg relative">
                <button className="absolute top-2 right-2 text-xl" onClick={onClose}>×</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;

import React from 'react'
import { FaWindowClose } from "react-icons/fa";

function Panel({isOpen, onClose}) {
    return (
        <div
      className={`fixed top-0 left-0 h-full  bg-opacuty-50 shadow-lg transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
      style={{ width: '300px', backgroundColor: '#d4a373' }}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-xl " style={{backgroundColor: '#d4a373'}}>
        <FaWindowClose style={{color: '#9a65338c'}}/>
      </button>
      <div className="p-4">
        <h2 className="text-3xl text-white font-bold text-center">Dashboard</h2>
      </div>
    </div>
    )
}

export default Panel

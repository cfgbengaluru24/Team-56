import React from "react"
import { FaChevronRight } from "react-icons/fa";
function SlideBtn({onClick}){
    return(
        <button onClick={onClick}
        // className="fixed top-28 left-0 transform-translate-y-1/2 bg-white border-gray-300 shadow-lg p-2 rounded-r-lg z-50"
        className="fixed top-1/4 left-0 bg-opacity-50 transform-translate-y-1/2 bg-brown border-gray-300 shadow-lg p-2 rounded-r-lg z-50 "
        style={{ width: '25px', height: '350px' , backgroundColor: '#9a65338c' }}>
            {/* ☰ */}
            <FaChevronRight />
        </button>
    )
}
export default SlideBtn;
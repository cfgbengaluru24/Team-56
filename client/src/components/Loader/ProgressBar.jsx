import React from "react";
const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="h-1 w-full bg-gray-300 rounded-full">
      <div
        style={{ width: `${progressPercentage}%` }}
        className={`relative h-full rounded-full ${
          progressPercentage < 70 ? "bg-red-600" : "bg-green-600"
        }`}
      >
        <div className="-right-2 -top-2.5 absolute">⚫️</div>
      </div>
    </div>
  );
};

export default ProgressBar;

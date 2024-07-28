import React, { useEffect, useState } from "react";
import ProgressBar from "../../components/Loader/ProgressBar";

const Tracker = () => {
  const trackingDays = [0, 25, 50, 75, 100];
  const [trackerLength, setTrackerLength] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (trackerLength < trackingDays.length - 1) {
        setTrackerLength(trackerLength + 1);
      } else {
        setTrackerLength(0);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [trackerLength]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div
        className={`${
          trackerLength === trackingDays.length - 1
            ? "bg-green-500"
            : trackerLength >= trackingDays.length - 1 / 2
            ? "bg-amber-500"
            : "bg-slate-500"
        } rounded-full p-2 text-white text-center w-fit mx-auto`}
      >
        {trackingDays.length - trackerLength - 1} Days Left!
      </div>
      <div className="flex justify-between">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i}>Day {i}</div>
        ))}
      </div>
      <ProgressBar progressPercentage={trackingDays[trackerLength]} />
      {trackerLength === trackingDays.length - 1 && (
        <div className="text-green-500 text-xl w-full text-center">
          Delivery Day is here🥳
        </div>
      )}
    </div>
  );
};

export default Tracker;

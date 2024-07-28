import React, {useState} from 'react';
import SlideBtn from './SlideBtn';
import Panel from './Panel';
import UserProfile from '../UserProfile/UserProfile';
// import Profile from './Profile';
const Donor = () => {
  const [isPanelOpen, setPanelOpen]= useState(false);
  const openPanel=()=>setPanelOpen(true);
  const closePanel=()=>setPanelOpen(false);
  return (
    <div className="donar-page">
      <SlideBtn onClick={openPanel} />
      <Panel  isOpen={isPanelOpen} onClose={closePanel} />
      <UserProfile/>
    </div>
  );
};

export default Donor;
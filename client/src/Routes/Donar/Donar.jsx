import React, {useState} from 'react';
import './Donar.css'; // Assuming you want to style this page
import SlideBtn from './SlideBtn';
import Panel from './Panel';
import UserProfile from '../UserProfile/UserProfile';
// import Profile from './Profile';
const Donar = () => {
  const [isPanelOpen, setPanelOpen]= useState(false);
  const openPanel=()=>setPanelOpen(true);
  const closePanel=()=>setPanelOpen(false);
  return (
    <div className="donar-page">
      <SlideBtn onClick={openPanel} />
      <Panel  isOpen={isPanelOpen} onClose={closePanel} />
      <UserProfile user={null}/>
    </div>
  );
};

export default Donar;

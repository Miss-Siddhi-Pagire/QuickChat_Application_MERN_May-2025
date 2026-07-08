import React, { useContext } from 'react';
import SideBar from '../Components/SideBar';
import ChatContainer from '../Components/ChatContainer';
import RightSideBar from '../Components/RightSideBar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen bg-[#6F36D4] sm:p-[2.5%] flex items-center justify-center">
      <div
        className={`w-full h-full grid grid-cols-1 gap-4 md:gap-6 transition-all duration-300 
        ${selectedUser 
          ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2.2fr_1.1fr]' 
          : 'md:grid-cols-[1fr_2.2fr]'
        }`}
      >
        <SideBar />
        <ChatContainer />
        {selectedUser && <RightSideBar />}
      </div>
    </div>
  );
};

export default HomePage;

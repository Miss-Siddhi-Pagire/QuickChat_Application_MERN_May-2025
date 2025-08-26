import React, { useContext } from 'react';
import SideBar from '../Components/SideBar';
import ChatContainer from '../Components/ChatContainer';
import RightSideBar from '../Components/RightSideBar';
import { ChatContext } from '../../context/ChatContext';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="w-full h-full bg-black/30 sm:px-[5%] sm:py-[3%] flex items-center justify-center">
        <div
          className={`w-full h-full backdrop-blur-lg bg-white/10 border border-gray-500 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 transition-all duration-300 
          ${selectedUser 
            ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' 
            : 'md:grid-cols-[1fr_2fr]'
          }`}
        >
          <SideBar />
          <ChatContainer />
          {selectedUser && <RightSideBar />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

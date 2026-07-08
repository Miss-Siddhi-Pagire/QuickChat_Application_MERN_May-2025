import React, { useContext, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const RightSideBar = () => {

  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);

  //Get all  the images from the messages  and set them to state

  useEffect(() => {
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )

  }, [messages])
  


  return selectedUser && (
    <div className={`bg-white text-slate-800 border-[6px] border-[#6F36D4] h-full rounded-[2rem] shadow-2xl relative overflow-y-auto flex flex-col p-6 pb-24 ${selectedUser ? "max-md:hidden" : ""}`}>

      <div className='flex flex-col items-center gap-3 text-center mt-6 select-none'>
        <div className="relative">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            onError={(e) => (e.target.src = assets.avatar_icon)}
            alt=""
            className="w-20 h-20 object-cover rounded-full border border-slate-200 shadow-sm"
          />
          {onlineUsers.includes(selectedUser._id) && (
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm shadow-green-500/30"></span>
          )}
        </div>
        <h1 className='text-lg font-bold text-slate-800 break-all px-4'>{selectedUser.fullName}</h1>
        <p className='text-xs text-slate-400 font-medium tracking-wide max-w-[200px] break-all px-2'>"{selectedUser.bio || "No bio available"}"</p>
      </div>

      <hr className='border-slate-100 my-6' />

      <div className='px-2'>
        <p className='text-xs font-semibold text-slate-400 uppercase tracking-wider select-none'>Shared Media</p>
        {msgImages.length > 0 ? (
          <div className='mt-3 overflow-y-auto max-h-[160px] grid grid-cols-3 gap-2'>
            {msgImages.map((url, index) => (
              <div 
                key={index} 
                onClick={() => window.open(url)} 
                className='cursor-pointer rounded-xl overflow-hidden'
              >
                <img src={url} alt='Media' className='w-full aspect-square object-cover hover:brightness-90 transition-all shadow-sm' />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic mt-2">No media shared yet</p>
        )}
      </div>

      <button
        onClick={() => logout()}
        className='absolute bottom-6 left-6 right-6 py-3 bg-[#6F36D4] hover:bg-[#5b29b8] text-white font-medium rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98] transition-all text-sm text-center select-none border-none'
      >
        Logout
      </button>

    </div>
  )
}

export default RightSideBar
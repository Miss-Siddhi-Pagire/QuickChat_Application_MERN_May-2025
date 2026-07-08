import React, { useState, useContext, useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../Lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ChatContainer = () => {
  const { messages, selectedUser, setSelectedUser, sendMessage, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState('');

  //handle sending message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;

    await sendMessage({ text: input.trim() });
    setInput("")
  }

  //handle sending an image

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an image file")
      return;
    }
    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessage({ image: reader.result })
      e.target.value = ""
    }
    reader.readAsDataURL(file);

  }

  useEffect(() => {
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])
  

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  },[messages])

  return selectedUser ? (
    <div className='h-full bg-white border-[6px] border-[#6F36D4] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden relative'>
      
      {/*--------Header ---------- */}
      <div className='flex items-center justify-between gap-3 p-4 px-6 border-b border-slate-200 bg-white select-none'>
        <div className="flex items-center gap-3">
          <img 
            src={selectedUser.profilePic || assets.avatar_icon} 
            alt='' 
            className='w-10 h-10 object-cover rounded-full border border-slate-200 shadow-sm' 
          />
          <div className='flex flex-col'>
            <p className='text-slate-800 font-bold text-base flex items-center gap-2'>
              {selectedUser.fullName}
              {onlineUsers.includes(selectedUser._id) && <span className='w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/30'></span>}
            </p>
            <span className="text-xs text-slate-400 font-light">
              {onlineUsers.includes(selectedUser._id) ? "Online now" : "Offline"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <img src={assets.help_icon} alt='' className='max-md:hidden max-w-5 opacity-60 hover:opacity-100 cursor-pointer transition-opacity' />
          <img 
            onClick={() => setSelectedUser(null)} 
            src={assets.arrow_icon} 
            alt='Close' 
            className='md:hidden max-w-[28px] p-1.5 cursor-pointer bg-slate-100 rounded-full hover:bg-slate-200 transition-all' 
          />
        </div>
      </div>

      {/*--------Chat Area------------ */}
      <div className='flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#F7F5FC]'>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex items-start gap-3 justify-end mb-2 ${msg.senderId !== authUser._id ? 'flex-row-reverse' : ''}`}
          >
            {/* Message bubble content block */}
            <div className={`flex flex-col gap-1 max-w-[70%]`}>
              {msg.image ? (
                <img 
                  src={msg.image} 
                  alt='Sent image' 
                  className={`max-w-[230px] border-[3px] shadow-sm overflow-hidden ${
                    msg.senderId === authUser._id 
                      ? 'border-[#6F36D4] rounded-[1.5rem] rounded-br-none' 
                      : 'border-slate-300 rounded-[1.5rem] rounded-bl-none'
                  }`} 
                />
              ) : (
                <p className={`p-3.5 px-5 md:text-sm font-semibold shadow-sm break-all ${
                  msg.senderId === authUser._id 
                    ? 'bg-[#6F36D4] text-white rounded-[1.5rem] rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-[1.5rem] rounded-bl-none'
                }`}>
                  {msg.text}
                </p>
              )}
              {/* Display time below bubble */}
              <p className={`text-[10px] text-slate-400 mt-0.5 px-1 font-medium ${msg.senderId === authUser._id ? 'text-right' : 'text-left'}`}>
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>

            {/* User Avatar inline next to message bubble */}
            <img 
              src={msg.senderId === authUser._id ? authUser?.profilePic || assets.avatar_icon : selectedUser?.profilePic || assets.avatar_icon} 
              alt='' 
              className='w-[36px] h-[36px] object-cover rounded-full border border-slate-200 shadow-sm mt-0.5 select-none' 
            />
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/*--------Bottom Chat Area Footer --------- */}
      <div className='p-4 border-t border-slate-200 bg-white flex items-center gap-3'>
        <div className='flex-1 flex items-center bg-slate-100 border border-slate-200/80 px-4 rounded-full shadow-inner'>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
            type='text' 
            placeholder='Type message here...'
            className='flex-1 text-slate-800 text-sm py-3 bg-transparent border-none outline-none placeholder-slate-400' 
          />

          <input
            onChange={handleSendImage}
            type='file' 
            id='image'
            accept='image.png,image/jpeg' 
            hidden 
          />

          <label htmlFor='image' className='cursor-pointer p-1.5 rounded-full hover:bg-slate-200/80 active:scale-95 transition-all select-none'>
            <img src={assets.gallery_icon} alt='Gallery' className='w-5 opacity-60' />
          </label>
        </div>

        <button
          onClick={handleSendMessage}
          className='w-11 h-11 bg-[#6F36D4] hover:bg-[#5b29b8] flex items-center justify-center rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.95] transition-all select-none border-none'
        >
          <img 
            src={assets.send_button} 
            alt='Send' 
            className='w-5 h-5 brightness-200 contrast-200 translate-x-[2px]' 
          />
        </button>
      </div>

    </div>

  ) : (
    <div className='flex-1 flex flex-col items-center justify-center gap-3 text-white/70 bg-white/10 border-[6px] border-dashed border-[#6F36D4]/35 rounded-[2rem] h-full max-md:hidden select-none p-8 text-center'>
      <img src={assets.logo_icon} alt='' className='max-w-16 brightness-200 contrast-125' />
      <p className='text-xl font-bold tracking-wide'>Chat Anytime, Anywhere</p>
      <p className="text-sm text-purple-200/80 max-w-xs leading-relaxed font-light">Select a contact from the sidebar list to start exchanging messages.</p>
    </div>
  )
}

export default ChatContainer;
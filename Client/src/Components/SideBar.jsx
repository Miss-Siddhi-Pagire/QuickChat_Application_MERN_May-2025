import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const SideBar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div
      className={`bg-white border-[6px] border-[#6F36D4] h-full rounded-[2rem] shadow-2xl flex flex-col overflow-hidden ${
        selectedUser ? 'max-md:hidden' : ''
      }`}
    >
      {/* PWA-style Purple Header Section */}
      <div className="bg-[#6F36D4] text-white p-5 pb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-[130px] brightness-200 contrast-125" />
          <div className="relative py-2 group">
            <img
              src={assets.menu_icon}
              alt="menu"
              className="max-h-5 cursor-pointer hover:scale-110 active:scale-95 transition-all brightness-200"
            />
            <div className="absolute top-full right-0 z-20 w-36 p-4 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-xl hidden group-hover:block transition-all">
              <p onClick={() => navigate('/profile')} className="cursor-pointer text-sm font-medium hover:text-[#6F36D4] py-1 select-none">
                Edit Profile
              </p>
              <hr className="my-1.5 border-t border-slate-100" />
              <p onClick={logout} className="cursor-pointer text-sm font-medium hover:text-red-500 py-1 select-none">
                Logout
              </p>
            </div>
          </div>
        </div>

        {/* Mockup-style White Search Pill */}
        <div className="bg-white rounded-full flex items-center gap-2.5 py-2.5 px-4 mt-1 shadow-sm border border-purple-300/20">
          <img src={assets.search_icon} alt="search" className="w-4 h-4 opacity-50" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-slate-800 text-sm placeholder-slate-400 flex-1"
            placeholder="Search User"
          />
        </div>
      </div>

      {/* Users List Container */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 bg-slate-50/40">
        {filteredUsers.map((user) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={user._id}
            className={`relative flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer hover:bg-slate-100/80 border border-transparent transition-all select-none ${
              selectedUser?._id === user._id ? 'bg-[#6F36D4]/10 border-purple-200' : ''
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[45px] h-[45px] object-cover rounded-full border border-slate-200 shadow-sm"
            />
            <div className="flex flex-col leading-5">
              <p className="font-semibold text-slate-800 text-sm">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-500 text-xs font-semibold">Online</span>
              ) : (
                <span className="text-slate-400 text-xs">Offline</span>
              )}
            </div>

            {unseenMessages?.[user._id] > 0 && (
              <p className="absolute top-1/2 right-4 transform -translate-y-1/2 text-xs h-5.5 w-5.5 flex justify-center items-center rounded-full bg-[#6F36D4] text-white font-bold shadow-md">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;

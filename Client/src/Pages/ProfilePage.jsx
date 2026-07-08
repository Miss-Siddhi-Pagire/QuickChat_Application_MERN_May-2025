import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { AuthContext } from '../../context/AuthContext';

function ProfilePage() {

  const {authUser,updateProfile}=useContext(AuthContext);
  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser?.fullName || "")
  const [bio, setBio] = useState(authUser?.bio || "")

  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({fullName:name,bio})
      navigate('/')
      return;
    }
    const reader=new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload=async()=>{
      const base64Image=reader.result;
      await updateProfile({profilePic:base64Image,fullName:name,bio});
      navigate('/')
    }
  }


  return (
    <div className="w-full h-screen bg-[#6F36D4] sm:p-[2.5%] flex items-center justify-center">
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-4 md:gap-6 transition-all duration-300">
        
        {/* LEFT SIDE: Form Edit Fields Card */}
        <div className="flex flex-col h-full bg-white border-[6px] border-[#6F36D4] rounded-[2rem] shadow-2xl overflow-hidden text-slate-800">
          
          {/* Header aligned with Chat UI header */}
          <div className="flex items-center justify-between py-5 px-6 border-b border-slate-200 bg-white select-none">
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Profile Details</h1>
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2 py-1.5 px-4 bg-slate-100 rounded-full border border-slate-200 text-sm font-semibold hover:bg-slate-200 active:scale-95 transition-all cursor-pointer select-none text-slate-700 border-none"
            >
              <img 
                src={assets.arrow_icon} 
                alt="Back" 
                className="w-4 h-4 rotate-180 opacity-70" 
              />
              Back to Chat
            </button>
          </div>
          
          {/* Form scrollable container */}
          <form id="profile-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 bg-slate-50/40">
            
            {/* Avatar Uploader Section */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">Upload Profile Image</p>
              <label 
                htmlFor="avatar" 
                className="relative group w-24 h-24 rounded-full overflow-hidden cursor-pointer border-2 border-slate-200 hover:border-[#6F36D4] transition-all flex items-center justify-center shadow-md shadow-slate-100"
              >
                <input
                  onChange={(e) => setSelectedImg(e.target.files[0])}
                  type="file" 
                  id="avatar" 
                  accept=".png,.jpg,.jpeg" 
                  hidden 
                />
                <img
                  src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon} 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#6F36D4]/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <img 
                    src={assets.gallery_icon} 
                    alt="Edit" 
                    className="w-6 h-6 brightness-200 contrast-200" 
                  />
                </div>
              </label>
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">Your Name</label>
              <input
                onChange={(e) => setName(e.target.value)} 
                value={name}
                type="text" 
                required 
                placeholder="Your name" 
                className="py-3 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 text-sm focus:border-[#6F36D4] focus:ring-1 focus:ring-[#6F36D4]/30 outline-none transition-all"
              />
            </div>

            {/* Bio Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">Write profile Bio</label>
              <textarea
                onChange={(e) => setBio(e.target.value)} 
                value={bio}
                required
                placeholder="Write profile Bio"
                className="py-3 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:border-[#6F36D4] focus:ring-1 focus:ring-[#6F36D4]/30 outline-none transition-all resize-none"
                rows={4}
              />
            </div>

          </form>

          {/* Pinned Bottom Action Footer */}
          <div className="p-5 border-t border-slate-200 bg-white">
            <button 
              type="submit" 
              form="profile-form"
              className="w-full py-3.5 bg-[#6F36D4] hover:bg-[#5b29b8] text-white font-semibold rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all text-base border-none"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Live Preview Card */}
        <div className="bg-white border-[6px] border-[#6F36D4] rounded-[2rem] shadow-2xl h-full relative overflow-y-auto flex flex-col items-center justify-center p-8 max-md:hidden text-slate-800 animate-fadeIn">
          <div className="text-center font-semibold text-slate-400 tracking-wider text-xs mb-8 uppercase select-none">
            Live Preview
          </div>
          
          <div className="flex flex-col items-center gap-4 text-xs font-light max-w-xs text-center">
            <div className="relative select-none">
              <img
                src={selectedImg ? URL.createObjectURL(selectedImg) : authUser?.profilePic || assets.avatar_icon}
                alt="Avatar Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-[#6F36D4]/30 shadow-md shadow-purple-500/10"
              />
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white shadow-sm shadow-green-500/30"></span>
            </div>
            
            <h1 className="text-2xl font-bold text-slate-800 mt-2 break-all">
              {name || "Your Name"}
            </h1>
            
            <p className="text-sm text-slate-500 mt-2 italic break-all max-h-40 overflow-y-auto px-4 select-none leading-relaxed">
              "{bio || "Write your profile bio..."}"
            </p>
          </div>
          
          <div className="absolute bottom-8 w-full px-8 text-center text-xs font-semibold text-slate-400 select-none">
            QuickChat Profile Management
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage
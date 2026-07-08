import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext';

function LoginPage() {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    const credentials = currState === "Sign up"
      ? { fullName, email, password, bio }
      : { email, password };

    login(currState === "Sign up" ? "signup" : "login", credentials);
  };

  return (
    <div className='w-full min-h-screen bg-[#6F36D4] flex items-center justify-center p-4'>
      <div className='w-full max-w-4xl flex items-center justify-center gap-8 lg:gap-16 sm:px-10 py-10 max-sm:flex-col p-4'>
        <img 
          alt='QuickChat Logo' 
          src={assets.logo_big} 
          className='w-[min(40vw,240px)] drop-shadow-[0_10px_20px_rgba(255,255,255,0.15)] brightness-125' 
        />

        <form 
          onSubmit={onSubmitHandler} 
          className='w-full max-w-md bg-white border-[6px] border-[#6F36D4] p-8 flex flex-col gap-6 rounded-[2rem] shadow-2xl text-slate-800'
        >
          <div className='flex justify-between items-center mb-1'>
            <h2 className='font-bold text-3xl tracking-tight text-slate-800'>{currState}</h2>
            {isDataSubmitted && (
              <img 
                src={assets.arrow_icon} 
                alt='Back' 
                className='w-7 h-7 p-1.5 cursor-pointer bg-slate-100 rounded-full hover:bg-slate-200 active:scale-95 transition-all' 
                onClick={() => setIsDataSubmitted(false)} 
              />
            )}
          </div>

          {currState === "Sign up" && (
            <input
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              type='text'
              className={`py-3 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 text-sm focus:border-[#6F36D4] focus:ring-1 focus:ring-[#6F36D4]/30 outline-none transition-all ${isDataSubmitted ? "hidden" : ""}`}
              placeholder='Full Name'
              required={currState === "Sign up" && !isDataSubmitted}
            />
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            placeholder='Email Address'
            required={!isDataSubmitted}
            className={`py-3 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 text-sm focus:border-[#6F36D4] focus:ring-1 focus:ring-[#6F36D4]/30 outline-none transition-all ${isDataSubmitted ? "hidden" : ""}`}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type='password'
            placeholder='Password'
            required={!isDataSubmitted}
            className={`py-3 px-5 bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 text-sm focus:border-[#6F36D4] focus:ring-1 focus:ring-[#6F36D4]/30 outline-none transition-all ${isDataSubmitted ? "hidden" : ""}`}
          />

          {currState === "Sign up" && (
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              rows={4}
              className={`py-3 px-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:border-[#6F36D4] focus:ring-1 focus:ring-[#6F36D4]/30 outline-none transition-all resize-none ${!isDataSubmitted ? "hidden" : ""}`}
              placeholder='Provide a short Bio...'
              required={currState === "Sign up" && isDataSubmitted}
            ></textarea>
          )}

          <button 
            type='submit' 
            className='py-3 bg-[#6F36D4] hover:bg-[#5b29b8] text-white font-semibold rounded-full cursor-pointer hover:shadow-lg hover:shadow-purple-500/25 active:scale-[0.98] transition-all text-base mt-2 border-none'
          >
            {currState === "Sign up" && !isDataSubmitted ? "Next Step" : (currState === "Sign up" ? "Create Account" : "Login Now")}
          </button>

          <div className='flex items-center gap-3 text-sm text-slate-500 font-medium select-none'>
            <input type='checkbox' className='accent-[#6F36D4] w-4 h-4 cursor-pointer' required />
            <p className='cursor-pointer select-none'>Agree to the terms of use & privacy policy</p>
          </div>

          <div className='flex flex-col gap-2 text-center border-t border-slate-100 pt-4 mt-2'>
            {currState === "Sign up" ? (
              <p className='text-sm text-slate-400 font-medium'>
                Already have an account?
                <span
                  className='font-bold text-[#6F36D4] hover:text-[#5b29b8] hover:underline cursor-pointer ml-1 transition-all'
                  onClick={() => { setCurrState("Login"); setIsDataSubmitted(false); }}
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className='text-sm text-slate-400 font-medium'>
                Don't have an account?
                <span
                  className='font-bold text-[#6F36D4] hover:text-[#5b29b8] hover:underline cursor-pointer ml-1 transition-all'
                  onClick={() => setCurrState("Sign up")}
                >
                  Click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

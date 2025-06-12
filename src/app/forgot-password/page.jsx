'use client';
import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '../components/navbar';
import { signIn } from 'next-auth/react';

const SignIn = () => {
  const [icon, setIcon] = useState('');
  const [email, setEmail] = useState('');                  // <-- email state
  const [message, setMessage] = useState('');              // <-- feedback message

  useEffect(() => {
    async function fetchHomePage() {
      try {
        const response = await fetch('/api/HomePage');
        const data = await response.json();
        setIcon(data.LogoUrl);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      }
    }
    fetchHomePage();
  }, []);

  // <-- handleSubmit sends the POST to your API
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || 'If that email exists, a reset link has been sent.');
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarDefault icon={icon || null} />

      <div className="flex min-h-[calc(100vh-64px)]">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-[rgba(0,174,239,1)]"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex w-[63vw] h-[67vh] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/30">
          
          {/* Right side (logo + buttons + form) */}
          <div className="w-full bg-white/90 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col h-full p-8">
              {/* Logo Row */}
              <div className="flex justify-center mb-8">
                {icon && <img src={icon} alt="Logo" className="h-[7vh]" />}
              </div>

              <h1 className="text-3xl opacity-70 text-center font-bold">
                Forgot Your Password ?
              </h1>

              {/* Divider "Or Login With Email" */}
              <div className="relative flex items-center justify-center w-full max-w-sm mt-6 mb-6 ml-[16vw]">
                Don't worry! Resetting your password is simple. Just type
                in the email you registered to Record.
              </div>

              {/* Email Input */}
              <div className="flex flex-col items-center w-full max-w-sm space-y-4 ml-[16vw]">
                <div className="w-full">
                  <input
                    type="email"
                    placeholder="Enter Your Email Address"
                    className="w-full px-4 py-3 text-gray-700 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-black/10 border border-gray-300"
                    value={email}                             // <-- controlled input
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"                                // <-- make it a submit button
                className="w-full ml-[16vw] max-w-sm px-6 py-3 mt-6 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(0,174,239,0.9)' }}
              >
                Send Reset Link
              </button>

              {/* Feedback Message */}
              {message && (
                <p className="text-sm text-center text-green-600 mt-4 ml-[16vw] max-w-sm">
                  {message}
                </p>
              )}

              {/* Footer Links */}
              <div className="flex justify-between items-center w-full max-w-sm mt-8 text-xs text-gray-400 ml-[16vw]">
                <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                <span className="ml-[10vw]">Copyright © 2025</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

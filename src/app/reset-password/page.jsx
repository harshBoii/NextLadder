'use client';
import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '../components/navbar';
import { useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const [icon, setIcon] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      setMessage(data.message || 'Password has been reset successfully.');
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
          
          <div className="w-full bg-white/90 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex flex-col h-full p-8">
              <div className="flex justify-center mb-8">
                {icon && <img src={icon} alt="Logo" className="h-[7vh]" />}
              </div>

              <h1 className="text-3xl opacity-70 text-center font-bold">
                Reset Your Password
              </h1>

              <div className="relative flex items-center justify-center w-full max-w-sm mt-6 mb-6 ml-[16vw]">
                Please enter your new password below. Make sure it's secure and easy to remember.
              </div>

              <div className="flex flex-col items-center w-full max-w-sm space-y-4 ml-[16vw]">
                <div className="w-full">
                  <input
                    type="password"
                    placeholder="Enter New Password"
                    className="w-full px-4 py-3 text-gray-700 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-black/10 border border-gray-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="w-full">
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-3 text-gray-700 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-black/10 border border-gray-300"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full ml-[16vw] max-w-sm px-6 py-3 mt-6 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(0,174,239,0.9)' }}
              >
                Reset Password
              </button>

              {message && (
                <p className="text-sm text-center text-green-600 mt-4 ml-[16vw] max-w-sm">
                  {message}
                </p>
              )}

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

export default ResetPassword;

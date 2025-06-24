import React from 'react';

const RequestCallBack = () => {
  return (
    <div className="w-full h-[80vh] flex" style={{ backgroundColor: 'rgba(255, 246, 243, 1)' }}>
      <div className="w-[50%] h-[50%] mt-[20%] flex items-center justify-center">
        <img 
          src="/Phone.png"
          alt="Request Callback"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="w-[43%] flex flex-col font-sans justify-center px-16">
        <h2 className="text-3xl font-semibold mb-8">
          Have questions?<br/>
          Request a call from our counselors.
        </h2>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Full Name</label>
            <input 
              type="text"
              placeholder="Enter your full name"
              className="p-3 rounded-lg border border-gray-300 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-lg border border-gray-300 bg-white"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Phone Number</label>
            <input 
              type="tel"
              placeholder="Enter your phone number"
              className="p-3 rounded-lg border border-gray-300 bg-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Experience Level</label>
            <div className="flex flex-col gap-3 p-3 rounded-lg">
              {[
                { value: 'tech_professional', label: 'Working professional - Technical roles' },
                { value: 'non_tech_professional', label: 'Working professional - Non technical' },
                { value: 'final_year', label: 'College student - Final year' },
                { value: 'pre_final', label: 'College student - 1st to pre-final year' },
                { value: 'others', label: 'Others' }
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio"
                    name="experience"
                    value={option.value}
                    className="w-4 h-4 "
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <button 
            type="submit"
            className="py-3 rounded-lg font-semibold text-white transition-colors mt-2"
            style={{ backgroundColor: 'rgba(65, 175, 255, 1)' }}
          >
            Request Callback
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestCallBack;














'use client';

import { useState, useEffect } from 'react';
import AdminNavbar from '../../admincomp/adminnav';
import LeftNav from '../../admincomp/leftNav';
import { Search } from 'lucide-react';

export default function EnquiryPage() {
  return (
    <div className='flex'>
      <LeftNav />
      <div className='flex-1'>
        <AdminNavbar/>
        <div className="ml-[25vw] ml-[14vw] pt-[10vh]">
          <h1 className="text-2xl font-bold font-sans text-center mb-8">Search Student</h1>
          <div className="relative w-[40vw] mx-auto">
            <input 
              type="text"
              placeholder="Search students..."
              className="w-full px-4 py-2 pl-10 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          {/* Student Stats Section */}
          <div className="mt-8 flex justify-center gap-8">
            <div className="w-[30vw] h-[40vh] bg-white rounded-lg border-2 border-zinc-200 flex flex-col">
              <div className="p-4 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-center">Enquired Student</h2>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Search results/details will be displayed here */}
                <div className="text-center text-gray-500 mt-4">Search results will appear here</div>
              </div>
            </div>
            
            <div className="w-[30vw] h-[40vh] bg-white rounded-lg border-2 border-zinc-200 flex flex-col">
              <div className="p-4 border-b border-zinc-200">
                <h2 className="text-xl font-bold text-center">Onboarded Student</h2>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                {/* Search results/details will be displayed here */}
                <div className="text-center text-gray-500 mt-4">Search results will appear here</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

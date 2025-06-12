// 'use client';
// import React, { useEffect, useState } from 'react';
// import { NavbarDefault } from '../components/navbar';

// const SignIn = () => {
//   const [icon, setIcon] = useState('');

//   useEffect(() => {
//     const fetchHomePage = async () => {
//       try {
//         const response = await fetch('/api/HomePage');
//         const data = await response.json();
//         setIcon(data.LogoUrl);
//       } catch (error) {
//         console.error('Error fetching homepage data:', error);
//       }
//     };

//     fetchHomePage();
//   }, []);

//   return (

//     <div className="min-h-screen bg-gray-50">
//       <NavbarDefault icon={icon || null} />
//       <div className="flex min-h-[calc(100vh-64px)]">
//         <div className="w-1/2 bg-white">
//         </div>
//         <div className="w-1/2 bg-[rgba(0,174,239,1)]">
//         </div>
//       </div>
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//         <div className="flex w-[63vw] h-[67vh] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/30">
//           <div className="w-1/2 bg-white/90 backdrop-blur-sm p-8 flex items-center justify-center">
//             <div className="w-full h-full bg-[rgba(0,174,239,0.9)] rounded-2xl backdrop-blur-sm">
//                 <div className="flex flex-col h-full text-white font-sans p-8">
//                   <h2 className="text-2xl font-bold mb-4">Sign In</h2>
//                   <h1 className="text-4xl mb-6">Welcome Back</h1>
//                   <p className="text-md opacity-80 max-w-md">
//                     Join our community of learners and start your journey towards academic excellence. 
//                     Access personalized courses, track your progress, and connect with expert instructors.
//                   </p>
//                 </div>
//                 <img src="/SignInGirl.png" alt="" className="absolute bottom-[7vh] left-1/2 transform -translate-x-1/2 h-[25vh]"/>
//             </div>
//           </div>
//           <div className="w-1/2 bg-white/90 backdrop-blur-sm">
//           <div className="flex flex-col h-full p-8">
//                 <div className="flex justify-center mb-8 ">
//                 <img src={icon || null} alt="Logo" className="h-[7vh]" />
//                 </div>

//             <h1 className="text-md opacity-70 text-center font-bold">Let's Open Your skill repository</h1>
//                 <div className="flex flex-col items-center ml-[3.5vw] mt-8 w-[20vw]">
//                     <button 
//                     onClick={() => signIn('google')}
//                     className="flex items-center justify-center gap-3 w-full max-w-sm px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//                     >
//                     <img 
//                         src="/Google.png" 
//                         alt="Google logo" 
//                         className="w-5 h-5"
//                     />
//                     <span className="font-medium">Sign in with Google</span>

//                     </button>

//                 </div>

//                 <div className="relative flex items-center justify-center w-full max-w-sm mt-6 mb-6">
//                     <div className="flex-grow border-t border-gray-300"></div>
//                     <span className="flex-shrink mx-4 text-sm text-gray-500">Or Login With Email</span>
//                     <div className="flex-grow border-t border-gray-300"></div>
//                 </div>

//                 <div className="flex flex-col items-center w-full max-w-sm space-y-4">
//                     <div className="w-full">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         className="w-full px-4 py-3 text-gray-700 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-black/10 border border-gray-300"
//                     />
//                     </div>
//                     <div className="w-full">
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         className="w-full px-4 py-3 text-gray-700 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-black/10 border border-gray-300"
//                     />
//                     </div>
//                 </div>

//             <button 
//                 className="w-full max-w-sm px-6 py-3 mt-6 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:backdrop-blur-sm"
//                 style={{ backgroundColor: 'rgba(0,174,239,0.9)' }}
//             >
//                 Login
//             </button>
//           <div className="flex justify-between items-center w-full max-w-sm mt-4">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="remember"
//                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//               />
//               <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
//                 Remember me
//               </label>
//             </div>
//             <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
//               Forgot password?
//             </a>
//           </div>
            
//           <div className="flex justify-between items-center w-full max-w-sm mt-8 text-xs text-gray-400">
//             <a href="#" className="hover:text-gray-600">Privacy Policy</a>
//             <span>Copyright © 2025</span>
//           </div>

//           </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

'use client';
import React, { useEffect, useState } from 'react';
import { NavbarDefault } from '../components/navbar';
import { signIn } from 'next-auth/react';           // ← Make sure this is imported

const SignIn = () => {
  const [icon, setIcon] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarDefault icon={icon || null} />

      <div className="flex min-h-[calc(100vh-64px)]">
        <div className="w-1/2 bg-white"></div>
        <div className="w-1/2 bg-[rgba(0,174,239,1)]"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex w-[63vw] h-[67vh] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/30">
          
          {/* Left side (info + image) */}
          <div className="w-1/2 bg-white/90 backdrop-blur-sm p-8 flex items-center justify-center">
            <div className="w-full h-full bg-[rgba(0,174,239,0.9)] rounded-2xl backdrop-blur-sm">
              <div className="flex flex-col h-full text-white font-sans p-8">
                <h2 className="text-2xl font-bold mb-4">Sign In</h2>
                <h1 className="text-4xl mb-6">Welcome Back</h1>
                <p className="text-md opacity-80 max-w-md">
                  Join our community of learners and start your journey towards academic excellence. 
                  Access personalized courses, track your progress, and connect with expert instructors.
                </p>
              </div>
              <img
                src="/SignInGirl.png"
                alt=""
                className="absolute bottom-[7vh] left-1/2 transform -translate-x-1/2 h-[25vh]"
              />
            </div>
          </div>

          {/* Right side (logo + buttons + form) */}
          <div className="w-1/2 bg-white/90 backdrop-blur-sm">
            <div className="flex flex-col h-full p-8">
              
              {/* Logo Row */}
              <div className="flex justify-center mb-8">
                {icon && <img src={icon} alt="Logo" className="h-[7vh]" />}
              </div>

              <h1 className="text-md opacity-70 text-center font-bold">
                Let's Open Your skill repository
              </h1>

              {/* Google Sign-In Button */}
              <div className="flex flex-col items-center ml-[3.5vw] mt-8 w-[20vw]">
                <button
                  onClick={() => signIn('google')}   // ← Calls NextAuth’s signIn
                  className="flex items-center justify-center gap-3 w-full max-w-sm px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <img
                    src="/Google.png"
                    alt="Google logo"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Sign in with Google</span>
                </button>
              </div>

              {/* Divider “Or Login With Email” */}
              <div className="relative flex items-center justify-center w-full max-w-sm mt-6 mb-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-sm text-gray-500">
                  Or Login With Email
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Email / Password Inputs */}
              <div className="flex flex-col items-center w-full max-w-sm space-y-4">
                <div className="w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 text-gray-700 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-black/10 border border-gray-300"
                  />
                </div>
                <div className="w-full">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 text-gray-700 bg-black/5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-black/10 border border-gray-300"
                  />
                </div>
              </div>

              {/* Regular Email/Password “Login” Button */}
              <button
                className="w-full max-w-sm px-6 py-3 mt-6 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(0,174,239,0.9)' }}
              >
                Login
              </button>

              {/* Remember / Forgot Password Row */}
              <div className="flex justify-between items-center w-full max-w-sm mt-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Forgot password?
                </a>
              </div>

              {/* Footer Links */}
              <div className="flex justify-between items-center w-full max-w-sm mt-8 text-xs text-gray-400">
                <a href="#" className="hover:text-gray-600">Privacy Policy</a>
                <span>Copyright © 2025</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default SignIn;

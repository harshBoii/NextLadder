import { useRouter, usePathname } from 'next/navigation';
import { FaHome, FaUserGraduate, FaClipboardList, FaUser, FaCog } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const LeftNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch('/api/HomePage');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setLogoUrl(data.LogoUrl || '');
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    fetchLogo();
  }, []);

  const navItems = [
    { name: 'Home Page', icon: <FaHome className="w-5 h-5" />, path: '/admin/editHome' },
    { name: 'Student Enquiry List', icon: <FaUserGraduate className="w-5 h-5" />, path: '/admin/enquiry' },
    { name: 'Online Test', icon: <FaClipboardList className="w-5 h-5" />, path: '/admin/test' },
    { name: 'Profile', icon: <FaUser className="w-5 h-5" />, path: '/admin/profile' },
  ];

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="w-[20vw] z-200 fixed h-screen bg-white text-gray-800 p-4 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="mb-8 p-4">
        {logoUrl ? (
          <img src={logoUrl} alt="Logo" className="h-12 object-contain" />
        ) : (
          <div className="h-12 flex items-center">
            <span className="text-xl font-bold">Loading...</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-grow">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
              pathname === item.path 
                ? 'bg-blue-100 text-blue-600' 
                : 'hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Settings at bottom */}
      <div className="mt-auto border-t border-gray-200 pt-4">
        <button
          onClick={() => handleNavigation('/admin/settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            pathname === '/admin/settings'
              ? 'bg-blue-100 text-blue-600'
              : 'hover:bg-gray-100'
          }`}
        >
          <FaCog className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default LeftNav;



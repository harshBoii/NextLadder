import { useRouter, usePathname } from 'next/navigation';
import { FaHome, FaUserGraduate, FaClipboardList, FaUser, FaCog, FaBars, FaTimes, FaChevronLeft, FaChevronRight, FaTags, FaBook, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const LeftNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [logoUrl, setLogoUrl] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

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
    { name: 'Add Course', icon: <FaPlus className="w-5 h-5" />, path: '/admin/courses/add' },
    { name: 'Add Tag', icon: <FaTags className="w-5 h-5" />, path: '/admin/AddTag' },
    { name: 'Add Course Type', icon: <FaBook className="w-5 h-5" />, path: '/admin/Coursetype' },
    { name: 'Student Enquiry List', icon: <FaUserGraduate className="w-5 h-5" />, path: '/admin/enquiry' },
    { name: 'Online Test', icon: <FaClipboardList className="w-5 h-5" />, path: '/admin/test' },
    { name: 'Profile', icon: <FaUser className="w-5 h-5" />, path: '/admin/profile' },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNavCollapse = () => {
    const newCollapsedState = !isNavCollapsed;
    setIsNavCollapsed(newCollapsedState);
    
    // Emit custom event for main content to listen to
    window.dispatchEvent(new CustomEvent('navToggle', {
      detail: { isCollapsed: newCollapsedState }
    }));
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors border border-cyan-400/30 rounded-lg"
      >
        {isMobileMenuOpen ? (
          <FaTimes className="w-6 h-6 text-cyan-300" />
        ) : (
          <FaBars className="w-6 h-6 text-cyan-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <div className={`
        fixed h-screen bg-gray-900/95 backdrop-blur-md text-white p-4 flex flex-col shadow-lg border-r border-cyan-400/20 z-40
        transition-all duration-300 ease-in-out
        lg:w-[20vw] lg:translate-x-0
        ${isMobileMenuOpen ? 'w-[280px] translate-x-0' : 'w-[280px] -translate-x-full lg:translate-x-0'}
        ${isNavCollapsed ? 'lg:w-[80px]' : 'lg:w-[20vw]'}
      `}>
        {/* Desktop Toggle Button - Inside sidebar */}
        <button
          onClick={toggleNavCollapse}
          className="hidden lg:flex absolute top-4 right-2 z-50 p-2 bg-cyan-500/20 hover:bg-cyan-500/30 transition-all duration-300 border border-cyan-400/30 rounded-lg"
        >
          {isNavCollapsed ? (
            <FaChevronRight className="w-4 h-4 text-cyan-300" />
          ) : (
            <FaChevronLeft className="w-4 h-4 text-cyan-300" />
          )}
        </button>

        {/* Logo */}
        <div className={`mb-8 p-4 ${isNavCollapsed ? 'lg:px-2' : ''}`}>
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className={`object-contain ${isNavCollapsed ? 'lg:h-8' : 'h-12'}`} />
          ) : (
            <div className={`flex items-center ${isNavCollapsed ? 'lg:justify-center' : ''}`}>
              <span className={`font-bold font-orbitron text-cyan-300 ${isNavCollapsed ? 'lg:text-lg' : 'text-xl'}`}>
                {isNavCollapsed ? 'NL' : 'Loading...'}
              </span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-grow">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-all duration-300 font-share-tech-mono ${
                pathname === item.path 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50' 
                  : 'hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-300 border border-transparent hover:border-cyan-400/30'
              } ${isNavCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
              title={isNavCollapsed ? item.name : ''}
            >
              {item.icon}
              <span className={`whitespace-nowrap ${isNavCollapsed ? 'lg:hidden' : ''}`}>{item.name}</span>
            </button>
          ))}
        </div>

        {/* Settings at bottom */}
        <div className="mt-auto border-t border-cyan-400/20 pt-4">
          <button
            onClick={() => handleNavigation('/admin/settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-share-tech-mono ${
              pathname === '/admin/settings'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50'
                : 'hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-300 border border-transparent hover:border-cyan-400/30'
            } ${isNavCollapsed ? 'lg:justify-center lg:px-2' : ''}`}
            title={isNavCollapsed ? 'Settings' : ''}
          >
            <FaCog className="w-5 h-5" />
            <span className={`${isNavCollapsed ? 'lg:hidden' : ''}`}>Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftNav;



import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bell, Menu } from 'lucide-react';

const AdminNavbar = ({ toggleLeftNav, isLeftNavOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [logoUrl, setLogoUrl] = useState('/logo.png'); // Default logo path

  // Fetch logo URL
  useEffect(() => {
    const fetchLogoUrl = async () => {
      try {
        const res = await fetch('/api/HomePage');
        if (!res.ok) throw new Error('Failed to fetch logo');
        const data = await res.json();
        if (data.LogoUrl) {
          setLogoUrl(data.LogoUrl);
        }
      } catch (err) {
        console.error('Error fetching logo:', err);
      }
    };

    fetchLogoUrl();
  }, []);

  // Mock function to fetch notifications
  const fetchNotifications = async () => {
    // Replace with actual API call
    const mockNotifications = [
      { id: 1, message: "New course enrollment", time: "2h ago" },
      { id: 2, message: "Course update available", time: "5h ago" },
    ];
    setNotifications(mockNotifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <nav className="w-full bg-white/10 backdrop-blur-md fixed top-0 left-0 right-0 py-4 px-6 z-50 border-b border-cyan-400/20">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="ml-2 text-white h-12 w-50 text-4xl font-bold font-orbitron">
            <Image src={logoUrl} alt="Logo" width={150} height={375} />
          </a>
        </div>

        {/* Rest of the component remains unchanged */}
        <div className="flex items-center gap-6">

          <div className="relative">
            <button 
              className="p-2 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 transition-colors relative border border-cyan-400/30"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-cyan-300" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-lg border border-cyan-400/30 z-50">
                <div className="p-4">
                  <h3 className="text-cyan-300 font-semibold mb-2 font-orbitron">Notifications</h3>
                  {notifications.length > 0 ? (
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className="p-2 hover:bg-cyan-500/10 rounded-md cursor-pointer border border-transparent hover:border-cyan-400/20"
                        >
                          <p className="text-white text-sm font-share-tech-mono">{notification.message}</p>
                          <p className="text-cyan-300/70 text-xs font-share-tech-mono">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-cyan-300/70 text-sm font-share-tech-mono">No new notifications</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <Image
              src="/3d3.png"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer hover:opacity-80 transition-opacity border-2 border-cyan-400/30"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

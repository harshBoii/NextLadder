import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Bell, Plus } from 'lucide-react';

const AdminNavbar = () => {
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
    <nav className="w-full bg-white fixed py-4 px-6">
      <div className="mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <span className="ml-2 text-white text-xl font-bold">NextLadder</span>
        </div>

        {/* Rest of the component remains unchanged */}
        <div className="flex items-center gap-6">
          <button 
            className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
            onClick={() => {/* Add course logic */}}
          >
            <Plus className="w-5 h-5 text-white" />
          </button>

          <div className="relative">
            <button 
              className="p-2 rounded-full bg-zinc-400 hover:bg-gray-800 transition-colors relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-white" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#2a2a2a] rounded-lg shadow-lg border border-gray-700">
                <div className="p-4">
                  <h3 className="text-white font-semibold mb-2">Notifications</h3>
                  {notifications.length > 0 ? (
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className="p-2 hover:bg-gray-700 rounded-md cursor-pointer"
                        >
                          <p className="text-white text-sm">{notification.message}</p>
                          <p className="text-gray-400 text-xs">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No new notifications</p>
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
              className="rounded-full cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

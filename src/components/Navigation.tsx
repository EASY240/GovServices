import React from 'react';
import { Home, FileText, Tool, HelpCircle, MessageSquare, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface NavigationProps {
  onShowCommunityForum: (show: boolean) => void;
  showCommunityForum: boolean;
}

function Navigation({ onShowCommunityForum, showCommunityForum }: NavigationProps) {
  const location = useLocation();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, action: () => onShowCommunityForum(false) },
    { id: 'services', label: 'Services', icon: FileText, action: () => onShowCommunityForum(false) },
    { id: 'tools', label: 'Tools', icon: Tool, action: () => onShowCommunityForum(false) },
    { id: 'support', label: 'Support', icon: HelpCircle, action: () => onShowCommunityForum(false) },
    { id: 'forum', label: 'Community', icon: MessageSquare, action: () => onShowCommunityForum(true) },
  ];

  return (
    <nav className="bg-blue-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 
              className="text-xl font-bold cursor-pointer" 
              onClick={() => onShowCommunityForum(false)}
            >
              GovServices
            </h1>
            
            <div className="hidden md:flex space-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    (item.id === 'forum' && showCommunityForum) ||
                    (item.id === 'home' && !showCommunityForum)
                      ? 'bg-blue-800 text-white'
                      : 'hover:bg-blue-800'
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg">
              <User size={18} />
              <span>Account</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
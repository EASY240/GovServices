import React, { useState } from 'react';
import { Search, Globe, Menu, X, ChevronRight, Bell, User } from 'lucide-react';
import ServiceCategories from './components/ServiceCategories';
import StateMap from './components/StateMap';
import FeaturedServices from './components/FeaturedServices';
import ToolsHub from './components/ToolsHub';
import UserSupport from './components/UserSupport';
import Footer from './components/Footer';
import AccountDashboard from './components/AccountDashboard';
import CommunityForum from './components/CommunityForum';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showCommunityForum, setShowCommunityForum] = useState(false);

  if (showCommunityForum) {
    return <CommunityForum />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 
                className="text-xl font-bold cursor-pointer" 
                onClick={() => setShowCommunityForum(false)}
              >
                GovServices
              </h1>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                <a href="#services" className="hover:text-blue-200">Services</a>
                <a href="#states" className="hover:text-blue-200">States</a>
                <a href="#tools" className="hover:text-blue-200">Tools</a>
                <a href="#support" className="hover:text-blue-200">Support</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <button 
                onClick={() => setLanguage(lang => lang === 'en' ? 'es' : 'en')}
                className="flex items-center space-x-1 hover:text-blue-200"
              >
                <Globe size={20} />
                <span>{language.toUpperCase()}</span>
              </button>

              {/* Notifications */}
              <button className="hidden md:flex items-center hover:text-blue-200 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Account */}
              <button 
                onClick={() => setShowDashboard(!showDashboard)}
                className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg"
              >
                <User size={18} />
                <span>Account</span>
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 text-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <a href="#services" className="block hover:text-blue-200">Services</a>
            <a href="#states" className="block hover:text-blue-200">States</a>
            <a href="#tools" className="block hover:text-blue-200">Tools</a>
            <a href="#support" className="block hover:text-blue-200">Support</a>
            <button className="w-full px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg flex items-center justify-center space-x-2">
              <User size={18} />
              <span>Account</span>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Find Government Services Near You
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Access local, state, and federal services all in one place
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for services..."
              className="w-full px-6 py-4 rounded-lg text-gray-900 shadow-lg"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 rounded-lg hover:bg-blue-500">
              <Search size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <FeaturedServices />

      {/* State Selection */}
      <StateMap />

      {/* Service Categories */}
      <ServiceCategories />

      {/* Tools Hub */}
      <ToolsHub />

      {/* User Support */}
      <UserSupport setShowCommunityForum={setShowCommunityForum} />

      {/* Account Dashboard (Modal) */}
      {showDashboard && <AccountDashboard onClose={() => setShowDashboard(false)} />}

      {/* Latest Updates */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg p-4 flex items-center overflow-hidden">
            <span className="font-bold text-blue-900 whitespace-nowrap mr-4">Latest Updates:</span>
            <div className="overflow-hidden relative flex-1">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mx-4">New tax filing deadlines announced</span>
                <span className="mx-4">•</span>
                <span className="mx-4">COVID-19 resource center updated</span>
                <span className="mx-4">•</span>
                <span className="mx-4">Passport services now available online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer setShowCommunityForum={setShowCommunityForum} />
    </div>
  );
}

export default App;
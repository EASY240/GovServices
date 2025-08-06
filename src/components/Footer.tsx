import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

interface FooterProps {
  setShowCommunityForum: (show: boolean) => void;
}

function Footer({ setShowCommunityForum }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="hover:text-white transition-colors">All Services</a></li>
              <li><a href="#tools" className="hover:text-white transition-colors">Tools & Resources</a></li>
              <li><a href="#support" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><button onClick={() => setShowCommunityForum(true)} className="hover:text-white transition-colors">Community Forum</button></li>
              <li><a href="#accessibility" className="hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#compliance" className="hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and services
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-500 transition-colors">
                <Mail size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a href="#facebook" className="hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#twitter" className="hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#instagram" className="hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#youtube" className="hover:text-white transition-colors">
              <Youtube size={24} />
            </a>
          </div>
          <p className="text-sm">
            © 2025 GovServices. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
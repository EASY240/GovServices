import React from 'react';
import { X, Bell, FileText, Clock, Star, Settings } from 'lucide-react';

interface AccountDashboardProps {
  onClose: () => void;
}

function AccountDashboard({ onClose }: AccountDashboardProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Account Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-semibold text-blue-600">JD</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <FileText className="text-blue-600" />
                <h4 className="font-medium text-gray-900">Active Applications</h4>
              </div>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Clock className="text-blue-600" />
                <h4 className="font-medium text-gray-900">Pending Reviews</h4>
              </div>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Star className="text-blue-600" />
                <h4 className="font-medium text-gray-900">Saved Services</h4>
              </div>
              <p className="text-2xl font-semibold text-gray-900">5</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Activity</h3>
            <div className="space-y-4">
              {[
                'Passport renewal application submitted',
                'Business license status updated',
                'New document uploaded to tax filing',
                'Address information updated'
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="text-gray-600">{activity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
              <Bell size={18} />
              <span>Notification Settings</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings size={18} />
              <span>Account Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDashboard;
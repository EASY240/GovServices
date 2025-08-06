import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

interface UserSupportProps {
  setShowCommunityForum: (show: boolean) => void;
}

const faqs = [
  {
    question: "How do I track my application status?",
    answer: "Log in to your account and visit the Application Status Tracker in your dashboard. You'll find real-time updates on all your pending applications."
  },
  {
    question: "What documents do I need for passport renewal?",
    answer: "You'll need your current passport, a recent photo, and completed Form DS-82. Additional documents may be required based on your specific situation."
  },
  {
    question: "How can I get a business license?",
    answer: "Start by selecting your state and business type in the Business Services section. Our wizard will guide you through the required steps and documentation."
  }
];

function UserSupport({ setShowCommunityForum }: UserSupportProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50" id="support">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          Help & Support
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Find answers to common questions or get in touch with our support team
        </p>

        {/* FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <HelpCircle className="mr-2" /> Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span className="text-blue-600 transform transition-transform">
                      {expandedFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <MessageCircle className="mr-2" /> Get in Touch
            </h3>
            <div className="space-y-4">
              <a
                href="tel:1-800-123-4567"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Phone className="text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Phone Support</div>
                  <div className="text-sm text-gray-600">1-800-123-4567</div>
                </div>
              </a>
              <a
                href="mailto:support@govservices.com"
                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="text-blue-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Email Support</div>
                  <div className="text-sm text-gray-600">support@govservices.com</div>
                </div>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="font-medium text-gray-900 mb-2">Support Hours</h4>
              <p className="text-gray-600 text-sm">
                Monday - Friday: 8:00 AM - 8:00 PM<br />
                Saturday: 9:00 AM - 5:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Community Support Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-semibold mb-4">
            Join Our Community Forum
          </h3>
          <p className="mb-6 opacity-90">
            Connect with other users, share experiences, and get advice from experts
          </p>
          <button 
            onClick={() => setShowCommunityForum(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Visit Community Forum
          </button>
        </div>
      </div>
    </section>
  );
}

export default UserSupport;
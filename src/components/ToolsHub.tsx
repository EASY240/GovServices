import React from 'react';
import { Calculator, FileText, MessageSquare, Wand2 } from 'lucide-react';

const tools = [
  {
    icon: Calculator,
    title: 'Tax Calculator',
    description: 'Estimate your taxes and payments',
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    icon: FileText,
    title: 'PDF Form Generator',
    description: 'Create and fill government forms',
    color: 'bg-blue-100 text-blue-600'
  },
  {
    icon: MessageSquare,
    title: 'AI Assistant Chat',
    description: 'Get instant answers to your questions',
    color: 'bg-purple-100 text-purple-600'
  },
  {
    icon: Wand2,
    title: 'Application Wizard',
    description: 'Step-by-step application guidance',
    color: 'bg-amber-100 text-amber-600'
  }
];

function ToolsHub() {
  return (
    <section className="py-16 bg-white" id="tools">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          Smart Tools Hub
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Access our suite of intelligent tools designed to make government services easier and more efficient
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 p-6"
              >
                <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">
                  {tool.title}
                </h3>
                <p className="text-gray-600">
                  {tool.description}
                </p>
                <button className="mt-4 text-blue-600 hover:text-blue-500 font-medium">
                  Launch Tool →
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">
            Need More Tools?
          </h3>
          <p className="text-gray-600 mb-6">
            Check out our premium tools and services for advanced features and priority support
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors">
            Explore Premium Features
          </button>
        </div>
      </div>
    </section>
  );
}

export default ToolsHub;
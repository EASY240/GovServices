import React, { useState } from 'react';

function StateMap() {
  const [hoveredState, setHoveredState] = useState('');

  // This is a simplified example - in production, you'd want to use a proper SVG map
  return (
    <section className="py-16 bg-gray-50" id="states">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Select Your State
        </h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-sm">
          <p className="text-center text-gray-600 mb-8">
            Interactive map coming soon. For now, select your state from the list below:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['California', 'New York', 'Texas', 'Florida'].map((state) => (
              <button
                key={state}
                className="p-3 text-center rounded-lg hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-colors"
                onMouseEnter={() => setHoveredState(state)}
                onMouseLeave={() => setHoveredState('')}
              >
                {state}
              </button>
            ))}
          </div>
          
          {hoveredState && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-900">
                View services available in {hoveredState}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StateMap;
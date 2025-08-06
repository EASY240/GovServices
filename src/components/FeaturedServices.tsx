import React from 'react';
import { ChevronRight } from 'lucide-react';

const featuredServices = [
  {
    title: 'Passport Renewal',
    description: 'Renew your passport online',
    image: 'https://images.unsplash.com/photo-1540126034813-121bf29033d2?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Vehicle Registration',
    description: 'Register or renew vehicle registration',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=500&q=80'
  },
  {
    title: 'Business Licenses',
    description: 'Apply for business permits and licenses',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&q=80'
  }
];

function FeaturedServices() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Featured Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <div 
              key={index}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div 
                className="h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <button className="flex items-center text-blue-600 hover:text-blue-500">
                  Learn More
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedServices;
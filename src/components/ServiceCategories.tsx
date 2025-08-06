import React from 'react';
import { FileText, Briefcase, Scale, Heart, Building, Plane } from 'lucide-react';

const categories = [
  { icon: FileText, title: 'Tax Services', description: 'File taxes and manage payments' },
  { icon: Building, title: 'Licensing & Permits', description: 'Apply for licenses and permits' },
  { icon: Scale, title: 'Legal Services', description: 'Access legal resources and support' },
  { icon: Heart, title: 'Social Assistance', description: 'Find help and support programs' },
  { icon: Briefcase, title: 'Business Services', description: 'Start and manage your business' },
  { icon: Plane, title: 'Immigration & Visas', description: 'Immigration and travel services' },
];

function ServiceCategories() {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Service Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index}
                className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {category.title}
                    </h3>
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceCategories;
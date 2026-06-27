import React from 'react';
import { Activity, Brain, Baby, Bone, Microscope, Ambulance, LucideIcon } from 'lucide-react';
import { departments } from '../data';

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Baby,
  Bone,
  Microscope,
  Ambulance
};

export function Departments() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="bg-white py-16 lg:py-24 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Our Departments</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive care across a wide range of medical specialties.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept) => {
            const IconComponent = iconMap[dept.icon] || Activity;
            return (
              <div key={dept.id} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{dept.name}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {dept.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

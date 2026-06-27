import React, { useState } from 'react';
import { doctors, departments } from '../data';

export function Doctors() {
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const filteredDoctors = selectedDept === 'all' 
    ? doctors 
    : doctors.filter(doc => doc.departmentId === selectedDept);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAF7]">
      <div className="bg-white py-16 lg:py-24 border-b border-[#E6EDE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2D342E] tracking-tight mb-4">Our Specialists</h1>
          <p className="text-xl text-[#6B7863] max-w-2xl mx-auto">
            Meet our team of experienced and compassionate medical professionals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors border ${
              selectedDept === 'all' 
                ? 'bg-[#5E7A53] border-[#5E7A53] text-white' 
                : 'bg-white border-[#E6EDE1] text-[#7A8A73] hover:border-[#A8C3A0] hover:text-[#5E7A53]'
            }`}
          >
            All Specialists
          </button>
          {departments.map(dept => (
            <button
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                selectedDept === dept.id 
                  ? 'bg-[#5E7A53] border-[#5E7A53] text-white' 
                  : 'bg-white border-[#E6EDE1] text-[#7A8A73] hover:border-[#A8C3A0] hover:text-[#5E7A53]'
              }`}
            >
              {dept.name}
            </button>
          ))}
        </div>

        {/* Doctor Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl overflow-hidden border border-[#E6EDE1] hover:border-[#A8C3A0] transition-all group">
              <div className="h-64 overflow-hidden bg-[#E8F0E4]">
                <img 
                  src={doctor.imageUrl} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#5E7A53]">
                    {departments.find(d => d.id === doctor.departmentId)?.name}
                  </span>
                  <h3 className="text-xl font-bold text-[#2D342E] mt-1">{doctor.name}</h3>
                  <p className="text-[#6B7863] text-sm font-medium">{doctor.specialty}</p>
                </div>
                <p className="text-[#7A8A73] text-sm leading-relaxed mb-4 line-clamp-3">
                  {doctor.bio}
                </p>
                <div className="pt-4 border-t border-[#E6EDE1]">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">EDUCATION</p>
                  <p className="text-sm text-[#2D342E] mt-1">{doctor.education}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

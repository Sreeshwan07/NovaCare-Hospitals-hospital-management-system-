import React from 'react';
import { CheckCircle } from 'lucide-react';

export function About() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAF7]">
      {/* Header */}
      <div className="bg-white py-16 lg:py-24 border-b border-[#E6EDE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2D342E] tracking-tight mb-4">About NovaCare</h1>
          <p className="text-xl text-[#6B7863] max-w-2xl mx-auto">
            A legacy of healing, a future of innovation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#2D342E] mb-6">Our Story</h2>
            <div className="space-y-4 text-[#6B7863] text-lg leading-relaxed">
              <p>
                Founded in 1995, NovaCare Hospitals began with a simple yet profound mission: to provide accessible, high-quality healthcare to our community. Over the decades, we have grown from a small community clinic into a comprehensive, multi-specialty medical center.
              </p>
              <p>
                We believe that healing is both an art and a science. Our facility is designed to provide a calming environment, while our medical infrastructure boasts the latest in technological advancements.
              </p>
              <p>
                Today, NovaCare stands as a beacon of medical excellence, serving thousands of patients annually across various disciplines, driven by a commitment to ethical practice and compassionate care.
              </p>
            </div>
            
            <div className="mt-8 space-y-3">
              <div className="flex items-center text-[#2D342E]">
                <CheckCircle className="h-5 w-5 text-[#5E7A53] mr-3 shrink-0" />
                <span className="font-medium">Over 25 years of medical excellence</span>
              </div>
              <div className="flex items-center text-[#2D342E]">
                <CheckCircle className="h-5 w-5 text-[#5E7A53] mr-3 shrink-0" />
                <span className="font-medium">500+ Board-certified medical professionals</span>
              </div>
              <div className="flex items-center text-[#2D342E]">
                <CheckCircle className="h-5 w-5 text-[#5E7A53] mr-3 shrink-0" />
                <span className="font-medium">State-of-the-art diagnostic facilities</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=400" 
              alt="Hospital facility" 
              className="rounded-2xl w-full h-64 object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=400" 
              alt="Doctors collaborating" 
              className="rounded-2xl w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

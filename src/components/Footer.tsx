import React from 'react';
import { HeartPulse, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

export function Footer({ setPage }: FooterProps) {
  return (
    <footer className="bg-white text-[#6B7863] border-t border-[#E6EDE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
              <div className="w-10 h-10 bg-[#5E7A53] rounded-xl flex items-center justify-center">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-2xl font-semibold text-[#3E4D36] tracking-tight">NovaCare <span className="font-light">Hospitals</span></span>
            </div>
            <p className="text-sm leading-relaxed text-[#7A8A73]">
              Providing world-class healthcare with compassion and excellence. Your health is our priority, today and always.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#2D342E] mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setPage('home')} className="hover:text-[#5E7A53] transition-colors">Home</button></li>
              <li><button onClick={() => setPage('about')} className="hover:text-[#5E7A53] transition-colors">About Us</button></li>
              <li><button onClick={() => setPage('departments')} className="hover:text-[#5E7A53] transition-colors">Departments</button></li>
              <li><button onClick={() => setPage('doctors')} className="hover:text-[#5E7A53] transition-colors">Find a Doctor</button></li>
              <li><button onClick={() => setPage('appointment')} className="hover:text-[#5E7A53] transition-colors">Book Appointment</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[#2D342E] mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#5E7A53] mr-3 shrink-0" />
                <span>123 Health Avenue, Medical District<br />Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#5E7A53] mr-3 shrink-0" />
                <span>+1 (800) 555-NOVA</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#5E7A53] mr-3 shrink-0" />
                <span>contact@novacare.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold text-[#2D342E] mb-4">Working Hours</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between border-b border-[#E6EDE1] pb-2">
                <span className="flex items-center"><Clock className="h-4 w-4 mr-2" /> Mon - Fri</span>
                <span>8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-[#E6EDE1] pb-2">
                <span className="flex items-center"><Clock className="h-4 w-4 mr-2" /> Saturday</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between pb-2 text-[#5E7A53] font-medium">
                <span className="flex items-center"><Clock className="h-4 w-4 mr-2" /> Emergency</span>
                <span>24 / 7</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#E6EDE1] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold text-[#A4B19E] uppercase tracking-widest gap-4">
          <p>&copy; {new Date().getFullYear()} NovaCare Health Systems</p>
          <div className="flex space-x-8">
            <span className="cursor-pointer hover:text-[#5E7A53]">Privacy Policy</span>
            <span className="cursor-pointer hover:text-[#5E7A53]">Medical Directory</span>
            <span className="cursor-pointer hover:text-[#5E7A53]">Patient Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

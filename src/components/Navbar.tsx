import React, { useState } from 'react';
import { Menu, X, HeartPulse, LogOut, LogIn } from 'lucide-react';
import { Page } from '../types';
import { useAuth } from '../lib/AuthContext';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

export function Navbar({ currentPage, setPage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, logout } = useAuth();

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' },
  ];

  const handleNavClick = (page: Page) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-[#E6EDE1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 bg-[#5E7A53] rounded-xl flex items-center justify-center">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-2xl font-semibold tracking-tight text-[#3E4D36]">NovaCare <span className="font-light">Hospitals</span></span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === link.id ? 'text-[#5E7A53] border-b-2 border-[#5E7A53] pb-1' : 'text-[#7A8A73] hover:text-[#5E7A53]'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-[#E6EDE1]">
                {user.email?.toLowerCase() === 'mdr.gemini@gmail.com' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="text-sm font-medium text-[#7A8A73] hover:text-[#5E7A53]"
                  >
                    Admin Portal
                  </button>
                )}
                <button
                  onClick={() => handleNavClick('appointments_list')}
                  className="text-sm font-medium text-[#7A8A73] hover:text-[#5E7A53]"
                >
                  My Appointments
                </button>
                <button
                  onClick={logout}
                  className="text-[#7A8A73] hover:text-[#5E7A53] p-1 rounded-full transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
                <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full border border-[#E6EDE1]" />
                <button
                  onClick={() => handleNavClick('appointment')}
                  className="bg-[#5E7A53] hover:bg-[#4D6643] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
                >
                  Book Appointment
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-[#E6EDE1]">
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center text-sm font-medium text-[#5E7A53] hover:text-[#4D6643] transition-colors"
                >
                  <LogIn className="h-4 w-4 mr-1.5" />
                  Sign In
                </button>
                <button
                  onClick={signInWithGoogle}
                  className="bg-[#5E7A53] hover:bg-[#4D6643] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors shadow-sm"
                >
                  Book Appointment
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && (
              <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full border border-[#E6EDE1] mr-3" />
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#7A8A73] hover:text-[#5E7A53] focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E6EDE1] px-2 pt-2 pb-4 space-y-1 shadow-lg absolute w-full">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium ${
                currentPage === link.id
                  ? 'bg-[#E8F0E4] text-[#5E7A53]'
                  : 'text-[#7A8A73] hover:bg-[#F2F5F0] hover:text-[#5E7A53]'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="pt-4 pb-2 border-t border-[#E6EDE1] mt-2">
            {user ? (
              <div className="space-y-1">
                {user.email?.toLowerCase() === 'mdr.gemini@gmail.com' && (
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-[#7A8A73] hover:bg-[#F2F5F0] hover:text-[#5E7A53]"
                  >
                    Admin Portal
                  </button>
                )}
                <button
                  onClick={() => handleNavClick('appointments_list')}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-[#7A8A73] hover:bg-[#F2F5F0] hover:text-[#5E7A53]"
                >
                  My Appointments
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-3 rounded-md text-base font-medium text-[#7A8A73] hover:bg-[#F2F5F0] hover:text-[#5E7A53]"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </button>
                <div className="px-3 pt-2">
                  <button
                    onClick={() => handleNavClick('appointment')}
                    className="w-full bg-[#5E7A53] text-white px-3 py-3 rounded-md text-base font-medium hover:bg-[#4D6643]"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1 px-3">
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center w-full bg-[#F2F5F0] text-[#5E7A53] px-3 py-3 rounded-md text-base font-medium mb-2 hover:bg-[#E8F0E4]"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In to Book
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

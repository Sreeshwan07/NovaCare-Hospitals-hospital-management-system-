import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { About } from './components/About';
import { Departments } from './components/Departments';
import { Doctors } from './components/Doctors';
import { Appointment } from './components/Appointment';
import { AppointmentsList } from './components/AppointmentsList';
import { Admin } from './components/Admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'departments':
        return <Departments />;
      case 'doctors':
        return <Doctors />;
      case 'appointment':
        return <Appointment />;
      case 'appointments_list':
        return <AppointmentsList />;
      case 'admin':
        return <Admin setPage={setCurrentPage} />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };


  return (
    <div className="font-sans min-h-screen flex flex-col bg-[#F9FAF7] text-[#2D342E]">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
}

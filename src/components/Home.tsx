import React from 'react';
import { ArrowRight, ShieldCheck, Stethoscope, Activity } from 'lucide-react';
import { Page } from '../types';

interface HomeProps {
  setPage: (page: Page) => void;
}

export function Home({ setPage }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#F9FAF7] py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#E8F0E4] text-[#5E7A53] text-xs font-bold uppercase tracking-widest mb-6">
                Healthcare Redefined
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#2D342E] tracking-tight leading-[1.1] mb-6">
                Experience world-class <br className="hidden lg:block"/><span className="text-[#5E7A53] italic font-serif font-light">compassionate</span> care.
              </h1>
              <p className="text-lg text-[#6B7863] mb-8 leading-relaxed max-w-lg">
                NovaCare provides advanced medical treatment with an organic, patient-first approach. Connecting you to the best specialists in the country.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setPage('appointment')}
                  className="bg-[#5E7A53] hover:bg-[#4D6643] text-white px-8 py-4 rounded-full text-sm font-semibold transition-all shadow-sm flex items-center justify-center"
                >
                  Book an Appointment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => setPage('doctors')}
                  className="bg-transparent hover:bg-[#E8F0E4] text-[#5E7A53] border border-[#5E7A53] px-8 py-4 rounded-full text-sm font-semibold transition-all flex items-center justify-center"
                >
                  Find a Doctor
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-[#E8F0E4] rounded-[3rem] transform rotate-3 scale-105"></div>
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                alt="Modern hospital exterior"
                className="relative rounded-[3rem] shadow-2xl object-cover h-[500px] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#F2F5F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#2D342E] mb-4">Why Choose NovaCare?</h2>
            <p className="text-[#6B7863] text-lg">We combine medical excellence with a patient-centered approach to deliver the best possible outcomes.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-2xl border border-transparent hover:border-[#A8C3A0] transition-all">
              <div className="w-14 h-14 bg-[#E8F0E4] rounded-xl flex items-center justify-center mb-6">
                <Stethoscope className="h-7 w-7 text-[#5E7A53]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D342E] mb-3">Expert Specialists</h3>
              <p className="text-[#6B7863] leading-relaxed">
                Our team comprises globally trained doctors and surgeons who are leaders in their respective fields.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-transparent hover:border-[#A8C3A0] transition-all">
              <div className="w-14 h-14 bg-[#E8F0E4] rounded-xl flex items-center justify-center mb-6">
                <Activity className="h-7 w-7 text-[#5E7A53]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D342E] mb-3">Advanced Technology</h3>
              <p className="text-[#6B7863] leading-relaxed">
                Equipped with the latest diagnostic and therapeutic technology for precise and effective treatments.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-transparent hover:border-[#A8C3A0] transition-all">
              <div className="w-14 h-14 bg-[#E8F0E4] rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="h-7 w-7 text-[#5E7A53]" />
              </div>
              <h3 className="text-xl font-bold text-[#2D342E] mb-3">Quality Care</h3>
              <p className="text-[#6B7863] leading-relaxed">
                We maintain the highest standards of safety and hygiene, ensuring a comfortable healing environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#5E7A53] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to take control of your health?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Schedule an appointment with our experts today. We are here to support you on your wellness journey.
          </p>
          <button
            onClick={() => setPage('appointment')}
            className="bg-white text-[#5E7A53] hover:bg-[#F9FAF7] px-8 py-3 rounded-full text-sm font-bold transition-colors shadow-sm uppercase tracking-widest"
          >
            Book Now
          </button>
        </div>
      </section>
    </div>
  );
}

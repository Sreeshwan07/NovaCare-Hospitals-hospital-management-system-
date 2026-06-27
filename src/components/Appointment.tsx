import React, { useState } from 'react';
import { Calendar, User, Phone, Mail, Clock, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { departments, doctors } from '../data';
import { useAuth } from '../lib/AuthContext';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export function Appointment() {
  const { user, signInWithGoogle } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [reason, setReason] = useState('');

  const availableDoctors = selectedDept 
    ? doctors.filter(d => d.departmentId === selectedDept)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'appointments'), {
        userId: user.uid,
        firstName,
        lastName,
        phone,
        preferredDate,
        departmentId: selectedDept,
        doctorId: selectedDoctor || null,
        reason: reason || null,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      
      // Reset form
      setFirstName('');
      setLastName('');
      setPhone('');
      setPreferredDate('');
      setSelectedDept('');
      setSelectedDoctor('');
      setReason('');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'appointments');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 bg-[#F9FAF7]">
        <div className="text-center bg-white p-10 rounded-[32px] shadow-sm border border-[#E6EDE1] max-w-md w-full">
          <Calendar className="h-12 w-12 text-[#5E7A53] mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-[#2D342E] mb-4">Sign in to Book</h2>
          <p className="text-[#6B7863] mb-8">
            Please sign in to your account to book and manage your appointments.
          </p>
          <button
            onClick={signInWithGoogle}
            className="w-full bg-[#5E7A53] text-white font-semibold py-3 rounded-xl hover:bg-[#4D6643] transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9FAF7] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white rounded-[32px] p-10 text-center shadow-sm border border-[#E6EDE1]">
          <div className="w-20 h-20 bg-[#E8F0E4] text-[#5E7A53] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-bold text-[#2D342E] mb-4">Request Received</h2>
          <p className="text-[#6B7863] text-lg mb-8">
            Thank you for choosing NovaCare. Our administrative team will contact you shortly to confirm your appointment time.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full bg-[#5E7A53] text-white font-semibold py-3 rounded-xl hover:bg-[#4D6643] transition-colors"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAF7] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2D342E] tracking-tight mb-4">Book an Appointment</h1>
          <p className="text-xl text-[#6B7863]">
            Fill out the form below and we'll get back to you to confirm your visit.
          </p>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-[#E6EDE1]">
          <div className="grid md:grid-cols-5">
            {/* Sidebar Info */}
            <div className="md:col-span-2 bg-[#F2F5F0] text-[#2D342E] p-10 border-r border-[#E6EDE1]">
              <h3 className="text-2xl font-bold mb-6">Patient Info</h3>
              <p className="text-[#6B7863] mb-10 leading-relaxed text-sm">
                For emergency cases, please do not use this form. Call our emergency ward directly or dial 911.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center text-sm">
                  <Phone className="h-5 w-5 text-[#5E7A53] mr-4" />
                  <span>+1 (800) 555-NOVA</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-5 w-5 text-[#5E7A53] mr-4" />
                  <span>appointments@novacare.com</span>
                </div>
                <div className="flex items-start text-sm">
                  <Clock className="h-5 w-5 text-[#5E7A53] mr-4 shrink-0" />
                  <span>Mon-Sat: 8am - 8pm<br/>Sunday: Closed</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3 p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">First Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#A4B19E]" />
                      </div>
                      <input 
                        type="text" 
                        required 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors" 
                        placeholder="John" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Last Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#A4B19E]" />
                      </div>
                      <input 
                        type="text" 
                        required 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-10 w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors" 
                        placeholder="Doe" 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-[#A4B19E]" />
                      </div>
                      <input 
                        type="tel" 
                        required 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors" 
                        placeholder="(555) 000-0000" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Preferred Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-[#A4B19E]" />
                      </div>
                      <input 
                        type="date" 
                        required 
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="pl-10 w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors text-[#2D342E]" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Department</label>
                  <select 
                    required 
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors text-[#2D342E] appearance-none"
                  >
                    <option value="" disabled>Select a department</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                {selectedDept && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Doctor (Optional)</label>
                    <select 
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors text-[#2D342E] appearance-none"
                    >
                      <option value="">Any Available Doctor</option>
                      {availableDoctors.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Reason for Visit</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-[#A4B19E]" />
                    </div>
                    <textarea 
                      rows={3} 
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="pl-10 w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors resize-none text-[#2D342E]" 
                      placeholder="Briefly describe your symptoms or reason for appointment..."
                    ></textarea>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5E7A53] hover:bg-[#4D6643] disabled:opacity-70 disabled:cursor-not-allowed text-white text-sm font-bold py-4 rounded-xl transition-colors mt-4 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Request Appointment'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

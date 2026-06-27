import React, { useEffect, useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Calendar, Clock, MapPin, Loader2, MessageSquare } from 'lucide-react';
import { departments, doctors } from '../data';

interface AppointmentData {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  preferredDate: string;
  departmentId: string;
  doctorId?: string;
  reason?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
}

export function AppointmentsList() {
  const { user, loading } = useAuth();
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AppointmentData[];
        
        // Sort in memory since we need an index for orderBy
        data.sort((a, b) => {
          const dateA = new Date(a.preferredDate).getTime();
          const dateB = new Date(b.preferredDate).getTime();
          return dateB - dateA;
        });
        
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#5E7A53] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#2D342E] mb-4">Please Sign In</h2>
          <p className="text-[#6B7863]">You need to be signed in to view your appointments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAF7] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#2D342E] tracking-tight mb-4">My Appointments</h1>
          <p className="text-xl text-[#6B7863]">
            View and manage your past and upcoming visits.
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center shadow-sm border border-[#E6EDE1]">
            <Calendar className="h-12 w-12 text-[#A4B19E] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#2D342E] mb-2">No appointments yet</h3>
            <p className="text-[#6B7863]">You haven't booked any appointments with us.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {appointments.map((apt) => {
              const dept = departments.find(d => d.id === apt.departmentId);
              const doc = doctors.find(d => d.id === apt.doctorId);
              
              return (
                <div key={apt.id} className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-[#E6EDE1] p-8 flex flex-col md:flex-row gap-6 md:items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider
                        ${apt.status === 'confirmed' ? 'bg-[#E8F0E4] text-[#5E7A53]' : 
                          apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'}`}
                      >
                        {apt.status}
                      </span>
                      <span className="text-sm text-[#A4B19E] font-medium">Requested Date:</span>
                      <span className="text-sm font-semibold text-[#2D342E]">{new Date(apt.preferredDate).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#2D342E] mb-2">
                      {dept?.name || 'General'} Appointment
                    </h3>
                    
                    {doc && (
                      <p className="text-[#6B7863] flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-1.5 bg-[#5E7A53] rounded-full inline-block"></span>
                        With {doc.name}
                      </p>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#F2F5F0]">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-[#A4B19E] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E] mb-1">Patient Name</p>
                          <p className="text-sm font-medium text-[#2D342E]">{apt.firstName} {apt.lastName}</p>
                        </div>
                      </div>
                      
                      {apt.reason && (
                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-5 w-5 text-[#A4B19E] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E] mb-1">Reason</p>
                            <p className="text-sm font-medium text-[#2D342E]">{apt.reason}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

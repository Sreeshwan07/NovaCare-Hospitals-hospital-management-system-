import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { useAuth } from '../lib/AuthContext';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, getDocs, updateDoc, doc, addDoc, serverTimestamp, orderBy, deleteDoc } from 'firebase/firestore';
import { Lock, LogOut, CheckCircle, XCircle, Clock, Plus, Trash2, Calendar, User, Phone, MapPin, Loader2, MessageSquare } from 'lucide-react';
import { departments, doctors } from '../data';

interface AdminProps {
  setPage: (page: Page) => void;
}

interface AppointmentData {
  id: string;
  userId: string;
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

export function Admin({ setPage }: AdminProps) {
  const { user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === 'mdr.gemini@gmail.com';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Add Booking State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    preferredDate: '',
    departmentId: '',
    doctorId: '',
    reason: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      fetchAppointments();
    } else {
      setIsLoading(false);
    }
  }, [isAdmin]);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, 'appointments'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AppointmentData[];
      
      data.sort((a, b) => new Date(b.preferredDate).getTime() - new Date(a.preferredDate).getTime());
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for auth context to update
    } catch (error: any) {
      setLoginError(error.message || 'Failed to sign in. Please check credentials or enable Email/Password auth in Firebase.');
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  const handleStatusChange = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status: newStatus });
      setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Check permissions.");
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteDoc(doc(db, 'appointments', id));
      setAppointments(prev => prev.filter(apt => apt.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete. Check permissions.");
    }
  };
  
  const handleAddBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsAdding(true);
    try {
      const docRef = await addDoc(collection(db, 'appointments'), {
        userId: user.uid, // Assiging to admin's uid for manual bookings
        ...newBooking,
        status: 'confirmed', // Admin books it directly as confirmed
        createdAt: serverTimestamp()
      });
      
      setShowAddModal(false);
      setNewBooking({ firstName: '', lastName: '', phone: '', preferredDate: '', departmentId: '', doctorId: '', reason: '' });
      fetchAppointments();
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("Failed to add booking. Check permissions.");
    } finally {
      setIsAdding(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F9FAF7] px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-sm border border-[#E6EDE1]">
          <div className="w-16 h-16 bg-[#F2F5F0] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="h-8 w-8 text-[#5E7A53]" />
          </div>
          <h2 className="text-3xl font-bold text-center text-[#2D342E] mb-2">Admin Portal</h2>
          <p className="text-center text-[#6B7863] mb-8">Sign in with administrator credentials.</p>
          
          {loginError && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm mb-6 border border-red-100">
              {loginError}
              <p className="mt-2 text-xs opacity-80">Make sure Email/Password authentication is enabled in your Firebase Console.</p>
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Admin Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-3 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] transition-colors" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-[#5E7A53] hover:bg-[#4D6643] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-70 flex items-center justify-center mt-4"
            >
              {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#2D342E]">Admin Dashboard</h1>
            <p className="text-[#6B7863] mt-1">Manage all hospital appointments</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center bg-[#5E7A53] hover:bg-[#4D6643] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              New Booking
            </button>
            <button
              onClick={() => signOut(auth)}
              className="flex items-center bg-white border border-[#E6EDE1] text-[#7A8A73] hover:text-[#5E7A53] hover:border-[#5E7A53] px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4 mr-1.5" />
              Sign Out
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-[#5E7A53] animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-[32px] shadow-sm border border-[#E6EDE1] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F2F5F0] text-[10px] uppercase tracking-wider font-bold text-[#A4B19E] border-b border-[#E6EDE1]">
                    <th className="p-4 pl-6">Patient</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Date & Dept</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6EDE1]">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-[#6B7863]">
                        No appointments found.
                      </td>
                    </tr>
                  ) : (
                    appointments.map(apt => (
                      <tr key={apt.id} className="hover:bg-[#F9FAF7] transition-colors">
                        <td className="p-4 pl-6">
                          <div className="font-semibold text-[#2D342E]">{apt.firstName} {apt.lastName}</div>
                          {apt.reason && <div className="text-xs text-[#7A8A73] truncate max-w-[200px] mt-1" title={apt.reason}>{apt.reason}</div>}
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-[#6B7863]">{apt.phone}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-[#2D342E]">{new Date(apt.preferredDate).toLocaleDateString()}</div>
                          <div className="text-xs text-[#7A8A73] mt-0.5">{departments.find(d => d.id === apt.departmentId)?.name || 'Unknown'}</div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                            ${apt.status === 'confirmed' ? 'bg-[#E8F0E4] text-[#5E7A53]' : 
                              apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                              'bg-red-100 text-red-700'}`}
                          >
                            {apt.status === 'confirmed' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {apt.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                            {apt.status === 'cancelled' && <XCircle className="w-3 h-3 mr-1" />}
                            {apt.status}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-right space-x-2">
                          {apt.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'confirmed')}
                              className="text-xs font-semibold bg-[#E8F0E4] text-[#5E7A53] hover:bg-[#D4E3CE] px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {(apt.status === 'pending' || apt.status === 'confirmed') && (
                            <button
                              onClick={() => handleStatusChange(apt.id, 'cancelled')}
                              className="text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="text-[#A4B19E] hover:text-red-500 p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-[#2D342E]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] shadow-xl border border-[#E6EDE1] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-[#2D342E]">Add New Booking</h3>
                <button onClick={() => setShowAddModal(false)} className="text-[#A4B19E] hover:text-[#5E7A53]">
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleAddBooking} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">First Name</label>
                    <input 
                      type="text" required 
                      value={newBooking.firstName} onChange={e => setNewBooking({...newBooking, firstName: e.target.value})}
                      className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Last Name</label>
                    <input 
                      type="text" required 
                      value={newBooking.lastName} onChange={e => setNewBooking({...newBooking, lastName: e.target.value})}
                      className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Phone</label>
                    <input 
                      type="tel" required 
                      value={newBooking.phone} onChange={e => setNewBooking({...newBooking, phone: e.target.value})}
                      className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Date</label>
                    <input 
                      type="date" required 
                      value={newBooking.preferredDate} onChange={e => setNewBooking({...newBooking, preferredDate: e.target.value})}
                      className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] text-sm" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Department</label>
                    <select 
                      required 
                      value={newBooking.departmentId} onChange={e => setNewBooking({...newBooking, departmentId: e.target.value, doctorId: ''})}
                      className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] text-sm"
                    >
                      <option value="">Select Dept</option>
                      {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Doctor (Optional)</label>
                    <select 
                      value={newBooking.doctorId} onChange={e => setNewBooking({...newBooking, doctorId: e.target.value})}
                      className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] text-sm"
                    >
                      <option value="">Any Doctor</option>
                      {newBooking.departmentId && doctors.filter(d => d.departmentId === newBooking.departmentId).map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-[#A4B19E]">Reason</label>
                  <textarea 
                    rows={2}
                    value={newBooking.reason} onChange={e => setNewBooking({...newBooking, reason: e.target.value})}
                    className="w-full bg-[#F9FAF7] border border-[#E6EDE1] rounded-xl py-2.5 px-4 focus:outline-none focus:border-[#5E7A53] focus:ring-1 focus:ring-[#5E7A53] text-sm resize-none" 
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 rounded-full text-sm font-medium text-[#7A8A73] hover:bg-[#F2F5F0]">
                    Cancel
                  </button>
                  <button type="submit" disabled={isAdding} className="bg-[#5E7A53] hover:bg-[#4D6643] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-70 flex items-center">
                    {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

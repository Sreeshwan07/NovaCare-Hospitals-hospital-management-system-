export type Page = 'home' | 'about' | 'departments' | 'doctors' | 'appointment' | 'appointments_list' | 'admin';


export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  departmentId: string;
  specialty: string;
  imageUrl: string;
  bio: string;
  education: string;
}

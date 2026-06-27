import { Department, Doctor } from './types';

export const departments: Department[] = [
  {
    id: 'dept-cardiology',
    name: 'Cardiology',
    description: 'Comprehensive heart care, diagnostics, and advanced cardiovascular treatments by leading specialists.',
    icon: 'Activity'
  },
  {
    id: 'dept-neurology',
    name: 'Neurology',
    description: 'Expert care for brain, spinal cord, and nervous system conditions with state-of-the-art technology.',
    icon: 'Brain'
  },
  {
    id: 'dept-pediatrics',
    name: 'Pediatrics',
    description: 'Compassionate, specialized healthcare for infants, children, and adolescents in a family-friendly environment.',
    icon: 'Baby'
  },
  {
    id: 'dept-orthopedics',
    name: 'Orthopedics',
    description: 'Advanced treatments for bone, joint, and muscle disorders, including sports medicine and joint replacement.',
    icon: 'Bone'
  },
  {
    id: 'dept-oncology',
    name: 'Oncology',
    description: 'Comprehensive cancer care including diagnosis, medical oncology, radiation, and surgical interventions.',
    icon: 'Microscope'
  },
  {
    id: 'dept-emergency',
    name: 'Emergency Medicine',
    description: '24/7 critical care and trauma services equipped to handle life-threatening medical emergencies.',
    icon: 'Ambulance'
  }
];

export const doctors: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Jenkins',
    departmentId: 'dept-cardiology',
    specialty: 'Interventional Cardiologist',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Dr. Jenkins specializes in minimally invasive heart procedures and has over 15 years of experience in cardiovascular health.',
    education: 'MD, Harvard Medical School'
  },
  {
    id: 'doc-2',
    name: 'Dr. Michael Chen',
    departmentId: 'dept-cardiology',
    specialty: 'Electrophysiologist',
    imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'An expert in heart rhythm disorders, Dr. Chen is dedicated to providing cutting-edge treatments for arrhythmias.',
    education: 'MD, Johns Hopkins University'
  },
  {
    id: 'doc-3',
    name: 'Dr. Emily Rostova',
    departmentId: 'dept-neurology',
    specialty: 'Neurologist',
    imageUrl: 'https://images.unsplash.com/photo-1594824432258-29007f3521b4?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Dr. Rostova focuses on neurodegenerative diseases and offers holistic patient-centered care for complex conditions.',
    education: 'MD, Stanford University'
  },
  {
    id: 'doc-4',
    name: 'Dr. James Wilson',
    departmentId: 'dept-neurology',
    specialty: 'Neurosurgery',
    imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Specializing in spinal and cranial surgeries, Dr. Wilson utilizes the latest robotic-assisted surgical techniques.',
    education: 'MD, Yale School of Medicine'
  },
  {
    id: 'doc-5',
    name: 'Dr. Alicia Martinez',
    departmentId: 'dept-pediatrics',
    specialty: 'General Pediatrics',
    imageUrl: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Dr. Martinez is passionate about early childhood development and preventive care for the next generation.',
    education: 'MD, UCSF'
  },
  {
    id: 'doc-6',
    name: 'Dr. Robert Kim',
    departmentId: 'dept-orthopedics',
    specialty: 'Sports Medicine',
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-7028a4ce20f6?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'A former college athlete, Dr. Kim understands sports injuries deeply and focuses on rapid, sustainable recovery.',
    education: 'MD, University of Michigan'
  },
  {
    id: 'doc-7',
    name: 'Dr. Lisa Patel',
    departmentId: 'dept-oncology',
    specialty: 'Medical Oncologist',
    imageUrl: 'https://images.unsplash.com/photo-1527613426496-f139ce3484f7?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Dr. Patel leads clinical trials in targeted therapies and provides compassionate, comprehensive cancer care.',
    education: 'MD, Duke University'
  },
  {
    id: 'doc-8',
    name: 'Dr. David Osei',
    departmentId: 'dept-emergency',
    specialty: 'Trauma Specialist',
    imageUrl: 'https://images.unsplash.com/photo-1612276529731-4b21494e6d71?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'With over a decade in high-volume ERs, Dr. Osei is an expert in critical trauma response and emergency stabilization.',
    education: 'MD, University of Pennsylvania'
  }
];

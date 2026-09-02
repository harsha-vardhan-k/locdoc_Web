export interface Clinic {
  id: string;
  name: string;
  type: 'Hospital' | 'Clinic' | 'Polyclinic' | 'Diagnostic Centre';
  area: string;
  city: string;
  doctors: number;
  specialties: string[];
  rating: number;
  reviews: number;
  modules: string[];
  established: number;
  beds?: number;
}

export const CLINICS: Clinic[] = [
  {
    id: 'clinic-001',
    name: 'Apollo Clinic, Banjara Hills',
    type: 'Clinic',
    area: 'Banjara Hills',
    city: 'Hyderabad',
    doctors: 12,
    specialties: ['Cardiology', 'Dermatology', 'Gynaecology', 'Neurology'],
    rating: 4.7,
    reviews: 892,
    modules: ['Appointments', 'In-house Pharmacy', 'In-house Labs'],
    established: 2009,
  },
  {
    id: 'clinic-002',
    name: 'Manipal Hospital, Whitefield',
    type: 'Hospital',
    area: 'Whitefield',
    city: 'Bengaluru',
    doctors: 87,
    specialties: ['Orthopaedics', 'Cardiology', 'Oncology', 'Neurology', 'Paediatrics'],
    rating: 4.6,
    reviews: 2341,
    modules: ['Appointments', 'In-Patient', 'In-house Pharmacy', 'In-house Labs', 'Cabin Rental'],
    established: 1999,
    beds: 650,
  },
  {
    id: 'clinic-003',
    name: 'Rainbow Children\'s Hospital',
    type: 'Hospital',
    area: 'Secunderabad',
    city: 'Hyderabad',
    doctors: 45,
    specialties: ['Paediatrics', 'Neonatology', 'Paediatric Surgery'],
    rating: 4.9,
    reviews: 1567,
    modules: ['Appointments', 'In-Patient', 'In-house Pharmacy'],
    established: 2004,
    beds: 210,
  },
  {
    id: 'clinic-004',
    name: 'Fortis Hospital, Andheri',
    type: 'Hospital',
    area: 'Andheri',
    city: 'Mumbai',
    doctors: 124,
    specialties: ['Cardiology', 'Oncology', 'Gastroenterology', 'Orthopaedics', 'Neurology'],
    rating: 4.5,
    reviews: 3104,
    modules: ['Appointments', 'In-Patient', 'In-house Pharmacy', 'In-house Labs', 'Cabin Rental'],
    established: 1996,
    beds: 800,
  },
];
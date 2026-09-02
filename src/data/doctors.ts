export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: number;
  facility: string;
  facilityType: 'Hospital' | 'Clinic' | 'Polyclinic';
  area: string;
  city: string;
  rating: number;
  reviews: number;
  fee: number;
  punctuality: number;
  verifiedVia: string;
  availableToday: boolean;
  nextSlot: string;
  waitTime: number;
  liveStatus: 'available' | 'busy' | 'delayed' | 'offline';
  languages: string[];
  gender: 'Male' | 'Female';
  image?: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: 'doc-001',
    name: 'Dr. Priya Venkataraman',
    specialty: 'Cardiologist',
    qualifications: 'MBBS, MD (Cardiology), DM',
    experience: 14,
    facility: 'Apollo Clinic, Banjara Hills',
    facilityType: 'Clinic',
    area: 'Banjara Hills',
    city: 'Hyderabad',
    rating: 4.9,
    reviews: 312,
    fee: 800,
    punctuality: 94,
    verifiedVia: 'NMC + TSMC',
    availableToday: true,
    nextSlot: '11:30 AM',
    waitTime: 12,
    liveStatus: 'available',
    languages: ['Telugu', 'English', 'Hindi'],
    gender: 'Female',
  },
  {
    id: 'doc-002',
    name: 'Dr. Arjun Mehta',
    specialty: 'Dermatologist',
    qualifications: 'MBBS, DVD, MD (Dermatology)',
    experience: 9,
    facility: 'Skin & You Clinic, Koramangala',
    facilityType: 'Clinic',
    area: 'Koramangala',
    city: 'Bengaluru',
    rating: 4.7,
    reviews: 189,
    fee: 650,
    punctuality: 88,
    verifiedVia: 'NMC + ABDM NMR',
    availableToday: true,
    nextSlot: '2:00 PM',
    waitTime: 25,
    liveStatus: 'busy',
    languages: ['Hindi', 'English', 'Kannada'],
    gender: 'Male',
  },
  {
    id: 'doc-003',
    name: 'Dr. Sunita Rao',
    specialty: 'Gynaecologist',
    qualifications: 'MBBS, MS (OBG), DNB',
    experience: 18,
    facility: 'Rainbow Hospitals, Secunderabad',
    facilityType: 'Hospital',
    area: 'Secunderabad',
    city: 'Hyderabad',
    rating: 4.8,
    reviews: 427,
    fee: 900,
    punctuality: 91,
    verifiedVia: 'NMC + TSMC',
    availableToday: true,
    nextSlot: '10:00 AM',
    waitTime: 8,
    liveStatus: 'available',
    languages: ['Telugu', 'English'],
    gender: 'Female',
  },
  {
    id: 'doc-004',
    name: 'Dr. Rahul Krishnamurthy',
    specialty: 'Orthopaedic',
    qualifications: 'MBBS, MS (Ortho), FRCS',
    experience: 22,
    facility: 'Manipal Hospital, Whitefield',
    facilityType: 'Hospital',
    area: 'Whitefield',
    city: 'Bengaluru',
    rating: 4.6,
    reviews: 256,
    fee: 1200,
    punctuality: 79,
    verifiedVia: 'NMC + KSMC',
    availableToday: false,
    nextSlot: 'Tomorrow 9:00 AM',
    waitTime: 0,
    liveStatus: 'offline',
    languages: ['Kannada', 'English', 'Hindi'],
    gender: 'Male',
  },
  {
    id: 'doc-005',
    name: 'Dr. Meera Iyer',
    specialty: 'Paediatrician',
    qualifications: 'MBBS, MD (Paediatrics), Fellowship',
    experience: 11,
    facility: 'Little Stars Clinic, Juhu',
    facilityType: 'Clinic',
    area: 'Juhu',
    city: 'Mumbai',
    rating: 4.9,
    reviews: 533,
    fee: 700,
    punctuality: 96,
    verifiedVia: 'NMC + ABDM NMR',
    availableToday: true,
    nextSlot: '3:30 PM',
    waitTime: 5,
    liveStatus: 'available',
    languages: ['Tamil', 'English', 'Hindi', 'Marathi'],
    gender: 'Female',
  },
  {
    id: 'doc-006',
    name: 'Dr. Kiran Reddy',
    specialty: 'Neurologist',
    qualifications: 'MBBS, MD, DM (Neurology)',
    experience: 16,
    facility: 'KIMS Hospital, Kondapur',
    facilityType: 'Hospital',
    area: 'Kondapur',
    city: 'Hyderabad',
    rating: 4.7,
    reviews: 198,
    fee: 1000,
    punctuality: 83,
    verifiedVia: 'NMC + TSMC',
    availableToday: true,
    nextSlot: '4:00 PM',
    waitTime: 40,
    liveStatus: 'delayed',
    languages: ['Telugu', 'English'],
    gender: 'Male',
  },
  {
    id: 'doc-007',
    name: 'Dr. Anjali Sharma',
    specialty: 'Psychiatrist',
    qualifications: 'MBBS, MD (Psychiatry)',
    experience: 8,
    facility: 'Mind & Wellness Centre, Bandra',
    facilityType: 'Clinic',
    area: 'Bandra',
    city: 'Mumbai',
    rating: 4.8,
    reviews: 143,
    fee: 1500,
    punctuality: 97,
    verifiedVia: 'NMC + ABDM NMR',
    availableToday: true,
    nextSlot: '12:30 PM',
    waitTime: 0,
    liveStatus: 'available',
    languages: ['Hindi', 'English'],
    gender: 'Female',
  },
  {
    id: 'doc-008',
    name: 'Dr. Venkat Subramanian',
    specialty: 'Gastroenterologist',
    qualifications: 'MBBS, MD, DM (Gastro)',
    experience: 20,
    facility: 'Continental Hospital, Gachibowli',
    facilityType: 'Hospital',
    area: 'Gachibowli',
    city: 'Hyderabad',
    rating: 4.5,
    reviews: 301,
    fee: 1100,
    punctuality: 85,
    verifiedVia: 'NMC + TSMC',
    availableToday: true,
    nextSlot: '5:00 PM',
    waitTime: 55,
    liveStatus: 'delayed',
    languages: ['Telugu', 'Tamil', 'English'],
    gender: 'Male',
  },
  {
    id: 'doc-009',
    name: 'Dr. Pooja Nair',
    specialty: 'Ophthalmologist',
    qualifications: 'MBBS, MS (Ophthalmology), FICO',
    experience: 7,
    facility: 'Clear Vision Eye Care, Indiranagar',
    facilityType: 'Clinic',
    area: 'Indiranagar',
    city: 'Bengaluru',
    rating: 4.8,
    reviews: 221,
    fee: 600,
    punctuality: 92,
    verifiedVia: 'NMC + KSMC',
    availableToday: true,
    nextSlot: '11:00 AM',
    waitTime: 15,
    liveStatus: 'available',
    languages: ['Malayalam', 'Kannada', 'English'],
    gender: 'Female',
  },
  {
    id: 'doc-010',
    name: 'Dr. Suresh Patil',
    specialty: 'ENT Specialist',
    qualifications: 'MBBS, MS (ENT), DNB',
    experience: 13,
    facility: 'Patil ENT & Allergy Clinic, Andheri',
    facilityType: 'Clinic',
    area: 'Andheri',
    city: 'Mumbai',
    rating: 4.6,
    reviews: 167,
    fee: 550,
    punctuality: 89,
    verifiedVia: 'NMC + ABDM NMR',
    availableToday: false,
    nextSlot: 'Tomorrow 10:30 AM',
    waitTime: 0,
    liveStatus: 'offline',
    languages: ['Marathi', 'Hindi', 'English'],
    gender: 'Male',
  },
];

export const SPECIALTIES = [
  { slug: 'general-physician', name: 'General Physician', icon: '🩺', description: 'Fevers, infections & everyday care', count: 482 },
  { slug: 'gynaecologist', name: 'Gynecologist & Obstetrician', icon: '💜', description: "Women\'s health & pregnancy care", count: 213 },
  { slug: 'dermatologist', name: 'Dermatologist', icon: '✨', description: 'Skin, hair & nail specialists', count: 176 },
  { slug: 'paediatrician', name: 'Pediatrician', icon: '👶', description: 'Child health & vaccination', count: 204 },
  { slug: 'dentist', name: 'Dentist', icon: '🦷', description: 'Oral & dental care', count: 251 },
  { slug: 'orthopedist', name: 'Orthopedist', icon: '🦴', description: 'Bones, joints & sports injury', count: 168 },
  { slug: 'ent-specialist', name: 'ENT Specialist', icon: '👂', description: 'Ear, nose & throat care', count: 132 },
  { slug: 'cardiologist', name: 'Cardiologist', icon: '❤️', description: 'Heart & vascular health', count: 118 },
  { slug: 'neurologist', name: 'Neurologist', icon: '🧠', description: 'Brain, spine & nerve care', count: 94 },
  { slug: 'psychiatrist', name: 'Psychiatrist', icon: '💬', description: 'Mental health & counselling', count: 87 },
  { slug: 'ophthalmologist', name: 'Ophthalmologist', icon: '👁️', description: 'Eye care & vision correction', count: 121 },
  { slug: 'urologist', name: 'Urologist', icon: '🔬', description: 'Urinary & kidney health', count: 76 },
];

export function getDoctorById(id: string): Doctor | undefined {
  return DOCTORS.find((d) => d.id === id);
}

export function filterDoctors(
  doctors: Doctor[],
  query: string,
  specialty: string,
  city: string
): Doctor[] {
  return doctors.filter((d) => {
    const matchQ =
      !query ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.facility.toLowerCase().includes(query.toLowerCase());
    const matchS = !specialty || d.specialty.toLowerCase() === specialty.toLowerCase();
    const matchC = !city || d.city.toLowerCase() === city.toLowerCase();
    return matchQ && matchS && matchC;
  });
}
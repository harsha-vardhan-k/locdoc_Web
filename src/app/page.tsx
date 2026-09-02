import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroSection from './components/HeroSection';
import SpecialtiesGrid from './components/SpecialtiesGrid';
import TopClinicsSection from './components/TopClinicsSection';
import RegisterBusinessCTA from './components/RegisterBusinessCTA';

export default function HomePage() {
  return (
    <AppLayout>
      {/* Dark navy — glassmorphism hero */}
      <HeroSection />
      {/* White — specialties bento grid */}
      <SpecialtiesGrid />
      {/* Dark navy — partner facilities / top clinics */}
      <TopClinicsSection />
      {/* White — register CTA */}
      <RegisterBusinessCTA />
    </AppLayout>
  );
}
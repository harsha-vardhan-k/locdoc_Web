import React from 'react';
import AppLayout from '@/components/AppLayout';
import DoctorsListingContent from './components/DoctorsListingContent';

export default function DoctorsListingPage() {
  return (
    <AppLayout>
      <DoctorsListingContent />
    </AppLayout>
  );
}
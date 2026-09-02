import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
}

export default function AppLayout({ children, cartCount = 0 }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar cartCount={cartCount} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
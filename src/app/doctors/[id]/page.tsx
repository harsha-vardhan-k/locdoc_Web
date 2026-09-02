'use client';

import React from 'react';
import AppLayout from '@/components/AppLayout';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Star, Clock, IndianRupee, MapPin, Calendar, Shield, Award,
  Languages, ThumbsUp, ChevronRight, ArrowLeft, CheckCircle2,
  Stethoscope, GraduationCap, Building2, Phone
} from 'lucide-react';
import { DOCTORS } from '@/data/doctors';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import LiveStatusBadge from '@/components/ui/LiveStatusBadge';
import PunctualityBar from '@/components/ui/PunctualityBar';

const MOCK_REVIEWS = [
  { id: 1, name: 'Ramesh K.', rating: 5, date: '2 days ago', text: 'Very thorough and patient. Explained everything clearly. Highly recommend!', helpful: 12 },
  { id: 2, name: 'Preethi S.', rating: 5, date: '1 week ago', text: 'Excellent doctor. No waiting time, very professional. Will visit again.', helpful: 8 },
  { id: 3, name: 'Anil M.', rating: 4, date: '2 weeks ago', text: 'Good experience overall. The clinic is well-maintained and staff is helpful.', helpful: 5 },
];

const TIME_SLOTS = [
  { time: '9:00 AM', available: true },
  { time: '9:30 AM', available: false },
  { time: '10:00 AM', available: true },
  { time: '10:30 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '11:30 AM', available: true },
  { time: '2:00 PM', available: true },
  { time: '2:30 PM', available: true },
  { time: '3:00 PM', available: false },
  { time: '3:30 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '4:30 PM', available: true },
];

export default function DoctorProfilePage() {
  const params = useParams();
  const doctorId = params?.id as string;
  const doctor = DOCTORS.find((d) => d.id === doctorId) ?? DOCTORS[0];

  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Back nav */}
        <div className="bg-card border-b border-border">
          <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-3">
            <Link href="/doctors-listing-page" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
              <ArrowLeft size={15} />
              Back to Doctors
            </Link>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Profile */}
            <div className="lg:col-span-2 space-y-6">
              {/* Doctor header card */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-start gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-soft to-accent-soft flex items-center justify-center flex-shrink-0 text-3xl font-extrabold text-primary">
                    {doctor.name.split(' ')[1]?.[0] ?? doctor.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <h1 className="text-xl font-extrabold text-foreground">{doctor.name}</h1>
                        <p className="text-sm font-semibold text-accent mt-0.5">{doctor.specialty}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{doctor.qualifications}</p>
                      </div>
                      <LiveStatusBadge status={doctor.liveStatus} />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <div className="flex items-center gap-1 text-warning">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm font-bold text-foreground font-tabular">{doctor.rating}</span>
                        <span className="text-xs text-muted-foreground">({doctor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Stethoscope size={13} />
                        <span>{doctor.experience} years experience</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={13} />
                        <span>{doctor.area}, {doctor.city}</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <VerifiedBadge source={doctor.verifiedVia} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Consultation Fee', value: `₹${doctor.fee}`, icon: IndianRupee, color: 'text-primary' },
                  { label: 'Experience', value: `${doctor.experience} yrs`, icon: Award, color: 'text-accent' },
                  { label: 'Punctuality', value: `${doctor.punctuality}%`, icon: Clock, color: 'text-success' },
                  { label: 'Patient Reviews', value: `${doctor.reviews}+`, icon: ThumbsUp, color: 'text-warning' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card rounded-xl border border-border p-4 text-center">
                    <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
                    <p className="text-lg font-extrabold text-foreground font-tabular">{stat.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Punctuality */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  Punctuality Score
                </h2>
                <PunctualityBar score={doctor.punctuality} />
                <p className="text-xs text-muted-foreground mt-2">
                  Based on real-time check-in data from the last 30 days. {doctor.punctuality >= 90 ? 'Excellent track record!' : 'Generally on time.'}
                </p>
              </div>

              {/* About */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <h2 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap size={16} className="text-primary" />
                  About & Qualifications
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-soft flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={15} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Qualifications</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{doctor.qualifications}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center flex-shrink-0">
                      <Building2 size={15} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Practice</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{doctor.facility} · {doctor.facilityType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Languages size={15} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Languages</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{doctor.languages.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Shield size={15} className="text-success" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Verification</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Verified via {doctor.verifiedVia}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Star size={16} className="text-warning" />
                    Patient Reviews
                  </h2>
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-extrabold text-foreground font-tabular">{doctor.rating}</span>
                    <div>
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={11} className={s <= Math.round(doctor.rating) ? 'text-warning fill-warning' : 'text-border'} />
                        ))}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{doctor.reviews} reviews</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {MOCK_REVIEWS.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{review.name}</p>
                            <p className="text-[10px] text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map((s) => (
                            <Star key={s} size={10} className={s <= review.rating ? 'text-warning fill-warning' : 'text-border'} />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{review.text}</p>
                      <button className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground hover:text-foreground transition-colors">
                        <ThumbsUp size={10} />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Booking sidebar */}
            <div className="space-y-4">
              <div className="bg-card rounded-2xl border border-border p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    Book Appointment
                  </h2>
                  <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                    <IndianRupee size={12} />
                    <span className="font-tabular">{doctor.fee}</span>
                  </div>
                </div>

                {/* Facility info */}
                <div className="bg-muted rounded-xl p-3 mb-4">
                  <p className="text-xs font-semibold text-foreground">{doctor.facility}</p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                    <MapPin size={11} />
                    <span>{doctor.area}, {doctor.city}</span>
                  </div>
                  {doctor.availableToday && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-success">
                      <CheckCircle2 size={11} />
                      <span>Available today · Next: {doctor.nextSlot}</span>
                    </div>
                  )}
                </div>

                {/* Time slots */}
                <p className="text-xs font-semibold text-muted-foreground mb-2">Available Slots — Today</p>
                <div className="grid grid-cols-3 gap-1.5 mb-4">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                        !slot.available
                          ? 'bg-muted text-muted-foreground/40 cursor-not-allowed line-through'
                          : selectedSlot === slot.time
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-primary-soft hover:text-primary'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                <Link
                  href={`/checkout?type=appointment&doctor=${doctor.id}&slot=${selectedSlot ?? ''}`}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                    doctor.liveStatus === 'offline' ?'bg-muted text-muted-foreground cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary-2 active:scale-95'
                  }`}
                >
                  <Calendar size={15} />
                  {doctor.liveStatus === 'offline' ? 'Not Available Today' : 'Confirm Booking'}
                  {doctor.liveStatus !== 'offline' && <ChevronRight size={14} />}
                </Link>

                <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
                  <Phone size={10} />
                  <span>Or call: +91 98765 43210</span>
                </div>

                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  {[
                    { icon: Shield, text: 'NMC Verified Doctor' },
                    { icon: CheckCircle2, text: 'Free cancellation up to 2 hrs' },
                    { icon: Clock, text: 'Instant confirmation via SMS' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <item.icon size={11} className="text-success flex-shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

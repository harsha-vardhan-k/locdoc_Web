'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Clock, IndianRupee, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Doctor } from '@/data/doctors';
import VerifiedBadge from './VerifiedBadge';
import LiveStatusBadge from './LiveStatusBadge';
import PunctualityBar from './PunctualityBar';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="group bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-soft to-accent-soft flex items-center justify-center flex-shrink-0 text-lg font-bold text-primary">
          {doctor.name.split(' ')[1]?.[0] ?? doctor.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/doctors/${doctor.id}`}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
            >
              {doctor.name}
            </Link>
            <LiveStatusBadge status={doctor.liveStatus} />
          </div>
          <p className="text-xs text-accent font-medium mt-0.5">{doctor.specialty}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{doctor.qualifications}</p>
        </div>
      </div>

      {/* Facility */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPin size={11} className="flex-shrink-0" />
        <span className="line-clamp-1">{doctor.facility}</span>
      </div>

      {/* Verified badge */}
      <VerifiedBadge source={doctor.verifiedVia} />

      {/* Punctuality */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-medium text-muted-foreground">Punctuality</span>
        </div>
        <PunctualityBar score={doctor.punctuality} />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-border">
        <div className="text-center">
          <div className="flex items-center justify-center gap-0.5 text-warning">
            <Star size={11} fill="currentColor" />
            <span className="text-xs font-bold text-foreground font-tabular">{doctor.rating}</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">{doctor.reviews} reviews</p>
        </div>
        <div className="text-center border-x border-border">
          <div className="flex items-center justify-center gap-0.5">
            <IndianRupee size={11} className="text-muted-foreground" />
            <span className="text-xs font-bold text-foreground font-tabular">{doctor.fee}</span>
          </div>
          <p className="text-[10px] text-muted-foreground mt-0.5">Consult fee</p>
        </div>
        <div className="text-center">
          <p className="text-xs font-bold text-foreground font-tabular">{doctor.experience}y</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Experience</p>
        </div>
      </div>

      {/* Next slot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={12} />
          <span>
            {doctor.availableToday ? (
              <>
                Next: <span className="font-semibold text-foreground">{doctor.nextSlot}</span>
                {doctor.waitTime > 0 && (
                  <span className="text-muted-foreground"> · ~{doctor.waitTime}m wait</span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">{doctor.nextSlot}</span>
            )}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link
          href={`/doctors/${doctor.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-border bg-muted text-foreground text-xs font-semibold hover:bg-primary-soft hover:text-primary hover:border-primary/30 transition-all"
        >
          View Profile
          <ChevronRight size={12} />
        </Link>
        <Link
          href={doctor.liveStatus === 'offline' ? '#' : `/checkout?type=appointment&doctor=${doctor.id}`}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
            doctor.liveStatus === 'offline' ?'bg-muted text-muted-foreground cursor-not-allowed' :'bg-primary text-primary-foreground hover:bg-primary-2 active:scale-95'
          }`}
        >
          <Calendar size={12} />
          {doctor.liveStatus === 'offline' ? 'Unavailable' : 'Book'}
        </Link>
      </div>
    </div>
  );
}
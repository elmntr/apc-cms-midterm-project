"use client";

import { SiteSettings, getMediaUrl } from "@/lib/strapi";
import Link from "next/link";

interface Props {
  settings: SiteSettings | null;
}

const HeroSection = ({ settings }: Props) => {
  const heading = settings?.heroHeading || "From Then to Now";
  const estYear = settings?.heroEstYear || "EST. 2006";
  const description = settings?.heroDescription || "A curated collection of moments that shaped a lifetime. Each photograph tells a story, each chapter reveals growth.";
  const ctaText = settings?.heroCtaText || "BEGIN JOURNEY";
  const grade6Label = settings?.grade6Label || "2012";
  const collegeLabel = settings?.collegeLabel || "2024";
  const grade6Photo = settings?.grade6Photo ? getMediaUrl(settings.grade6Photo) : '';
  const collegePhoto = settings?.collegePhoto ? getMediaUrl(settings.collegePhoto) : '';

  // Parse heading to split into lines
  const headingParts = heading.split(' ');
  const renderHeading = () => {
    if (headingParts.length >= 3) {
      return (
        <>
          <span className="block">{headingParts[0]}</span>
          <span className="block">{headingParts[1]}</span>
          <span className="block italic text-tan">{headingParts.slice(2).join(' ')}</span>
        </>
      );
    }
    return <span>{heading}</span>;
  };

  return (
    <section id="home" className="min-h-screen bg-cream pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 min-h-[calc(100vh-5rem)] items-center">
          {/* Left Content */}
          <div className="py-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-tan"></div>
              <span className="text-sm tracking-[0.3em] text-tan font-medium">{estYear}</span>
            </div>
            
            <h1 className="text-6xl xl:text-7xl leading-[1.1] mb-8 text-brown" style={{ fontFamily: 'Playfair Display, serif' }}>
              {renderHeading()}
            </h1>
            
            <p className="text-brown/70 text-lg leading-relaxed max-w-md mb-10">
              {description}
            </p>
            
            <Link 
              href="#childhood"
              className="inline-flex items-center gap-3 text-sm tracking-[0.15em] text-brown font-medium group"
            >
              {ctaText}
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Right - Photos */}
          <div className="relative py-16">
            {/* Main Photo (College/Present) */}
            <div className="relative ml-auto w-[85%]">
              <div className="aspect-[4/5] overflow-hidden shadow-2xl border-4 border-tan/20">
                {collegePhoto ? (
                  <img 
                    src={collegePhoto} 
                    alt="Present" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cream-dark to-tan/30 flex items-center justify-center">
                    <svg className="w-20 h-20 text-tan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Present Year Badge */}
              <div className="absolute -bottom-4 -right-4 bg-white px-6 py-3 shadow-lg">
                <span className="text-xs tracking-[0.2em] text-tan block">PRESENT</span>
                <span className="text-2xl font-semibold text-brown">{collegeLabel}</span>
              </div>
            </div>

            {/* Overlay Photo (Childhood) */}
            <div className="absolute bottom-8 -left-4 w-[45%]">
              <div className="aspect-square overflow-hidden shadow-xl border-4 border-tan/20">
                {grade6Photo ? (
                  <img 
                    src={grade6Photo} 
                    alt="Early Years" 
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center grayscale">
                    <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Past Year Badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brown text-white px-4 py-1.5 shadow-lg">
                <span className="text-sm font-medium">{grade6Label}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden py-12 pb-20">
          {/* Header Content */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-tan"></div>
              <span className="text-xs tracking-[0.3em] text-tan font-medium">{estYear}</span>
              <div className="w-8 h-[1px] bg-tan"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl leading-[1.1] mb-6 text-brown" style={{ fontFamily: 'Playfair Display, serif' }}>
              {headingParts.length >= 3 ? (
                <>
                  <span className="block">{headingParts[0]} {headingParts[1]}</span>
                  <span className="block italic text-tan">{headingParts.slice(2).join(' ')}</span>
                </>
              ) : (
                <span>{heading}</span>
              )}
            </h1>
            
            <p className="text-brown/70 text-base leading-relaxed max-w-sm mx-auto mb-8">
              {description}
            </p>
            
            <Link 
              href="#childhood"
              className="inline-flex items-center gap-2 text-sm tracking-[0.15em] text-brown font-medium"
            >
              {ctaText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {/* Mobile Photos */}
          <div className="relative max-w-sm mx-auto mb-8">
            {/* Main Photo */}
            <div className="relative z-10">
              <div className="aspect-[3/4] overflow-hidden shadow-xl border-4 border-tan/20">
                {collegePhoto ? (
                  <img 
                    src={collegePhoto} 
                    alt="Present" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cream-dark to-tan/30 flex items-center justify-center">
                    <svg className="w-16 h-16 text-tan/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Present Badge - Hidden on mobile */}
              <div className="hidden sm:block absolute -bottom-3 right-4 bg-white px-4 py-2 shadow-lg">
                <span className="text-xs tracking-[0.15em] text-tan block">PRESENT</span>
                <span className="text-xl font-semibold text-brown">{collegeLabel}</span>
              </div>
            </div>

            {/* Overlay Photo */}
            <div className="absolute -bottom-6 -left-4 w-[40%] z-20">
              <div className="aspect-square overflow-hidden shadow-lg border-3 border-tan/20">
                {grade6Photo ? (
                  <img 
                    src={grade6Photo} 
                    alt="Early Years" 
                    className="w-full h-full object-cover grayscale"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center grayscale">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Past Badge - Hidden on mobile */}
              <div className="hidden sm:block absolute -bottom-2 left-1/2 -translate-x-1/2 bg-brown text-white px-3 py-1 shadow-lg text-sm">
                {grade6Label}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section Divider */}
      <div className="section-divider mt-16"></div>
    </section>
  );
};

export default HeroSection;

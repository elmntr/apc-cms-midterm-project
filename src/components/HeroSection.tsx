"use client";

import { SiteSettings, getMediaUrl } from "@/lib/strapi";

interface Props {
  settings: SiteSettings | null;
}

const HeroSection = ({ settings }: Props) => {
  const heading = settings?.heroHeading || "From Then to Now";
  const grade6Label = settings?.grade6Label || "Grade 6, 2012";
  const collegeLabel = settings?.collegeLabel || "3rd Year College, 2024";
  const grade6Photo = settings?.grade6Photo ? getMediaUrl(settings.grade6Photo) : '';
  const collegePhoto = settings?.collegePhoto ? getMediaUrl(settings.collegePhoto) : '';

  return (
    <section id="home" className="pt-14 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Mobile: Stacked | Desktop: Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left/Top Photo - Grade 6 (B&W) */}
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-[4/5] bg-gray-200 overflow-hidden">
                {grade6Photo ? (
                  <img src={grade6Photo} alt={grade6Label} className="w-full h-full object-cover grayscale" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center grayscale">
                    <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Label - centered on mobile, bottom-left on desktop */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 bg-white px-4 py-2 rounded-full shadow-sm">
                <p className="text-sm text-gray-700 font-medium">{grade6Label}</p>
              </div>
            </div>

            {/* Right/Bottom Photo - College */}
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-[4/5] bg-gray-200 overflow-hidden">
                {collegePhoto ? (
                  <img src={collegePhoto} alt={collegeLabel} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <svg className="w-16 h-16 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Label - centered on mobile, bottom-right on desktop */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 bg-white px-4 py-2 rounded-full shadow-sm">
                <p className="text-sm text-gray-700 font-medium">{collegeLabel}</p>
              </div>
            </div>
          </div>

          {/* Center Heading Overlay - Only on Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="bg-[#1a1f3c] px-8 py-6 rounded">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-white whitespace-nowrap">
                {heading}
              </h1>
            </div>
          </div>
        </div>

        {/* Timeline connector - only on desktop */}
        <div className="hidden md:flex justify-center py-8">
          <div className="w-0.5 h-16 bg-[#1a1f3c]"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

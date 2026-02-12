"use client";

import { SiteSettings, Hobby } from "@/lib/strapi";

interface Props {
  settings: SiteSettings | null;
  hobbies: Hobby[];
}

const GapSection = ({ settings, hobbies }: Props) => {
  const quote = settings?.gapQuote || "Some years are meant to be lived, not captured.";
  const gapDescription = settings?.gapDescription || "A chapter unwritten in photographs, but deeply etched in memory. Growth happened in quiet moments, away from the lens.";

  const defaultHobbies = [
    { id: 1, documentId: "1", name: "Reading", icon: "book", order: 1 },
    { id: 2, documentId: "2", name: "Gaming", icon: "gaming", order: 2 },
    { id: 3, documentId: "3", name: "Sports", icon: "sports", order: 3 },
  ];

  const displayHobbies = hobbies.length > 0 ? hobbies : defaultHobbies;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "book":
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "gaming":
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        );
      case "sports":
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        );
      default:
        return <span className="text-2xl">{iconType}</span>;
    }
  };

  // Split quote for elegant display
  const quoteParts = quote.split(',').map(part => part.trim());

  return (
    <section id="gap" className="py-24 lg:py-32 bg-brown text-cream">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        {/* Quote */}
        <blockquote className="mb-16">
          <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            {quoteParts.map((part, index) => (
              <span key={index} className="block">
                {index === 0 ? `"${part}` : part}
                {index === quoteParts.length - 1 ? '"' : ','}
              </span>
            ))}
          </p>
        </blockquote>
        
        {/* Decorative Line */}
        <div className="w-16 h-[1px] bg-tan mx-auto mb-12"></div>
        
        {/* Subtitle */}
        <p className="text-cream/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-16">
          {gapDescription}
        </p>

        {/* Hobby Icons */}
        <div className="flex justify-center gap-8 sm:gap-12">
          {displayHobbies.map((hobby) => (
            <div key={hobby.id} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-tan/50 flex items-center justify-center text-tan transition-colors group-hover:border-tan group-hover:bg-tan/10">
                {getIcon(hobby.icon)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GapSection;

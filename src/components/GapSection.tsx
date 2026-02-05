"use client";

import { useEffect, useState } from "react";

interface Hobby {
  id: string;
  name: string;
  icon: string;
}

const GapSection = ({ settings }: { settings: any }) => {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const quote = settings?.gapQuote || "Some years are meant to be lived, not captured.";

  useEffect(() => {
    const fetchHobbies = async () => {
      try {
        const response = await fetch("/api/hobbies");
        if (response.ok) {
          const data = await response.json();
          setHobbies(data);
        }
      } catch (error) {
        console.error("Failed to fetch hobbies:", error);
      }
    };

    fetchHobbies();
  }, []);

  const defaultHobbies = [
    { id: "1", name: "Reading", icon: "book" },
    { id: "2", name: "Gaming", icon: "gaming" },
    { id: "3", name: "Sports", icon: "sports" },
  ];

  const displayHobbies = hobbies.length > 0 ? hobbies : defaultHobbies;

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "book":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case "gaming":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "sports":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
        );
      default:
        return <span className="text-2xl">{iconType}</span>;
    }
  };

  return (
    <section id="gap" className="py-20 bg-[#1a1f3c] text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quote */}
        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-playfair italic leading-relaxed mb-12">
          {quote.split(",").map((part, index) => (
            <span key={index}>
              {part}
              {index < quote.split(",").length - 1 && ","}
              {index < quote.split(",").length - 1 && <br />}
            </span>
          ))}
        </blockquote>

        {/* Hobby Icons */}
        <div className="flex justify-center gap-12">
          {displayHobbies.map((hobby) => (
            <div key={hobby.id} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center">
                {getIcon(hobby.icon)}
              </div>
              <p className="text-xs text-white/70">{hobby.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GapSection;

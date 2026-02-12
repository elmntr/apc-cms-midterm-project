"use client";

import { useState } from "react";
import { PhotoCategory as StrapiPhotoCategory, getMediaUrl, SiteSettings } from "@/lib/strapi";

interface Props {
  photos: StrapiPhotoCategory[];
  settings: SiteSettings | null;
}

const defaultCategories: StrapiPhotoCategory[] = [
  { id: 1, documentId: "1", caption: "Infancy", section: "childhood", date: "2006", order: 1, photos: [], descriptions: { subtitle: "Where it all began" } },
  { id: 2, documentId: "2", caption: "Toddler Years", section: "childhood", date: "2008", order: 2, photos: [], descriptions: { subtitle: "Curious about everything" } },
  { id: 3, documentId: "3", caption: "Early Childhood", section: "childhood", date: "2009", order: 3, photos: [], descriptions: { subtitle: "Pure joy" } },
  { id: 4, documentId: "4", caption: "Elementary School", section: "childhood", date: "2010", order: 4, photos: [], descriptions: { subtitle: "Finding my path" } },
  { id: 5, documentId: "5", caption: "Grade 5", section: "childhood", date: "2011", order: 5, photos: [], descriptions: { subtitle: "Growing confident" } },
  { id: 6, documentId: "6", caption: "Grade 6", section: "childhood", date: "2012", order: 6, photos: [], descriptions: { subtitle: "Ready for more" } },
];

const ChildhoodGallery = ({ photos, settings }: Props) => {
  const categories = photos.length > 0 ? photos : defaultCategories;
  const [selectedCategory, setSelectedCategory] = useState<StrapiPhotoCategory | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // CMS content
  const sectionTitle = settings?.earlyYearsTitle || "The Early Years";
  const startYear = settings?.earlyYearsStartYear || "2006";
  const endYear = settings?.earlyYearsEndYear || "2012";
  const description = settings?.earlyYearsDescription || "Foundation stones of character. The years of wonder, discovery, and innocent dreams.";

  // Split title for styling
  const titleParts = sectionTitle.split(' ');
  const renderTitle = () => {
    if (titleParts.length >= 2) {
      const midPoint = Math.ceil(titleParts.length / 2);
      return (
        <>
          {titleParts.slice(0, midPoint).join(' ')}
          <br />
          {titleParts.slice(midPoint).join(' ')}
        </>
      );
    }
    return sectionTitle;
  };

  const openModal = (category: StrapiPhotoCategory) => {
    if (category.photos.length > 0) {
      setSelectedCategory(category);
      setCurrentPhotoIndex(0);
    }
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedCategory) {
      setCurrentPhotoIndex((prev) => 
        prev < selectedCategory.photos.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevPhoto = () => {
    if (selectedCategory) {
      setCurrentPhotoIndex((prev) => 
        prev > 0 ? prev - 1 : selectedCategory.photos.length - 1
      );
    }
  };

  const getSubtitle = (category: StrapiPhotoCategory): string => {
    if (category.descriptions?.subtitle) {
      return category.descriptions.subtitle;
    }
    const subtitles: { [key: string]: string } = {
      "Infancy": "Where it all began",
      "Toddler Years": "Curious about everything",
      "Early Childhood": "Pure joy",
      "Elementary School": "Finding my path",
      "Grade 5": "Growing confident",
      "Grade 6": "Ready for more",
    };
    return subtitles[category.caption] || "";
  };

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section id="childhood" className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm tracking-[0.2em] text-tan">{startYear}</span>
              <span className="text-tan">—</span>
              <span className="text-sm tracking-[0.2em] text-tan">{endYear}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl text-brown" style={{ fontFamily: 'Playfair Display, serif' }}>
              {renderTitle()}
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-brown/60 text-lg leading-relaxed max-w-md">
              {description}
            </p>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const firstPhoto = category.photos[0];
            const photoUrl = firstPhoto ? getMediaUrl(firstPhoto) : '';
            const hasPhotos = category.photos.length > 0;
            
            return (
              <div 
                key={category.id} 
                className={`group ${hasPhotos ? 'cursor-pointer' : ''}`}
                onClick={() => openModal(category)}
              >
                {/* Photo Container */}
                <div className="relative mb-5">
                  <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                    {photoUrl ? (
                      <img 
                        src={photoUrl} 
                        alt={category.caption} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cream-dark to-tan/20 flex items-center justify-center">
                        <svg className="w-12 h-12 text-tan/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    {hasPhotos && (
                      <div className="absolute inset-0 bg-brown/0 group-hover:bg-brown/20 transition-colors duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm tracking-wider">
                          VIEW GALLERY
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 shadow-sm">
                    <span className="text-sm font-medium text-brown">{category.date || "Year"}</span>
                  </div>
                  
                  {/* Photo Count */}
                  {category.photos.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-brown/80 text-white text-xs px-2.5 py-1">
                      {category.photos.length} photos
                    </div>
                  )}
                </div>
                
                {/* Caption & Number */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-brown mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {category.caption}
                    </h3>
                    <p className="text-sm text-tan">{getSubtitle(category)}</p>
                  </div>
                  <span className="text-3xl font-light text-tan/40" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {formatNumber(index + 1)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-cream-dark">
              <div>
                <h3 className="text-2xl text-brown" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedCategory.caption}
                </h3>
                <p className="text-sm text-tan mt-1">{selectedCategory.date}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-brown/50 hover:text-brown transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Photo Display */}
            <div className="relative bg-cream flex items-center justify-center" style={{ minHeight: '50vh' }}>
              {selectedCategory.photos[currentPhotoIndex] ? (
                <img 
                  src={getMediaUrl(selectedCategory.photos[currentPhotoIndex])} 
                  alt={selectedCategory.caption}
                  className="max-w-full max-h-[60vh] object-contain"
                />
              ) : (
                <div className="w-full h-64 bg-cream-dark flex items-center justify-center">
                  <svg className="w-16 h-16 text-tan/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Navigation Arrows */}
              {selectedCategory.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-cream p-3 shadow-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-cream p-3 shadow-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Photo Counter */}
            <div className="p-4 text-center border-t border-cream-dark">
              <span className="text-sm text-tan">
                {currentPhotoIndex + 1} of {selectedCategory.photos.length}
              </span>
            </div>

            {/* Thumbnail Strip */}
            {selectedCategory.photos.length > 1 && (
              <div className="flex gap-2 p-4 overflow-x-auto bg-cream-dark">
                {selectedCategory.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 overflow-hidden border-2 transition-colors ${
                      index === currentPhotoIndex ? 'border-brown' : 'border-transparent'
                    }`}
                  >
                    <img src={getMediaUrl(photo)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Section Divider */}
      <div className="section-divider mt-20"></div>
    </section>
  );
};

export default ChildhoodGallery;

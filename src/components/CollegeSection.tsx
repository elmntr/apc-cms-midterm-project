"use client";

import { useState } from "react";
import { PhotoCategory as StrapiPhotoCategory, getMediaUrl } from "@/lib/strapi";

interface Props {
  photos: StrapiPhotoCategory[];
}

const defaultCategories: StrapiPhotoCategory[] = [
  { id: 1, documentId: "1", caption: "Senior High Graduation", section: "college", date: "April 2022", order: 1, photos: [] },
  { id: 2, documentId: "2", caption: "Cycling adventures", section: "college", date: "2021-2022", order: 2, photos: [] },
  { id: 3, documentId: "3", caption: "First Day of College", section: "college", date: "August 2022", order: 3, photos: [] },
  { id: 4, documentId: "4", caption: "Late nights at the library", section: "college", date: "November 2023", order: 4, photos: [] },
  { id: 5, documentId: "5", caption: "Dean's List achievement", section: "college", date: "December 2024", order: 5, photos: [] },
];

const CollegeSection = ({ photos }: Props) => {
  const categories = photos.length > 0 ? photos : defaultCategories;
  const [selectedCategory, setSelectedCategory] = useState<StrapiPhotoCategory | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openModal = (category: StrapiPhotoCategory) => {
    setSelectedCategory(category);
    setCurrentPhotoIndex(0);
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

  const getDescription = (category: StrapiPhotoCategory, index: number): string => {
    if (category.descriptions && category.descriptions[index.toString()]) {
      return category.descriptions[index.toString()];
    }
    return "No description";
  };

  return (
    <section id="college" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
            The Present
          </h2>
          <p className="text-gray-500 text-sm">
            Senior High School & College Years • Building the future, one milestone at a time
          </p>
        </div>

        {/* Grid - Single column on mobile, masonry on desktop */}
        <div className="grid grid-cols-1 md:columns-2 md:block lg:columns-3 gap-6 md:gap-4">
          {categories.map((category, index) => {
            const firstPhoto = category.photos[0];
            const photoUrl = firstPhoto ? getMediaUrl(firstPhoto) : '';
            
            return (
              <div 
                key={category.id} 
                className={`cursor-pointer group mb-6 md:break-inside-avoid md:mb-4 ${index % 3 === 0 ? 'lg:mt-8' : ''}`}
                onClick={() => openModal(category)}
              >
                <div className={`bg-gray-100 rounded-xl overflow-hidden relative hover:shadow-lg transition-shadow aspect-square md:${
                  index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-square'
                }`}>
                  {photoUrl ? (
                    <img src={photoUrl} alt={category.caption} className="w-full h-full object-cover object-center" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Photo count badge */}
                  {category.photos.length > 1 && (
                    <div className="absolute top-3 right-3 bg-[#1a1f3c] text-white text-xs px-2.5 py-1 rounded-full">
                      {category.photos.length} photos
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                      View Gallery
                    </span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-base font-medium text-gray-900">{category.caption}</p>
                  <p className="text-sm text-gray-500">{category.date}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Timeline Button */}
        <div className="text-center mt-10">
          <button className="px-6 py-2.5 bg-[#1a1f3c] text-white text-sm rounded-full hover:bg-[#2a2f4c] transition-colors">
            View Full Timeline
          </button>
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b shrink-0">
              <div>
                <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {selectedCategory.caption}
                </h3>
                <p className="text-sm text-gray-500">{selectedCategory.date}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Photo Display */}
            <div className="relative bg-gray-100 flex items-center justify-center shrink-0" style={{ height: '50vh' }}>
              {selectedCategory.photos[currentPhotoIndex] ? (
                <img 
                  src={getMediaUrl(selectedCategory.photos[currentPhotoIndex])} 
                  alt={selectedCategory.caption}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Navigation Arrows */}
              {selectedCategory.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Photo Info */}
            <div className="p-4">
              <p className="text-sm text-gray-600">
                {getDescription(selectedCategory, currentPhotoIndex)}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {currentPhotoIndex + 1} of {selectedCategory.photos.length}
              </p>
            </div>

            {/* Thumbnail Strip */}
            {selectedCategory.photos.length > 1 && (
              <div className="flex gap-2 p-4 pt-0 overflow-x-auto">
                {selectedCategory.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                      index === currentPhotoIndex ? 'border-[#1a1f3c]' : 'border-transparent'
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
    </section>
  );
};

export default CollegeSection;

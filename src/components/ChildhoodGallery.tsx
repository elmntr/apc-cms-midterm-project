"use client";

import { useEffect, useState } from "react";

interface PhotoItem {
  id: string;
  imageUrl: string;
  description?: string;
}

interface PhotoCategory {
  id: string;
  caption: string;
  photos: PhotoItem[];
}

const defaultCategories: PhotoCategory[] = [
  { id: "1", caption: "Infancy", photos: [{ id: "1-1", imageUrl: "", description: "Baby photo 1" }, { id: "1-2", imageUrl: "", description: "Baby photo 2" }] },
  { id: "2", caption: "Toddler Years", photos: [{ id: "2-1", imageUrl: "", description: "Toddler photo" }] },
  { id: "3", caption: "Early Childhood", photos: [{ id: "3-1", imageUrl: "", description: "Early childhood" }] },
  { id: "4", caption: "Elementary School", photos: [{ id: "4-1", imageUrl: "", description: "Elementary" }] },
  { id: "5", caption: "Grade 5", photos: [{ id: "5-1", imageUrl: "", description: "Grade 5" }] },
  { id: "6", caption: "Grade 6", photos: [{ id: "6-1", imageUrl: "", description: "Grade 6" }] },
];

const ChildhoodGallery = () => {
  const [categories, setCategories] = useState<PhotoCategory[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<PhotoCategory | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos?section=childhood");
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setCategories(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (category: PhotoCategory) => {
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

  return (
    <section id="childhood" className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-[#1a1f3c] mb-3">
            The Early Years
          </h2>
          <div className="w-8 h-0.5 bg-[#1a1f3c] mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">
            Birth to Grade 6 • The foundation of who I became
          </p>
        </div>

        {/* Photo Grid - Single column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="group cursor-pointer"
              onClick={() => openModal(category)}
            >
              <div className="aspect-[4/3] md:aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3 relative hover:shadow-lg transition-shadow">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
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
              <p className="text-center text-base text-gray-700 font-medium">{category.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-playfair text-xl font-bold text-[#1a1f3c]">
                {selectedCategory.caption}
              </h3>
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
            <div className="relative aspect-[4/3] bg-gray-100">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

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
                {selectedCategory.photos[currentPhotoIndex]?.description || "No description"}
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
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
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

export default ChildhoodGallery;

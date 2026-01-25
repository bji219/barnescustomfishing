"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  "IMG_3368.jpg",
  "IMG_3369.jpg",
  "IMG_3370.jpg",
  "IMG_3372.jpg",
  "IMG_3373.jpg",
  "IMG_3374.jpg",
  "IMG_3375.jpg",
  "IMG_3377.jpg",
  "IMG_3378.jpg",
  "IMG_3379.jpg",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-900 hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Image
              src={`/${image}`}
              alt="Custom fishing rod"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-neutral-300"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={`/${selectedImage}`}
              alt="Custom fishing rod"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}

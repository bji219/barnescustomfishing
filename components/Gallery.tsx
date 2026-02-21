"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// Fallback static images when Instagram is not configured or unavailable
const fallbackImages = [
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

interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  isExternal: boolean;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const feedId = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID;

    if (feedId) {
      // Fetch from Behold (Instagram)
      fetch(`https://feeds.behold.so/${feedId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data) => {
          const posts: InstagramPost[] = Array.isArray(data) ? data : (data.posts || []);
          const galleryImages: GalleryImage[] = posts
            .filter((post) => post.mediaType === "IMAGE" || post.mediaType === "CAROUSEL_ALBUM")
            .map((post) => ({
              id: post.id,
              src: post.mediaUrl,
              alt: post.caption?.slice(0, 100) || "Custom fishing rod",
              isExternal: true,
            }));

          if (galleryImages.length > 0) {
            setImages(galleryImages);
          } else {
            // No posts, use fallback
            setImages(fallbackImages.map((img, i) => ({
              id: `static-${i}`,
              src: `/${img}`,
              alt: "Custom fishing rod",
              isExternal: false,
            })));
          }
          setLoading(false);
        })
        .catch(() => {
          // Error fetching, use fallback
          setImages(fallbackImages.map((img, i) => ({
            id: `static-${i}`,
            src: `/${img}`,
            alt: "Custom fishing rod",
            isExternal: false,
          })));
          setLoading(false);
        });
    } else {
      // No feed ID configured, use static images
      setImages(fallbackImages.map((img, i) => ({
        id: `static-${i}`,
        src: `/${img}`,
        alt: "Custom fishing rod",
        isExternal: false,
      })));
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-[4/3] rounded-lg bg-white/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image.src)}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow cursor-pointer"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={image.isExternal}
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-navy/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-teal-light transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={selectedImage}
              alt="Custom fishing rod"
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized={selectedImage.startsWith("http")}
            />
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo } from "./PhotoGallery";

interface PhotoImageProps {
  photo: {
    image: string;
    title: string;
  },
  sortedPhotos: Photo[]
}

function getRandomImage(sortedPhotos: Photo[], currentImage: string) {
    const candidates = sortedPhotos.filter(
        (item) =>  item.image !== currentImage && !item.image.endsWith("/null"))
        
    if (candidates.length == 0) {
        return "/Logo_Fisheye.png"
    }


    return candidates[
      Math.floor(Math.random() * candidates.length)
    ].image;
  };

export default function PhotoImage({ photo, sortedPhotos }: PhotoImageProps) {
  const [imageSrc, setImageSrc] = useState(photo.image);

  return (
    <Image
      src={imageSrc}
      alt={photo.title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      onError={() => {
        setImageSrc(getRandomImage(sortedPhotos, imageSrc));
      }}
    />
  );
}
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

function getRandomImage(sortedPhotos: Photo[]) {
    if (!sortedPhotos) {
      return "/Logo_Fisheye.png";
    }

    return sortedPhotos[
      Math.floor(Math.random() * sortedPhotos.length)
    ].image;
  };

export default function PhotoImage({ photo, sortedPhotos }: PhotoImageProps) {
  const [imageSrc, setImageSrc] = useState(photo.image);

  const randomPhoto = getRandomImage(sortedPhotos);

  return (
    <Image
      src={imageSrc}
      alt={photo.title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      onError={() => {
        setImageSrc(randomPhoto);
      }}
    />
  );
}
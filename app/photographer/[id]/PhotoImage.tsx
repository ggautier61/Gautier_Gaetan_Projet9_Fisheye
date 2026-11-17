"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo } from "./PhotoGallery";
import { assetPath } from "../../lib/asset-path";

interface PhotoImageProps {
  photo: {
    image: string;
    title: string;
  }
}

function getRandomImage(sortedPhotos: Photo[], currentImage: string) {
    const candidates = sortedPhotos.filter(
        (item) =>  item.image !== currentImage && !item.image.endsWith("/null"))
        
    if (candidates.length == 0) {
        return assetPath("/Logo_Fisheye.png")
    }


    return candidates[
      Math.floor(Math.random() * candidates.length)
    ].image;
  };

export default async function PhotoImage({ photo }: PhotoImageProps) {
  const [imageSrc, setImageSrc] = useState(await assetPath(photo.image));

  return (
    <Image
      src={imageSrc}
      alt={photo.title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
      // onError={() => {
      //   setImageSrc(getRandomImage(sortedPhotos, imageSrc));
      // }}
    />
  );
}
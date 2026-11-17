"use client";

import Image from "next/image";
import { assetPath } from "../../lib/asset-path";

interface PhotoImageProps {
  photo: {
    image: string | null;
    title: string;
  };
}

export default function PhotoImage({ photo }: PhotoImageProps) {
  return (
    <Image
      src={photo.image ?? assetPath("/Logo_Fisheye.png")}
      alt={photo.title}
      fill
      sizes="(max-width: 768px) 100vw, 33vw"
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Photo } from "./PhotoGallery";
import { assetPath } from "../../lib/asset-path";
import "./LightboxModal.css";

type LightboxModalProps = {
  onClose: () => void;
  photos: Photo[];
  currentIndex: number;
};

export default function LightboxModal({
  onClose,
  photos,
  currentIndex,
}: LightboxModalProps) {
  const [index, setIndex] = useState(currentIndex);
  const safeIndex =
    photos.length > 0
      ? ((index % photos.length) + photos.length) % photos.length
      : 0;
  const photo = photos[safeIndex];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + photos.length) % photos.length);
        return;
      }
      if (event.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % photos.length);
        return;
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, photos.length]);

  if (!photo) {
    return null;
  }

  function goToPrev() {
    setIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }

  function goToNext() {
    setIndex((prev) => (prev + 1) % photos.length);
  }

  return (
    <div id="lightbox-modal">
      <div onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true">
        <div className="photo-viewer">
          <figure className="photo-figure">
            <div className="figure-panel-left">
              <button
                type="button"
                className="nav-button prev"
                onClick={goToPrev}
                aria-label="Photo précédente"
              >
                &#10094;
              </button>
            </div>

            <div className="figure-panel-image">
              <div className="figure-panel-container">
                {photo.video != null && photo.video !== "" ? (
                  <video
                    src={photo.video}
                    className="h-full"
                    aria-label={photo.title}
                  />
                ) : (
                  <Image
                    src={photo.image ?? assetPath("/Logo_Fisheye.png")}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 480px) 100vw, 1242px"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                  />
                )}
              </div>
              <figcaption>{photo.title}</figcaption>
            </div>
            <div className="figure-panel-right">

              <button
              type="button"
              className="close-button"
              onClick={onClose}
              aria-label="Fermer"
              >
                &times;
              </button>

              <button
                type="button"
                className="nav-button next"
                onClick={goToNext}
                aria-label="Photo suivante"
              >
                &#10095;
              </button>
            </div>

          </figure>

        </div>
      </div>
    </div>
  );
}

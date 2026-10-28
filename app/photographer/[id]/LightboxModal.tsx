"use client";

import { useEffect, useState } from "react";
import type { Photo } from "./PhotoGallery";
import "./LightboxModal.css";

type LightboxModalProps = {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  currentIndex: number;
};

export default function LightboxModal({
  isOpen,
  onClose,
  photos,
  currentIndex,
}: LightboxModalProps) {
  const [index, setIndex] = useState(currentIndex);

  useEffect(() => {
    if (isOpen) {
      setIndex(currentIndex);
    }
  }, [isOpen, currentIndex]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        goToPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        goToNext();
        return;
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, index, photos]);

  if (!isOpen || photos.length === 0) {
    return null;
  }

  const safeIndex = ((index % photos.length) + photos.length) % photos.length;
  const photo = photos[safeIndex];

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
              className="nav-button prev"
              onClick={goToPrev}
              aria-label="Photo précédente"
            >
              &#10094;
            </button>

            <img src={photo.image} alt={photo.title} />
            <figcaption>{photo.title}</figcaption>

            <button
              type="button"
              className="nav-button next"
              onClick={goToNext}
              aria-label="Photo suivante"
            >
              &#10095;
            </button>

          </figure>

        </div>
      </div>
    </div>
  );
}

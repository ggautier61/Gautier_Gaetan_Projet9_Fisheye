"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../../page.module.css";
import LightboxModal from "./LightboxModal";
import PhotoImage from "./PhotoImage";
import InfoBoxLikes from "./InfoBoxLikes";

export type Photo = {
  id: number;
  image: string | null;
  video: string | null;
  title: string;
  likes: number;
  date: string;
};

type SortBy = "popularite" | "date" | "titre";

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "popularite", label: "Popularité" },
  { value: "date",        label: "Date" },
  { value: "titre",       label: "Titre" },
];

export default function PhotoGallery({
  photos,
  price,
}: {
  photos: Photo[];
  price: number;
}) {
  const [sortBy, setSortBy] = useState<SortBy>("popularite");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [likesById, setLikesById] = useState<Record<number, number>>(() =>
    Object.fromEntries(photos.map((photo) => [photo.id, photo.likes]))
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedPhotos = useMemo(() => {
    const copy = [...photos];
    switch (sortBy) {
      case "date":
        return copy.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "titre":
        return copy.sort((a, b) => a.title.localeCompare(b.title, "fr"));
      default:
        return copy.sort((a, b) => b.likes - a.likes);
    }
  }, [photos, sortBy]);

  function handleSelect(value: SortBy) {
    setSortBy(value);
    setIsOpen(false);
  }

  function handleLike(photoId: number) {
    setLikesById((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] ?? 0) + 1,
    }));
  }

  const currentLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ??
    SORT_OPTIONS[0].label;

  const otherOptions = SORT_OPTIONS.filter((option) => option.value !== sortBy);

  const totalLikes = photos.reduce(
    (sum, photo) => sum + (likesById[photo.id] ?? photo.likes),
    0
  );


  return (
    <>
      {/* BARRE DE TRI */}
      <section className={styles.sortContainer}>
        <span className={styles.sortLabel}>Trier par</span>

        <div className="relative min-w-[170px]" ref={menuRef}>
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className={styles.sortButton}
          >
            {currentLabel}
            <span
              aria-hidden="true"
              className="ml-4 transition-transform duration-200"
              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              ⌃
            </span>
          </button>

          <div style={{height: "1px", width: "150px", backgroundColor: "white"}}></div>

          {isOpen && (
            <div
              role="menu"
              className="absolute left-0 top-full z-10 w-full rounded-b-[3px] bg-[#901C1C] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
            >
              {otherOptions.map((option) => (
                <div key={option.value}>
                  <button
                     
                    type="button"
                    role="menuitem"
                    onClick={() => handleSelect(option.value)}
                    className={styles.sortButton}
                  >
                    {option.label}
                  </button>
                  <div style={{height: "1px", width: "150px", backgroundColor: "white"}}></div>
                </div>
                

              ))}
            </div>
          )}
        </div>
      </section>


      {/* GALERIE */}
      <section className={styles.galleryContainer}>
        <div className={styles.gallery}>
          {sortedPhotos.map((photo) => (
            <article key={photo.id} className={styles.photoCard}>
              {/* Image */}
              <div
                className={styles.photoImage}
                onClick={() => {
                  const index = sortedPhotos.findIndex((p) => p.id === photo.id);
                  setLightboxIndex(index >= 0 ? index : 0);
                  setLightboxOpen(true);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    const index = sortedPhotos.findIndex((p) => p.id === photo.id);
                    setLightboxIndex(index >= 0 ? index : 0);
                    setLightboxOpen(true);
                  }
                }}
              >
                {photo.image != null && photo.image != "" && (
                  <PhotoImage photo={photo} />
                )}

                {photo.video != null && photo.video != "" && (
                  <video
                    src={photo.video}
                    className="h-full"
                    aria-label={photo.title}
                  />

                )}
                
                
              </div>

              {/* Informations */}
              <div className={styles.photoInformation}>
                <h2 className={styles.photoTitle}>{photo.title}</h2>

                <button
                  type="button"
                  className={styles.photoLikes}
                  onClick={() => handleLike(photo.id)}
                  aria-label={`Ajouter un like à ${photo.title}`}
                >
                  {likesById[photo.id] ?? photo.likes} ♥
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {lightboxOpen && (
        <LightboxModal
          photos={sortedPhotos}
          currentIndex={lightboxIndex}
          onClose={() => {
            setLightboxOpen(false);
          }}
        />
      )}

      <InfoBoxLikes price={price} totalLikes={totalLikes} />
    </>
  );
}

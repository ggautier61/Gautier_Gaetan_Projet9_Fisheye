"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import styles from "../../page.module.css";

export type Photo = {
  id: number;
  image: string;
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

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [sortBy, setSortBy] = useState<SortBy>("popularite");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  const currentLabel =
    SORT_OPTIONS.find((option) => option.value === sortBy)?.label ??
    SORT_OPTIONS[0].label;

  const otherOptions = SORT_OPTIONS.filter((option) => option.value !== sortBy);

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
              <div className={styles.photoImage}>
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Informations */}
              <div className={styles.photoInformation}>
                <h2 className={styles.photoTitle}>{photo.title}</h2>

                <span className={styles.photoLikes}>{photo.likes} ♥</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

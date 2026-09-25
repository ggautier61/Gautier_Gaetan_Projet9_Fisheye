import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../../page.module.css";
import photographers from "../../src/datas/photographer.json";
import media from "../../src/datas/media.json";
import PhotoGallery, { type Photo } from "./PhotoGallery";

type MediaEntry = {
  photographerId: number;
  title: string;
  image?: string;
  video?: string;
  likes: number;
  date: string;
  price: number;
};

const allMedia = media as MediaEntry[];

export function generateStaticParams() {
  return photographers.map((photographer) => ({ id: String(photographer.id) }));
}

export default async function PhotographerPage(
  props: PageProps<"/photographer/[id]">
) {
  const { id } = await props.params;

  const photographerId = Number(id);
  const photographer = photographers.find(
    (entry) => entry.id === photographerId
  );

  if (!photographer) notFound();

  const photos: Photo[] = allMedia
    .filter((entry) => entry.photographerId === photographerId && entry.image)
    .map((entry, index) => ({
      id: `${entry.photographerId}-${index}`,
      image: `/assets/${entry.image}`,
      title: entry.title,
      likes: entry.likes,
      date: entry.date,
    }));

  return (
    <div style={{ maxWidth: "1440px", width: "1440px", paddingLeft: "100px", paddingRight: "100px" }}>
      <header className={styles.header}>
        <Link href="/" aria-label="Retour à l'accueil">
          <Image
            src="/Logo_Fisheye.png"
            alt="Logo Fisheye"
            width={200}
            height={50}
            className={styles.logo}
          />
        </Link>
      </header>

  {/* ------------------------------------------------------- 
      |                        Profil                       |
      ------------------------------------------------------- */}
      <section className={styles.profileContainer}>
        <div className={styles.profile}>

          <div className={styles.profileLeft}>

            <div className={styles.profileInformation}>
              <h1 className={styles.profileName}>
                {photographer.name}
              </h1>

              <div className={styles.profileDescription}>
                <p className={styles.profileLocation}>
                  {photographer.city}, {photographer.country}
                </p>

                <p className={styles.profileTagline}>
                  {photographer.tagline}
                </p>
              </div>
            </div>

            

          </div>
          <div>
            <button className={styles.contactButton}>
              Contactez-moi
            </button>
          </div>

          <div className={styles.profilePicture}>
            <Image
              src={`/assets/${photographer.portrait}`}
              alt={photographer.name}  
              width={200}
              height={200}            
            />
          </div>

        </div>
      </section>

      {/* BARRE DE TRI + GALERIE */}
      <PhotoGallery photos={photos} />


    </div>
  );
}

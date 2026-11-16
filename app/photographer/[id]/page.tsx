import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPhotographerById, getAllPhotographers } from "../../lib/photographers";
import styles from "../../page.module.css";
import PhotoGallery, { type Photo } from "./PhotoGallery";
import ContactSection from "./ContactSection";
import { assetPath } from "../../lib/asset-path";

export const dynamicParams = false;

export async function generateStaticParams() {
  const photographers = await getAllPhotographers();

  return photographers.map((photographer) => ({
    id: String(photographer.id),
  }));
}

export default async function PhotographerPage(
  props: PageProps<"/photographer/[id]">
) {
  const { id } = await props.params;

  const photographerId = Number(id);
  const photographer = Number.isInteger(photographerId)
    ? await getPhotographerById(photographerId)
    : null;

  if (!photographer) notFound();

  const photos: Photo[] = photographer.medias
    .map((media) => ({
      id: media.id,
      image: assetPath(`/assets/${media.image}`),
      title: media.title,
      likes: media.likes,
      date: media.date,
    }));

  return (
    <div style={{ maxWidth: "1440px", width: "1440px", paddingLeft: "100px", paddingRight: "100px" }}>
      <header className={styles.header}>
        <Link href="/" aria-label="Retour à l'accueil">
          <Image
            src={assetPath("/Logo_Fisheye.png")}
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
            <ContactSection photographerName={photographer.name} />
          </div>

          <div className={styles.profilePicture}>
            <Image
              src={assetPath(`/assets/${photographer.portrait}`)}
              alt={photographer.name}  
              width={200}
              height={200}            
            />
          </div>

        </div>
      </section>

      {/* BARRE DE TRI + GALERIE */}
      <PhotoGallery photos={photos} price={photographer.price} />


    </div>
  );
}

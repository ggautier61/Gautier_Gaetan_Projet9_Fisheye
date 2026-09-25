import Image from "next/image";
import styles from "../page.module.css";
import PhotoGallery from "./PhotoGallery";

const photos = [
  {
    id: 1,
    image: "/assets/Animals_Majesty.jpg",
    title: "Arc-en-ciel",
    likes: 11,
    date: "2024-03-10",
  },
  {
    id: 2,
    image: "/assets/Animals_Rainbow.jpg",
    title: "Solitude",
    likes: 12,
    date: "2024-06-22",
  },
  {
    id: 3,
    image: "/assets/Architecture_Connected_Curves.jpg",
    title: "Mariage à la mer",
    likes: 12,
    date: "2025-01-18",
  },
  {
    id: 4,
    image: "/assets/Architecture_Corner_Room.jpg",
    title: "Portrait",
    likes: 8,
    date: "2024-11-02",
  },
  {
    id: 5,
    image: "/assets/Architecture_Corner_Room.jpg",
    title: "Moment à deux",
    likes: 10,
    date: "2025-04-30",
  },
];

export default function PhotographerPage() {
  return (
    <div style={{ maxWidth: "1440px", width: "1440px", paddingLeft: "100px", paddingRight: "100px" }}>
      <header className={styles.header}>
        <div>
          <Image
            src="/Logo_Fisheye.png"
            alt="Logo Fisheye"
            width={200}
            height={50}
            className={styles.logo}
          />
        </div>
      </header>

  {/* ------------------------------------------------------- 
      |                        Profil                       |
      ------------------------------------------------------- */}
      <section className={styles.profileContainer}>
        <div className={styles.profile}>

          <div className={styles.profileLeft}>

            <div className={styles.profileInformation}>
              <h1 className={styles.profileName}>
                Mimi Keel
              </h1>

              <div className={styles.profileDescription}>
                <p className={styles.profileLocation}>
                  London, UK
                </p>

                <p className={styles.profileTagline}>
                  Voir le beau dans le quotidien
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
              src="/assets/MimiKeel.jpg"
              alt="Mimi Keel"  
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
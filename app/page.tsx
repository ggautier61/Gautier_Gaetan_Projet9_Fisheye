import Image from "next/image";
import styles from "./page.module.css";

const photographers = [
  {
    id: 1,
    name: "Mimi Keel",
    city: "London, UK",
    tagline: "Voir le beau dans le quotidien",
    price: "400€/jour",
    image: "/assets/MimiKeel.jpg",
  },
  {
    id: 2,
    name: "Ellie-Rose Wilkens",
    city: "Paris, France",
    tagline: "Travaille sur des compositions complexes",
    price: "250€/jour",
    image: "/assets/EllieRoseWilkens.jpg",
  },
  {
    id: 3,
    name: "Tracy Galindo",
    city: "Montreal, Canada",
    tagline: "Photographe freelance",
    price: "500€/jour",
    image: "/assets/TracyGalindo.jpg",
  },
  {
    id: 4,
    name: "Nabeel Bradford",
    city: "Mexico City, Mexico",
    tagline: "Je vais toujours de l'avant",
    price: "350€/jour",
    image: "/assets/NabeelBradford.jpg",
  },
  {
    id: 5,
    name: "Rhode Dubois",
    city: "Barcelona, Spain",
    tagline: "Créatrice de souvenirs",
    price: "375€/jour",
    image: "/assets/RhodeDubois.jpg",
  },
  {
    id: 6,
    name: "Marcel Nikolic",
    city: "Berlin, Germany",
    tagline: "Toujours à la recherche de LA photo",
    price: "300€/jour",
    image: "/assets/MarcelNikolic.jpg",
  },
];

export default function Home() {
  return (
    <div style={{ maxWidth: "1440px"}}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
              src="/Logo_Fisheye.png"
              alt="Logo Fisheye"
              width={200}
              height={50}
              className={styles.logo}
            />
        </div>

        <h1>Nos photographes</h1>
      </header>
      <main className={styles.main}>
        

        <section className={styles.photographers}>
          {photographers.map((photographer) => (
            <article key={photographer.id} className={styles.card}>
              <Image
                src={photographer.image}
                alt={photographer.name}
                width={200}
                height={200}
                className={styles.photo}
              />

              <h2>{photographer.name}</h2>

              <p className={styles.location}>
                {photographer.city}
              </p>

              <p className={styles.tagline}>
                {photographer.tagline}
              </p>

              <p className={styles.price}>
                {photographer.price}
              </p>
            </article>
          ))}
        </section>
      </main>

    </div>
  );
}
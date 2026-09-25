import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import photographers from "./src/datas/photographer.json";

export default function Home() {
  return (
    <div style={{ maxWidth: "1440px", width: "1440px"}}>
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

        <h1>Nos photographes</h1>
      </header>
      <main className={styles.main}>
        

        <section className={styles.photographers}>
          {photographers.map((photographer) => (
            <Link
              key={photographer.id}
              href={`/photographer/${photographer.id}`}
              className={styles.cardLink}
            >
              <article className={styles.card}>
                <Image
                  src={`/assets/${photographer.portrait}`}
                  alt={photographer.name}
                  width={200}
                  height={200}
                  className={styles.photo}
                />

                <h2>{photographer.name}</h2>

                <p className={styles.location}>
                  {photographer.city}, {photographer.country}
                </p>

                <p className={styles.tagline}>
                  {photographer.tagline}
                </p>

                <p className={styles.price}>
                  {photographer.price}€/jour
                </p>
              </article>
            </Link>
          ))}
        </section>
      </main>

    </div>
  );
}

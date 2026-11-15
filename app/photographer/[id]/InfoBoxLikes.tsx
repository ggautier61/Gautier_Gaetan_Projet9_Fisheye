import styles from "../../page.module.css";

type InfoBoxLikesProps = {
  price: number;
  totalLikes: number;
};

export default function InfoBoxLikes({ price, totalLikes }: InfoBoxLikesProps) {
  return (
    <aside
      className={styles.infoBoxLikes}
      aria-label="Likes et tarif du photographe"
    >
      <span>{totalLikes.toLocaleString("fr-FR")} ♥</span>
      <span>{price}€ / jour</span>
    </aside>
  );
}

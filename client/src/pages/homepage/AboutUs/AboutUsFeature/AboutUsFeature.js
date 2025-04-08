import styles from "./AboutUsFeature.module.css";

function AboutUsFeature({ id, title, message, image }) {
  return (
    <div className={styles.featureContainer} id={id}>
      <div className={styles.featureContent}>
        <div>
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
    </div>
  );
}

export default AboutUsFeature;

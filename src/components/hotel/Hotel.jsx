import styles from "./Hotel.module.css";

const Hotel = (props) => {
  const hotel = props.hotel;
  return (
    <div className={styles["name"]}>
      <img src={hotel.photos.length > 0 ? hotel.photos[0] : ""} alt="hotel" />
      <a href="/">{hotel.name}</a>
      <h4 className={styles.city}>{hotel.cityId.name}</h4>
      <h4 className={styles.price}>Starting from ${hotel.cheapestPrice}</h4>
      <h4>
        <span className={styles.rate}>Rate: {hotel.rate}</span>
      </h4>
    </div>
  );
};
export default Hotel;

import styles from "./City.module.css";

const City = (props) => {
  const city = props.city;
  return (
    // create city element with info from props
    <div className={styles["city"]}>
      <img src={city.image} alt="city" />
      <label>
        <h2 className="name">{city.name}</h2>
        <h4 className="subText">{city.subText}</h4>
      </label>
    </div>
  );
};

export default City;

import ButtonBorderRadius from "../buttons/ButtonBorderRadius";
import styles from "./NineNight.module.css";

// Create NineNight component
const NineNight = (props) => {
  const bookingNowHandler = () => {
    props.onClick();
  };
  return (
    <div className={styles["perfect"]}>
      <h2>
        ${props.nineNightPrice} <span>(1 night)</span>
      </h2>
      <ButtonBorderRadius
        text="Reverse or Book Now!"
        width={"100%"}
        onClick={bookingNowHandler}
      />
    </div>
  );
};
export default NineNight;

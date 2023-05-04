import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonBorderRadius from "../../buttons/ButtonBorderRadius";
import styles from "./SearchHotel.module.css";

// create SearchHotel component
const SearchHotel = (props) => {
  const [searchParams] = useSearchParams();
  const hotel = props.hotel;
  const nav = useNavigate();
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");

  const hotelDetailHandler = () => {
    nav(`/hotel/detail/${hotel.hotelId}?fromDate=${fromDate}&toDate=${toDate}`);
  };

  return (
    <div className={styles["hotel"]}>
      <div className={styles["image"]}>
        <img src={hotel.image_url} alt="hotel" />
      </div>
      <div className={styles["content"]}>
        <div className={styles["info"]}>
          <h2>{hotel.name}</h2>
          <p className={styles["distance"]}>{hotel.distance} from center</p>
          <p className={styles["free-airport-taxi"]}>
            <span>{hotel.tag}</span>
          </p>
          <p>
            <b>{hotel.description}</b>
          </p>
          {/* <p>{hotel.type}</p> */}
          <p className={styles["free-cancel"]}>
            {hotel.free_cancel && `Free cancelation`}
          </p>
          <p className={styles["free-cancel-2"]}>
            {hotel.free_cancel &&
              `You can cancel later, so lock in this price today!`}
          </p>
        </div>
        <div className={styles["price"]}>
          <div className={styles["mark"]}>
            {/* <div className={styles["rate-text"]}>{hotel.rate_text}</div> */}
            <div className={styles["rate"]}>{hotel.rate}</div>
          </div>
          <div className={styles["info-price"]}>
            <h3>${hotel.price}</h3>
            <h6>Includes taxes and fees</h6>
            <ButtonBorderRadius
              text="See availability"
              padding={50}
              onClick={hotelDetailHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchHotel;

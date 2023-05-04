import styles from "./HotelsList.module.css";
import Hotel from "../../../components/hotel/Hotel";
import getHotelTopRate from "../../../api/hotel";
import { useEffect } from "react";
import HTTP from "../../../custom-hook/http";

// Create HotelsList component
const HotelsList = () => {
  const { error, data, status, sendRequest } = HTTP(getHotelTopRate);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // render the list of hotels
  let hotelsList;
  if (data) {
    hotelsList = data.map((hotel, index) => (
      <Hotel hotel={hotel} key={index} />
    ));
  }

  return (
    <>
      <div className={styles.title}>
        <h3>Home guests love</h3>
      </div>
      <div className={styles["hotels-container"]}>
        {data && <div className={styles.content}>{hotelsList}</div>}
        {status === "pending" && (
          <div className={styles.content}>Loading...</div>
        )}
        {error && <div className={styles.content}>{error}</div>}
      </div>
    </>
  );
};
export default HotelsList;

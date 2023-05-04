import styles from "./CitiesList.module.css";
import City from "../../../components/city/City";
import HTTP from "../../../custom-hook/http";
import getCities from "../../../api/city";
import { useEffect } from "react";

// Create CitiesList component
const CitiesList = () => {
  const { status, error, data, sendRequest } = HTTP(getCities);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  // create list of cities
  let citiesList;
  if (data) {
    citiesList = data.cities.map((city, index) => (
      // insert City component from component Folder
      <City city={city} key={index} />
    ));
  }
  return (
    <div className={styles["cities-container"]}>
      {data && <div className={styles["content"]}>{citiesList}</div>}
      {status === "pending" && (
        <div className={styles["content"]}>Loading...</div>
      )}
      {error && <div className={styles["content"]}>{error}</div>}
    </div>
  );
};
export default CitiesList;

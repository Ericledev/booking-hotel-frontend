import styles from "./TypeOfHotelsList.module.css";
import Type from "../../../components/type/Type";
import HTTP from "../../../custom-hook/http";
import getTypes from "../../../api/type";
import { useEffect } from "react";

// Create TypeOfHotelsList component
const TypeOfHotelsList = () => {
  const { error, status, data, sendRequest } = HTTP(getTypes);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  let typesList;
  if (data) {
    typesList = data.types.map((type, index) => (
      <Type type={type} key={index} />
    ));
  }

  return (
    <>
      <div className={styles["title"]}>
        <h3>Browse by property type</h3>
      </div>
      <div className={styles["type-container"]}>
        {data && <div className={styles["content"]}>{typesList}</div>}
        {status === "pending" && (
          <div className={styles["content"]}>Loading...</div>
        )}
        {error && <div className={styles["content"]}>{error}</div>}
      </div>
    </>
  );
};
export default TypeOfHotelsList;

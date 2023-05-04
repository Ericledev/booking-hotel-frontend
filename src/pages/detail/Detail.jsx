import Footer from "../home/footer/Footer";
import NavBar from "../home/navbar/NavBar";
import RegisterForm from "../home/register-form/RegisterForm";
import DetailInfo from "./detail-info/DetailInfo";
import styles from "./Detail.module.css";
import HTTP from "../../custom-hook/http";
import { getHotelById } from "../../api/hotel";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const { error, data, status, sendRequest } = HTTP(getHotelById);

  const hotelId = useParams("id").id;

  useEffect(() => {
    sendRequest(hotelId);
  }, [sendRequest, hotelId]);
  return (
    <>
      {/* Show NavBar */}
      <NavBar />
      {/* Show content of detail */}
      <div className={styles["detail-container"]}>
        <div className={styles["detail-content"]}>
          {data && <DetailInfo detail={data} />}
          {status === "pending" && <div>Loading...</div>}
          {error && <div>{error}</div>}
        </div>
      </div>
      {/* Show RegisterForm & Footer */}
      <RegisterForm />
      <Footer />
    </>
  );
};

export default Search;

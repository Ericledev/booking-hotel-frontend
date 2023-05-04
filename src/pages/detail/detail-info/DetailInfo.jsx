import ButtonBorderRadius from "../../../components/buttons/ButtonBorderRadius";
import NineNight from "../../../components/nine-night/NineNight";
import styles from "./DetailInfo.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../store/authConext";

const DetailInfo = (props) => {
  const ctxAuth = useContext(AuthContext);
  const nav = useNavigate();
  const [searchParams] = useSearchParams();

  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");

  const detail = props.detail;
  const imgContent = detail.photos.map((img, index) => {
    return (
      <div className={styles["img"]} key={index}>
        <img src={img} alt="hotel" />
      </div>
    );
  });
  // handle booking when user click reserve button
  const bookingNowHandler = () => {
    if (!ctxAuth.isLoggedIn) {
      alert("Please login first");
      return;
    }
    nav(`/booking?hotelId=${detail._id}&fromDate=${fromDate}&toDate=${toDate}`);
  };
  return (
    <>
      {/* show head of detail content */}
      <div className={styles["info-container"]}>
        <div className={styles["info-left"]}>
          <h1>{detail.name}</h1>
          <div className={styles["address"]}>
            <i className="fas fa-map-marker-alt" />
            <span>{detail.address}</span>
          </div>
          <div className={styles["distance"]}>
            Excellent location - {detail.distance}m from Center
          </div>
          <div className={styles["price"]}>
            Book a stay over ${detail.cheapestPrice} at this property and get a{" "}
            {detail.tag}
          </div>
        </div>
        <div className={styles["info-right"]}>
          <ButtonBorderRadius
            text="Reserve or Book Now!"
            onClick={bookingNowHandler}
          />
        </div>
      </div>
      {/* show content(image) of detail content */}
      <div className={styles["img-container"]}>{imgContent}</div>
      {/* show footer of detail content */}
      <div className={styles["infor-footer"]}>
        {/* show footer left */}
        <div className={styles["infor-footer-content"]}>
          <h1>{detail.title}</h1>
          <p>{detail.desc}</p>
        </div>
        {/* show footer right */}
        <div className={styles["night-nine"]}>
          <NineNight
            nineNightPrice={detail.cheapestPrice}
            onClick={bookingNowHandler}
          />
        </div>
      </div>
    </>
  );
};
export default DetailInfo;
// {
// 	"name": "Tower Street Apartments",
// 	"address": "Elton St 125 New york",
// 	"distance": "Excellent location - 500m from center",
// 	"price": "Book a stay over $114 at this property and get a free airport taxi",
// 	"photos": [
// 		"./images/hotel_detail_1.jpg",
// 		"./images/hotel_detail_2.jpg",
// 		"./images/hotel_detail_3.jpg",
// 		"./images/hotel_detail_4.jpg",
// 		"./images/hotel_detail_5.jpg",
// 		"./images/hotel_detail_6.jpg"
// 	],
// 	"title": "Stay in the heart of City",
// 	"description": "Located a 5-minute walk from St. Florian's Gate in Krakow, Tower Street Apartments has accommodations with air conditioning and free WiFi.The units come with hardwood floors and feature a fully equipped kitchenette with a microwave, a flat - screen TV, and a private bathroom with shower and a hairdryer.A fridge is also offered, as well as an electric tea pot and a coffee machine.Popular points of interest near the apartment include Cloth Hall, Main Market Square and Town Hall Tower.The nearest airport is John Paul II International Kraków - Balice, 16.1 km from Tower Street Apartments, and the property offers a paid airport shuttle service.",
// 	"nine_night_price": 955
// }

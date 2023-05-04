import { useState, useRef } from "react";
import ButtonBorderRadius from "../../components/buttons/ButtonBorderRadius";
import ReserveInfo from "../../components/input-form/input-form";
import NineNight from "../../components/nine-night/NineNight.jsx";
import styles from "./detail.module.css";
import { diffDate } from "../../util/function";

const Detail = (props) => {
  const [totalCharge, setTotalCharge] = useState(0);
  const [choosedRooms, setChoosedRooms] = useState([]);
  const paymentRef = useRef();
  const numOfDate = diffDate(
    props.bookingDate.fromDate,
    props.bookingDate.toDate
  );

  const detail = props.detail.hotels;
  const rooms = detail.rooms;

  // checkBoxHandler responsible for caculating total charge and room number that user is choosed.
  const checkBoxHandler = (e) => {
    if (e.target.checked) {
      setChoosedRooms((pre) => {
        return [...pre, +e.target.value];
      });
      setTotalCharge(
        totalCharge +
          +e.target.dataset.price * (numOfDate !== 0 ? numOfDate : 1)
      );
    } else {
      const roomsFilter = choosedRooms.filter(
        (roomN) => roomN !== +e.target.value
      );
      setChoosedRooms([...roomsFilter]);
      setTotalCharge(
        totalCharge -
          +e.target.dataset.price * (numOfDate !== 0 ? numOfDate : 1)
      );
    }
  };
  console.log("CHECK ROOMS : ", choosedRooms);
  // loop the type of room and show all room of number they have
  const showRooms = rooms.map((room, index) => {
    const roomId = room.roomId;
    const roomNumbers = roomId.roomNumbers;
    const showRoomNumbers = roomNumbers.map((roomNo, index) => {
      return (
        <div className={styles["checkbox"]} key={index}>
          <label htmlFor={roomNo}>{roomNo}</label>
          <input
            id={roomNo}
            type="checkbox"
            key={roomNo}
            value={roomNo}
            data-price={roomId.price}
            onClick={checkBoxHandler}
          />
        </div>
      );
    });
    return (
      <div className={styles["room-detail"]} key={index}>
        <div className={styles["left"]}>
          <h3>{roomId.title}</h3>
          <div className={styles["valid"]}>{roomId.desc}</div>
          <h5>
            Max people: <span>{roomId.maxPeople}</span>
          </h5>
          <h3>${roomId.price}</h3>
        </div>
        <div className={styles["right"]}>{showRoomNumbers}</div>
      </div>
    );
  });
  const reserveHandler = () => {
    //reserveHandler = (rooms, rangeDate, totalCharge, payment)
    props.onReserve(choosedRooms, totalCharge, paymentRef.current.value);
  };
  return (
    <>
      {/* show header of detail content */}
      <div className={styles["infor-header"]}>
        {/* show header left */}
        <div className={styles["infor-header-content"]}>
          <h1>{detail.title}</h1>
          <p>{detail.desc}</p>
        </div>
        {/* show header right */}
        <div className={styles["night-nine"]}>
          <NineNight nineNightPrice={detail.cheapestPrice} />
        </div>
      </div>
      {/* Form input */}
      <div className={styles["input-form-container"]}>
        <ReserveInfo
          bookingDate={props.bookingDate}
          onSearch={props.onSearch}
          onGetInfoUser={props.onGetInfoUser}
        />
      </div>
      {/* Show footer */}
      <div className={styles["footer-container"]}>
        <h2>Select Rooms</h2>
        <div className={styles["room-container"]}>{showRooms}</div>
        <div className={styles["billing"]}>
          <h2>Total Bill: $ {totalCharge}</h2>
          <div className={styles["control"]}>
            <select ref={paymentRef}>
              <option>Select payment method</option>
              <option>Cash</option>
              <option>Credit card</option>
            </select>
            <ButtonBorderRadius text={"Reserve Now"} onClick={reserveHandler} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;

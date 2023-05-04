import { DateRange } from "react-date-range";
import classes from "./input-form.module.css";
import { useEffect, useRef, useState } from "react";
import ChildrenBlur from "../children-blur/ChildrenBlur";

const ReserveInfo = (props) => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const cardIdRef = useRef();

  // control selection date state
  const [state, setState] = useState([
    {
      startDate: new Date(props.bookingDate.fromDate),
      endDate: new Date(props.bookingDate.toDate),
      key: "selection",
    },
  ]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fullNameRef.current.value = user.fullName;
    emailRef.current.value = user.email;
    phoneRef.current.value = user.phoneNumber;
    cardIdRef.current.value = user.idCard;
    fullNameRef.current.focus();
  }, []);

  // handle onChange Date-range
  const onChangeDateRangeHandler = (item) => {
    setState([item.selection]);
  };
  // handle show Date-range
  const onShowDateChangeHandler = () => {
    if (state[0].startDate === state[0].endDate) {
      alert("dateStart & dateEnd is not same date");
      return;
    }
    props.onSearch(state[0]);
  };
  const userInfoHandler = () => {
    const userInfo = {
      fullName: fullNameRef.current.value,
      phoneNumber: phoneRef.current.value,
      idCard: cardIdRef.current.value,
    };
    props.onGetInfoUser(userInfo);
  };
  return (
    <div className={classes["form-control"]}>
      <div className={classes["date-range"]}>
        {/* <div className={styles[`${toggleDateRange ? "visible" : ""}`]}> */}
        <h3>Dates</h3>
        <ChildrenBlur onBlur={onShowDateChangeHandler}>
          <DateRange
            editableDateInputs={true}
            onChange={onChangeDateRangeHandler}
            moveRangeOnFirstSelection={false}
            ranges={state}
            //   className={classes[toggleDateRange ? "date-range" : "visible"]}
            minDate={new Date()}
            // rangeColors={["red"]}
          />
        </ChildrenBlur>
      </div>

      <div className={classes["form-input"]} onBlur={userInfoHandler}>
        <h3>Reserve Info</h3>
        <label htmlFor="fullname">Your Full Name: </label>
        <input
          type="text"
          id="fullname"
          placeholder="Full Name"
          ref={fullNameRef}
        />
        <label htmlFor="youremail">Your Email: </label>
        <input
          type="email"
          id="youremail"
          placeholder="Email"
          ref={emailRef}
          disabled
        />
        <label htmlFor="phone">Phone Number: </label>
        <input
          type="text"
          id="phone"
          placeholder="Phone Number"
          ref={phoneRef}
        />
        <label htmlFor="cartId">Your Identity Cart Number: </label>
        <input
          type="text"
          id="cartId"
          placeholder="Card Number"
          ref={cardIdRef}
        />
      </div>
    </div>
  );
};
export default ReserveInfo;

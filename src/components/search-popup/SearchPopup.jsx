import Button from "../buttons/Button";
import styles from "./SearchPopup.module.css";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HTTP from "../../custom-hook/http";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { getNameCities } from "../../api/city";

const SearchPopup = (props) => {
  const { data, error, status, sendRequest } = HTTP(getNameCities);
  const nav = useNavigate();

  const { des, fromDate, toDate, adult, children, numberOfRoom } =
    props.dataSearch;

  // control toggleDateRang state
  const [toggleDateRange, setToggleDateRange] = useState(false);
  const placeRef = useRef();
  const adultRef = useRef();
  const childrenRef = useRef();
  const roomRef = useRef();
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  useEffect(() => {
    placeRef.current.value = des;
    adultRef.current.value = adult;
    childrenRef.current.value = children;
    roomRef.current.value = numberOfRoom;
  }, [des, adult, children, numberOfRoom, data]);

  // set city into select element
  let citiesOption;
  if (status === "completed" && data && data.message === "ok") {
    citiesOption = data.cities.map((city, index) => {
      return (
        <option key={index} value={city._id}>
          {city.name}
        </option>
      );
    });
  }

  // control selection date state
  const [state, setState] = useState([
    {
      startDate: new Date(fromDate),
      endDate: new Date(toDate),
      key: "selection",
    },
  ]);
  // formatDate function
  const formatDate = (showDateState) => {
    return (
      showDateState.getDate() +
      " / " +
      (Number(showDateState.getMonth()) + 1) +
      " / " +
      showDateState.getFullYear()
    );
  };
  // handler
  const toggleDateRangeHandler = () => {
    setToggleDateRange(!toggleDateRange);
    // alert("click me");
  };
  const onChangeDateRangeHandler = (item) => {
    setState([item.selection]);
    //console.log("CHECK ITEM: ", item.selection);
  };
  // formatDate from Datepicker to set input date
  const startDate = formatDate(state[0].startDate);
  const endDate = formatDate(state[0].endDate);

  //check input empty
  const isEmpty = () => {
    if (placeRef.current.value === "Where are you going?") {
      alert("Please select destination !");
      placeRef.current.focus();
      return true;
    }
    if (roomRef.current.value === "") {
      alert("Please select number of rooms !");
      roomRef.current.focus();
      return true;
    }
    if (adultRef.current.value === "") {
      alert("Please select number of adult !");
      adultRef.current.focus();
      return true;
    }
    return false;
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (state[0].startDate === state[0].endDate) {
      alert("dateStart & dateEnd is not same date");
      return;
    }
    if (!isEmpty()) {
      nav(
        `/search?place=${placeRef.current.value}&fromDate=${state[0].startDate}&toDate=${state[0].endDate}&adult=${adultRef.current.value}&children=${childrenRef.current.value}&room=${roomRef.current.value}`
      );
      const dataSearch = {
        des: placeRef.current.value,
        fromDate: state[0].startDate,
        toDate: state[0].endDate,
        adult: adultRef.current.value,
        children: childrenRef.current.value,
        numberOfRoom: roomRef.current.value,
      };
      props.onSearch(dataSearch);
    }
  };

  return (
    <div className={styles["popup-container"]}>
      <h3>Search</h3>
      <form onSubmit={searchHandler}>
        <label className={styles["lbl-dest"]}>Destination</label>
        {/* <input className={styles["input-dest"]} type="text" ref={placeRef} /> */}
        <select className={styles.selection} ref={placeRef}>
          <option>Where are you going?</option>
          {citiesOption}
        </select>
        <label className={styles["lbl-date"]} htmlFor="">
          Check-in date
        </label>
        <div
          className={styles["date-range-container"]}
          onClick={toggleDateRangeHandler}
        >
          <input
            className={styles["input-date"]}
            type="text"
            value={`${startDate} to ${endDate}`}
          />
        </div>
        <DateRange
          editableDateInputs={true}
          onChange={onChangeDateRangeHandler}
          moveRangeOnFirstSelection={false}
          ranges={state}
          className={styles[toggleDateRange ? "date-range" : "visible"]}
          minDate={new Date()}
          // rangeColors={["red"]}
        />

        <label className={styles["lbl-option"]} htmlFor="">
          Option
        </label>
        <div className={styles["options"]}>
          <label htmlFor="minPrice">Min price per night</label>
          <input type="number" id="minPrice" max={99} min={0} />
          <label htmlFor="maxPrice">Max price per night</label>
          <input type="number" id="maxPrice" max={99} min={0} />
          <label htmlFor="adult">Adult</label>
          <input type="number" id="adult" ref={adultRef} max={99} min={0} />
          <label htmlFor="children">Children</label>
          <input
            type="number"
            id="children"
            ref={childrenRef}
            max={99}
            min={0}
          />
          <label htmlFor="room">Room</label>
          <input type="number" id="room" ref={roomRef} max={99} min={1} />
        </div>
        <Button text="Search" onClick={searchHandler} />
      </form>
    </div>
  );
};
export default SearchPopup;

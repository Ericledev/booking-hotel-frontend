import styles from "./SearchBar.module.css";
import Button from "../../../../components/buttons/Button";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HTTP from "../../../../custom-hook/http";
import { getNameCities } from "../../../../api/city";

const SearchBar = () => {
  const { data, status, sendRequest } = HTTP(getNameCities);
  // control toggleDateRang state
  const [toggleDateRange, setToggleDateRange] = useState(false);
  const placeRef = useRef();
  const adultRef = useRef();
  const childrenRef = useRef();
  const roomRef = useRef();
  const nav = useNavigate();
  // control selection date state
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // get cities from DB push into select
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
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

  //check input
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

  // search handler
  const searchHandler = () => {
    if (state[0].startDate.toString() === state[0].endDate.toString()) {
      alert("dateStart & dateEnd is not same date");
      return;
    }
    if (!isEmpty()) {
      nav(
        `/search?place=${placeRef.current.value}&fromDate=${state[0].startDate}&toDate=${state[0].endDate}&adult=${adultRef.current.value}&children=${childrenRef.current.value}&room=${roomRef.current.value}`
      );
    }
  };
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
  };

  const onChangeDateRangeHandler = (item) => {
    setState([item.selection]);
  };
  const startDate = formatDate(state[0].startDate);
  const endDate = formatDate(state[0].endDate);

  return (
    <div className={styles["search-container"]}>
      <div>
        <i className="fa fa-bed"></i>
        <select className={styles.selection} ref={placeRef}>
          <option>Where are you going?</option>
          {citiesOption}
        </select>
      </div>
      <div
        className={styles["date-range-container"]}
        onClick={toggleDateRangeHandler}
      >
        <i className="fa fa-calendar"></i>
        {startDate} to {endDate}
      </div>
      <div className={styles.searchInfo}>
        <i className="fa fa-female"></i>
        adult <input type="number" max="99" min={0} ref={adultRef} /> ∙ children{" "}
        <input type="number" max={99} min={0} ref={childrenRef} /> ∙ room{" "}
        <input type="number" max={99} min={1} ref={roomRef} />
      </div>
      <Button text="Search" onClick={searchHandler} />
      {/* <div className={styles[`${toggleDateRange ? "visible" : ""}`]}> */}
      <DateRange
        editableDateInputs={true}
        onChange={onChangeDateRangeHandler}
        moveRangeOnFirstSelection={false}
        ranges={state}
        className={styles[toggleDateRange ? "date-range" : "visible"]}
        minDate={new Date()}
        // rangeColors={["red"]}
      />
    </div>
    // </div>
  );
};

export default SearchBar;

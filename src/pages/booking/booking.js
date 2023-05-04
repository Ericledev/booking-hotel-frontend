import Footer from "../home/footer/Footer";
import NavBar from "../home/navbar/NavBar";
import RegisterForm from "../home/register-form/RegisterForm";
import Detail from "./detail";
import styles from "./booking.module.css";
import HTTP from "../../custom-hook/http";
import { searchRequestAvailableRooms } from "../../api/search";
import transactionRequest from "../../api/transaction";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Booking = () => {
  const nav = useNavigate();
  console.log(process.env.SERVER_BASE_URL);
  const { error, data, status, sendRequest } = HTTP(
    searchRequestAvailableRooms
  );

  const resultTrans = HTTP(transactionRequest);

  // get rangeDate from rangeDatePicker
  const [searchParams] = useSearchParams();
  let userInfo = { fullName: "", phoneNumber: "", idCard: "" };
  const hotelId = searchParams.get("hotelId");
  let fromDate = searchParams.get("fromDate");
  let toDate = searchParams.get("toDate");

  //console.log("CHECK data: ", data);
  useEffect(() => {
    sendRequest({ hotelId, fromDate, toDate });
  }, [sendRequest]);

  // send request to search hotel by hotel, date to find empty rooms
  const searchHanlder = (rangeDate, user) => {
    fromDate = rangeDate.startDate;
    toDate = rangeDate.endDate;
    searchParams.set("fromDate", fromDate);
    searchParams.set("toDate", toDate);
    sendRequest({ hotelId, fromDate: fromDate, toDate: toDate });
  };

  // send request to create transaction & update user to server
  const reserveHandler = async (rooms, totalCharge, payment) => {
    // check input empty
    if (
      userInfo.fullName.trim() === "" ||
      userInfo.phoneNumber.trim() === "" ||
      userInfo.idCard.trim() === ""
    ) {
      alert("Please input all infomation of user.");
      return;
    }
    if (rooms.length === 0) {
      alert("Please choose the room of number.");
      return;
    }
    if (payment === "Select payment method") {
      alert("Please choose the payment method.");
      return;
    }
    // send req to server
    const sendData = {
      user: JSON.parse(localStorage.getItem("user")).userId,
      userInfo: userInfo,
      hotel: hotelId,
      room: rooms,
      dateStart: fromDate,
      dateEnd: toDate,
      price: totalCharge,
      payment: payment,
    };
    resultTrans.sendRequest(sendData);

    // update user to localStorage
    const userLocal = JSON.parse(localStorage.getItem("user"));
    userLocal.fullName = userInfo.fullName;
    userLocal.idCard = userInfo.idCard;
    userLocal.phoneNumber = userInfo.phoneNumber;
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(userLocal));
  };

  if (resultTrans.data !== null && resultTrans.data.message === "ok") {
    nav("/transaction");
  }
  const getUserInfoHandler = (user) => {
    userInfo = { ...user };
  };
  return (
    <>
      {/* Show NavBar */}
      <NavBar />
      {/* Show content of detail */}
      <div className={styles["detail-container"]}>
        <div className={styles["detail-content"]}>
          {data && (
            <Detail
              detail={data}
              bookingDate={{ fromDate, toDate }}
              onSearch={searchHanlder}
              onReserve={reserveHandler}
              onGetInfoUser={getUserInfoHandler}
            />
          )}
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

export default Booking;

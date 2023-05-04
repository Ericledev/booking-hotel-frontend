import styles from "./transaction.module.css";
import Table from "../../components/table/table";
import NavBar from "../home/navbar/NavBar";
import RegisterForm from "../home/register-form/RegisterForm";
import Footer from "../home/footer/Footer";
import HTTP from "../../custom-hook/http";
import { getTransactionByUserId } from "../../api/transaction";
import { useEffect } from "react";
const Transaction = () => {
  const { data, error, status, sendRequest } = HTTP(getTransactionByUserId);
  useEffect(() => {
    sendRequest(JSON.parse(localStorage.getItem("user")).userId);
  }, [sendRequest]);
  console.log("CHECK data trans: ", data);
  return (
    <>
      {/* Show NavBar */}
      <NavBar />
      {/* Show table */}
      <div className={styles["detail-container"]}>
        <div className={styles["detail-content"]}>
          {error && <div>{error}</div>}
          {status === "pending" && <div>Loading...</div>}
          {data && data.message === "ok" && <Table data={data.trans} />}
        </div>
      </div>
      {/* Show RegisterForm & Footer */}
      <RegisterForm />
      <Footer />
    </>
  );
};
export default Transaction;

import styles from "./table.module.css";
import { formatDate } from "../../util/function";
import { endOfDay } from "date-fns";
const Table = (props) => {
  const trans = props.data;
  let showTrans;
  if (trans.length > 0) {
    showTrans = trans.map((tran, index) => {
      // format input date dd/mm/yyyy
      const fromDate = formatDate(tran.dateStart);
      const toDate = formatDate(tran.dateEnd);
      // style the status
      let stypeAcitve;
      if (tran.status === "Booked") {
        stypeAcitve = "pink";
      } else if (tran.status === "Checkin") {
        stypeAcitve = "green";
      } else {
        stypeAcitve = "purple";
      }

      return (
        <tr key={index}>
          <td>{index + 1 < 10 ? "0" + (index + 1) : index + 1}</td>
          <td>{tran.hotel.name}</td>
          <td>{tran.room.toString()}</td>
          <td>
            {fromDate} - {toDate}
          </td>
          <td>$ {tran.price}</td>
          <td>{tran.payment}</td>
          <td className={styles.status}>
            <span className={styles[stypeAcitve]}>{tran.status}</span>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <h2>Your transaction</h2>
      <table>
        <tr>
          <th>#</th>
          <th>Hotel</th>
          <th>Room</th>
          <th>Date</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
        {showTrans}
      </table>
    </>
  );
};
export default Table;

import styles from "./Col.module.css";

const Col = (props) => {
  const colContent = props.col.col_values.map((item, index) => {
    return (
      <li key={index} className={styles["list-li"]}>
        <a href="/">{item}</a>
      </li>
    );
  });
  return colContent;
};
export default Col;

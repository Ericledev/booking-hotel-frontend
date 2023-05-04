import styles from "./Footer.module.css";
import footer from "../../../data/footer.json";
import Col from "./cols-list/Col";

// Create Footer component
const Footer = () => {
  // render the list of link items
  const content = footer.map((col, index) => (
    <ul key={index} className={styles[`column-${index + 1}`]}>
      <Col col={col} />
    </ul>
  ));

  return (
    <div className={styles["footer-container"]}>
      <div className={styles["footer-content"]}>{content}</div>
    </div>
  );
};
export default Footer;

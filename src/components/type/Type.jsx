import styles from "./Type.module.css";

const Type = (props) => {
  const type = props.type;
  return (
    <div className={styles["type"]}>
      <img src={type.image} alt="type of hotel" />
      <label>
        <h2 className="name">{type.name}</h2>
        <h4 className="count">
          <span>{type.count}</span>
        </h4>
      </label>
    </div>
  );
};
export default Type;

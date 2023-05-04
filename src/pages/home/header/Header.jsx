import styles from "./Header.module.css";
import Button from "../../../components/buttons/Button";
import SearchBar from "./search-bar/SearchBar";

// Create Header component
const Header = () => {
  return (
    // create Header using Button & SearchBar component that is builded seperate in the component folder
    <div className={styles["header-container"]}>
      <div className={styles["header-content"]}>
        <h1>A lifttime of discount? It's Genius</h1>
        <p>
          Get rewarded for your travels - unlock instant saving of 10% or more
          with a free account
        </p>
        {/* Insert Button component from component Folder */}
        <Button text="Sign in / Register" />
      </div>
      {/* Insert SearchBar component from component Folder */}
      <SearchBar />
    </div>
  );
};
export default Header;

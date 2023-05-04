import styles from "./SearchList.module.css";
import SearchHotel from "./search-hotel/SearchHotel";

// Create SearchList component
const SearchList = (props) => {
  const searchList = props.data;

  // Render the list of hotels with detail
  const searchListContent = searchList.map((hotel, index) => (
    <SearchHotel key={index} hotel={hotel.hotel} />
  ));

  return (
    <div className={styles["search-list-container"]}>
      <div className={styles["search-list-content"]}>{searchListContent}</div>
    </div>
  );
};
export default SearchList;

import SearchList from "../../components/search-list/SearchList";
import SearchPopup from "../../components/search-popup/SearchPopup";
import Footer from "../home/footer/Footer";
import NavBar from "../home/navbar/NavBar";
import RegisterForm from "../home/register-form/RegisterForm";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
import HTTP from "../../custom-hook/http";
import { useEffect } from "react";
import searchRequest from "../../api/search";

const Search = (props) => {
  const [searchParams] = useSearchParams();
  const { error, data, status, sendRequest } = HTTP(searchRequest);

  // get params from URL
  const place = searchParams.get("place");
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");
  const adult = searchParams.get("adult");
  const children = searchParams.get("children");
  const room = searchParams.get("room");
  // create object dataSearch to send to server
  const dataSearch = {
    des: place,
    fromDate,
    toDate,
    adult,
    children,
    numberOfRoom: room,
  };

  useEffect(() => {
    sendRequest(dataSearch);
  }, [sendRequest]);

  const searchHandler = (data) => {
    sendRequest(data);
  };

  return (
    <>
      {/* show NavBar */}
      <NavBar />
      {/* show content of Search page */}
      <div className={styles["search-container"]}>
        <div className={styles["search-content"]}>
          <div className={styles["search-popup"]}>
            {/* show Popup in the right of content Search */}
            <SearchPopup dataSearch={dataSearch} onSearch={searchHandler} />
          </div>
          <div className={styles["search-list"]}>
            {/* show list hotels in the left of content */}
            {data && data.length > 0 ? (
              <SearchList data={data} />
            ) : (
              status !== "pending" && (
                <div style={{ margin: "0px auto", color: "red" }}>
                  Hotel not found!
                </div>
              )
            )}
            {status === "pending" && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
      {/* show Footer & register form */}
      <RegisterForm />
      <Footer />
    </>
  );
};

export default Search;

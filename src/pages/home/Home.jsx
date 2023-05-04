import NavBar from "./navbar/NavBar";
import Header from "./header/Header";
import CitiesList from "./cities-list/CitiesList";
import HotelsList from "./hotels-list/HotelsList";
import TypeOfHotelsList from "./type-of-hotels-list/TypeOfHotelsList";
import RegisterForm from "./register-form/RegisterForm";
import Footer from "./footer/Footer";
import styles from "./Home.module.css";
const Home = (props) => {
  return (
    <div className={styles["container"]}>
      {/* Show NavBar */}
      <NavBar />
      {/* Show Header */}
      <Header />
      {/* Show content of Home page with list of Cities, Hotel & Type of Hotel */}
      <CitiesList />
      <TypeOfHotelsList />
      <HotelsList />
      {/* Show register form */}
      <RegisterForm />
      {/* Show footer */}
      <Footer />
    </div>
  );
};

export default Home;

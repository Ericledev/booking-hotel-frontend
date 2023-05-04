import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Booking from "./pages/booking/booking";
import Transaction from "./pages/transaction/transaction";
import { useContext } from "react";
import AuthContext from "./store/authConext";

function App() {
  const ctx = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/hotel/detail/:id" element={<Detail />} />
        {ctx.isLoggedIn && <Route path="/booking" element={<Booking />} />}
        {ctx.isLoggedIn && (
          <Route path="/transaction" element={<Transaction />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

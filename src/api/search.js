import setHeader from "./set_hearder_auth";
const searchRequest = async (dataSearch) => {
  //console.log("API SEARCH: ", dataSearch);
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //application/x-www-form-urlencoded
        },
        body: JSON.stringify({
          des: dataSearch.des,
          fromDate: dataSearch.fromDate,
          toDate: dataSearch.toDate,
          numberOfRoom: +dataSearch.numberOfRoom,
          numberOfPeople: +dataSearch.adult,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Request is fail");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const searchRequestAvailableRooms = async (dataSearch) => {
  //console.log("API SEARCH: ", dataSearch);
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/room/search`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json", //application/x-www-form-urlencoded
        }),
        body: JSON.stringify({
          hotelId: dataSearch.hotelId,
          fromDate: dataSearch.fromDate,
          toDate: dataSearch.toDate,
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Request is fail");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default searchRequest;

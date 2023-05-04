const getHotelTopRate = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/top-rating`
    );
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
export const getHotelById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/detail/${id}`
    );
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
export default getHotelTopRate;

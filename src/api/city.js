const getCities = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/hotel`);
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
export default getCities;

export const getNameCities = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/city`);
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};

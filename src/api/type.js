const getTypes = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/type`);
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
export default getTypes;

import setHeader from "./set_hearder_auth";

const verifyExpire = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}`, {
    method: "GET",
    headers: setHeader({
      "Content-Type": "application/json",
    }),
  });
  return res.json();
};

export default verifyExpire;

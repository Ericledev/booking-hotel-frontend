const setHeader = (option) => {
  if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    return { ...option, authorization: user.token };
  }
  return { ...option };
};
export default setHeader;

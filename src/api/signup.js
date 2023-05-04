const signupRequest = async (user) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
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
export default signupRequest;

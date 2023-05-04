import { useCallback, useReducer } from "react";

const initalState = {
  status: null,
  data: null,
  error: null,
};
const dispatchFunc = (state, action) => {
  switch (action.type) {
    case "SENDING":
      return {
        status: "pending",
        data: null,
        error: null,
      };
    case "SUCCEED":
      return {
        status: "completed",
        data: action.payload,
        error: null,
      };
    case "ERROR":
      return {
        status: "completed",
        data: null,
        error: action.payload,
      };

    default:
      return { ...state };
  }
};

const HTTP = (reqFunc) => {
  const [httpState, dispatch] = useReducer(dispatchFunc, initalState);

  const sendRequest = useCallback(
    async (dataRequest) => {
      dispatch({ type: "SENDING" });
      try {
        const data = await reqFunc(dataRequest);
        dispatch({ type: "SUCCEED", payload: data });
      } catch (error) {
        dispatch({ type: "ERROR", payload: error });
      }
    },
    [reqFunc]
  );
  return { ...httpState, sendRequest };
};
export default HTTP;

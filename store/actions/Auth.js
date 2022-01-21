import requestBody from "../../Components/RequestBody/RequestFunction";
import Messages from "../../messages/Messages";

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const RESET_TOKEN = "RESET_TOKEN";
export const ON_ERROR = "ON_ERROR";

export const signIn = (
  method,
  link,
  action,
  body,
  headers,
  userName,
  passWord,
  brokerImage
) => {
  return async (dispatch) => {
    try {
      const resData = await requestBody(method, link, action, body, headers);

      if (resData.status === 200) {
        if (resData.data.description === "success") {
          dispatch({
            type: SIGN_IN,
            token: resData.data.data,
            userName,
            passWord,
            brokerImage,
            link,
          });
          return "Success";
        } else if (
          resData.data.description === "javascriptUsernameAndPasswordMismatch"
        ) {
          dispatch({
            type: RESET_TOKEN,
          });
          throw resData.data.data;
        } else if (resData.data.description === "javascriptUserLocked") {
          dispatch({
            type: RESET_TOKEN,
          });
          throw resData.data.data;
        }
      } else {
        dispatch({
          type: RESET_TOKEN,
        });

        throw Messages.unknownErrorDescription;
      }
    } catch (e) {
      dispatch({
        type: RESET_TOKEN,
      });
      throw e;
    }
  };
};

export const signOut = () => {
  return {
    type: RESET_TOKEN,
  };
};

export const erroHandler = () => {
  console.log("err");
  return {
    type: ON_ERROR,
    err: true,
  };
};

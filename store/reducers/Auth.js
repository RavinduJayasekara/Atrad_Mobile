import { SIGN_IN, SIGN_OUT, RESET_TOKEN, ON_ERROR } from "../actions/Auth";

const initialState = {
  token: null,
  isAuthenticated: false,
  onError: false,
  userName: "",
  passWord: "",
  brokerImage: "",
  brokerUrl: "",
  err: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        userName: action.userName,
        passWord: action.passWord,
        brokerImage: action.brokerImage,
        brokerUrl: action.link,
      };
    case SIGN_OUT:
      return initialState;
    case RESET_TOKEN:
      return initialState;
    case ON_ERROR:
      return { ...state, err: action.err };
  }
  return state;
};

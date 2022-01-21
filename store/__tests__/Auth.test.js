import ReduxThunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import fetchMock from "jest-fetch-mock";
import { signIn } from "../actions/Auth";

const middleWare = [ReduxThunk];
const mockStore = configureMockStore(middleWare);

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

describe("User authorization", () => {
  it("Server is down!", () => {
    const username = "ravindu";
    const password = "Password@1";
    const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    fetch.mockReject(() => Promise.reject("API is down."));
    const store = mockStore({
      token: null,
      isAuthenticated: false,
      onError: false,
      userName: "",
      passWord: "",
      brokerImage: "",
      brokerUrl: "",
    });
    return store
      .dispatch(
        signIn(
          "POST",
          "http://192.168.25.36:8080/atsweb/",
          "login",
          body,
          headers,
          "ravindu",
          "Password@1",
          "https://atrad.lk/images/logos/NDBS.png"
        )
      )
      .catch((result) => {
        console.log(result);
        expect(result).toEqual("Request Time Out");
      });
  });

  it("Sign in!", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        code: "0",
        description: "success",
        data: "success",
        role: "AdvisorViewer",
        watchID: "17789",
        broker_code: "NBS",
        is_dvp_enabled: "true",
      })
    );

    const username = "iotravindu";
    const password = "2aV$7cL<";
    const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const store = mockStore({
      token: null,
      isAuthenticated: false,
      onError: false,
      userName: "",
      passWord: "",
      brokerImage: "",
      brokerUrl: "",
    });
    return store
      .dispatch(
        signIn(
          "POST",
          "https://online.ndbs.lk/atsweb/",
          "login",
          body,
          headers,
          username,
          password,
          "https://atrad.lk/images/logos/NDBS.png"
        )
      )
      .then((result) => {
        console.log(result);
        expect(result).toEqual("Success");
      });
  });

  it("Username is not valid", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        code: "1100",
        description: "javascriptUsernameAndPasswordMismatch",
        data: "The credentials you entered are invalid",
      })
    );

    const username = "iotravindu";
    const password = "2aV$7cL<";
    const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const store = mockStore({
      token: null,
      isAuthenticated: false,
      onError: false,
      userName: "",
      passWord: "",
      brokerImage: "",
      brokerUrl: "",
    });
    return store
      .dispatch(
        signIn(
          "POST",
          "https://online.ndbs.lk/atsweb/",
          "login",
          body,
          headers,
          username,
          password,
          "https://atrad.lk/images/logos/NDBS.png"
        )
      )
      .catch((result) => {
        console.log(result);
        expect(result).toEqual("The credentials you entered are invalid");
      });
  });

  it("Password is not valid!", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        code: "1100",
        description: "javascriptUsernameAndPasswordMismatch",
        data: "The credentials you entered are invalid",
      })
    );

    const username = "iotravindu";
    const password = "2aV$7cL<1";
    const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const store = mockStore({
      token: null,
      isAuthenticated: false,
      onError: false,
      userName: "",
      passWord: "",
      brokerImage: "",
      brokerUrl: "",
    });
    store
      .dispatch(
        signIn(
          "POST",
          "https://online.ndbs.lk/atsweb/",
          "login",
          body,
          headers,
          username,
          password,
          "https://atrad.lk/images/logos/NDBS.png"
        )
      )
      .catch((result) => {
        console.log(result);
        expect(result).toEqual("The credentials you entered are invalid");
      });
  });

  it("User is locked!", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        code: "4200",
        description: "javascriptUserLocked",
        data: "User Account is Locked.Please Contact your System Administrator",
      })
    );

    const username = "iotravindu";
    const password = "2aV$7cL<";
    const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const store = mockStore({
      token: null,
      isAuthenticated: false,
      onError: false,
      userName: "",
      passWord: "",
      brokerImage: "",
      brokerUrl: "",
    });
    return store
      .dispatch(
        signIn(
          "POST",
          "https://online.ndbs.lk/atsweb/",
          "login",
          body,
          headers,
          username,
          password,
          "https://atrad.lk/images/logos/NDBS.png"
        )
      )
      .catch((result) => {
        console.log(result);
        expect(result).toEqual(
          "User Account is Locked.Please Contact your System Administrator"
        );
      });
  });

  it("First Sign In", () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        code: "4200",
        description: "javascriptUserLocked",
        data: "User Account is Locked.Please Contact your System Administrator",
      })
    );

    const username = "iotravindu";
    const password = "2aV$7cL<";
    const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const store = mockStore({
      token: null,
      isAuthenticated: false,
      onError: false,
      userName: "",
      passWord: "",
      brokerImage: "",
      brokerUrl: "",
    });
    return store
      .dispatch(
        signIn(
          "POST",
          "https://online.ndbs.lk/atsweb/",
          "login",
          body,
          headers,
          username,
          password,
          "https://atrad.lk/images/logos/NDBS.png"
        )
      )
      .catch((result) => {
        console.log(result);
        expect(result).toEqual(
          "User Account is Locked.Please Contact your System Administrator"
        );
      });
  });
});

// import ReduxThunk from "redux-thunk";
// import configureMockStore from "redux-mock-store";
// import fetchMock from "jest-fetch-mock";
// // import fetchMock from "jest-fetch-mock";
// // import { convert } from "./convert";

// // fetchMock.enableMocks();

// // beforeEach(() => {
// //   fetch.resetMocks();
// // });

// // it("finds exchange", async () => {
// //   fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));

// //   const rate = await convert("USD", "CAD");

// //   expect(rate).toEqual(1.42);
// //   expect(fetch).toHaveBeenCalledTimes(1);
// // });

// // it("returns null when exception", async () => {
// //   fetch.mockReject(() => Promise.reject("API is down"));

// //   const rate = await convert("USD", "CAD");

// //   expect(rate).toEqual(null);
// //   expect(fetch).toHaveBeenCalledWith(
// //     "https://api.exchangeratesapi.io/latest?base=USD"
// //   );
// // });

// const middleWare = [ReduxThunk];
// const mockStore = configureMockStore(middleWare);

// import * as authActions from "../store/actions/Auth";

// fetchMock.enableMocks();

// beforeEach(() => {
//   fetch.resetMocks();
// });

// test("First sign in!", () => {
//   fetch.mockResponseOnce("Success");

//   const username = "iotravindu";
//   const password = "2aV$7cL<";
//   const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
//   const headers = {
//     Accept: "*/*",
//     "Content-Type": "application/x-www-form-urlencoded",
//   };
//   const store = mockStore({
//     token: null,
//     isAuthenticated: false,
//     onError: false,
//     userName: "",
//     passWord: "",
//     brokerImage: "",
//     brokerUrl: "",
//   });
//   store
//     .dispatch(
//       authActions.signIn(
//         "POST",
//         "https://online.ndbs.lk/atsweb/",
//         "login",
//         body,
//         headers,
//         username,
//         password,
//         "https://atrad.lk/images/logos/NDBS.png"
//       )
//     )
//     .then(() => {
//       expect(result).toEqual("Success");
//     });
// });

// // test("Server is down!", () => {
// //   const username = "ravindu";
// //   const password = "Password@1";
// //   const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
// //   const headers = {
// //     Accept: "*/*",
// //     "Content-Type": "application/x-www-form-urlencoded",
// //   };
// //   fetchMock.mockReject(() => Promise.reject("API is down."));
// //   const expectedActions = [{ type: SIGN_IN }];
// //   const store = mockStore({
// //     token: null,
// //     isAuthenticated: false,
// //     onError: false,
// //     userName: "",
// //     passWord: "",
// //     brokerImage: "",
// //     brokerUrl: "",
// //   });
// //   return store
// //     .dispatch(
// //       signIn(
// //         "POST",
// //         "http://192.168.25.36:8080/atsweb/",
// //         "login",
// //         body,
// //         headers,
// //         "ravindu",
// //         "Password@1",
// //         "https://atrad.lk/images/logos/NDBS.png"
// //       )
// //     )
// //     .catch((result) => {
// //       expect(result).toEqual("Request Time Out");
// //     });
// // });

// // test("First sign in!", () => {
// //   fetchMock.mockResponseOnce("Success");

// //   const username = "iotravindu";
// //   const password = "2aV$7cL<";
// //   const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
// //   const headers = {
// //     Accept: "*/*",
// //     "Content-Type": "application/x-www-form-urlencoded",
// //   };
// //   const store = mockStore({
// //     token: null,
// //     isAuthenticated: false,
// //     onError: false,
// //     userName: "",
// //     passWord: "",
// //     brokerImage: "",
// //     brokerUrl: "",
// //   });
// //   const result = store.dispatch(
// //     authActions.signIn(
// //       "POST",
// //       "https://online.ndbs.lk/atsweb/",
// //       "login",
// //       body,
// //       headers,
// //       username,
// //       password,
// //       "https://atrad.lk/images/logos/NDBS.png"
// //     )
// //   );
// //   expect(result).toEqual("Success");
// // });

// // test("Username is not valid", () => {
// //   fetchMock.mockResponseOnce("javascriptUsernameAndPasswordMismatch");

// //   const username = "iotravindu";
// //   const password = "2aV$7cL<";
// //   const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
// //   const headers = {
// //     Accept: "*/*",
// //     "Content-Type": "application/x-www-form-urlencoded",
// //   };
// //   const store = mockStore({
// //     token: null,
// //     isAuthenticated: false,
// //     onError: false,
// //     userName: "",
// //     passWord: "",
// //     brokerImage: "",
// //     brokerUrl: "",
// //   });
// //   const result = store.dispatch(
// //     authActions.signIn(
// //       "POST",
// //       "https://online.ndbs.lk/atsweb/",
// //       "login",
// //       body,
// //       headers,
// //       username,
// //       password,
// //       "https://atrad.lk/images/logos/NDBS.png"
// //     )
// //   );
// //   expect(result).toEqual("javascriptUsernameAndPasswordMismatch");
// // });

// // test("Password is not valid!", () => {
// //   fetchMock.mockResponseOnce("javascriptUsernameAndPasswordMismatch");

// //   const username = "iotravindu";
// //   const password = "2aV$7cL<1";
// //   const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
// //   const headers = {
// //     Accept: "*/*",
// //     "Content-Type": "application/x-www-form-urlencoded",
// //   };
// //   const store = mockStore({
// //     token: null,
// //     isAuthenticated: false,
// //     onError: false,
// //     userName: "",
// //     passWord: "",
// //     brokerImage: "",
// //     brokerUrl: "",
// //   });
// //   const result = store.dispatch(
// //     authActions.signIn(
// //       "POST",
// //       "https://online.ndbs.lk/atsweb/",
// //       "login",
// //       body,
// //       headers,
// //       username,
// //       password,
// //       "https://atrad.lk/images/logos/NDBS.png"
// //     )
// //   );
// //   expect(result).toEqual("javascriptUsernameAndPasswordMismatch");
// // });

// // test("User is locked!", () => {
// //   fetchMock.mockResponseOnce("javascriptUserLocked");

// //   const username = "iotravindu";
// //   const password = "2aV$7cL<";
// //   const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
// //   const headers = {
// //     Accept: "*/*",
// //     "Content-Type": "application/x-www-form-urlencoded",
// //   };
// //   const store = mockStore({
// //     token: null,
// //     isAuthenticated: false,
// //     onError: false,
// //     userName: "",
// //     passWord: "",
// //     brokerImage: "",
// //     brokerUrl: "",
// //   });
// //   const result = store.dispatch(
// //     authActions.signIn(
// //       "POST",
// //       "https://online.ndbs.lk/atsweb/",
// //       "login",
// //       body,
// //       headers,
// //       username,
// //       password,
// //       "https://atrad.lk/images/logos/NDBS.png"
// //     )
// //   );
// //   expect(result).toEqual("javascriptUserLocked");
// // });

// data = {
//   id: "89569",
//   security: "TAP.N0000",
//   bookdefid: "1",
//   sector: "2520",
//   bidqty: "980",
//   bidprice: "19.10",
//   askqty: "12,180",
//   askprice: "19.30",
//   tradesize: "500",
//   tradeprice: "19.10",
//   netchange: "-0.10",
//   perchange: "-0.52",
//   highpx: "20.00",
//   lowpx: "19.10",
//   avgprice: "19.34",
//   totvolume: "68,122",
//   totturnover: "1,317,267.60",
//   tottrades: "43",
//   vwap: "19.20",
//   lasttradedtime: "11:41:22.498432",
//   foreignbuys: "",
//   foreignsells: "",
//   companyname: "TAPROBANE HOLDINGS PLC",
//   isnew: "",
//   isammend: "",
//   iscancel: "",
//   tradestatus: "Regular Trading",
//   closingprice: "",
//   marketSegment: "Second",
//   assetClass: "EQUITY",
//   securityType: "CS",
//   AONSide: "null",
//   AONStatus: "null",
//   AONDATE: "null",
// };

data = {
  code: "0",
  description: "success",
  data: {
    userids: [
      {
        clientCode: "NBS/697591974-VN/0",
        clientTitle: "MISS.",
        initials: "L.R.H.",
        firstName: "LAKMINI RAMANI HELENA",
        lastName: "WIJESUNDERA",
        address: "34,THURSTAN ROAD,COLOMBO 03.SRI LANKA",
        isCustodisan: "false",
        exchangeId: "CSE",
        brokerId: "NDB",
        username: "iotravindu",
        advisor: "00046",
        clientacntid: "16",
        telephone: "777395325",
        nic: "697591974V",
      },
    ],
  },
};

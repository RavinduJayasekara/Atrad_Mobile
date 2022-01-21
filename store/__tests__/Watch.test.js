import fetchMock from "jest-fetch-mock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { fetchSecurities, FETCH_SECURITIES } from "../actions/Watch";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

// describe("Watch list test cases", () => {
it("responds when the server is down.", () => {
  fetch.mockReject(() => Promise.reject("API is down."));
  const store = mockStore({
    allSecurities: [],
  });
  return store
    .dispatch(fetchSecurities("http://192.168.25.36:8080/atsweb/"))
    .then((result) => {
      console.log(store.getActions());
    });
});
// });

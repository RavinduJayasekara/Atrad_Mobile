import requestBody from "../../Components/RequestBody/RequestFunction";

export const GET_CLIENTS = "GET_CLIENTS";
export const STORE_CLIENTS = "STORE_CLIENTS";

export const fetchClients = (link, userName) => {
  return async (dispatch) => {
    const response = await requestBody(
      "GET",
      link,
      `order?action=getUserDetails&format=json&market=CSE`,
      "",
      {}
    );

    const response1 = await requestBody(
      "GET",
      link,
      `client?action=getUsersBrokerAndExchange&format=json&username=${userName}`,
      "",
      {}
    );

    // if (response.status === 200 && response1.status === 200) {
    //   dispatch({
    //     type: GET_CLIENTS,
    //     clients: response.data.data.userids,
    //     brokers: response1.data.data.userDetails,
    //   });
    // } else if (response.status === 200 && response1.status !== 200) {
    //   dispatch({
    //     type: GET_CLIENTS,
    //     clients: response.data.data.userids,
    //     brokers: [],
    //   });
    // } else if (response.status !== 200 && response1.status === 200) {
    //   dispatch({
    //     type: GET_CLIENTS,
    //     clients: [],
    //     brokers: response1.data.data.userDetails,
    //   });
    // } else {
    //   dispatch({
    //     type: GET_CLIENTS,
    //     clients: [],
    //     brokers: [],
    //   });
    // }

    

  };
};

export const storeClients = (response, totalQuantity) => {
  return { type: STORE_CLIENTS, clientInfo: response, totQty: totalQuantity };
};

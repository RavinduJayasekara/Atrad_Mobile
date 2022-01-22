import requestBody from "../../Components/RequestBody/RequestFunction";

export const GET_TRADES = "GET_TRADES";
export const GET_INDICES = "GET_INDICES";
export const GET_CSE_UDU = "GET_CSE_UDU";
export const GET_TOTAL = "GET_TOTAL";

export const fetchIndices = (link, date) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        `marketdetails?action=getMarketIndexSummary&format=json&tradeDate=${date}`,
        "",
        {}
      );
      // if (response.status === 200) {
      //   dispatch({
      //     type: GET_INDICES,
      //     indices: response.data.data.index,
      //   });
      // } else {
      //   dispatch({
      //     type: GET_INDICES,
      //     indices: [],
      //   });
      // }
      dispatch({
        type: GET_INDICES,
        indices: { status: response.status, data: response.data.data.index },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchTrades = (link, date) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        `marketdetails?action=getTradeSummary&format=json&tradeDate=${date}&board=ALL`,
        "",
        {}
      );

      // if (response.status === 200) {
      //   dispatch({ type: GET_TRADES, trades: response.data.data.watch });
      // } else {
      //   dispatch({ type: GET_TRADES, trades: [] });
      // }
      dispatch({
        type: GET_TRADES,
        trades: { status: response.status, data: response.data.data.watch },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchCse = (link) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        "marketdetails?action=getTradeStats&format=json",
        "",
        {}
      );

      // if (response.status === 200) {
      //   dispatch({
      //     type: GET_CSE_UDU,
      //     cseInfo: response.data.data,
      //   });
      // } else {
      //   dispatch({
      //     type: GET_CSE_UDU,
      //     cseInfo: {},
      //   });
      // }
      dispatch({
        type: GET_CSE_UDU,
        cseInfo: { status: response.status, data: response.data.data },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchTotal = (link, security) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        `sector?action=getSectorData&format=json&exchange=CSE&sectorId=${security}`,
        "",
        {}
      );

      // if (response.status === 200) {
      //   dispatch({
      //     type: GET_TOTAL,
      //     total: response.data.data.sector[0],
      //   });
      // } else {
      //   dispatch({
      //     type: GET_TOTAL,
      //     total: {},
      //   });
      // }

      dispatch({
        type: GET_TOTAL,
        total: { status: response.status, data: response.data.data.sector[0] },
      });
    } catch (error) {
      throw error;
    }
  };
};

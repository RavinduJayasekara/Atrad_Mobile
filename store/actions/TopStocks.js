import requestBody from "../../Components/RequestBody/RequestFunction";

export const GET_GAINERS = "GET_GAINERS";
export const GET_LOSERS = "GET_LOSERS";
export const GET_TURNOVER = "GET_TURNOVER";
export const GET_SHAREVOLUME = "GET_SHAREVOLUME";

export const fetchGainers = (link) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        "watch?action=topGainers&format=json&size=10&exchange=CSE&bookDefId=1",
        "",
        {}
      );
      dispatch({
        type: GET_GAINERS,
        gainers: { status: response.status, data: response.data.data.watch },
      });
    } catch (e) {
      throw e;
    }
  };
};

export const fetchLosers = (link) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        "watch?action=topLosers&format=json&size=10&exchange=CSE&bookDefId=1",
        "",
        {}
      );
      dispatch({
        type: GET_LOSERS,
        losers: { status: response.status, data: response.data.data.watch },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchTurnover = (link) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        "watch?action=topTurnOver&format=json&size=10&exchange=CSE&bookDefId=1",
        "",
        {}
      );
      dispatch({
        type: GET_TURNOVER,
        turnover: { status: response.status, data: response.data.data.watch },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const fetchVolume = (link) => {
  return async (dispatch) => {
    try {
      const response = await requestBody(
        "GET",
        link,
        "watch?action=topShareVolume&format=json&size=10&exchange=CSE&bookDefId=1",
        "",
        {}
      );
      dispatch({
        type: GET_SHAREVOLUME,
        sharevolume: {
          status: response.status,
          data: response.data.data.watch,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

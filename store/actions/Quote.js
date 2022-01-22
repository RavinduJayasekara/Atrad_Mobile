import requestBody from "../../Components/RequestBody/RequestFunction";

export const GET_STATISTICS = "GET_STATISTICS";

export const GET_ORDER_BOOK = "GET_ORDER_BOOK";

export const GET_TIME_SALES = "GET_TIME_SALES";

//fetching statistics information
export const fetchStatistics = (link, security, date) => {
  return async (dispatch) => {
    Promise.all([
      requestBody(
        "GET",
        link,
        `marketdetails?action=getStatisticOfSec&format=json&market=CSE&security=${security}&bookdefid=1`,
        "",
        {}
      ),
      requestBody(
        "GET",
        link,
        `watch?action=getWatchForSecurity&format=json&securityid=${security}&exchange=CSE&bookDefId=1`,
        "",
        {}
      ),
      requestBody(
        "GET",
        link,
        `marketdetails?action=getCSEAnnouncementHistory&format=json&msgType=CSE&fromDate=${date}&toDate=${date}&security=${security}&pageNumber=1`,
        "",
        {}
      ),
    ])
      .then((result) => {
        dispatch({
          type: GET_STATISTICS,
          statistics: {
            status: result[0].status,
            data: result[0].data.data.statistics,
          },
          statisticsWatchSecurity: {
            status: result[1].status,
            data: result[1].data.data,
          },
          announcements: {
            status: result[2].status,
            data: result[2].data.data,
          },
        });
      })
      .catch((e) => {
        throw e;
      });
  };
};

export const fetchOrderBook = (link, security) => {
  return async (dispatch) => {
    Promise.all([
      requestBody(
        "GET",
        link,
        `marketdetails?action=getOrderBook&format=json&security=${security}&board=1`,
        "",
        {}
      ),
      requestBody(
        "GET",
        link,
        `watch?action=getWatchForSecurity&format=json&securityid=${security}&exchange=CSE&bookDefId=1`,
        "",
        {}
      ),
    ]).then((result) => {
      dispatch({
        type: GET_ORDER_BOOK,
        orderBook: { status: result[0].status, data: result[0].data.data },
        orderBookInfo: {
          status: result[1].status,
          data: result[1].data.data,
        },
      });
    });
  };
};

export const fetchTimesales = (link, security) => {
  return async (dispatch) => {
    const response = await requestBody(
      "GET",
      link,
      `watch?action=getWatchForSecurity&format=json&securityid=${security}&exchange=CSE&bookDefId=1`,
      "",
      {}
    );

    dispatch({
      type: GET_TIME_SALES,
      timeSales: { status: response.status, data: response.data.data },
    });
  };
};

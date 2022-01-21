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
        // let announcements = [];
        // if (
        //   result[0].status === 200 &&
        //   result[1].status === 200 &&
        //   result[2].status === 200
        // ) {
        //   if (result[2].data.data.announcement) {
        //     announcements = result[2].data.data.announcement;
        //   }
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: result[0].data.data.statistics,
        //     statisticsWatchSecurity: result[1].data.data,
        //     announcements: announcements,
        //   });
        // } else if (
        //   result[0].status === 200 &&
        //   result[1].status !== 200 &&
        //   result[2].status !== 200
        // ) {
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: result[0].data.data.statistics,
        //     statisticsWatchSecurity: {},
        //     announcements: announcements,
        //   });
        // } else if (
        //   result[0].status !== 200 &&
        //   result[1].status === 200 &&
        //   result[2].status !== 200
        // ) {
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: {},
        //     statisticsWatchSecurity: result[1].data.data,
        //     announcements: announcements,
        //   });
        // } else if (
        //   result[0].status !== 200 &&
        //   result[1].status !== 200 &&
        //   result[2].status === 200
        // ) {
        //   if (result[2].data.data.announcement) {
        //     announcements = result[2].data.data.announcement;
        //   }
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: {},
        //     statisticsWatchSecurity: {},
        //     announcements: announcements,
        //   });
        // } else if (
        //   result[0].status === 200 &&
        //   result[1].status !== 200 &&
        //   result[2].status === 200
        // ) {
        //   if (result[2].data.data.announcement) {
        //     announcements = result[2].data.data.announcement;
        //   }
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: result[0].data.data.statistics,
        //     statisticsWatchSecurity: {},
        //     announcements: announcements,
        //   });
        // } else if (
        //   result[0].status === 200 &&
        //   result[1].status === 200 &&
        //   result[2].status !== 200
        // ) {
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: result[0].data.data.statistics,
        //     statisticsWatchSecurity: result[1].data.data,
        //     announcements: announcements,
        //   });
        // } else if (
        //   result[0].status !== 200 &&
        //   result[1].status === 200 &&
        //   result[2].status === 200
        // ) {
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: {},
        //     statisticsWatchSecurity: result[1].data.data,
        //     announcements: announcements,
        //   });
        // } else {
        //   dispatch({
        //     type: GET_STATISTICS,
        //     statistics: {},
        //     statisticsWatchSecurity: {},
        //     announcements: announcements,
        //   });
        // }
      })
      .catch((e) => {
        throw e;
      });

    // if (response3.data.announcement) {
    //   announcements = response3.data.announcement;
    // }

    // dispatch({
    //   type: GET_STATISTICS,
    //   statistics: response1.data.statistics,
    //   statisticsWatchSecurity: response2.data,
    //   announcements: announcements,
    // });
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
        orderBook1: {
          status: result[1].status,
          data: result[1].data.data,
        },
      });
    });

    // if (response.status === 200) {
    //   if (response.data.data.size[0].size !== "0") {
    //     dispatch({
    //       type: GET_ORDER_BOOK,
    //       statistics: { status: 0, data: {} },
    //       orderBook: response.data.data.orderbook,
    //       orderBook1: response1.data.data,
    //     });
    //   } else {
    //     dispatch({
    //       type: GET_ORDER_BOOK,
    //       orderBookSize: response.data.data.size[0].size,
    //       orderBook1: response1.data.data,
    //     });
    //   }
    // } else {
    //   dispatch({
    //     type: GET_ORDER_BOOK,
    //     orderBook: {},
    //     orderBook1: {},
    //   });
    // }
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

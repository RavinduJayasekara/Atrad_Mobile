import {
  GET_ORDER_BOOK,
  GET_STATISTICS,
  GET_TIME_SALES,
} from "../actions/Quote";

const initialState = {
  statistics: {},
  statisticsWatchSecurity: {},
  announcements: [],
  bidObject: {},
  //bid and ask array
  orderBook: {},
  //orderbook information
  orderBookInfo: {},
  timeSales: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STATISTICS:
      // const statistics = action.statistics;
      // const statisticsWatchSecurity = action.statisticsWatchSecurity;
      // const announcements = action.announcements;
      // if (
      //   Object.keys(statistics).length !== 0 &&
      //   Object.keys(statisticsWatchSecurity).length !== 0 &&
      //   announcements.length !== 0
      // ) {
      //   return {
      //     ...state,
      //     statistics: statistics,
      //     statisticsWatchSecurity: statisticsWatchSecurity,
      //     announcements: announcements,
      //   };
      // } else if (
      //   Object.keys(statistics).length !== 0 &&
      //   Object.keys(statisticsWatchSecurity).length === 0 &&
      //   announcements.length === 0
      // ) {
      //   return {
      //     ...state,
      //     statistics: statistics,
      //   };
      // } else if (
      //   Object.keys(statistics).length === 0 &&
      //   Object.keys(statisticsWatchSecurity).length !== 0 &&
      //   announcements.length === 0
      // ) {
      //   return {
      //     ...state,
      //     statistics: statistics,
      //     statisticsWatchSecurity: statisticsWatchSecurity,
      //   };
      // } else if (
      //   Object.keys(statistics).length === 0 &&
      //   Object.keys(statisticsWatchSecurity).length === 0 &&
      //   announcements.length !== 0
      // ) {
      //   return {
      //     ...state,
      //     announcements: announcements,
      //   };
      // } else if (
      //   Object.keys(statistics).length !== 0 &&
      //   Object.keys(statisticsWatchSecurity).length === 0 &&
      //   announcements.length !== 0
      // ) {
      //   return {
      //     ...state,
      //     statistics: statistics,
      //     announcements: announcements,
      //   };
      // } else if (
      //   Object.keys(statistics).length !== 0 &&
      //   Object.keys(statisticsWatchSecurity).length !== 0 &&
      //   announcements.length === 0
      // ) {
      //   return {
      //     ...state,
      //     statisticsWatchSecurity: statisticsWatchSecurity,
      //   };
      // } else if (
      //   Object.keys(statistics).length === 0 &&
      //   Object.keys(statisticsWatchSecurity).length !== 0 &&
      //   announcements.length !== 0
      // ) {
      //   return {
      //     ...state,
      //     statisticsWatchSecurity: statisticsWatchSecurity,
      //     announcements: announcements,
      //   };
      // } else {
      //   return {
      //     state,
      //   };
      // }
      return {
        ...state,
        statistics: action.statistics,
        statisticsWatchSecurity: action.statisticsWatchSecurity,
        announcements: action.announcements,
      };
    case GET_ORDER_BOOK:
      // const orderBookSize = action.orderBookSize;
      // // const
      // // if()
      // if (orderBookSize === "0") {
      //   // if(orderbooksize) has a value pass orderbook size  as orderbook
      //   return {
      //     ...state,
      //     orderBook: action.orderBookSize,
      //     orderBook1: action.orderBook1,
      //   };
      // }
      // return {
      //   ...state,
      //   orderBook: action.orderBook,
      //   orderBook1: action.orderBook1,
      // };
      return {
        ...state,
        orderBook: action.orderBook,
        orderBookInfo: action.orderBookInfo,
      };
    case GET_TIME_SALES:
      return {
        ...state,
        timeSales: action.timeSales,
      };
    default:
      return state;
  }
};

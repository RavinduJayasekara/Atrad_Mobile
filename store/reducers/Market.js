import {
  GET_CSE_UDU,
  GET_INDICES,
  GET_TOTAL,
  GET_TRADES,
} from "../actions/Market";

const initialState = {
  indices: [],
  trades: [],
  cseInfo: {},
  total: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INDICES:
      // const indices = action.indices;
      // if (indices.length !== 0) {
      //   return { ...state, indices: indices };
      // } else {
      //   return state;
      // }
      return { ...state, indices: action.indices };
    case GET_TRADES:
      const trades = action.trades;
      console.log("trades", trades);
      if (trades.length !== 0) {
        return { ...state, trades: trades };
      } else {
        return state;
      }
    case GET_CSE_UDU:
      const cseInfo = action.cseInfo;
      if (Object.keys(cseInfo).length !== 0) {
        return { ...state, cseInfo: cseInfo };
      } else {
        return state;
      }
    case GET_TOTAL:
      const total = action.total;
      if (Object.keys(total).length !== 0) {
        return { ...state, total: total };
      } else {
        return state;
      }
    default:
      return state;
  }
};

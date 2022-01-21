import {
  GET_GAINERS,
  GET_LOSERS,
  GET_SHAREVOLUME,
  GET_TURNOVER,
} from "../actions/TopStocks";

const initialState = {
  gainers: [],
  losers: [],
  shareVolume: [],
  turnover: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GAINERS:
      const gainers = action.gainers;
      if (gainers.length !== 0) {
        return { ...state, gainers: gainers };
      } else {
        return state;
      }
    case GET_LOSERS:
      const losers = action.losers;
      if (losers.length !== 0) {
        return { ...state, losers: losers };
      } else {
        return state;
      }
    case GET_TURNOVER:
      const turnover = action.turnover;
      if (turnover.length !== 0) {
        return { ...state, turnover: turnover };
      } else {
        return state;
      }
    case GET_SHAREVOLUME:
      const sharevolume = action.gainers;
      if (sharevolume.length !== 0) {
        return { ...state, shareVolume: sharevolume };
      } else {
        return state;
      }
    default:
      return state;
  }
};

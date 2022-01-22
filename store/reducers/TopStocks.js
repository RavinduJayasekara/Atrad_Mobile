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
      return { ...state, gainers: action.gainers };
    case GET_LOSERS:
      return { ...state, losers: action.losers };
    case GET_TURNOVER:
      return { ...state, turnover: action.turnover };
    case GET_SHAREVOLUME:
      return { ...state, shareVolume: action.sharevolume };

    default:
      return state;
  }
};

import { FETCH_SECURITIES } from "../../store/actions/Watch";

const initialState = {
  allSecurities: [],
  watchType: "Equity",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECURITIES:
      const recievedSecurities = action.allSecurities;
      let allSecurities = [...state.allSecurities];
      let resultArray = [];
      if (
        state.watchType !== action.watchType &&
        recievedSecurities.length === 0
      ) {
        resultArray = [];
      } else if (
        state.watchType !== action.watchType &&
        recievedSecurities.length > 0
      ) {
        resultArray = recievedSecurities;
      } else {
        recievedSecurities.forEach((item) => {
          allSecurities = allSecurities.filter(
            (sec) => sec.security !== item.security
          );
        });
        resultArray = recievedSecurities.concat(allSecurities);
      }
      return {
        allSecurities: resultArray,
        watchType: action.watchType,
      };
    default:
      return state;
  }
};

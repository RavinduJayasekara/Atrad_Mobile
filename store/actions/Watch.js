import { Alert } from "react-native";
import requestBody from "../../Components/RequestBody/RequestFunction";
import * as authActions from "../actions/Auth";
export const FETCH_SECURITIES = "FETCH_SECURITIES";

const signOutHandler = (dispatch) => dispatch(authActions.signOut());

export const fetchSecurities = (link, fWacthId, watchListType) => {
  return async (dispatch) => {
    try {
      let object;
//full watch with bill bond equity and crossings
      if (watchListType === "Bill") {
        object = await requestBody(
          "GET",
          link,
          `watch?action=fullWatchBill&format=json&exchange=CSE&bookDefId=1&watchId=15664&lastUpdatedId=${fWacthId}`,
          "",
          {}
        );
      } else if (watchListType === "Bond") {
        object = await requestBody(
          "GET",
          link,
          `watch?action=fullWatchBond&format=json&exchange=CSE&bookDefId=1&watchId=15664&lastUpdatedId=${fWacthId}`,
          "",
          {}
        );
      } else if (watchListType === "Crossing") {
        object = await requestBody(
          "GET",
          link,
          `watch?action=crossingWatch&format=json&exchange=CSE&bookDefId=1&watchId=15664&lastUpdatedId=${fWacthId}`,
          "",
          {}
        );
      } else {
        object = await requestBody(
          "GET",
          link,
          `watch?action=fullWatch&format=json&exchange=CSE&bookDefId=1&watchId=17789&lastUpdatedId=${fWacthId}`,
          "",
          {}
        );
      }

      if (object.status === 200) {
        let allSecs = [];
        if (object.data.data === "User is not authorized") {
          Alert.alert("User is not authorized", "", [
            {
              text: "Okay!",
              onPress: () => dispatch(authActions.signOut()),
            },
          ]);
        } else {
          if (object.data.data.size[0].size > 0) {
            allSecs = object.data.data.watch;
          }
          dispatch({
            type: FETCH_SECURITIES,
            allSecurities: allSecs,
            watchType: watchListType,
          });
        }
      } else {
        //todo:
      }
    } catch (e) {
      throw e;
    }
  };
};

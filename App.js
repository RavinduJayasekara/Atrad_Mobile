import { StatusBar } from "expo-status-bar";
import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import { applyMiddleware, combineReducers, createStore } from "redux";
import LoginStackNavigator from "./navigation/AppNavigation";
import { Provider } from "react-redux";
import authReducer from "./store/reducers/Auth";
import watchReducer from "./store/reducers/Watch";
import topStocksReducer from "./store/reducers/TopStocks";
import marketReducer from "./store/reducers/Market";
import quoteReducer from "./store/reducers/Quote";
import ReduxThunk from "redux-thunk";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import portfolioReducer from "./store/reducers/Portfolio";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "./colors";
//commented
export default function App() {
  const rootReducer = combineReducers({
    auth: authReducer,
    watch: watchReducer,
    topStocks: topStocksReducer,
    market: marketReducer,
    quote: quoteReducer,
    portfolio: portfolioReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  let [fontsLoaded] = useFonts({
    "oS-sB": require("./assets/fonts/OpenSans-Semibold.ttf"),
    oS: require("./assets/fonts/OpenSans-Regular.ttf"),
    "oS-B": require("./assets/fonts/OpenSans-Bold.ttf"),
    "oS-eB": require("./assets/fonts/OpenSans-ExtraBold.ttf"),
    "iT-T": require("./assets/fonts/Inter-Thin.ttf"),
    iT: require("./assets/fonts/Inter-Regular.ttf"),
    "iT-sB": require("./assets/fonts/Inter-SemiBold.ttf"),
    "iT-B": require("./assets/fonts/Inter-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // <Provider store={store}>
      //   <LoginStackNavigator />
      // </Provider>
      <Fragment>
        <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <StatusBar style="light" />
          <Provider store={store}>
            <LoginStackNavigator />
          </Provider>
        </SafeAreaView>
      </Fragment>
    );
  }
}

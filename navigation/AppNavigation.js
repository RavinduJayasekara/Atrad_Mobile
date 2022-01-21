import React, { Component, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login, {
  screenOptions as loginHeader,
} from "../screens/Authentication/Login";
import BrokerSelection, {
  screenOptions as brokerHeader,
} from "../screens/Authentication/BrokerSelection";
import ChangePassword from "../screens/Authentication/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { useHeaderHeight } from "@react-navigation/elements";
import Market, {
  screenOptions as marketHeader,
} from "../screens/Market/Market";
import Indices from "../screens/Market/Indices";
import Trades from "../screens/Market/Trades";
import {
  Dimensions,
  Animated,
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import FullWatch from "../screens/FullWatch/FullWatch";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Svg, { G, Mask, Path, Rect } from "react-native-svg";
import Quote from "../screens/Quote/Quote";
import BuySell from "../screens/BuySell/BuySell";
import MainHeader from "../Components/MainHeader/MainHeader";
import Favourites from "../screens/FullWatch/Favourites";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import MarketDepth from "../screens/Quote/MarketDepth";
import TimeSales from "../screens/Quote/TimeSales";
import AlertS from "../screens/Quote/Alert";
import Gainers from "../screens/TopStock/Gainers";
import Losers from "../screens/TopStock/Losers";
import Turnover from "../screens/TopStock/Turnover";
import ShareVolume from "../screens/TopStock/ShareVolume";
import Portfolio from "../screens/Portfolio/Summary";
import Summary from "../screens/Portfolio/Summary";
import Detailed from "../screens/Portfolio/Detailed";
import Valuation from "../screens/Portfolio/Valuation";
import OrderList from "../screens/OrderList/OrderList";
import AccountSummary from "../screens/OrderList/AccountSummary";
import RecentTransactions from "../screens/OrderList/RecentTransactions";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { signIn } from "../store/actions/Auth";

const { height, width } = Dimensions.get("window");
const iconSize = height * 0.03;
const tabHeight = height * 0.06;
const navOptions = {
  headerStyle: { backgroundColor: "#000036" },
  headerTintColor: "white",
};

const LoginStack = createNativeStackNavigator();

const LoginStackNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={navOptions}>
      <LoginStack.Screen
        name={"Login"}
        component={Login}
        options={loginHeader}
      />
      <LoginStack.Screen
        name={"BrokerSelection"}
        component={BrokerSelection}
        options={brokerHeader}
      />
    </LoginStack.Navigator>
  );
};

const TopStocksTopTab = createMaterialTopTabNavigator();

const TopStockTopTabNavigator = (props) => {
  return (
    <TopStocksTopTab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarAllowFontScaling: false,
      }}
    >
      <TopStocksTopTab.Screen
        component={Gainers}
        name="Gainers"
        options={{ title: "Gainers" }}
        initialParams={props.route.params}
      />
      <TopStocksTopTab.Screen
        component={Losers}
        name="Losers"
        options={{ title: "Losers" }}
        initialParams={props.route.params}
      />
      <TopStocksTopTab.Screen
        component={Turnover}
        name="Turnover"
        options={{
          title: "Turnover",
          // tabBarLabel: () => <Text numberOfLines={1}>Turnover</Text>,
        }}
        initialParams={props.route.params}
      />
      <TopStocksTopTab.Screen
        component={ShareVolume}
        name="ShareVolume"
        options={{ title: "Share Volume" }}
        initialParams={props.route.params}
      />
    </TopStocksTopTab.Navigator>
  );
};

const MarketStack = createNativeStackNavigator();

const MarketStackNavigator = () => {
  return (
    <MarketStack.Navigator screenOptions={{ headerShown: false }}>
      <MarketStack.Screen name="Market" component={Market} />
      <MarketStack.Screen
        name="TopStocks"
        component={TopStockTopTabNavigator}
      />
    </MarketStack.Navigator>
  );
};

const MarketTopTab = createMaterialTopTabNavigator();

const MarketTopTabNavigator = (props) => {
  // console.log("Market Top Tab Nav", props);
  return (
    <MarketTopTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName={props.route.params.routeScreen}
    >
      <MarketTopTab.Screen
        name="MarketStack"
        component={Market}
        initialParams={{
          brokerUrl: props.route.params.brokerUrl,
          // brokerUrl: props.route.params.props.brokerUrl,
          brokerImage: props.route.params.brokerImage,
          // brokerImage: props.route.params.props.brokerImage,
        }}
        options={{ title: "Market" }}
      />
      <MarketTopTab.Screen
        name="Indices"
        component={Indices}
        initialParams={{
          brokerUrl: props.route.params.brokerUrl,
          // brokerUrl: props.route.params.props.brokerUrl,
          brokerImage: props.route.params.brokerImage,
          // brokerImage: props.route.params.props.brokerImage,
        }}
      />
      <MarketTopTab.Screen
        name="Trades"
        component={Trades}
        initialParams={{
          brokerUrl: props.route.params.brokerUrl,
          // brokerUrl: props.route.params.props.brokerUrl,
          brokerImage: props.route.params.brokerImage,
          // brokerImage: props.route.params.props.brokerImage,
        }}
      />
    </MarketTopTab.Navigator>
  );
};

const QuoteTopTab = createMaterialTopTabNavigator();

const QuoteTopTabNavigator = (props) => {
  return (
    <QuoteTopTab.Navigator
      screenOptions={{ tabBarLabelStyle: { fontSize: 12 } }}
    >
      <QuoteTopTab.Screen
        name={"Quote"}
        component={Quote}
        options={{ title: "Quote" }}
        initialParams={{
          security: props.route.params.security,
          // security: props.route.params.props.security,
          brokerUrl: props.route.params.brokerUrl,
          // brokerUrl: props.route.params.props.brokerUrl,
        }}
      />
      <QuoteTopTab.Screen
        name={"MarketDepth"}
        component={MarketDepth}
        options={{ title: "Market Depth" }}
        initialParams={{
          security: props.route.params.security,
          // security: props.route.params.props.security,
          brokerUrl: props.route.params.brokerUrl,
          // brokerUrl: props.route.params.props.brokerUrl,
        }}
      />
      <QuoteTopTab.Screen
        name={"TimeSales"}
        component={TimeSales}
        options={{ title: "Time and Sales" }}
        initialParams={{
          security: props.route.params.security,
          // security: props.route.params.props.security,
          brokerUrl: props.route.params.brokerUrl,
          // brokerUrl: props.route.params.props.brokerUrl,
        }}
      />
      <QuoteTopTab.Screen
        name={"Alert"}
        component={AlertS}
        options={{ title: "Alert" }}
        initialParams={{
          security: props.route.params.security,
          // security: props.route.params.props.security,
        }}
      />
    </QuoteTopTab.Navigator>
  );
};

// const FullWatchStack = createNativeStackNavigator();

// const FullWatchStackNavigator = (props) => {
//   return (
//     <FullWatchStack.Navigator
//       screenOptions={{ headerShown: false }}
//       initialRouteName={props.route.params.fullWatchPage}
//     >
//       <FullWatchStack.Screen
//         name="FullWatch"
//         component={FullWatch}
//         initialParams={{
//           brokerUrl: props.route.params.props.brokerUrl,
//           sortType: props.route.params.sortType,
//         }}
//       />
//       <FullWatchStack.Screen name="Favourites" component={Favourites} />
//     </FullWatchStack.Navigator>
//   );
// };

const FullWatchTopTab = createMaterialTopTabNavigator();

const FullWatchTopTabNavigator = (props) => {
  return (
    <FullWatchTopTab.Navigator
    // initialRouteName={props.route.params.routeScreen}
    >
      <FullWatchTopTab.Screen
        name="FullWatchTT"
        component={FullWatch}
        initialParams={{
          fullWatchPage: "FullWatch",
          brokerUrl: props.route.params.brokerUrl,
          // brokerUrl: props.route.params.props.brokerUrl,
        }}
        options={{ tabBarLabel: "Equity" }}
      />
      <FullWatchTopTab.Screen
        name="FavouritesTT"
        component={Favourites}
        initialParams={{ fullWatchPage: "Favourites" }}
        options={{ tabBarLabel: "Favourites" }}
      />
    </FullWatchTopTab.Navigator>
  );
};

const FullWatchTabStack = createNativeStackNavigator();

const BuySellStack = createNativeStackNavigator();

const BuySellStackNavigator = (props) => {
  return (
    <BuySellStack.Navigator screenOptions={{ headerShown: false }}>
      <BuySellStack.Screen name="BuySell" component={BuySell} />
    </BuySellStack.Navigator>
  );
};

const PortfolioTab = createMaterialTopTabNavigator();

const PortfolioTabNavigator = (props) => {
  return (
    <PortfolioTab.Navigator
      screenOptions={{ tabBarLabelStyle: { fontSize: 12 } }}
      // initialRouteName={props.route.params.routeScreen}
    >
      <PortfolioTab.Screen
        name="Summary"
        component={Summary}
        initialParams={{ brokerUrl: props.route.params.brokerUrl }}
        // initialParams={{ brokerUrl: props.route.params.props.brokerUrl }}
      />
      <PortfolioTab.Screen name="Detailed" component={Detailed} />
      <PortfolioTab.Screen name="Valuation" component={Valuation} />
    </PortfolioTab.Navigator>
  );
};

const OrderListTopTab = createMaterialTopTabNavigator();

const OrderListStackNav = (props) => {
  return (
    <OrderListTopTab.Navigator
      initialRouteName={props.route.params.routeScreen}
    >
      <OrderListTopTab.Screen
        name="OrderListO"
        component={OrderList}
        // initialParams={{ brokerUrl: props.route.params.props.brokerUrl }}
        initialParams={{ brokerUrl: props.route.params.brokerUrl }}
        options={{ title: "Order List", tabBarLabelStyle: { fontSize: 12 } }}
      />
      <OrderListTopTab.Screen
        name="AccountSummary"
        component={AccountSummary}
        initialParams={{ brokerUrl: props.route.params.brokerUrl }}
        // initialParams={{ brokerUrl: props.route.params.props.brokerUrl }}
        options={{
          title: "Account Summary",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <OrderListTopTab.Screen
        name="RecentTransactions"
        component={RecentTransactions}
        initialParams={{ brokerUrl: props.route.params.brokerUrl }}
        // initialParams={{ brokerUrl: props.route.params.props.brokerUrl }}
        options={{
          title: "Recent Transactions",
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
    </OrderListTopTab.Navigator>
  );
};

const Tab = createBottomTabNavigator();

// class TabNavigator extends Component {
//   state = {
//     colorM: colors.primary,
//     colorF: "#9E9E9E",
//     colorO: "#9E9E9E",
//     colorB: "#9E9E9E",
//     colorP: "#9E9E9E",
//     tabName: "MarketT",
//   };

//   // componentDidUpdate(prevProps, prevState) {
//   //   console.log(prevState, prevProps, this.props);
//   //   if (prevState.tabName !== this.props.route.routePTab) {
//   //     console.log(this.props.route.routePTab);
//   //     if (this.props.route.params.routePTab === "MarketT") {
//   //       this.setState({
//   //         colorM: colors.primary,
//   //         colorF: "#9E9E9E",
//   //         colorO: "#9E9E9E",
//   //         colorB: "#9E9E9E",
//   //         colorP: "#9E9E9E",
//   //         tabName: "MarketT",
//   //       });
//   //     } else if (this.props.route.params.routePTab === "FullWatchT") {
//   //       this.setState({
//   //         colorM: "#9E9E9E",
//   //         colorF: colors.primary,
//   //         colorO: "#9E9E9E",
//   //         colorB: "#9E9E9E",
//   //         colorP: "#9E9E9E",
//   //         tabName: "FullWatchT",
//   //       });
//   //     } else if (this.props.route.params.routePTab === "OrderT") {
//   //       this.setState({
//   //         colorM: "#9E9E9E",
//   //         colorF: "#9E9E9E",
//   //         colorO: colors.primary,
//   //         colorB: "#9E9E9E",
//   //         colorP: "#9E9E9E",
//   //         tabName: "OrderT",
//   //       });
//   //     } else if (this.props.route.params.routePTab === "PortfolioT") {
//   //       this.setState({
//   //         colorM: "#9E9E9E",
//   //         colorF: "#9E9E9E",
//   //         colorO: "#9E9E9E",
//   //         colorB: "#9E9E9E",
//   //         colorP: colors.primary,
//   //         tabName: "PortfolioT",
//   //       });
//   //     } else if (this.props.route.params.routePTab === "BuySellT") {
//   //       this.setState({
//   //         colorM: colors.primary,
//   //         colorF: "#9E9E9E",
//   //         colorO: "#9E9E9E",
//   //         colorB: colors.primary,
//   //         colorP: "#9E9E9E",
//   //         tabName: "BuySellT",
//   //       });
//   //     }
//   //   }
//   // }

//   tabPressMarket = (navigation) => {
//     this.setState({
//       colorM: colors.primary,
//       colorF: "#9E9E9E",
//       colorO: "#9E9E9E",
//       colorB: "#9E9E9E",
//       colorP: "#9E9E9E",
//     });
//     navigation.reset({
//       index: 0,
//       routes: [
//         {
//           name: "MarketT",
//           state: {
//             routes: [{ name: "MarketStack" }],
//           },
//         },
//       ],
//     });
//   };

//   tabPressFullWatch = (navigation) => {
//     this.setState({
//       colorM: "#9E9E9E",
//       colorF: colors.primary,
//       colorO: "#9E9E9E",
//       colorB: "#9E9E9E",
//       colorP: "#9E9E9E",
//     });
//     navigation.reset({
//       index: 0,
//       routes: [
//         {
//           name: "FullWatchT",
//           state: {
//             routes: [{ name: "FullWatchT" }],
//           },
//         },
//       ],
//     });
//   };

//   tabPressQuote = (navigation) => {
//     this.setState({
//       colorM: "#9E9E9E",
//       colorF: "#9E9E9E",
//       colorO: colors.primary,
//       colorB: "#9E9E9E",
//       colorP: "#9E9E9E",
//     });

//     navigation.reset({
//       index: 0,
//       routes: [
//         {
//           name: "OrderT",
//           state: {
//             routes: [{ name: "OrderListO" }],
//           },
//         },
//       ],
//     });
//   };

//   tabPressBuySell = (navigation) => {
//     this.setState({
//       colorM: "#9E9E9E",
//       colorF: "#9E9E9E",
//       colorO: "#9E9E9E",
//       colorB: colors.primary,
//       colorP: "#9E9E9E",
//     });
//     navigation.navigate("BuySellT");
//   };

//   tabPressPortfolio = (navigation) => {
//     this.setState({
//       colorM: "#9E9E9E",
//       colorF: "#9E9E9E",
//       colorO: "#9E9E9E",
//       colorB: "#9E9E9E",
//       colorP: colors.primary,
//     });
//     navigation.reset({
//       index: 0,
//       routes: [
//         {
//           name: "PortfolioT",
//           state: {
//             routes: [{ name: "SummaryP" }],
//           },
//         },
//       ],
//     });
//   };

//   componentDidUpdate(prevProps, prevState) {
//     console.log("Ravindu");
//   }

//   render() {
//     // if (this.state.tabName !== this.props.route.params.routePTab){

//     // }
//     return (
//       <Tab.Navigator
//         screenOptions={{ headerShown: false }}
//         initialRouteName={this.props.route.params.routePTab}
//       >
//         <Tab.Screen
//           name="MarketT"
//           component={MarketTopTabNavigator}
//           initialParams={this.props.route.params}
//           // listeners={({ navigation }) => ({
//           //   tabPress: (e) => {
//           //     e.preventDefault();
//           //     tabPressMarket(navigation);
//           //   },
//           // })}
//           // options={({ navigation }) => ({
//           //   tabBarIcon: () => (
//           //     <Svg
//           //       width={"24"}
//           //       height={"24"}
//           //       viewBox={"0 0 24 24"}
//           //       fill="none"
//           //       xmlns="http://www.w3.org/2000/svg"
//           //     >
//           //       <Path
//           //         d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
//           //         fill={this.state.colorM}
//           //         fill-opacity="0.38"
//           //       />
//           //       <Mask
//           //         id="mask0_307:173"
//           //         style="mask-type:alpha"
//           //         maskUnits="userSpaceOnUse"
//           //         x="0"
//           //         y="5"
//           //         width="24"
//           //         height="14"
//           //       >
//           //         <Path
//           //           d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
//           //           fill="white"
//           //         />
//           //       </Mask>
//           //       <G mask="url(#mask0_307:173)">
//           //         <Rect width="24" height="24" fill={this.state.colorM} />
//           //       </G>
//           //     </Svg>
//           //   ),
//           //   tabBarLabel: "Market",
//           //   tabBarLabelStyle: { color: this.colorM },
//           //   tabBarTestID: "MarketTab",
//           //   tabBarAccessibilityLabel: "MarketTab",
//           //   tabBarButton: () => {
//           //     return (
//           //       <View style={{ flex: 1, height: "100%", width: "100%" }}>
//           //         <TouchableHighlight
//           //           underlayColor={"rgba(0,0,53,0.1)"}
//           //           onPress={this.tabPressMarket.bind(this, navigation)}
//           //         >
//           //           <View
//           //             style={{
//           //               height: "100%",
//           //               width: "100%",
//           //             }}
//           //           >
//           //             <Svg
//           //               width={"24"}
//           //               height={"24"}
//           //               viewBox={"0 0 24 24"}
//           //               fill="none"
//           //               xmlns="http://www.w3.org/2000/svg"
//           //             >
//           //               <Path
//           //                 d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
//           //                 fill={this.state.colorM}
//           //                 fill-opacity="0.38"
//           //               />
//           //               <Mask
//           //                 id="mask0_307:173"
//           //                 style="mask-type:alpha"
//           //                 maskUnits="userSpaceOnUse"
//           //                 x="0"
//           //                 y="5"
//           //                 width="24"
//           //                 height="14"
//           //               >
//           //                 <Path
//           //                   d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
//           //                   fill="white"
//           //                 />
//           //               </Mask>
//           //               <G mask="url(#mask0_307:173)">
//           //                 <Rect
//           //                   width="24"
//           //                   height="24"
//           //                   fill={this.state.colorM}
//           //                 />
//           //               </G>
//           //             </Svg>
//           //           </View>
//           //         </TouchableHighlight>
//           //       </View>
//           //     );
//           //   },
//           // })}
//         />
//         <Tab.Screen
//           name="FullWatchT"
//           component={FullWatchTopTabNavigator}
//           initialParams={this.props.route.params}
//         />
//         <Tab.Screen
//           name="OrderT"
//           component={OrderListStackNav}
//           initialParams={this.props.route.params}
//         />
//         <Tab.Screen
//           name="PortfolioT"
//           component={PortfolioTabNavigator}
//           initialParams={this.props.route.params}
//         />
//         <Tab.Screen
//           name="BuySellT"
//           component={BuySellStackNavigator}
//           initialParams={this.props.route.params}
//         />
//       </Tab.Navigator>
//     );
//   }
// }

function TabBar({ state, descriptors, navigation }) {
  // const drawerNavigator = (tName) => {
  //   if (tName === "MarketT") {
  //     navigation.jumpTo("MarketD", { focused: true, dName: "MarketD" });
  //   } else if (tName === "FullWatchT") {
  //     navigation.jumpTo("EquityD", { focused: true, dName: "EquityD" });
  //   } else if (tName === "OrderT") {
  //     navigation.jumpTo("OrderListD", { focused: true, dName: "OrderListD" });
  //   } else if (tName === "PortfolioT") {
  //     navigation.jumpTo("SummaryD", { focused: true, dName: "SummaryD" });
  //   } else {
  //     navigation.jumpTo("BuySellD", { focused: true, dName: "BuySellD" });
  //   }
  // };
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            // drawerNavigator(route.name);
          } else if (isFocused && !event.defaultPrevented) {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: route.name,
                },
              ],
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? "#673ab7" : colors.greyTitle }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNavigator = (props) => {
  // let tabName = "MarketT";
  // if (props.route.params.routePTab) {
  //   tabName = props.route.params.routePTab;
  // }
  // const [colorM, setColorM] = useState("#9E9E9E");
  // const [colorF, setColorF] = useState("#9E9E9E");
  // const [colorO, setColorQ] = useState("#9E9E9E");
  // const [colorB, setColorB] = useState("#9E9E9E");
  // const [colorP, setColorP] = useState("#9E9E9E");

  // useEffect(() => {
  //   if (this.props.route.params.tabName === "MarketT") {
  //     setColorM(colors.primary);
  //     setColorF("#9E9E9E");
  //     setColorQ("#9E9E9E");
  //     setColorB("#9E9E9E");
  //     setColorP("#9E9E9E");
  //   } else if (this.props.route.params.tabName === "FullWatchT") {
  //     setColorM("#9E9E9E");
  //     setColorF(colors.primary);
  //     setColorQ("#9E9E9E");
  //     setColorP("#9E9E9E");
  //     setColorB("#9E9E9E");
  //   } else if (this.props.route.params.tabName === "OrderT") {
  //     setColorM("#9E9E9E");
  //     setColorF("#9E9E9E");
  //     setColorQ(colors.primary);
  //     setColorP("#9E9E9E");
  //     setColorB("#9E9E9E");
  //   } else if (this.props.route.params.tabName === "PortfolioT") {
  //     setColorM("#9E9E9E");
  //     setColorF("#9E9E9E");
  //     setColorQ("#9E9E9E");
  //     setColorP(colors.primary);
  //     setColorB("#9E9E9E");
  //   } else if (this.props.route.params.tabName === "BuySellT") {
  //     setColorM("#9E9E9E");
  //     setColorF("#9E9E9E");
  //     setColorQ("#9E9E9E");
  //     setColorP("#9E9E9E");
  //     setColorB(colors.primary);
  //   }
  // });

  // const tabPressMarket = (navigation) => {
  //   setColorM(colors.primary);
  //   setColorF("#9E9E9E");
  //   setColorQ("#9E9E9E");
  //   setColorB("#9E9E9E");
  //   setColorP("#9E9E9E");
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: "MarketT",
  //         state: {
  //           routes: [{ name: "MarketStack" }],
  //         },
  //       },
  //     ],
  //   });
  // };

  // const tabPressFullWatch = (navigation) => {
  //   setColorM("#9E9E9E");
  //   setColorF(colors.primary);
  //   setColorQ("#9E9E9E");
  //   setColorB("#9E9E9E");
  //   setColorP("#9E9E9E");
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: "FullWatchT",
  //         state: {
  //           routes: [{ name: "FullWatchT" }],
  //         },
  //       },
  //     ],
  //   });
  // };

  // const tabPressQuote = (navigation) => {
  //   setColorM("#9E9E9E");
  //   setColorF("#9E9E9E");
  //   setColorQ(colors.primary);
  //   setColorB("#9E9E9E");
  //   setColorP("#9E9E9E");
  //   // navigation.navigate("OrderT", {
  //   //   initialPage: "OrderListO",
  //   // });
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: "OrderT",
  //         state: {
  //           routes: [{ name: "OrderListO" }],
  //         },
  //       },
  //     ],
  //   });
  // };

  // const tabPressBuySell = (navigation) => {
  //   setColorM("#9E9E9E");
  //   setColorF("#9E9E9E");
  //   setColorQ("#9E9E9E");
  //   setColorB(colors.primary);
  //   setColorP("#9E9E9E");
  //   navigation.navigate("BuySellT");
  // };

  // const tabPressPortfolio = (navigation) => {
  //   setColorM("#9E9E9E");
  //   setColorF("#9E9E9E");
  //   setColorQ("#9E9E9E");
  //   setColorB("#9E9E9E");
  //   setColorP(colors.primary);
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: "PortfolioT",
  //         state: {
  //           routes: [{ name: "SummaryP" }],
  //         },
  //       },
  //     ],
  //   });
  // };

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
      // initialRouteName={props.route.params.routePTab}
    >
      <Tab.Screen
        name="MarketT"
        component={MarketTopTabNavigator}
        initialParams={props.route.params}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     tabPressMarket(navigation);
        //   },
        // })}
        options={({ navigation }) => ({
          //   tabBarIcon: () => (
          //     <Svg
          //       width={"24"}
          //       height={"24"}
          //       viewBox={"0 0 24 24"}
          //       fill="none"
          //       xmlns="http://www.w3.org/2000/svg"
          //     >
          //       <Path
          //         d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
          //         fill={this.state.colorM}
          //         fill-opacity="0.38"
          //       />
          //       <Mask
          //         id="mask0_307:173"
          //         style="mask-type:alpha"
          //         maskUnits="userSpaceOnUse"
          //         x="0"
          //         y="5"
          //         width="24"
          //         height="14"
          //       >
          //         <Path
          //           d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
          //           fill="white"
          //         />
          //       </Mask>
          //       <G mask="url(#mask0_307:173)">
          //         <Rect width="24" height="24" fill={this.state.colorM} />
          //       </G>
          //     </Svg>
          //   ),
          tabBarLabel: "Market",
          //   tabBarLabelStyle: { color: this.colorM },
          //   tabBarTestID: "MarketTab",
          //   tabBarAccessibilityLabel: "MarketTab",
          //   tabBarButton: () => {
          //     return (
          //       <View style={{ flex: 1, height: "100%", width: "100%" }}>
          //         <TouchableHighlight
          //           underlayColor={"rgba(0,0,53,0.1)"}
          //           onPress={this.tabPressMarket.bind(this, navigation)}
          //         >
          //           <View
          //             style={{
          //               height: "100%",
          //               width: "100%",
          //             }}
          //           >
          //             <Svg
          //               width={"24"}
          //               height={"24"}
          //               viewBox={"0 0 24 24"}
          //               fill="none"
          //               xmlns="http://www.w3.org/2000/svg"
          //             >
          //               <Path
          //                 d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
          //                 fill={this.state.colorM}
          //                 fill-opacity="0.38"
          //               />
          //               <Mask
          //                 id="mask0_307:173"
          //                 style="mask-type:alpha"
          //                 maskUnits="userSpaceOnUse"
          //                 x="0"
          //                 y="5"
          //                 width="24"
          //                 height="14"
          //               >
          //                 <Path
          //                   d="M24 6V12C24 12.6 23.6 13 23 13C22.4 13 22 12.6 22 12V8.4L14.2 16.2C13.8 16.6 13.2 16.6 12.8 16.2L8.5 11.9L1.7 18.7C1.5 18.9 1.3 19 1 19C0.7 19 0.5 18.9 0.3 18.7C-0.1 18.3 -0.1 17.7 0.3 17.3L7.8 9.8C8.2 9.4 8.8 9.4 9.2 9.8L13.5 14.1L20.6 7H17C16.4 7 16 6.6 16 6C16 5.4 16.4 5 17 5H23C23.1 5 23.3 5 23.4 5.1C23.6 5.2 23.8 5.4 23.9 5.6C24 5.7 24 5.9 24 6Z"
          //                   fill="white"
          //                 />
          //               </Mask>
          //               <G mask="url(#mask0_307:173)">
          //                 <Rect width="24" height="24" fill={this.state.colorM} />
          //               </G>
          //             </Svg>
          //           </View>
          //         </TouchableHighlight>
          //       </View>
          //     );
          //   },
        })}
      />
      <Tab.Screen
        name="FullWatchT"
        component={FullWatchTopTabNavigator}
        initialParams={props.route.params}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     tabPressFullWatch(navigation);
        //   },
        // })}
        options={({ navigation }) => ({
          //   tabBarIcon: () => (
          //     <Svg
          //       width="30"
          //       height="30"
          //       viewBox="0 0 40 38"
          //       fill="none"
          //       xmlns="http://www.w3.org/2000/svg"
          //     >
          //       <Path
          //         d="M21 12.8249H9V13.8114H21V12.8249Z"
          //         fill={this.state.colorF}
          //         stroke={this.state.colorF}
          //         stroke-miterlimit="10"
          //         stroke-linecap="round"
          //       />
          //       <Path
          //         d="M20.5 17.7575H9V18.744H20.5V17.7575Z"
          //         fill={this.state.colorF}
          //         stroke={this.state.colorF}
          //         stroke-miterlimit="10"
          //       />
          //       <Path
          //         d="M28.5 22.6902H9V23.6767H28.5V22.6902Z"
          //         fill={this.state.colorF}
          //         stroke={this.state.colorF}
          //         stroke-miterlimit="10"
          //       />
          //       <Path
          //         d="M28.5 27.6228H9V28.6093H28.5V27.6228Z"
          //         fill={this.state.colorF}
          //         stroke={this.state.colorF}
          //         stroke-miterlimit="10"
          //       />
          //       <Path
          //         d="M28 20.7171C24.95 20.7171 22.5 18.3001 22.5 15.2912C22.5 12.2823 24.95 9.8653 28 9.8653C31.05 9.8653 33.5 12.2823 33.5 15.2912C33.5 18.3001 31.05 20.7171 28 20.7171ZM28 10.8518C25.5 10.8518 23.5 12.8249 23.5 15.2912C23.5 17.7575 25.5 19.7306 28 19.7306C30.5 19.7306 32.5 17.7575 32.5 15.2912C32.5 12.8249 30.5 10.8518 28 10.8518Z"
          //         fill={this.state.colorF}
          //         stroke={this.state.colorF}
          //         stroke-width="0.5"
          //         stroke-miterlimit="10"
          //       />
          //       <Path
          //         d="M30.5 15.7845H27.5V12.8249H28.5V14.798H30.5V15.7845Z"
          //         fill={this.state.colorF}
          //         stroke={this.state.colorF}
          //         stroke-width="0.5"
          //         stroke-miterlimit="10"
          //       />
          //     </Svg>
          //   ),
          tabBarLabel: "Watch List",
          //   tabBarLabelStyle: { color: this.colorF },
          //   tabBarButton: () => {
          //     return (
          //       <View style={{ flex: 1, height: "100%", width: "100%" }}>
          //         <TouchableHighlight
          //           underlayColor={"rgba(0,0,53,0.1)"}
          //           onPress={this.tabPressFullWatch.bind(this, navigation)}
          //         >
          //           <View
          //             style={{
          //               height: "100%",
          //               width: "100%",
          //             }}
          //           >
          //             <Svg
          //               width="30"
          //               height="30"
          //               viewBox="0 0 40 38"
          //               fill="none"
          //               xmlns="http://www.w3.org/2000/svg"
          //             >
          //               <Path
          //                 d="M21 12.8249H9V13.8114H21V12.8249Z"
          //                 fill={this.state.colorF}
          //                 stroke={this.state.colorF}
          //                 stroke-miterlimit="10"
          //                 stroke-linecap="round"
          //               />
          //               <Path
          //                 d="M20.5 17.7575H9V18.744H20.5V17.7575Z"
          //                 fill={this.state.colorF}
          //                 stroke={this.state.colorF}
          //                 stroke-miterlimit="10"
          //               />
          //               <Path
          //                 d="M28.5 22.6902H9V23.6767H28.5V22.6902Z"
          //                 fill={this.state.colorF}
          //                 stroke={this.state.colorF}
          //                 stroke-miterlimit="10"
          //               />
          //               <Path
          //                 d="M28.5 27.6228H9V28.6093H28.5V27.6228Z"
          //                 fill={this.state.colorF}
          //                 stroke={this.state.colorF}
          //                 stroke-miterlimit="10"
          //               />
          //               <Path
          //                 d="M28 20.7171C24.95 20.7171 22.5 18.3001 22.5 15.2912C22.5 12.2823 24.95 9.8653 28 9.8653C31.05 9.8653 33.5 12.2823 33.5 15.2912C33.5 18.3001 31.05 20.7171 28 20.7171ZM28 10.8518C25.5 10.8518 23.5 12.8249 23.5 15.2912C23.5 17.7575 25.5 19.7306 28 19.7306C30.5 19.7306 32.5 17.7575 32.5 15.2912C32.5 12.8249 30.5 10.8518 28 10.8518Z"
          //                 fill={this.state.colorF}
          //                 stroke={this.state.colorF}
          //                 stroke-width="0.5"
          //                 stroke-miterlimit="10"
          //               />
          //               <Path
          //                 d="M30.5 15.7845H27.5V12.8249H28.5V14.798H30.5V15.7845Z"
          //                 fill={this.state.colorF}
          //                 stroke={this.state.colorF}
          //                 stroke-width="0.5"
          //                 stroke-miterlimit="10"
          //               />
          //             </Svg>
          //           </View>
          //         </TouchableHighlight>
          //       </View>
          //     );
          //   },
        })}
      />
      <Tab.Screen
        name="OrderT"
        component={OrderListStackNav}
        initialParams={props.route.params}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     tabPressQuote(navigation);
        //   },
        // })}
        options={({ navigation }) => ({
          //   tabBarIcon: () => (
          //     <Svg
          //       width="30"
          //       height="30"
          //       viewBox="0 0 24 24"
          //       fill="none"
          //       xmlns="http://www.w3.org/2000/svg"
          //     >
          //       <Path
          //         d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          //         stroke={this.state.colorO}
          //         stroke-width="4"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //       />
          //       <Path
          //         d="M14 2V8H20"
          //         stroke={this.state.colorO}
          //         stroke-width="4"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //       />
          //       <Path
          //         d="M16 13H8"
          //         stroke={this.state.colorO}
          //         stroke-width="4"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //       />
          //       <Path
          //         d="M16 17H8"
          //         stroke={this.state.colorO}
          //         stroke-width="4"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //       />
          //       <Path
          //         d="M10 9H9H8"
          //         stroke={this.state.colorO}
          //         stroke-width="4"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //         stroke-miterlimit="10"
          //       />
          //     </Svg>
          //   ),
          tabBarLabel: "Order List",
          //   tabBarLabelStyle: { color: this.colorO },
          //   tabBarButton: () => {
          //     return (
          //       <View style={{ flex: 1, height: "100%", width: "100%" }}>
          //         <TouchableHighlight
          //           underlayColor={"rgba(0,0,53,0.1)"}
          //           onPress={this.tabPressQuote.bind(this, navigation)}
          //         >
          //           <View
          //             style={{
          //               height: "100%",
          //               width: "100%",
          //             }}
          //           >
          //             <Svg
          //               width="30"
          //               height="30"
          //               viewBox="0 0 24 24"
          //               fill="none"
          //               xmlns="http://www.w3.org/2000/svg"
          //             >
          //               <Path
          //                 d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
          //                 stroke={this.state.colorO}
          //                 stroke-width="4"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //               />
          //               <Path
          //                 d="M14 2V8H20"
          //                 stroke={this.state.colorO}
          //                 stroke-width="4"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //               />
          //               <Path
          //                 d="M16 13H8"
          //                 stroke={this.state.colorO}
          //                 stroke-width="4"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //               />
          //               <Path
          //                 d="M16 17H8"
          //                 stroke={this.state.colorO}
          //                 stroke-width="4"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //               />
          //               <Path
          //                 d="M10 9H9H8"
          //                 stroke={this.state.colorO}
          //                 stroke-width="4"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //                 stroke-miterlimit="10"
          //               />
          //             </Svg>
          //           </View>
          //         </TouchableHighlight>
          //       </View>
          //     );
          //   },
        })}
      />
      <Tab.Screen
        name="PortfolioT"
        component={PortfolioTabNavigator}
        initialParams={props.route.params}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     tabPressPortfolio(navigation);
        //   },
        // })}
        options={({ navigation }) => ({
          //   tabBarIcon: () => (
          //     <Svg
          //       width="30"
          //       height="30"
          //       viewBox="0 0 27 27"
          //       fill="none"
          //       xmlns="http://www.w3.org/2000/svg"
          //     >
          //       <Path
          //         d="M22.1667 8.08331H4.83341C3.6368 8.08331 2.66675 9.05336 2.66675 10.25V21.0833C2.66675 22.2799 3.6368 23.25 4.83341 23.25H22.1667C23.3634 23.25 24.3334 22.2799 24.3334 21.0833V10.25C24.3334 9.05336 23.3634 8.08331 22.1667 8.08331Z"
          //         stroke={this.state.colorP}
          //         stroke-width="2"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //       />
          //       <Path
          //         d="M17.8334 23.25V5.91667C17.8334 5.34203 17.6051 4.79093 17.1988 4.3846C16.7925 3.97827 16.2414 3.75 15.6667 3.75H11.3334C10.7588 3.75 10.2077 3.97827 9.80135 4.3846C9.39502 4.79093 9.16675 5.34203 9.16675 5.91667V23.25"
          //         stroke={this.state.colorP}
          //         stroke-width="2"
          //         stroke-linecap="round"
          //         stroke-linejoin="round"
          //       />
          //     </Svg>
          //   ),
          tabBarLabel: "Portfolio",
          //   tabBarLabelStyle: { color: this.colorP },
          //   tabBarButton: () => {
          //     return (
          //       <View style={{ flex: 1, height: "100%", width: "100%" }}>
          //         <TouchableHighlight
          //           underlayColor={"rgba(0,0,53,0.1)"}
          //           onPress={this.tabPressPortfolio.bind(this, navigation)}
          //         >
          //           <View
          //             style={{
          //               height: "100%",
          //               width: "100%",
          //             }}
          //           >
          //             <Svg
          //               width="30"
          //               height="30"
          //               viewBox="0 0 27 27"
          //               fill="none"
          //               xmlns="http://www.w3.org/2000/svg"
          //             >
          //               <Path
          //                 d="M22.1667 8.08331H4.83341C3.6368 8.08331 2.66675 9.05336 2.66675 10.25V21.0833C2.66675 22.2799 3.6368 23.25 4.83341 23.25H22.1667C23.3634 23.25 24.3334 22.2799 24.3334 21.0833V10.25C24.3334 9.05336 23.3634 8.08331 22.1667 8.08331Z"
          //                 stroke={this.state.colorP}
          //                 stroke-width="2"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //               />
          //               <Path
          //                 d="M17.8334 23.25V5.91667C17.8334 5.34203 17.6051 4.79093 17.1988 4.3846C16.7925 3.97827 16.2414 3.75 15.6667 3.75H11.3334C10.7588 3.75 10.2077 3.97827 9.80135 4.3846C9.39502 4.79093 9.16675 5.34203 9.16675 5.91667V23.25"
          //                 stroke={this.state.colorP}
          //                 stroke-width="2"
          //                 stroke-linecap="round"
          //                 stroke-linejoin="round"
          //               />
          //             </Svg>
          //           </View>
          //         </TouchableHighlight>
          //       </View>
          //     );
          //   },
        })}
      />
      <Tab.Screen
        name="BuySellT"
        component={BuySellStackNavigator}
        initialParams={props.route.params}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     tabPressBuySell(navigation);
        //   },
        // })}
        options={({ navigation }) => ({
          //   tabBarIcon: () => (
          //     <Svg
          //       width="30"
          //       height="30"
          //       viewBox="0 0 24 22"
          //       fill="none"
          //       xmlns="http://www.w3.org/2000/svg"
          //     >
          //       <Path
          //         d="M17.9994 8.06961V4.99986C17.9994 3.53292 16.971 2.2108 15.1035 1.27712C13.4563 0.453575 11.2886 0 8.99976 0C6.71061 0 4.54288 0.453575 2.8958 1.27712C1.02843 2.2108 0 3.53292 0 4.99986V8.99969V12.9994V16.9992C0 18.4662 1.02843 19.7883 2.89587 20.722C4.54295 21.5456 6.71068 21.9991 8.99982 21.9991C10.7437 21.9991 12.4061 21.7389 13.8422 21.2455C14.7914 21.7272 15.8642 21.9991 16.9994 21.9991C20.8596 21.9991 24.0001 18.8586 24.0001 14.9984C24 11.4779 21.3876 8.55638 17.9994 8.06961ZM2.00018 12.2017C2.27294 12.386 2.57137 12.5602 2.89587 12.7224C4.54295 13.546 6.71075 13.9995 8.99982 13.9995C9.36079 13.9995 9.71962 13.9876 10.0751 13.9651C10.0251 14.3024 9.99872 14.6475 9.99872 14.9985C9.99872 15.3251 10.0217 15.6466 10.0653 15.9614C9.71382 15.9865 9.35792 15.9991 8.99982 15.9991C4.99359 15.9992 2.00018 14.4155 2.00018 12.9995V12.2017ZM10.7232 11.8996C10.1617 11.9657 9.58414 11.9993 8.99976 11.9993C4.99359 11.9994 2.00018 10.4157 2.00018 8.99969V8.20188C2.27294 8.38624 2.57137 8.56045 2.89587 8.7226C4.54295 9.54621 6.71075 9.99972 8.99982 9.99972C10.2314 9.99972 11.4269 9.8673 12.5261 9.61768C11.7771 10.2415 11.1602 11.0183 10.7232 11.8996ZM8.99976 2.00018C13.0059 2.00018 15.9992 3.58386 15.9992 4.99986C15.9992 6.41585 13.0059 7.9996 8.99976 7.9996C4.99359 7.9996 2.00018 6.41585 2.00018 4.99986C2.00018 3.58386 4.99359 2.00018 8.99976 2.00018ZM2.00018 16.9993V16.2016C2.27294 16.3859 2.57137 16.5601 2.89587 16.7223C4.54295 17.5458 6.71068 17.9994 8.99982 17.9994C9.55187 17.9994 10.1001 17.9722 10.6382 17.9198C10.9433 18.5815 11.3484 19.188 11.8345 19.7193C10.9433 19.9018 9.97831 19.999 8.99976 19.999C4.99359 19.999 2.00018 18.4152 2.00018 16.9993ZM16.9994 19.999C14.2421 19.999 11.9989 17.7558 11.9989 14.9985C11.9989 12.2491 14.2296 10.0112 16.9762 9.99865C16.984 9.99885 16.9915 9.99985 16.9994 9.99985C17.0072 9.99985 17.0147 9.99885 17.0226 9.99865C19.7691 10.0112 21.9998 12.2491 21.9998 14.9985C21.9998 17.7558 19.7566 19.999 16.9994 19.999Z"
          //         fill={this.state.colorB}
          //       />
          //     </Svg>
          //   ),
          tabBarLabel: "Buy Sell",
          //   tabBarLabelStyle: { color: this.colorB },
        })}
      />
    </Tab.Navigator>
  );
};

const TabStack = createNativeStackNavigator();

const TabStackNavigator = (props) => {
  return (
    <TabStack.Navigator
    // initialRouteName={props.route.params.routeTab}
    >
      <TabStack.Screen
        name="TabNavigator"
        component={TabNavigator}
        // initialParams={props.route.params}
        initialParams={props}
        options={{
          header: ({ navigation, options, route }) => (
            <MainHeader
              brokerUrl={props.brokerUrl}
              // brokerUrl={props.route.params.props.brokerUrl}
              brokerImage={props.brokerImage}
              // brokerImage={props.route.params.props.brokerImage}
              icon={"menu"}
              navigation={navigation}
            />
          ),
        }}
      />
      <TabStack.Screen
        name="TopStocks"
        component={TopStockTopTabNavigator}
        initialParams={props}
        // initialParams={props.route.params}
        options={{
          header: ({ navigation }) => (
            <MainHeader
              // brokerUrl={props.route.params.props.brokerUrl}
              brokerUrl={props.brokerUrl}
              // brokerImage={props.route.params.props.brokerImage}
              brokerImage={props.brokerImage}
              icon={"goBack"}
              navigation={navigation}
            />
          ),
        }}
      />
      <TabStack.Screen
        name="QuoteT"
        component={QuoteTopTabNavigator}
        initialParams={props}
        // initialParams={props.route.params}
        options={{
          header: ({ navigation }) => (
            <MainHeader
              brokerUrl={props.brokerUrl}
              // brokerUrl={props.route.params.props.brokerUrl}
              brokerImage={props.brokerImage}
              // brokerImage={props.route.params.props.brokerImage}
              icon={"goBack"}
              navigation={navigation}
            />
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

// const Drawer = createDrawerNavigator();

// const focusedDrawerHandler = (value) => {
//   const arr = value.split("-");
//   return arr[0];
// };

// const CustomDrawer = (props) => {
//   let focusedD;
//   const historyD = props.state.history;
//   if (historyD.length === 1) {
//     focusedD = focusedDrawerHandler(historyD[0].key);
//   } else {
//     if (historyD[1].type === "drawer") {
//       focusedD = focusedDrawerHandler(historyD[0].key);
//     } else {
//       focusedD = focusedDrawerHandler(historyD[1].key);
//     }
//   }

//   return (
//     <DrawerContentScrollView style={{ width: "100%", height: "100%" }}>
//       <View
//         style={{
//           height: 30,
//           width: "100%",
//           backgroundColor: colors.primary,
//           justifyContent: "center",
//           paddingHorizontal: "5%",
//         }}
//       >
//         <Text style={{ fontSize: 16, color: "white" }}>Market</Text>
//       </View>
//       <DrawerItem
//         label={"Market"}
//         onPress={() => {
//           props.navigation.navigate("MarketD", {
//             routeTab: "TabNavigator",
//             routePTab: "MarketT",
//             routeScreen: "MarketStack",
//           });
//         }}
//         focused={focusedD === "MarketD" ? true : false}
//       />
//       <DrawerItem
//         label={"Indices"}
//         onPress={() =>
//           props.navigation.navigate("IndicesD", {
//             routeTab: "TabNavigator",
//             routePTab: "MarketT",
//             routeScreen: "Indices",
//           })
//         }
//         focused={focusedD === "IndicesD" ? true : false}
//       />
//       <DrawerItem
//         label={"Trades"}
//         onPress={() =>
//           props.navigation.navigate("TradesD", {
//             routeTab: "TabNavigator",
//             routePTab: "MarketT",
//             routeScreen: "Trades",
//           })
//         }
//         focused={focusedD === "TradesD" ? true : false}
//       />
//       <DrawerItem
//         label={"Top Stocks"}
//         onPress={() =>
//           props.navigation.navigate("TopStocksD", {
//             routeTab: "TopStocks",
//           })
//         }
//         focused={focusedD === "TopStocksD" ? true : false}
//       />
//       <DrawerItem
//         label={"Announcement"}
//         onPress={() => props.navigation.navigate("AnnouncementD")}
//         focused={focusedD === "AnnouncementD" ? true : false}
//       />
//       <View
//         style={{
//           height: 30,
//           width: "100%",
//           backgroundColor: colors.primary,
//           justifyContent: "center",
//           paddingHorizontal: "5%",
//         }}
//       >
//         <Text style={{ fontSize: 16, color: "white" }}>Watch List</Text>
//       </View>
//       <DrawerItem
//         label={"Equity"}
//         onPress={() => {
//           props.navigation.navigate("EquityD", {
//             routeTab: "TabNavigator",
//             routePTab: "FullWatchT",
//             routeScreen: "FullWatchTT",
//           });
//         }}
//         focused={focusedD === "EquityD" ? true : false}
//       />
//       <DrawerItem
//         label={"Favourites"}
//         onPress={() => {
//           props.navigation.navigate("FavouriteD", {
//             routeTab: "TabNavigator",
//             routePTab: "FullWatchT",
//             routeScreen: "FavouritesTT",
//           });
//         }}
//         focused={focusedD === "FavouriteD" ? true : false}
//       />
//       <View
//         style={{
//           height: 30,
//           width: "100%",
//           backgroundColor: colors.primary,
//           justifyContent: "center",
//           paddingHorizontal: "5%",
//         }}
//       >
//         <Text style={{ fontSize: 16, color: "white" }}>Order List</Text>
//       </View>
//       <DrawerItem
//         label={"Order List"}
//         onPress={() => {
//           props.navigation.navigate("OrderListD", {
//             routeTab: "TabNavigator",
//             routePTab: "OrderT",
//             routeScreen: "OrderListO",
//           });
//         }}
//         focused={focusedD === "OrderListD" ? true : false}
//       />
//       <DrawerItem
//         label={"Account Summary"}
//         onPress={() => {
//           props.navigation.navigate("AccountSummaryD", {
//             routeTab: "TabNavigator",
//             routePTab: "OrderT",
//             routeScreen: "AccountSummary",
//           });
//         }}
//         focused={focusedD === "AccountSummaryD" ? true : false}
//       />
//       <DrawerItem
//         label={"Recent Transactions"}
//         onPress={() => {
//           props.navigation.navigate("RecentTransactionD", {
//             routeTab: "TabNavigator",
//             routePTab: "OrderT",
//             routeScreen: "RecentTransactions",
//           });
//         }}
//         focused={focusedD === "RecentTransactionD" ? true : false}
//       />
//       <View
//         style={{
//           height: 30,
//           width: "100%",
//           backgroundColor: colors.primary,
//           justifyContent: "center",
//           paddingHorizontal: "5%",
//         }}
//       >
//         <Text style={{ fontSize: 16, color: "white" }}>Portfolio</Text>
//       </View>
//       <DrawerItem
//         label={"Summary"}
//         onPress={() =>
//           props.navigation.navigate("SummaryD", {
//             routeTab: "TabNavigator",
//             routePTab: "PortfolioT",
//             routeScreen: "Summary",
//           })
//         }
//         focused={focusedD === "SummaryD" ? true : false}
//       />
//       <DrawerItem
//         label={"Detailed"}
//         onPress={() =>
//           props.navigation.navigate("DetailedD", {
//             routeTab: "TabNavigator",
//             routePTab: "PortfolioT",
//             routeScreen: "Detailed",
//           })
//         }
//         focused={focusedD === "DetailedD" ? true : false}
//       />
//       <DrawerItem
//         label={"Valuation"}
//         onPress={() =>
//           props.navigation.navigate("ValuationD", {
//             routeTab: "TabNavigator",
//             routePTab: "PortfolioT",
//             routeScreen: "Valuation",
//           })
//         }
//         focused={focusedD === "ValuationD" ? true : false}
//       />
//       <View
//         style={{
//           height: 30,
//           width: "100%",
//           backgroundColor: colors.primary,
//           justifyContent: "center",
//           paddingHorizontal: "5%",
//         }}
//       >
//         <Text style={{ fontSize: 16, color: "white" }}>Buy Sell</Text>
//       </View>
//       <DrawerItem
//         label={"Buy Sell"}
//         onPress={() => props.navigation.navigate("StackNavigator1")}
//         focused={focusedD === "BuySellD" ? true : false}
//       />
//     </DrawerContentScrollView>
//   );
// };

// const DrawerNavigator = (props) => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{ headerShown: false }}
//       drawerContent={(props) => <CustomDrawer {...props} />}
//     >
//       <Drawer.Screen
//         name="MarketD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "MarketT",
//           routeScreen: "MarketStack",
//         }}
//       />
//       <Drawer.Screen
//         name="IndicesD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "MarketT",
//           routeScreen: "Indices",
//         }}
//       />
//       <Drawer.Screen
//         name="TradesD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "MarketT",
//           routeScreen: "Trades",
//         }}
//       />
//       <Drawer.Screen
//         name="TopStocksD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{ props: props, routeTab: "TopStocks" }}
//       />
//       <Drawer.Screen
//         name="AnnouncementD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         // initialParams={{props: props, routeTab: "TabNavigator", routePTab: "MarketT", routeScreen: ""}}
//       />
//       <Drawer.Screen
//         name="EquityD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "FullWatchT",
//           routeScreen: "FullWatchTT",
//         }}
//       />
//       <Drawer.Screen
//         name="FavouriteD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "FullWatchT",
//           routeScreen: "FavouritesTT",
//         }}
//       />
//       <Drawer.Screen
//         name="OrderListD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "OrderT",
//           routeScreen: "OrderListO",
//         }}
//       />
//       <Drawer.Screen
//         name="AccountSummaryD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "OrderT",
//           routeScreen: "AccountSummary",
//         }}
//       />
//       <Drawer.Screen
//         name="RecentTransactionD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "OrderT",
//           routeScreen: "RecentTransactions",
//         }}
//       />
//       <Drawer.Screen
//         name="SummaryD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "PortfolioT",
//           routeScreen: "Summary",
//         }}
//       />
//       <Drawer.Screen
//         name="DetailedD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "PortfolioT",
//           routeScreen: "Detailed",
//         }}
//       />
//       <Drawer.Screen
//         name="ValuationD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "PortfolioT",
//           routeScreen: "Valuation",
//         }}
//       />
//       <Drawer.Screen
//         name="BuySellD"
//         component={TabStackNavigator}
//         options={{ unmountOnBlur: true }}
//         initialParams={{
//           props: props,
//           routeTab: "TabNavigator",
//           routePTab: "BuySellT",
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

const AtradNavigator = () => {
  const userToken = useSelector((state) => state.auth.token);
  const brokerImage = useSelector((state) => state.auth.brokerImage);
  const brokerUrl = useSelector((state) => state.auth.brokerUrl);
  const passWord = useSelector((state) => state.auth.passWord);

  let MainComponent = LoginStackNavigator;

  if (userToken === "success") {
    MainComponent = TabStackNavigator;
  } else if (userToken === "newUser") {
    MainComponent = ChangePassword;
  } else if (userToken === null) {
    MainComponent = LoginStackNavigator;
  }
  return (
    <NavigationContainer>
      <MainComponent
        brokerImage={brokerImage}
        brokerUrl={brokerUrl}
        passWord={passWord}
      />
    </NavigationContainer>
  );
};

export default AtradNavigator;

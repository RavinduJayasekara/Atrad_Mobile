import React, { Component } from "react";
import {
  Dimensions,
  Text,
  View,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity,
  Platform,
  Modal,
  Button,
} from "react-native";
import Svg, { Path, Mask, G, Rect } from "react-native-svg";
import requestBody from "../RequestBody/RequestFunction";
import TextTicker from "react-native-text-ticker";
import { connect } from "react-redux";
import { signOut, erroHandler } from "../../store/actions/Auth";
import colors from "../../colors";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Ionicons } from "@expo/vector-icons";
import { TabActions } from "@react-navigation/native";
import Messages from "../../messages/Messages";
const { height, width } = Dimensions.get("window");
const headerHeight = 64;
const statusBarHeight = StatusBar.currentHeight;
const headerBodyHeight = 64 - statusBarHeight;

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.textTickerRef = React.createRef();
  }

  _isMounted = false;

  state = {
    marketStatus: null,
    requestTime: null,
    time: "",
    intervalIdT: "",
    cseBrokerAnnouncements: "",
    intervalIdS: "",
    intervalIdMST: "",
    visible: false,
  };

  checkTimeValues = (time) => {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  };

  setTime = (currentTime) => {
    const currentTimeStamp = new Date(currentTime);
    let h = currentTimeStamp.getHours();
    let m = currentTimeStamp.getMinutes();
    let s = currentTimeStamp.getSeconds();

    m = this.checkTimeValues(m);
    s = this.checkTimeValues(s);

    this.setState({ time: h + ":" + m + ":" + s });
  };

  signOutHandler = async () => {
    await this.props.signOut();
  };

  renderHeaderInformation = () => {
    Promise.all([
      requestBody(
        "GET",
        this.props.brokerUrl,
        "home?action=getJBossTime&format=json",
        "",
        {}
      ),
      requestBody(
        "GET",
        this.props.brokerUrl,
        "marketdetails?action=getCSEAnnouncement&format=json&msgtype=CSE",
        "",
        {}
      ),
      requestBody(
        "GET",
        this.props.brokerUrl,
        "marketdetails?action=getBrokerAnnouncement&format=json&msgtype=BROKER",
        "",
        {}
      ),
    ])
      .then((result) => {
        clearInterval(this.state.intervalIdS);
        if (this._isMounted) {
          if (result.status === 200) {
            const timeDifference =
              new Date().getTime() - result[0].data.jbossTime;
            const currentTime = new Date().getTime() - timeDifference;
            if (
              result[1].data.size[0].size !== "0" ||
              result[2].data.size[0].size !== "0"
            ) {
              let cseAnnouncements = [];
              let brokerAnnouncements = [];
              if (result[1].data.size[0].size !== "0") {
                cseAnnouncements = result[1].data.announcement.map(
                  (item) => item.subject
                );
              }
              if (result[2].data.size[0].size !== "0") {
                brokerAnnouncements = result[1].data.announcement.map(
                  (item) => item.subject
                );
              }
              const announcements = [
                ...cseAnnouncements,
                ...brokerAnnouncements,
              ];
              const announcementString = announcements.join("    *    ");
              this.setState({
                cseBrokerAnnouncements: "*    " + announcementString,
              });
            }
            this.setTime(currentTime);
            this.setState({ requestTime: timeDifference });
          } else {
            //todo: check network errors later
          }
        }
      })
      .catch((error) => {
        clearInterval(this.state.intervalIdS);
        if (this._isMounted) {
          Alert.alert(
            Messages.unknownErrorTitle,
            Messages.unknownErrorDescription,
            [
              {
                text: Messages.okayButtonTitle,
                style: "destructive",
              },
            ]
          );
        }
      });
  };

  requestTimeOutHandler = () => {
    const statusIntervalId = setTimeout(() => {
      if (this._isMounted) {
        Alert.alert("Warning!", "Request Time Out.", [
          {
            onPress: this.signOutHandler,
            text: "Okay!",
            style: "destructive",
          },
        ]);
      }
    }, 30000);
    this.setState({ intervalIdS: statusIntervalId });
    this.renderHeaderInformation();
  };

  timeOutHandler = () => {
    let currentTime = new Date(new Date().getTime() - this.state.requestTime);
    this.setTime(currentTime);
  };

  marketStatus = async () => {
    try {
      const response = await requestBody(
        "GET",
        this.props.brokerUrl,
        "home?action=marketStatus",
        "",
        {}
      );

      if (response.status === 200) {
        return response.data;
      } else {
        //todo:
      }
    } catch (error) {
      this.props.erroHandler();
      // throw error;
      Alert.alert(
        Messages.unknownErrorTitle,
        Messages.unknownErrorDescription,
        [{ text: Messages.okayButtonTitle, style: "destructive" }]
      );
    }
  };

  modalOpenHandler = () => {
    this.setState({
      visible: true,
    });
  };
  modalCloseHandler = () => {
    this.setState({ visible: false });
  };

  marketNavigation = () => {
    const jumpAction = TabActions.jumpTo("MarketT", { screen: "MarketStack" });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  indicesNavigation = () => {
    const jumpAction = TabActions.jumpTo("MarketT", { screen: "Indices" });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  tradesNavigation = () => {
    const jumpAction = TabActions.jumpTo("MarketT", { screen: "Trades" });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  equityNavigation = () => {
    const jumpAction = TabActions.jumpTo("FullWatchT", {
      screen: "FullWatchTT",
    });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  favouriteNavigation = () => {
    const jumpAction = TabActions.jumpTo("FullWatchT", {
      screen: "FavouritesTT",
    });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  orderListNavigation = () => {
    const jumpAction = TabActions.jumpTo("OrderT", {
      screen: "OrderListO",
    });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  accountSummaryNavigation = () => {
    const jumpAction = TabActions.jumpTo("OrderT", {
      screen: "AccountSummary",
    });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  recentTransactionNavigation = () => {
    const jumpAction = TabActions.jumpTo("OrderT", {
      screen: "RecentTransactions",
    });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  summaryNavigation = () => {
    const jumpAction = TabActions.jumpTo("PortfolioT", { screen: "Summary" });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  detailedNavigation = () => {
    const jumpAction = TabActions.jumpTo("PortfolioT", { screen: "Detailed" });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  valuationNavigation = () => {
    const jumpAction = TabActions.jumpTo("PortfolioT", { screen: "Valuation" });
    this.props.navigation.dispatch(jumpAction);
    this.setState({ visible: false });
  };

  topStocksNavigation = () => {
    this.props.navigation.navigate("TopStocks");
    this.setState({ visible: false });
  };

  componentDidMount() {
    this._isMounted = true;
    this.requestTimeOutHandler();
    this.marketStatus().then((result) => {
      if (this._isMounted) {
        this.setState({ marketStatus: result.data.status });
      }
    });

    const intervalTimeOutLT = setInterval(() => {
      if (this._isMounted) {
        this.timeOutHandler();
      }
    }, 1000);
    const intervalTimeOutMST = setInterval(() => {
      if (this._isMounted) {
        this.marketStatus().then((result) => {
          if (this._isMounted) {
            if (typeof result === "undefined") {
            } else {
              this.setState({
                marketStatus: result.data.status,
              });
            }
          }
        });
      }
    }, 20000);
    this.setState({ intervalIdT: intervalTimeOutLT });
    this.setState({ intervalIdMST: intervalTimeOutMST });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.err !== this.props.err) {
      clearInterval(this.state.intervalIdT);
      clearInterval(this.state.intervalIdS);
      clearInterval(this.state.intervalIdMST);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.textTickerRef.current.stopAnimation();
    clearInterval(this.state.intervalIdT);
    clearInterval(this.state.intervalIdS);
    clearInterval(this.state.intervalIdMST);
  }

  render() {
    return (
      <View
        style={{
          height: headerHeight,
          width: width,
          backgroundColor: colors.primary,
        }}
      >
        {/* {Platform.OS === "ios" && (
          <View style={{ height: getStatusBarHeight() }} />
        )}

        <StatusBar /> */}
        {/* <View
          style={{
            height: headerHeight * 0.06,
            width: "100%",
          }}
        /> */}
        <View
          style={{
            height: headerHeight,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "14%",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {this.props.icon === "menu" ? (
              <View
                style={{
                  flex: 1,
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={this.modalOpenHandler}
                  style={{
                    justifyContent: "center",
                    flex: 1,
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <Svg
                    width={20}
                    height={20}
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M20.5 12.25L10.5 12.25"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M20.5 6.25L4.5 6.25"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M20.5 18.25L16.5 18.25"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                </TouchableOpacity>
              </View>
            ) : (
              <Ionicons
                onPress={() => this.props.navigation.navigate("TabNavigator")}
                name="ios-arrow-back"
                size={width * 0.064}
                color={colors.white}
              />
            )}
          </View>
          <View
            style={{
              width: "45%",
              height: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: headerHeight * 0.133,
                  color:
                    this.state.marketStatus === "Close" ? "#EE1E24" : "#04A756",
                }}
              >
                {this.state.marketStatus}
              </Text>
              <Text style={{ fontSize: headerHeight * 0.133, color: "white" }}>
                {this.state.time}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "21%",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: width * 0.21, height: headerHeight * 0.29 }}
              source={{ uri: this.props.brokerImage }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              height: "100%",
              width: "10%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.3333 13.1667L18.0833 16.9167C18.4166 17.25 18.4166 17.75 18.0833 18.0833C17.9166 18.25 17.6666 18.3333 17.5 18.3333C17.3333 18.3333 17.0833 18.25 16.9166 18.0833L13.1666 14.3333C11.9166 15.25 10.4166 15.8333 8.74996 15.8333C4.83329 15.8333 1.66663 12.6667 1.66663 8.75C1.66663 4.83333 4.83329 1.66667 8.74996 1.66667C12.6666 1.66667 15.8333 4.83333 15.8333 8.75C15.8333 10.4167 15.25 12 14.3333 13.1667ZM8.74996 3.33334C5.74996 3.33334 3.33329 5.75 3.33329 8.75C3.33329 11.75 5.74996 14.1667 8.74996 14.1667C10.25 14.1667 11.5833 13.5833 12.5833 12.5833C13.5833 11.5833 14.1666 10.25 14.1666 8.75C14.1666 5.75 11.75 3.33334 8.74996 3.33334Z"
                fill="white"
              />
              <Mask
                id="mask0_343:902"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="1"
                y="1"
                width="18"
                height="18"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.3333 13.1667L18.0833 16.9167C18.4166 17.25 18.4166 17.75 18.0833 18.0833C17.9166 18.25 17.6666 18.3333 17.5 18.3333C17.3333 18.3333 17.0833 18.25 16.9166 18.0833L13.1666 14.3333C11.9166 15.25 10.4166 15.8333 8.74996 15.8333C4.83329 15.8333 1.66663 12.6667 1.66663 8.75C1.66663 4.83333 4.83329 1.66667 8.74996 1.66667C12.6666 1.66667 15.8333 4.83333 15.8333 8.75C15.8333 10.4167 15.25 12 14.3333 13.1667ZM8.74996 3.33334C5.74996 3.33334 3.33329 5.75 3.33329 8.75C3.33329 11.75 5.74996 14.1667 8.74996 14.1667C10.25 14.1667 11.5833 13.5833 12.5833 12.5833C13.5833 11.5833 14.1666 10.25 14.1666 8.75C14.1666 5.75 11.75 3.33334 8.74996 3.33334Z"
                  fill="white"
                />
              </Mask>
              <G mask="url(#mask0_343:902)">
                <Rect
                  x="0.166626"
                  y="1"
                  width="18.8334"
                  height="18.6667"
                  fill="white"
                />
              </G>
            </Svg>
          </View>
          <View
            style={{
              width: "10%",
              alignItems: "center",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Svg
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.1667 14.1667C19.1667 14.6667 18.8334 15 18.3334 15H1.66671C1.16671 15 0.833374 14.6667 0.833374 14.1667C0.833374 13.6667 1.16671 13.3333 1.66671 13.3333C2.58337 13.3333 3.33337 12.5833 3.33337 11.6667V7.5C3.33337 3.83333 6.33337 0.833332 10 0.833332C13.6667 0.833332 16.6667 3.83333 16.6667 7.5V11.6667C16.6667 12.5833 17.4167 13.3333 18.3334 13.3333C18.8334 13.3333 19.1667 13.6667 19.1667 14.1667ZM12.1667 17.9167C11.6667 18.75 10.8334 19.1667 10.0001 19.1667C9.5834 19.1667 9.16673 19.0833 8.75006 18.8333C8.3334 18.5833 8.0834 18.3333 7.8334 17.9167C7.5834 17.5 7.75006 17 8.16673 16.75C8.5834 16.5 9.0834 16.6667 9.3334 17.0833C9.35863 17.1086 9.38386 17.1414 9.4114 17.1773C9.47483 17.2599 9.55052 17.3586 9.66673 17.4167C10.0834 17.6667 10.5834 17.5 10.8334 17.0833C11.0834 16.6667 11.5834 16.5833 12.0001 16.75C12.4167 16.9167 12.4167 17.5 12.1667 17.9167ZM15 11.6667C15 12.25 15.1667 12.8333 15.4167 13.3333H4.58337C4.83337 12.8333 5.00004 12.25 5.00004 11.6667V7.5C5.00004 4.75 7.25004 2.5 10 2.5C12.75 2.5 15 4.75 15 7.5V11.6667Z"
                fill="white"
              />
              <Mask
                id="mask0_343:881"
                style="mask-type:alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="20"
                height="20"
              >
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.1667 14.1667C19.1667 14.6667 18.8334 15 18.3334 15H1.66671C1.16671 15 0.833374 14.6667 0.833374 14.1667C0.833374 13.6667 1.16671 13.3333 1.66671 13.3333C2.58337 13.3333 3.33337 12.5833 3.33337 11.6667V7.5C3.33337 3.83333 6.33337 0.833332 10 0.833332C13.6667 0.833332 16.6667 3.83333 16.6667 7.5V11.6667C16.6667 12.5833 17.4167 13.3333 18.3334 13.3333C18.8334 13.3333 19.1667 13.6667 19.1667 14.1667ZM12.1667 17.9167C11.6667 18.75 10.8334 19.1667 10.0001 19.1667C9.5834 19.1667 9.16673 19.0833 8.75006 18.8333C8.3334 18.5833 8.0834 18.3333 7.8334 17.9167C7.5834 17.5 7.75006 17 8.16673 16.75C8.5834 16.5 9.0834 16.6667 9.3334 17.0833C9.35863 17.1086 9.38386 17.1414 9.4114 17.1773C9.47483 17.2599 9.55052 17.3586 9.66673 17.4167C10.0834 17.6667 10.5834 17.5 10.8334 17.0833C11.0834 16.6667 11.5834 16.5833 12.0001 16.75C12.4167 16.9167 12.4167 17.5 12.1667 17.9167ZM15 11.6667C15 12.25 15.1667 12.8333 15.4167 13.3333H4.58337C4.83337 12.8333 5.00004 12.25 5.00004 11.6667V7.5C5.00004 4.75 7.25004 2.5 10 2.5C12.75 2.5 15 4.75 15 7.5V11.6667Z"
                  fill="white"
                />
              </Mask>
              <G mask="url(#mask0_343:881)">
                <Rect x="-0.833374" width="20" height="20" fill="white" />
              </G>
            </Svg>
          </View>
        </View>
        <View
          style={{
            height: headerHeight,
            justifyContent: "center",
          }}
        >
          <TextTicker
            ref={this.textTickerRef}
            style={{ fontSize: headerHeight * 0.133, color: "white" }}
            scrollSpeed={20}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={2000}
          >
            {this.state.cseBrokerAnnouncements}
          </TextTicker>
        </View>
        <Modal transparent={true} visible={this.state.visible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.white,
            }}
          >
            <Button title={"Market Info"} onPress={this.marketNavigation} />
            <Button title={"indices"} onPress={this.orderListNavigation} />
            <Button title={"trades"} onPress={this.tradesNavigation} />
            <Button title={"top stocks"} onPress={this.topStocksNavigation} />
            <Button title={"equity"} onPress={this.equityNavigation} />
            <Button title={"favourites"} onPress={this.favouriteNavigation} />
            <Button title={"quote"} onPress={this.portfolioNavigation} />
            <Button title={"market depth"} onPress={this.portfolioNavigation} />
            <Button
              title={"time and sales"}
              onPress={this.portfolioNavigation}
            />
            <Button title={"blotter"} onPress={this.orderListNavigation} />
            <Button
              title={"account summary"}
              onPress={this.accountSummaryNavigation}
            />
            <Button
              title={"recent transactions"}
              onPress={this.recentTransactionNavigation}
            />
            <Button title={"summary"} onPress={this.summaryNavigation} />
            <Button title={"detailed"} onPress={this.detailedNavigation} />
            <Button title={"valuation"} onPress={this.valuationNavigation} />
            <Button title={"buy"} onPress={this.portfolioNavigation} />
            <Button title={"sell"} onPress={this.portfolioNavigation} />
            {/* <Button title={"announcements"} onPress={this.portfolioNavigation} />
            <Button title={"announcements"} onPress={this.portfolioNavigation} />
            <Button title={"announcements"} onPress={this.portfolioNavigation} />
            <Button title={"announcements"} onPress={this.portfolioNavigation} />
            <Button title={"announcements"} onPress={this.portfolioNavigation} />
            <Button title={"announcements"} onPress={this.portfolioNavigation} /> */}
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  err: state.auth.err,
});

const mapDispatchToProps = {
  signOut,
  erroHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);

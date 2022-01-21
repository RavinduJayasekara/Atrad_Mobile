import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableHighlight,
  Switch,
} from "react-native";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import FullWatchTile from "../../Components/FullWatch/FullWatchTile";
import { connect } from "react-redux";
import { fetchSecurities } from "../../store/actions/Watch";
import List from "../../Components/FullWatch/List";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "../../colors";
import { CheckBox } from "react-native-elements";
import { RadioButton } from "react-native-paper";

const { width, height } = Dimensions.get("window");
const iconSize = height * 0.03;
const headerHeight = height * 0.06;
const seachHeight = height * 0.05;
class FullWatch extends Component {
  state = {
    intervalFW: "",
    searchSec: false,
    searchSecVal: "",
    newSecurityList: [],
    allSecurities: [],
    watchType: "Equity",
    visible: false,
    checked: "Equity",
    lastUpdatedId: "0",
    sortVisible: false,
    sortChecked: "Time",
    switchStatus: false,
    sortType: "Time",
  };

  renderItem = (itemData) => {
    return <FullWatchTile itemData={itemData} />;
  };

  fetchSecurityHandler = async (lastUpdatedId, watchType) => {
    await this.props.fetchSecurities(
      this.props.route.params.brokerUrl,
      lastUpdatedId,
      watchType
    );
  };

  searchSecurityHandler = (text) => {
    this.setState({ searchSecVal: text });
  };

  searchClickHandler = () => {
    this.setState({ searchSec: true });
  };
  searchCloseHandler = () => {
    this.setState({ searchSec: false });
  };

  searchSecurityHandler = (text) => {
    this.setState({ searchSecVal: text });
    const allSecs = [...this.state.allSecurities];
    const newArr = allSecs.filter((item) => {
      const secCode = item.security.toLowerCase().includes(text.toLowerCase());
      const companyname = item.companyname
        .toLowerCase()
        .includes(text.toLowerCase());

      if (secCode || companyname) {
        return true;
      }
    });

    this.setState({ newSecurityList: newArr });
  };

  watchTypeHandler = () => {
    this.setState({ visible: true });
  };

  crossingHandler = () => {
    this.setState({
      checked: "Crossing",
    });
  };
  equityHandler = () => {
    this.setState({
      checked: "Equity",
    });
  };
  billHandler = () => {
    this.setState({
      checked: "Bill",
    });
  };
  bondHandler = () => {
    this.setState({
      checked: "Bond",
    });
  };

  typeHandler = () => {
    this.fetchSecurityHandler("0", this.state.checked);
    this.setState({ watchType: this.state.checked, visible: false });
  };

  sortOpenHandler = () => {
    this.setState({ sortVisible: true });
  };

  sortHandler = () => {
    this.setState({
      sortType: this.state.sortChecked,
      sortVisible: false,
    });
  };

  sortTypeHandler = (sortType) => {
    this.setState({
      sortChecked: sortType,
    });
  };

  switchHandler = () => {
    const switchStatus = this.state.switchStatus;
    this.setState({ switchStatus: !switchStatus });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allSecurities !== this.props.allSecurities) {
      if (this.state.searchSecVal !== "") {
        const lastUpdatedId = this.props.allSecurities[0].id;
        const secList = this.props.allSecurities;
        const searchList = [...this.state.newSecurityList];
        const newSecList = searchList.map((item) => {
          const updatedItem = secList.find((itemL) => {
            if (itemL.security === item.security) {
              return itemL;
            }
          });
          return updatedItem;
        });
        this.setState({
          newSecurityList: newSecList,
          lastUpdatedId: lastUpdatedId,
        });
      } else {
        let lastUpdatedId = this.state.lastUpdatedId;
        if (this.props.allSecurities.length > 0) {
          lastUpdatedId = this.props.allSecurities[0].id;
        }
        this.setState({
          newSecurityList: this.props.allSecurities,
          allSecurities: this.props.allSecurities,
          lastUpdatedId: lastUpdatedId,
        });
      }
    }
  }

  componentDidMount() {
    // this.props.navigation.addListener("focus", () => {
    //   this.props.navigation.jumpTo("EquityD", {
    //     focused: true,
    //     dName: "EquityD",
    //   });
    // });
    this.fetchSecurityHandler(this.state.lastUpdatedId, this.state.watchType);
    const intervalFullWatch = setInterval(() => {
      this.fetchSecurityHandler(this.state.lastUpdatedId, this.state.watchType);
    }, 20000);
    this.setState({ intervalFW: intervalFullWatch });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalFW);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            height: seachHeight,
          }}
        >
          <LinearGradient
            colors={["#FFFFFF", "#F8F8F9", "#F1F2F4"]}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {!this.state.searchSec ? (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "10%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={this.watchTypeHandler}
                  >
                    <Svg
                      width={iconSize}
                      height={iconSize}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M18.3333 1H1.66667L8.33333 8.88333V14.3333L11.6667 16V8.88333L18.3333 1Z"
                        stroke="#9B9B9B"
                        stroke-opacity="1"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%" }} />
                <View
                  style={{
                    height: "100%",
                    width: "10%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={this.sortOpenHandler}
                  >
                    <Svg
                      width={iconSize}
                      height={iconSize}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <G clip-path="url(#clip0_2_7)">
                        <Path
                          d="M17.3151 4.49396L12.9413 0.181398C12.6981 -0.059248 12.2912 -0.0617417 12.0481 0.181398L7.67369 4.49396C7.42681 4.73834 7.42744 5.13397 7.67369 5.37773C7.91995 5.62211 8.31994 5.62211 8.56619 5.37773L11.8631 2.12766V11.8735C11.8631 12.2185 12.1456 12.4984 12.4944 12.4984C12.8432 12.4984 13.1257 12.2184 13.1257 11.8735V2.12766L16.4226 5.37773C16.6695 5.62211 17.0689 5.62211 17.3151 5.37773C17.5619 5.13334 17.5619 4.73772 17.3151 4.49396Z"
                          fill="#9B9B9B"
                          fill-opacity="1"
                        />
                        <Path
                          d="M11.4337 14.6228L8.1368 17.8729V8.1271C8.1368 7.78208 7.85428 7.50211 7.50552 7.50211C7.15676 7.50211 6.87424 7.78213 6.87424 8.1271V17.8729L3.57731 14.6228C3.33043 14.3784 2.93107 14.3784 2.68481 14.6228C2.43793 14.8672 2.43793 15.2628 2.68481 15.5066L7.05925 19.8185C7.30239 20.0592 7.70928 20.0617 7.95237 19.8185L12.3268 15.506C12.5737 15.2616 12.5731 14.866 12.3268 14.6222C12.08 14.3791 11.68 14.3784 11.4337 14.6228Z"
                          fill="#9B9B9B"
                          fill-opacity="1"
                        />
                      </G>
                      <Defs>
                        <ClipPath id="clip0_2_7">
                          <Rect width="20" height="20" fill="white" />
                        </ClipPath>
                      </Defs>
                    </Svg>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "35%" }} />
                <View
                  style={{
                    height: "100%",
                    width: "10%",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={this.searchClickHandler}
                  >
                    <Svg
                      width={iconSize}
                      height={iconSize}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                        stroke="#9E9E9E"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <Path
                        d="M17.5 17.5L13.875 13.875"
                        stroke="#9E9E9E"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={{ width: "100%", height: "100%", flexDirection: "row" }}
              >
                <View
                  style={{
                    width: "90%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{
                      width: "90%",
                      borderBottomColor: colors.primary,
                      borderBottomWidth: 2,
                    }}
                    onChangeText={this.searchSecurityHandler}
                    value={this.state.searchSecVal}
                  />
                </View>
                <View
                  style={{
                    width: "10%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="ios-close"
                    size={iconSize}
                    color={"#9E9E9E"}
                    onPress={this.searchCloseHandler}
                  />
                </View>
              </View>
            )}
          </LinearGradient>
        </View>
        <View
          style={{
            width: "100%",
            height: headerHeight,
            backgroundColor: "white",
          }}
        >
          <LinearGradient
            colors={["#FFFFFF", "#F8F8F9", "#F1F2F4"]}
            style={{
              width: "100%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                height: "100%",
                width: "10%",
                alignItems: "center",
                justifyContent: "center",
                // transform: [{ rotate: "90deg" }],
              }}
            />
            <View style={{ width: "40%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontFamily: "oS-B" }}
                  numberOfLines={1}
                >
                  Symbol
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontFamily: "oS-sB" }}
                  numberOfLines={1}
                >
                  Description
                </Text>
              </View>
            </View>
            <View style={{ width: "25%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontFamily: "oS-B" }}
                  numberOfLines={1}
                >
                  Last Price
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontFamily: "oS-sB" }}
                  numberOfLines={1}
                >
                  Volume
                </Text>
              </View>
            </View>
            <View style={{ width: "23%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontFamily: "oS-B" }}
                  numberOfLines={1}
                >
                  Chg%
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{ fontSize: 15, fontFamily: "oS-sB" }}
                  numberOfLines={1}
                >
                  Chg
                </Text>
              </View>
            </View>
            <View style={{ width: "2%" }} />
          </LinearGradient>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.newSecurityList &&
          this.state.newSecurityList.length !== 0 ? (
            <List
              navigation={this.props.navigation}
              item={this.state.newSecurityList}
              sortType={this.state.sortType}
            />
          ) : null}
        </View>
        <Modal transparent={true} visible={this.state.visible}>
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(52,52,52,0.7)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: "35%",
                width: "90%",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  paddingTop: "4%",
                  height: "21%",
                  width: "100%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: "oS-B" }}>
                  Select Option
                </Text>
              </View>
              <View style={styles.radioView}>
                <TouchableHighlight
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onPress={this.crossingHandler}
                  underlayColor="rgb(233, 233, 233)"
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton
                      value="Crossing"
                      status={
                        this.state.checked === "Crossing"
                          ? "checked"
                          : "unchecked"
                      }
                      color={"#000035"}
                      onPress={this.crossingHandler}
                    />
                    <Text style={{ fontSize: 20 }}>Crossing</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.radioView}>
                <TouchableHighlight
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  underlayColor="rgb(233, 233, 233)"
                  onPress={this.equityHandler}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton
                      value="Equity"
                      status={
                        this.state.checked === "Equity"
                          ? "checked"
                          : "unchecked"
                      }
                      color={"#000035"}
                      onPress={this.equityHandler}
                    />
                    <Text style={{ fontSize: 20 }}>Equity</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.radioView}>
                <TouchableHighlight
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  underlayColor="rgb(233, 233, 233)"
                  onPress={this.billHandler}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton
                      value="Bill"
                      status={
                        this.state.checked === "Bill" ? "checked" : "unchecked"
                      }
                      color={"#000035"}
                      onPress={this.billHandler}
                    />
                    <Text style={{ fontSize: 20 }}>Bill</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={styles.radioView}>
                <TouchableHighlight
                  underlayColor="rgb(233, 233, 233)"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  underlayColor="rgb(233, 233, 233)"
                  onPress={this.bondHandler}
                >
                  <View
                    style={{
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                      flexDirection: "row",
                    }}
                  >
                    <RadioButton
                      value="Bond"
                      status={
                        this.state.checked === "Bond" ? "checked" : "unchecked"
                      }
                      color={"#000035"}
                      onPress={this.bondHandler}
                    />
                    <Text style={{ fontSize: 20 }}>Bond</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View
                style={{
                  height: "18%",
                  width: "100%",
                  borderTopColor: "rgba(0, 0, 53, 0.2)",
                  borderTopWidth: 1,
                  paddingBottom: "4%",
                  paddingHorizontal: "4%",
                }}
              >
                <TouchableHighlight
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={this.typeHandler}
                  underlayColor={"rgb(233, 233, 233)"}
                >
                  <Text style={{ fontSize: 20, color: "#0186D5" }}>OK</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <Modal transparent={true} visible={this.state.sortVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(52,52,52,0.7)",
            }}
          >
            <View
              style={{
                height: "40%",
                width: "85%",
                padding: "6%",
                backgroundColor: "white",
                borderRadius: 5,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "16%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, fontFamily: "oS-B" }}>
                  Select Option
                </Text>
              </View>
              <View style={{ width: "100%", height: "13%" }}>
                <TouchableHighlight
                  underlayColor={"rgba(233, 233, 233,0)"}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onPress={this.sortTypeHandler.bind(this, "Time")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: "100%",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <RadioButton
                      status={
                        this.state.sortChecked === "Time"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={this.sortTypeHandler.bind(this, "Time")}
                      color={"#000035"}
                    />
                    <Text style={{ fontSize: 18 }}>Sort by Trades Time</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={{ width: "100%", height: "13%" }}>
                <TouchableHighlight
                  underlayColor={"rgba(233, 233, 233,0)"}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onPress={this.sortTypeHandler.bind(this, "Trades")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      height: "100%",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <RadioButton
                      status={
                        this.state.sortChecked === "Trades"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={this.sortTypeHandler.bind(this, "Trades")}
                      color={"#000035"}
                    />
                    <Text style={{ fontSize: 18 }}>Sort by Trades</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={{ width: "100%", height: "13%" }}>
                <TouchableHighlight
                  underlayColor={"rgba(233, 233, 233,0)"}
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                  onPress={this.sortTypeHandler.bind(this, "Symbol")}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <RadioButton
                      status={
                        this.state.sortChecked === "Symbol"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={this.sortTypeHandler.bind(this, "Symbol")}
                      color={"#000035"}
                    />
                    <Text style={{ fontSize: 18 }}>Sort by Symbol</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={{ width: "100%", height: "13%" }}>
                <TouchableHighlight
                  underlayColor={"rgba(233, 233, 233,0)"}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  onPress={this.sortTypeHandler.bind(this, "Change")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <RadioButton
                      status={
                        this.state.sortChecked === "Change"
                          ? "checked"
                          : "unchecked"
                      }
                      onPress={this.sortTypeHandler.bind(this, "Change")}
                      color={"#000035"}
                    />
                    <Text style={{ fontSize: 18 }}>Sort by Change%</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={{ width: "100%", height: "2%" }} />
              <View
                style={{
                  width: "100%",
                  height: "13%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Detailed View</Text>
                <Switch
                  thumbColor={"#000035"}
                  trackColor={{
                    true: "rgba(0, 0, 53, 0.5)",
                    false: "rgba(0, 0, 53, 0.3)",
                  }}
                  value={this.state.switchStatus}
                  onValueChange={this.switchHandler}
                />
              </View>
              <View style={{ width: "100%", height: "3%" }} />
              <View
                style={{
                  width: "100%",
                  height: "14%",
                  borderTopColor: "rgba(0, 0, 53, 0.3)",
                  borderTopWidth: 1,
                }}
              >
                <TouchableHighlight
                  underlayColor={"rgb(233, 233, 233)"}
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={this.sortHandler}
                >
                  <Text style={{ fontSize: 20 }}>OK</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allSecurities: state.watch.allSecurities,
  };
};

const mapDispatchToProps = {
  fetchSecurities,
};

const styles = StyleSheet.create({
  radioView: {
    width: "100%",
    height: "15.25%",
    paddingHorizontal: "4%",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FullWatch);

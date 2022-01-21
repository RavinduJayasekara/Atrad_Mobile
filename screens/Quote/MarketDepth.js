import React, { Component } from "react";
import {
  Dimensions,
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../colors";
import { fetchOrderBook } from "../../store/actions/Quote";
import { connect } from "react-redux";
import addCommas from "../../Components/RequestBody/AddCommas";
const { height, width } = Dimensions.get("window");
const tileHeight = height * 0.06;

class MarketDepth extends Component {
  state = {
    security: this.props.route.params.security,
    newTotalAsk: "",
    newTotalBid: "",
    newAsk: [],
    newBid: [],
    companyName: this.props.route.params.companyname,
    neworderBook1: {},
  };

  componentDidUpdate(prevProps) {
    //gets orderbook and orderbook as the same variable
    if (prevProps.orderBook !== this.props.orderBook) {
      //checks if it is order book or order book size
      if (this.props.orderBook === "0") {
        this.setState({
          neworderBook1: this.props.orderBook1,
        });
      } else {
        let totalAsk = addCommas(this.props.orderBook[0].totalask);
        let totalBid = addCommas(this.props.orderBook[0].totalbids);
        this.setState({
          newTotalAsk: totalAsk,
          newTotalBid: totalBid,
          newAsk: this.props.orderBook[0].ask,
          newBid: this.props.orderBook[0].bid,
          neworderBook1: this.props.orderBook1,
        });
      }
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.props.fetchOrderBook(
        this.props.route.params.brokerUrl,
        this.props.route.params.security
      );
    });
  }

  render() {
    if (this.state.newTotalAsk !== "") {
    }
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View
            style={{
              width: "100%",
              height: height * 0.11,
              borderBottomColor: colors.greyStroke,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                paddingHorizontal: "2.5%",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "56%",
                  height: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "65%",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "oS-B",
                    }}
                    numberOfLines={1}
                  >
                    {this.state.security}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ color: colors.greyTitle, fontFamily: "iT" }}
                  >
                    {this.state.companyName}
                  </Text>
                </View>
                <View style={{ width: "35%" }}>
                  <Button title="Sell" color="#1D9531" />
                </View>
              </View>
              <View style={{ width: "3%", height: "100%" }} />
              <View
                style={{
                  width: "19%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Button title="Buy" color="#EE1E24" />
              </View>
              <View style={{ width: "2%", height: "100%" }}></View>
              <View
                style={{
                  width: "20%",
                  height: "100%",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Ionicons
                    name="ios-share-social-outline"
                    size={25}
                    color={"#9E9E9E"}
                  />
                </View>
                <View
                  style={{
                    height: "100%",
                    width: "50%",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "50%",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="ios-star-outline"
                      size={25}
                      color={"#9E9E9E"}
                    />
                  </View>

                  <View
                    style={{
                      width: "100%",
                      height: "50%",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="caret-down" size={25} color={"#9E9E9E"} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: height * 0.14,
              paddingHorizontal: "2.5%",
              paddingVertical: "2.5%",
              width: "100%",
              borderBottomColor: colors.greyStroke,
              borderBottomWidth: 1,
              backgroundColor: colors.greyBack,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "100%",
                // position: "relative",
                // alignItems: "center",
              }}
            >
              <View
                style={{
                  height: "40%",
                  width: "40%",
                  // position: "absolute",
                  // top: -5,
                  // justifyContent: "center",
                  // alignItems: "center",
                  // backgroundColor: colors.white,
                  // borderBottomRightRadius: 5,
                  // borderBottomLeftRadius: 5,
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: "oS-B" }}>
                  Order Book
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  height: "60%",
                  alignItems: "flex-end",
                  position: "absolute",
                  bottom: 0,
                }}
              >
                <View
                  style={{
                    width: "40%",
                    flexDirection: "row",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ height: "50%", width: "100%" }}>
                      <Text style={styles.oTitle}>High</Text>
                    </View>
                    <View style={{ height: "50%", width: "100%" }}>
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 14, fontFamily: "iT-B" }}
                      >
                        {this.state.neworderBook1.highpx}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "100%", height: "50%" }}>
                      <Text style={styles.oTitle}>Low</Text>
                    </View>
                    <View style={{ width: "100%", height: "50%" }}>
                      <Text
                        numberOfLines={1}
                        style={{ fontSize: 14, fontFamily: "iT-B" }}
                      >
                        {this.state.neworderBook1.lowpx}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "60%",
                    flexDirection: "row",
                    height: "100%",
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                        height: "50%",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.oTitle}>Turnover</Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        height: "50%",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "iT-B",
                          alignItems: "center",
                        }}
                        numberOfLines={1}
                      >
                        {this.state.neworderBook1.totturnover}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "50%",
                      alignItems: "flex-end",
                      height: "100%",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: "50%",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.oTitle}>Volume</Text>
                    </View>
                    <View
                      style={{
                        height: "50%",
                        width: "100%",

                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "iT-B",
                        }}
                        numberOfLines={1}
                      >
                        {this.state.neworderBook1.totvolume}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: height * 0.08,
              flexDirection: "row",
              borderBottomColor: colors.greyStroke,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                width: "50%",
                height: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={styles.oTitle}>Total Bid Quantity</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "iT", fontSize: 14 }}>
                  {this.state.newTotalBid}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "50%",
                height: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Text style={styles.oTitle}>Total Ask Quantity</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontFamily: "iT", fontSize: 14 }}>
                  {this.state.newTotalAsk}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              {this.state.newAsk.length !== 0 &&
                this.state.newAsk.map((item) => {
                  const qtyVal = addCommas(item.qty);
                  return (
                    <View
                      key={item.price}
                      style={{
                        height: tileHeight,
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderBottomColor: colors.greyStroke,
                      }}
                    >
                      <View style={styles.bidTile}>
                        <Text style={styles.split}>{item.splits}</Text>
                      </View>
                      <View style={styles.bidTile}>
                        <Text numberOfLines={1} style={styles.qBA}>
                          {qtyVal}
                        </Text>
                      </View>
                      <View
                        style={{
                          ...styles.bidTile,
                          ...{ backgroundColor: colors.greenback },
                        }}
                      >
                        <Text style={styles.qBA}>{item.price}</Text>
                      </View>
                    </View>
                  );
                })}
            </View>
            <View style={{ width: "50%" }}>
              {this.state.newBid.length !== 0 &&
                this.state.newBid.map((item) => {
                  const qtyVal = addCommas(item.qty);
                  return (
                    <View
                      key={item.price}
                      style={{
                        height: tileHeight,
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 1,
                        borderBottomColor: colors.greyStroke,
                      }}
                    >
                      <View
                        style={{
                          ...styles.bidTile,
                          ...{ backgroundColor: colors.redback },
                        }}
                      >
                        <Text style={styles.qBB}>{item.price}</Text>
                      </View>
                      <View
                        style={{
                          ...styles.bidTile,
                        }}
                      >
                        <Text numberOfLines={1} style={styles.qBB}>
                          {qtyVal}
                        </Text>
                      </View>
                      <View style={styles.bidTile}>
                        <Text style={styles.split}>{item.splits}</Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  oTitle: {
    fontSize: 15,
    fontFamily: "oS-sB",
    color: "#666666",
  },
  bidTile: {
    width: "33.3%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  qBA: { fontSize: 14, color: colors.g1, fontFamily: "iT" },
  qBB: { fontSize: 14, color: colors.r1, fontFamily: "iT" },
  split: {
    fontSize: 14,
  },
});

const mapStateToProps = (state) => ({
  orderBook: state.quote.orderBook,
  orderBook1: state.quote.orderBook1,
});

const mapDispatchToProps = {
  fetchOrderBook,
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketDepth);

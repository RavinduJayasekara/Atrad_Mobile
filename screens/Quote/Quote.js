import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../colors";
import { connect } from "react-redux";
import { fetchStatistics } from "../../store/actions/Quote";
import addCommas from "../../Components/RequestBody/AddCommas";
const { height, width } = Dimensions.get("window");

const setDate = () => {
  const date = new Date();
  return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
};

class Quote extends Component {
  state = {
    security: this.props.route.params.security,
    newStatistics1: {},
    newAnnouncement: [],
    newStatistics: {},
  };

  componentDidUpdate(prevProps) {
    if (this.props.statistics.status === 200) {
      if (prevProps.statistics.data !== this.props.statistics.data) {
        this.setState({
          newStatistics: this.props.statistics.data,
        });
      }
    } else {
      //todo: error UI
    }

    if (this.props.announcements.status === 200) {
      if (prevProps.announcements.data !== this.props.announcements.data) {
        if (this.props.announcements.data.size[0].size !== "0") {
          this.setState({
            newAnnouncement: this.props.announcements.data.announcement,
          });
        } else {
          //no announcements particular to this security
        }
      }
    } else {
      //todo: error UI
    }

    if (this.props.statisticsWatchSecurity.status === 200) {
      if (
        prevProps.statisticsWatchSecurity.data !==
        this.props.statisticsWatchSecurity.data
      ) {
        this.setState({
          newStatistics1: this.props.statisticsWatchSecurity.data,
        });
      }
    } else {
      //todo: error UI
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      const date = setDate();
      this.props.fetchStatistics(
        this.props.route.params.brokerUrl,
        this.props.route.params.security,
        date
      );
    });
  }

  render() {
    let marketCap =
      Object.keys(this.state.newStatistics).length !== 0
        ? this.state.newStatistics.otherdata.marketcap
        : "0.00";

    if (marketCap.length > 8) {
      const arr = marketCap.split(",");
      arr.splice(arr.length - 2, 2);
      marketCap = arr.toString() + "M";
    }
    let lastTTime;
    if (this.state.newStatistics1.lasttradedtime) {
      const val = this.state.newStatistics1.lasttradedtime;
      const arr = val.split(".");
      lastTTime = arr[0];
    }

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: "100%",
                // height: height * 0.3 }}>
                height: height * 0.1,
              }}
            >
              <View
                style={{
                  width: "100%",
                  // height: "33%",
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
                  <View style={{ width: "65%" }}>
                    <Text
                      style={{ fontSize: 20, fontFamily: "oS-B" }}
                      numberOfLines={1}
                    >
                      {this.state.security}
                    </Text>
                  </View>
                  <View style={{ width: "35%" }}>
                    <Button title="Sell" color="#1D9531" />
                  </View>
                </View>
                <View style={{ width: "4%", height: "100%" }}></View>
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
                width: "100%",
                height: height * 0.45,
                paddingHorizontal: "2.5%",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  height: "81.8%",
                  width: "100%",
                }}
              >
                <View style={{ width: "48%", height: "100%" }}>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Best Bid
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.bidprice
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Bid Qty
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.bidqty
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Prev.Closed
                    </Text>
                    <Text style={styles.infoDetail}>-</Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Low
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.lowpx
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Turnover
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.totturnover
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      All Time Low
                    </Text>
                    <Text style={styles.infoDetail}>
                      {Object.keys(this.state.newStatistics).length !== 0
                        ? this.state.newStatistics.alltime.alltimelowprice
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      52wk Low
                    </Text>
                    <Text style={styles.infoDetail}>
                      {Object.keys(this.state.newStatistics).length !== 0
                        ? this.state.newStatistics.monthtodate.m12lowprice
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTitle}>Issued Qty</Text>
                    <Text style={styles.infoDetail}>
                      {Object.keys(this.state.newStatistics).length !== 0
                        ? this.state.newStatistics.otherdata.issuedQty
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.infoTitle} numberOfLines={1}>
                      Foreign H.
                    </Text>
                    <Text style={styles.infoDetail}>
                      {Object.keys(this.state.newStatistics).length !== 0
                        ? addCommas(
                            this.state.newStatistics.otherdata.foreignholding
                          )
                        : "0"}
                    </Text>
                  </View>
                </View>
                <View style={{ width: "4%", height: "100%" }} />
                <View style={{ width: "48%", height: "100%" }}>
                  <View style={styles.info}>
                    <Text style={styles.infoTitle}>Best Ask</Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.askprice
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Best Qty
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.askqty
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Last Trade Price
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.tradeprice
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      High
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.highpx
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Volume
                    </Text>
                    <Text style={styles.infoDetail}>
                      {this.state.newStatistics1
                        ? this.state.newStatistics1.totvolume
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      All Time High
                    </Text>
                    <Text style={styles.infoDetail}>
                      {Object.keys(this.state.newStatistics).length !== 0
                        ? this.state.newStatistics.week52.alltimehighprice
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      52wk High
                    </Text>
                    <Text style={styles.infoDetail}>
                      {Object.keys(this.state.newStatistics).length !== 0
                        ? this.state.newStatistics.week52.m12highprice
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      No. of Trades
                    </Text>
                    <Text style={styles.infoDetail}>
                      {Object.keys(this.state.newStatistics).length !== 0
                        ? addCommas(
                            this.state.newStatistics.today.totalnotrades
                          )
                        : "0"}
                    </Text>
                  </View>
                  <View style={styles.info}>
                    <Text numberOfLines={1} style={styles.infoTitle}>
                      Market Cap
                    </Text>
                    <Text style={styles.infoDetail}>{marketCap}</Text>
                  </View>
                </View>
              </View>
              <View style={{ height: "18.2%", width: "100%" }}>
                <View
                  style={{
                    width: "100%",
                    height: "50%",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.infoDetail}>{lastTTime}</Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: "50%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#DADADA",
                  }}
                >
                  <Text style={styles.infoTitle}>Security Status</Text>
                  <Text style={styles.infoDetail}>-</Text>
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: "2.5%" }}>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "oS-sB",
                    color: "#DADADA",
                  }}
                >
                  Announcements
                </Text>
              </View>
              {this.state.newAnnouncement.length !== 0 && (
                <View>
                  {this.state.newAnnouncement.map((item) => (
                    <View
                      key={item.announcementid}
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: colors.greyStroke,
                        paddingVertical: 10,
                      }}
                    >
                      <Text style={{ fontFamily: "oS", fontSize: 15 }}>
                        {item.subject}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  info: {
    width: "100%",
    justifyContent: "space-between",
    height: "11.11%",
    flexDirection: "row",
    overflow: "hidden",
    position: "relative",
    borderBottomColor: "#DADADA",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  infoTitle: {
    fontFamily: "oS",
    fontSize: 12,
    color: colors.greyTitle,
    minWidth: "1%",
    position: "relative",
    left: 0,
  },
  infoDetail: {
    fontFamily: "oS-B",
    fontSize: 14,
    right: 0,
    position: "absolute",
  },
});

const mapStateToProps = (state) => ({
  statistics: state.quote.statistics,
  statisticsWatchSecurity: state.quote.statisticsWatchSecurity,
  announcements: state.quote.announcements,
});

const mapDispatchToProps = {
  fetchStatistics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quote);

import React, { Component } from "react";
import { Dimensions, StyleSheet, View, Text, ScrollView } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { VictoryPie } from "victory-native";
import Pie from "react-native-pie";
import colors from "../../colors";
import { fetchCse, fetchTotal } from "../../store/actions/Market";
import { connect } from "react-redux";
import addCommas from "../../Components/RequestBody/AddCommas";
const { width, height } = Dimensions.get("window");

class Market extends Component {
  state = {
    chartData: [],
    newCseInfo: null,
    newTotal: null,
  };

  componentDidUpdate(prevProps) {
    // if (prevProps.cseInfo !== this.props.cseInfo) {
    //   this.setState({
    //     newCseInfo: this.props.cseInfo,
    //     chartData: [
    //       { x: 1, y: parseInt(this.props.cseInfo.up), label: " " },
    //       { x: 2, y: parseInt(this.props.cseInfo.down), label: " " },
    //       { x: 3, y: parseInt(this.props.cseInfo.unchanged), label: " " },
    //     ],
    //   });
    // }
    if (prevProps.total !== this.props.total) {
      this.setState({
        newTotal: this.props.total,
      });
    }
  }

  async componentDidMount() {
    // this.props.fetchCse(this.props.route.params.brokerUrl);
    this.props.navigation.addListener("focus", () => {
      this.props.fetchTotal(this.props.route.params.brokerUrl, "ASI");
      //   this.props.navigation.jumpTo("MarketD", {
      //     focused: true,
      //     dName: "MarketD",
      //   });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                height: height * 0.7,
                width: "100%",
                paddingHorizontal: "2.5%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "30%",
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: colors.greyStroke,
                }}
              >
                <View style={{ width: "70%", height: "100%" }}>
                  <View style={{ height: "45%", justifyContent: "flex-end" }}>
                    <Text
                      style={{
                        fontFamily: "oS-B",
                        fontSize: 42,
                      }}
                    >
                      CSE
                    </Text>
                  </View>
                  <View style={{ height: "25%" }}>
                    <Text style={{ fontFamily: "oS-B", fontSize: 18 }}>
                      Colombo Stock Exchange
                    </Text>
                  </View>
                  <View
                    style={{
                      height: "30%",
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View>
                      <View>
                        <Text style={styles.stockMarket}>
                          {this.state.newCseInfo
                            ? addCommas(this.state.newCseInfo.up)
                            : "-"}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.stockMarketheading}>UP</Text>
                      </View>
                    </View>
                    <View>
                      <View>
                        <Text style={styles.stockMarket}>
                          {this.state.newCseInfo
                            ? addCommas(this.state.newCseInfo.down)
                            : "-"}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.stockMarketheading}>DOWN</Text>
                      </View>
                    </View>
                    <View>
                      <View>
                        <Text style={styles.stockMarket}>
                          {this.state.newCseInfo
                            ? addCommas(this.state.newCseInfo.unchanged)
                            : "-"}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.stockMarketheading}>UNCHANGED</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    height: height * 0.2,
                    width: width * 0.285,
                  }}
                >
                  <VictoryPie
                    width={width * 0.285}
                    height={height * 0.2}
                    innerRadius={width * 0.08}
                    radius={width * 0.12}
                    data={this.state.chartData}
                    colorScale={[colors.g2, colors.r1, colors.blue]}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  height: "12.5%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderBottomColor: colors.greyStroke,
                }}
              >
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.greyTitle,
                      fontFamily: "oS",
                    }}
                  >
                    Turnover
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ fontFamily: "iT-sB", fontSize: 14 }}
                  >
                    {this.state.newTotal
                      ? this.state.newTotal.totTurnOver
                      : "0.00"}
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.greyTitle,
                      fontFamily: "oS",
                    }}
                  >
                    Trades
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ fontFamily: "iT-sB", fontSize: 14 }}
                  >
                    {this.state.newTotal
                      ? addCommas(this.state.newTotal.totTrades)
                      : "0"}
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.greyTitle,
                      fontFamily: "oS",
                    }}
                  >
                    Volume
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ fontFamily: "iT-sB", fontSize: 14 }}
                  >
                    {this.state.newTotal
                      ? addCommas(this.state.newTotal.totVolume)
                      : "0"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: "57.5%",
                  width: "100%",
                }}
              />
            </View>
            <View
              style={{
                height: height * 0.06,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  borderRadius: 2,
                  backgroundColor: colors.primary,
                  width: "42%",
                }}
              >
                <Button
                  title="Top Stocks"
                  onPress={() => this.props.navigation.navigate("TopStocks")}
                />
              </View>
              <View
                style={{
                  borderRadius: 2,
                  backgroundColor: colors.primary,
                  width: "42%",
                }}
              >
                <Button
                  title="Announcements"
                  onPress={() => {
                    console.log(this.props.navigation);
                    this.props.navigation.jumpTo("OrderT");
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
  },
  stockMarket: {
    fontSize: 16,
    fontFamily: "iT-sB",
  },
  stockMarketheading: {
    fontSize: 15,
    fontFamily: "oS",
    color: colors.greyTitle,
  },
});

const mapStateToProps = (state) => ({
  cseInfo: state.market.cseInfo,
  total: state.market.total,
});

const mapDispatchToProps = {
  fetchCse,
  fetchTotal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Market);

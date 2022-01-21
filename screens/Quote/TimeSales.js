import React, { Component } from "react";
import { Dimensions, Text, View, Button, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { fetchTimesales } from "../../store/actions/Quote";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");

class TimeSales extends Component {
  state = { security: this.props.route.params.security, timeSales: {} };

  componentDidUpdate(prevProps) {
    if (prevProps.timeSales !== this.props.timeSales) {
      this.setState({
        timeSales: this.props.timeSales,
      });
    }
  }

  async componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.props.fetchTimesales(
        this.props.route.params.brokerUrl,
        this.state.security
      );
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            width: "100%",
            height: height * 0.11,
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
                <Ionicons name="ios-star-outline" size={25} color={"#9E9E9E"} />
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
        <View
          style={{
            height: height * 0.1,
            width: "100%",
            paddingHorizontal: "2.5%",
          }}
        >
          <View style={{ width: "100%", height: "100%", flexDirection: "row" }}>
            <View style={{ width: "17.5%", height: "100%" }}>
              <Text style={styles.tTile}>Open</Text>
              <Text style={styles.tInfo}>9,999.00</Text>
            </View>
            <View style={{ width: "17.5%", height: "100%" }}>
              <Text style={styles.tTile}>High</Text>
              <Text style={styles.tInfo}>
                {this.state.timeSales ? this.state.timeSales.highpx : null}
              </Text>
            </View>
            <View style={{ width: "17.5%", height: "100%" }}>
              <Text style={styles.tTile}>Low</Text>
              <Text style={styles.tInfo}>
                {this.state.timeSales ? this.state.timeSales.lowpx : null}
              </Text>
            </View>
            <View style={{ width: "17.5%", height: "100%" }}>
              <Text style={styles.tTile}>Close</Text>
              <Text style={styles.tInfo}>
                {this.state.timeSales
                  ? this.state.timeSales.closingprice
                  : null}
              </Text>
            </View>
            <View style={{ width: "30%", height: "100%" }}>
              <Text style={styles.tTile}>Volume</Text>
              <Text style={styles.tInfo}>
                {this.state.timeSales ? this.state.timeSales.totvolume : null}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: height * 0.06,
            width: "100%",
            flexDirection: "row",
            paddingHorizontal: "2.5%",
          }}
        >
          <View style={{ width: "17%", height: "100%" }}>
            <Text style={styles.tTile} numberOfLines={1}>
              Time
            </Text>
            <Text style={styles.tInfo}>14:29:54</Text>
          </View>
          <View
            style={{ width: "17%", height: "100%", backgroundColor: "aqua" }}
          >
            <Text style={styles.tTile} numberOfLines={1}>
              Price
            </Text>
            <Text style={styles.tInfo}>14:29:54</Text>
          </View>
          <View
            style={{ width: "20%", height: "100%", backgroundColor: "red" }}
          >
            <Text style={styles.tTile} numberOfLines={1}>
              Quantity
            </Text>
            <Text style={styles.tInfo}>14:29:54</Text>
          </View>
          <View style={{ width: "46%", height: "100%" }}>
            <Text style={styles.tTile} numberOfLines={1}>
              Splits
            </Text>
            <Text style={styles.tInfo}>14:29:54</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tTile: {
    fontSize: 15,
    fontFamily: "oS",
    color: "#666666",
  },
  tInfo: {
    fontSize: 12,
    fontFamily: "iT",
  },
});

const mapStateToProps = (state) => ({
  timeSales: state.quote.timeSales,
});

const mapDispatchToProps = {
  fetchTimesales,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSales);

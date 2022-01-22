import React, { Component } from "react";
import TradesTile from "../../Components/Market/TradesTile";
import { Dimensions, StyleSheet, FlatList, Text, View } from "react-native";
import colors from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { fetchTrades } from "../../store/actions/Market";
const { height } = Dimensions.get("window");

const setDate = () => {
  const newDate = new Date();
  const month = newDate.getMonth() + 1;
  return month + "%2F" + newDate.getDate() + "%2F" + newDate.getFullYear();
};

class Trades extends Component {
  state = {
    newTrades: [],
  };

  renderItem = (itemData) => {
    return <TradesTile item={itemData.item} />;
  };

  headerComponent = () => (
    <View style={{ width: "100%", height: height * 0.08 }}>
      <LinearGradient
        style={{
          height: "100%",
          width: "100%",
          paddingHorizontal: "5%",
          borderBottomColor: colors.greyStroke,
          borderBottomWidth: 2,
        }}
        colors={["#FFFFFF", "#F9FAFA", "#F1F2F4"]}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              position: "relative",
              width: "55%",
              height: "100%",
              flexDirection: "row",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: "60%",
                position: "absolute",
                height: "100%",
                left: 0,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: "oS-B",
                    fontSize: 16,
                    color: colors.greyTitle,
                  }}
                >
                  Symbol
                </Text>
              </View>
              <View style={{ width: "100%", height: "50%" }}>
                <Text numberOfLines={1} style={styles.inforDetails}>
                  Description
                </Text>
              </View>
            </View>
            <View
              style={{
                maxWidth: "100%",
                minWidth: "50%",
                height: "100%",
                position: "absolute",
                right: 0,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.infoTitle} numberOfLines={1}>
                  High
                </Text>
              </View>
              <View
                style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
              >
                <Text style={styles.inforDetails}>Low</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "45%",
              height: "100%",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "60%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.infoTitle}>Volume</Text>
              </View>
              <View
                style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
              >
                <Text style={styles.inforDetails}>Turnover</Text>
              </View>
            </View>
            <View
              style={{
                width: "40%",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.infoTitle}>Chg</Text>
              </View>
              <View
                style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
              >
                <Text style={styles.inforDetails}>Chg%</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  componentDidMount() {
    const date = setDate();
    this.props.navigation.addListener("focus", () => {
      this.props.fetchTrades(this.props.route.params.brokerUrl, date);
      //   this.props.navigation.jumpTo("TradesD", {
      //     focused: true,
      //     dName: "TradesD",
      //   });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.trades.status === 200) {
      if (prevProps.trades.data !== this.props.trades.data) {
        let i = 0;
        if (this.props.trades && this.props.trades.data.length > 0) {
          const arr = this.props.trades.data.map((item) => {
            i = i + 1;
            return {
              id: i.toString(),
              security: item.security,
              companyname: item.companyname,
              netchange: item.netchange,
              perchange: item.perchange,
              highpx: item.highpx,
              lowpx: item.lowpx,
              totalturnover: item.totalturnover,
              totalvolume: item.totalvolume,
            };
          });
          this.setState({
            newTrades: arr,
          });
        }
      } else {
        // todo:
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.newTrades}
          renderItem={this.renderItem}
          ListHeaderComponent={this.headerComponent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ backgroundColor: colors.white }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inforDetails: {
    fontSize: 13,
    fontFamily: "iT",
    color: colors.greyTitle,
  },
  infoTitle: {
    fontFamily: "iT-B",
    fontSize: 14,
    color: colors.greyTitle,
    // minWidth: "100%"
  },
});

const mapStateToProps = (state) => ({
  trades: state.market.trades,
});

const mapDispatchToProps = {
  fetchTrades,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trades);

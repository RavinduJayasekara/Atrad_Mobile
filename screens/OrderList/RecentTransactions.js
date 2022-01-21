import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../../colors";
import RecentTransactionTile from "../../Components/OrderList/RecentTransactionTile";
const { height } = Dimensions.get("window");
const headerHeight = height * 0.1;
const data = [
  "ALL",
  "NEW",
  "P.FILLED",
  "FILLED",
  "CANCELED",
  "AMENDED",
  "QUEUED",
  "Q.AMEND",
  "Q.CANCEL",
  "EXPIRED",
  "REJECTED",
  "PENDINGF",
];

export default class RecentTransactions extends Component {
  componentDidMount() {
    // this.props.navigation.addListener("focus", () => {
    //   this.props.navigation.jumpTo("RecentTransactionD", {
    //     focused: true,
    //     dName: "RecentTransactionD",
    //   });
    // });
  }
  HeaderComponent = () => {
    return (
      <View style={{ height: headerHeight, width: "100%" }}>
        <LinearGradient
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
            paddingHorizontal: "5%",
          }}
          colors={["#FFFFFF", "#F9FAFA", "#F1F2F4"]}
        >
          <View
            style={{
              height: "100%",
              width: "25%",
              justifyContent: "center",
            }}
          >
            <View>
              <Text style={styles.date}>Date</Text>
            </View>
            <View>
              <Text style={styles.title}>Type</Text>
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.title}>Description</Text>
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: "25%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.mtitle}>Qty</Text>
            </View>
            <View>
              <Text style={styles.title}>Price</Text>
            </View>
          </View>
          <View
            style={{
              height: "100%",
              width: "25%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <View>
              <Text style={styles.title}>Amount</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };
  renderItem = (itemData) => {
    return <RecentTransactionTile height={headerHeight} item={itemData.item} />;
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            paddingHorizontal: "5%",
            borderBottomWidth: 1,
            borderBottomColor: colors.greyStroke,
          }}
        >
          <View
            style={{
              height: "80%",
              width: "40%",
              borderColor: colors.greyStroke,
              borderWidth: 2,
            }}
          ></View>
        </View>
        <View style={{ height: "90%", width: "100%" }}>
          <FlatList
            contentContainerStyle={{ backgroundColor: colors.white }}
            ListHeaderComponent={this.HeaderComponent}
            data={data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    fontSize: 15,
    fontFamily: "oS-B",
  },
  mtitle: {
    fontSize: 15,
    fontFamily: "iT-B",
  },
  title: {
    fontFamily: "iT",
    fontSize: 15,
  },
});

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../colors";

export default class RecentTransaction extends Component {
  render() {
    return (
      <View style={{ height: this.props.height, width: "100%" }}>
        <View
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
            paddingHorizontal: "5%",
            borderBottomWidth: 1,
            borderBottomColor: colors.greyStroke,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "25%",
              justifyContent: "center",
            }}
          >
            <View>
              <Text numberOfLines={1} style={styles.date}>
                Date
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.title}>
                Type
              </Text>
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
              <Text numberOfLines={1} style={styles.title}>
                Description
              </Text>
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
              <Text numberOfLines={1} style={styles.mtitle}>
                Qty
              </Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.title}>
                Price
              </Text>
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
              <Text numberOfLines={1} style={styles.title}>
                Amount
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    fontFamily: "oS-B",
  },
  mtitle: {
    fontSize: 16,
    fontFamily: "iT-B",
  },
  title: {
    fontFamily: "iT",
    fontSize: 15,
  },
});

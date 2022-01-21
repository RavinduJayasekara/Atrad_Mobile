import React, { PureComponent } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../../colors";

const { height } = Dimensions.get("window");
export default class TradesTile extends PureComponent {
  render() {
    let turnOver = this.props.item.totalturnover;
    let fColor = colors.g1;
    let perChangeVal = parseFloat(this.props.item.perchange);

    if (perChangeVal < 0) {
      fColor = colors.r1;
    } else if (perChangeVal === 0) {
      fColor = colors.greyTitle;
    }
    if (turnOver.length > 11) {
      const arr = turnOver.split(",");
      arr.splice(arr.length - 2, 2);
      turnOver = arr.toString() + "M";
    }
    return (
      <View
        style={{
          height: height * 0.1,
          width: "100%",
          paddingHorizontal: "5%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            borderBottomColor: colors.greyStroke,
            borderBottomWidth: 1,
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
                  style={{ fontFamily: "oS-B", fontSize: 16 }}
                >
                  {this.props.item.security}
                </Text>
              </View>
              <View style={{ width: "100%", height: "50%" }}>
                <Text numberOfLines={1} style={styles.inforDetails}>
                  {this.props.item.companyname}
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
                  {this.props.item.highpx}
                </Text>
              </View>
              <View
                style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
              >
                <Text style={styles.inforDetails}>{this.props.item.lowpx}</Text>
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
                <Text style={styles.infoTitle}>
                  {this.props.item.totalvolume}
                </Text>
              </View>
              <View
                style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
              >
                <Text style={styles.inforDetails}>{turnOver}</Text>
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
                <Text style={{ ...styles.infoTitle, ...{ color: fColor } }}>
                  {this.props.item.netchange}
                </Text>
              </View>
              <View
                style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
              >
                <Text style={{ ...styles.inforDetails, ...{ color: fColor } }}>
                  {this.props.item.perchange}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inforDetails: {
    fontSize: 13,
    fontFamily: "iT",
  },
  infoTitle: {
    fontFamily: "iT-B",
    fontSize: 14,
    // minWidth: "100%"
  },
});

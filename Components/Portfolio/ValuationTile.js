import React, { PureComponent } from "react";
import { Dimensions, Text, View } from "react-native";
import colors from "../../colors";
import addCommas from "../RequestBody/AddCommas";
const { height } = Dimensions.get("window");
export default class ValuationTile extends PureComponent {
  render() {
    let gL = parseFloat(this.props.itemData.netGain);
    let gLP = parseFloat(this.props.itemData.netchange);
    let mV = parseFloat(this.props.itemData.marketValue);
    let avgPrice = parseFloat(this.props.itemData.avgPrice);
    let gLC = colors.g1;
    if (gLP < 0) {
      gLC = colors.r1;
    } else if (gLP === 0) {
      gLC = colors.greyTitle;
    }

    return (
      <View
        style={{
          height: height * 0.1,
          width: "100%",
          paddingHorizontal: "5%",
          backgroundColor: colors.white,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            position: "relative",
            borderBottomColor: colors.greyStroke,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              width: "65%",
              height: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "absolute",
              left: 0,
              overflow: "hidden",
            }}
          >
            <View style={{ width: "50%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  justifyContent: "flex-end",
                }}
              >
                <Text
                  style={{ fontFamily: "oS-B", fontSize: 16 }}
                  numberOfLines={1}
                >
                  {this.props.itemData.security}
                </Text>
              </View>
              <View
                style={{
                  height: "50%",
                  width: "100%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "iT",
                    fontSize: 13,
                    color: colors.greyTitle,
                  }}
                  numberOfLines={1}
                >
                  {avgPrice.toFixed(2)}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: "100%",
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <View
                style={{
                  height: "50%",
                  justifyContent: "flex-end",
                  position: "absolute",
                  right: 0,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: "iT-B", fontSize: 16 }}
                >
                  {addCommas(mV.toFixed(2))}
                </Text>
              </View>
              <View
                style={{
                  height: "50%",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: "iT", fontSize: 13 }}
                >
                  {this.props.itemData.lastTraded}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "35%",
              height: "100%",
              position: "absolute",
              right: 0,
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                height: "50%",
                justifyContent: "flex-end",
                // backgroundColor: "red",
              }}
            >
              <Text
                numberOfLines={1}
                style={{ fontFamily: "iT-B", fontSize: 15, color: gLC }}
              >
                {addCommas(gL.toFixed(2))}
              </Text>
            </View>
            <View
              style={{
                height: "50%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{ fontFamily: "iT", fontSize: 14, color: gLC }}
              >
                {gLP.toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

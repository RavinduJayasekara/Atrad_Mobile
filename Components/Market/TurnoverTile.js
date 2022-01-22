import React, { PureComponent } from "react";
import { Dimensions, Text, View } from "react-native";
import colors from "../../colors";
const { height, width } = Dimensions.get("window");
export default class TurnoverTile extends PureComponent {
  render() {
    let turnOver = this.props.item.totturnover;
    let volume = this.props.item.totvolume;
    // if (turnOver.length > 11) {
    //   const arr = turnOver.split(",");
    //   arr.splice(arr.length - 2, 2);
    //   turnOver = arr.toString() + "M";
    // }
    // if (volume.length > 8) {
    //   const arr = volume.split(",");
    //   arr.splice(arr.length - 2, 2);
    //   volume = arr.toString() + "M";
    // }

    return (
      <View
        style={{ height: height * 0.1, width: "100%", paddingHorizontal: "5%" }}
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
                <Text style={{ fontFamily: "oS-B", fontSize: 16 }}>
                  {this.props.item.security}
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
                  {this.props.item.companyname}
                </Text>
              </View>
            </View>
            <View style={{ height: "100%", alignItems: "flex-end" }}>
              <View
                style={{
                  height: "50%",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "iT-B", fontSize: 16 }}>
                  {this.props.item.tradeprice}
                </Text>
              </View>
              <View
                style={{
                  height: "50%",
                }}
              >
                <Text style={{ fontFamily: "iT", fontSize: 13 }}>
                  {this.props.item.tradesize}
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
              <Text style={{ fontFamily: "iT-B", fontSize: 15 }}>
                {turnOver}
              </Text>
            </View>
            <View
              style={{
                height: "50%",
              }}
            >
              <Text style={{ fontFamily: "iT", fontSize: 14 }}>{volume}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

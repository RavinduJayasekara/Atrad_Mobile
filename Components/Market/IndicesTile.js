import React, { PureComponent } from "react";
import { Dimensions, Text, View } from "react-native";
import colors from "../../colors";
const { height, width } = Dimensions.get("window");
export default class IndicesTile extends PureComponent {
  render() {
    let fColor = colors.g1;
    let value = parseFloat(this.props.item.perChange);
    if (value < 0) {
      fColor = colors.r1;
    } else if (value === 0) {
      fColor = colors.greyTitle;
    }
    let volume = this.props.item.totVolume;

    if (volume.length > 6) {
      const arr = volume.split("");
      arr.splice(arr.length - 6, 6);
      volume = arr.join("") + "M";
    }
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
                  {this.props.item.sector}
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
                  {this.props.item.description}
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
                  {this.props.item.price}
                </Text>
              </View>
              <View
                style={{
                  height: "50%",
                }}
              >
                <Text style={{ fontFamily: "iT", fontSize: 13 }}>{volume}</Text>
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
              }}
            >
              <Text style={{ fontFamily: "iT-B", fontSize: 15, color: fColor }}>
                {this.props.item.perChange}%
              </Text>
            </View>
            <View
              style={{
                height: "50%",
              }}
            >
              <Text style={{ fontFamily: "iT", fontSize: 14, color: fColor }}>
                {this.props.item.change}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

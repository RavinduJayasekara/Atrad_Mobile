import React, { Component } from "react";
import { Dimensions, Switch, Text, View } from "react-native";
import colors from "../../colors";

const { height, width } = Dimensions.get("window");
export default class BuySell extends Component {
  state = {
    buySell: false,
  };

  buySellhandler = (bool) => {
    this.setState({ buySell: bool });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            height: height * 0.13,
            width: "100%",
            paddingHorizontal: "5.5%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: "61%",
              width: "37%",
              padding: "2%",
              backgroundColor: colors.greyStroke,
              borderRadius: 2,
            }}
          >
            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontSize: 16, fontFamily: "oS-B" }}>
                EXPO.N0000
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                height: "50%",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "iT",
                  color: colors.greyTitle,
                }}
              >
                Hayleys fabric plc
              </Text>
            </View>
          </View>
          <View style={{ width: "11%" }} />
          <View style={{ width: "52%", height: "61%" }}>
            <View
              style={{
                height: "43%",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontFamily: "oS-B", fontSize: 14 }}>
                Client Acc:
              </Text>
            </View>
            <View
              style={{
                height: "57%",
                width: "100%",
                borderRadius: 2,
                borderColor: colors.greyStroke,
                borderWidth: 2,
              }}
            >
              <Text></Text>
            </View>
          </View>
        </View>
        <View
          style={{
            height: height * 0.06,
            width: "100%",
            paddingHorizontal: "5.5%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              height: "53%",
              width: "50%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "oS",
                color: colors.greyTitle,
              }}
            >
              Low
            </Text>
            <View style={{ width: "5%" }} />
            <Text style={{ fontSize: 16, fontFamily: "iT-B" }}>1000.00</Text>
          </View>
          <View
            style={{
              height: "53%",
              width: "50%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "oS",
                color: colors.greyTitle,
              }}
            >
              High
            </Text>
            <View style={{ width: "5%" }} />
            <Text style={{ fontSize: 16, fontFamily: "iT-B" }}>1000.00</Text>
          </View>
        </View>
        <View
          style={{
            height: height * 0.15,
            width: "100%",
            backgroundColor: "red",
            paddingHorizontal: "5.5%",
          }}
        >
          <View style={{ height: "30%", width: "30%" }}>
            <Switch
              onValueChange={this.buySellhandler}
              thumbColor={this.state.buySell ? colors.r1 : colors.greyStroke}
              trackColor={this.state.buySell ? colors.r1 : colors.greyStroke}
            />
          </View>
          <View style={{ height: "100%", width: "5%" }} />
          <View style={{ height: "30%", width: "30%" }}>
            <Switch activeText={"Buy"} backgroundActive={"#1D9531"} />
          </View>
          <View style={{ height: "100%", width: "5%" }} />
          <View style={{ height: "30%", width: "30%" }}>
            <View></View>
          </View>
        </View>
      </View>
    );
  }
}

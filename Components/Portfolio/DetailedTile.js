import React, { PureComponent } from "react";
import { Dimensions, Text, View } from "react-native";
import { connect } from "react-redux";
import colors from "../../colors";
import addCommas from "../RequestBody/AddCommas";
const { height } = Dimensions.get("window");
class DetailedTile extends PureComponent {
  render() {
    let gL = parseFloat(this.props.itemData.netGain);
    let gLP = parseFloat(this.props.itemData.netchange);
    let gLC = colors.g1;
    if (gLP < 0) {
      gLC = colors.r1;
    } else if (gLP === 0) {
      gLC = colors.greyTitle;
    }

    let holding = parseInt(this.props.itemData.quantity) * 100;

    let holdingP = holding / parseInt(this.props.totQty);

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
              width: "70%",
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
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: "oS-B", fontSize: 16 }}
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
                  {this.props.itemData.lastTraded}
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
                  {this.props.itemData.quantity}
                </Text>
              </View>
              <View
                style={{
                  height: "50%",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: "iT", fontSize: 13 }}
                >
                  {holdingP.toFixed(2)}%
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "30%",
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
                style={{
                  fontFamily: "iT-B",
                  fontSize: 15,
                  color: gLC,
                }}
              >
                {gLP.toFixed(2)}
              </Text>
            </View>
            <View
              style={{
                height: "50%",
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "iT",
                  fontSize: 14,
                  color: gLC,
                }}
              >
                {addCommas(gL.toFixed(2))}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  totQty: state.portfolio.totQty,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DetailedTile);

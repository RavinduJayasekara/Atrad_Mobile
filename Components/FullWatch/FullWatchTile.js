import React, { Component } from "react";
import { Dimensions, Text, TouchableOpacity, View, Modal } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const headeComponentHeight = height * 0.132;
const tileHeight = height * 0.104;
const tileLeftPadding = headeComponentHeight * 0.187 + width * 0.019;

export default class FullWatchTile extends Component {
  state = { visible: false, favourite: false };

  buySellView = () => {
    const visibility = this.state.visible;
    this.setState({ visible: !visibility });
  };

  render() {
    let perChangeValueColor = "#1D9531";
    if (this.props.itemData.item.perchange) {
      const perChangeValue = parseFloat(this.props.itemData.item.perchange);
      if (perChangeValue < 0) {
        perChangeValueColor = "#EB1C24";
      } else if (perChangeValue === 0) {
        perChangeValueColor = "#676767";
      }
    }

    return (
      <View
        style={{
          height: this.state.visible ? height * 0.189 : tileHeight,
          width: width,
          paddingHorizontal: width * 0.025,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            height: height * 0.104,
          }}
        >
          <View
            style={{
              width: "67%",
              justifyContent: "space-between",
              flexDirection: "row",
              height: "100%",
            }}
          >
            <View
              style={{
                width: "63%",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  width: "10%",
                  height: "100%",
                  // backgroundColor: "purple",
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                  onPress={this.buySellView}
                >
                  {!this.state.visible ? (
                    <Svg
                      width="100%"
                      height={tileHeight * 0.25}
                      viewBox="0 0 21 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M5.5 8.75L10.5 13.75L15.5 8.75"
                        stroke="#9E9E9E"
                        stroke-opacity="0.38"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  ) : (
                    <Svg
                      width="100%"
                      height={tileHeight * 0.25}
                      viewBox="0 0 21 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M15.5 13.75L10.5 8.75L5.5 13.75"
                        stroke="#9E9E9E"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </Svg>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: "90%",
                  height: "100%",
                  // backgroundColor: "red",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: tileHeight * 0.191,
                      fontFamily: "oS-B",
                      color: "#191919",
                    }}
                    numberOfLines={1}
                  >
                    {this.props.itemData.item.security}
                  </Text>
                </View>
                <View style={{ height: tileHeight * 0.048 }} />
                <View>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: tileHeight * 0.155, color: "#676767" }}
                  >
                    {this.props.itemData.item.companyname}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                width: "37%",
                height: "100%",
                // backgroundColor: "orange",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: tileHeight * 0.191,
                      fontFamily: "oS-B",
                      color: "#191919",
                    }}
                    numberOfLines={1}
                  >
                    {this.props.itemData.item.tradeprice}
                  </Text>
                </View>
                <View style={{ height: tileHeight * 0.048 }} />
                <View>
                  <Text
                    style={{
                      fontSize: tileHeight * 0.13,
                      fontFamily: "oS",
                      color: "#020202",
                    }}
                    numberOfLines={1}
                  >
                    {this.props.itemData.item.totvolume}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              width: "33%",
              // backgroundColor: "aqua",
              height: tileHeight * 0.643,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: tileHeight * 0.167,
                  fontFamily: "oS-B",
                  color: perChangeValueColor,
                }}
                numberOfLines={1}
              >
                {this.props.itemData.item.perchange}%
              </Text>
            </View>
            <View style={{ height: tileHeight * 0.048 }} />
            <View>
              <Text
                style={{
                  fontSize: tileHeight * 0.155,
                  color: perChangeValueColor,
                  fontFamily: "oS",
                }}
                numberOfLines={1}
              >
                {this.props.itemData.item.netchange}
              </Text>
            </View>
          </View>
        </View>
        {this.state.visible ? (
          <View
            style={{
              height: height * 0.85,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: tileLeftPadding }} />
              <View
                style={{
                  height: "100%",
                  width: width * 0.267,
                }}
              >
                <View
                  style={{
                    height: tileHeight * 0.357,
                    borderRadius: tileHeight * 0.024,
                    width: width * 0.267,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#1D9531",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: tileHeight * 0.167,
                        color: "white",
                        fontFamily: "oS-sB",
                      }}
                    >
                      BUY
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ width: width * 0.064 }} />
              <View
                style={{
                  height: "100%",
                  width: width * 0.267,
                }}
              >
                <View
                  style={{
                    height: tileHeight * 0.357,
                    width: width * 0.267,
                    borderRadius: tileHeight * 0.024,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: "100%",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#EE1E24",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: tileHeight * 0.167,
                        color: "white",
                        fontFamily: "oS-sB",
                      }}
                    >
                      SELL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                width: tileHeight * 0.238,
                height: height * 0.85,
              }}
            >
              <View style={{ width: "100%", height: tileHeight * 0.238 }}>
                {!this.state.favourite ? (
                  <Svg
                    width={tileHeight * 0.238}
                    height={tileHeight * 0.238}
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M9.99996 2.16669L12.575 7.38335L18.3333 8.22502L14.1666 12.2834L15.15 18.0167L9.99996 15.3084L4.84996 18.0167L5.83329 12.2834L1.66663 8.22502L7.42496 7.38335L9.99996 2.16669Z"
                      stroke="#9E9E9E"
                      stroke-opacity="0.38"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                ) : (
                  <Svg
                    width={tileHeight * 0.238}
                    height={tileHeight * 0.238}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M9 1.16667L11.575 6.38333L17.3333 7.225L13.1667 11.2833L14.15 17.0167L9 14.3083L3.85 17.0167L4.83333 11.2833L0.666667 7.225L6.425 6.38333L9 1.16667Z"
                      fill="#FFF500"
                      stroke="#9E9E9E"
                      stroke-opacity="0.38"
                      stroke-width="0.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                )}
              </View>
              <View style={{ width: "100%", height: tileHeight * 0.238 }}>
                <Svg
                  width={"100%"}
                  height={tileHeight * 0.238}
                  viewBox="0 0 27 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M13.5 15L7.00481 7.5L19.9952 7.5L13.5 15Z"
                    fill="#9E9E9E"
                    fill-opacity="0.38"
                  />
                </Svg>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

import React, { Component } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import ValuationTile from "../../Components/Portfolio/ValuationTile";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../colors";
import DetailedTile from "../../Components/Portfolio/DetailedTile";
import { connect } from "react-redux";
const { height } = Dimensions.get("window");

class Detailed extends Component {
  state = {
    clientsInfo: [],
    totQty: 0,
  };

  renderItem = (itemData) => {
    return <DetailedTile itemData={itemData.item} />;
  };

  HeaderComponent = () => {
    return (
      <View
        style={{
          height: height * 0.08,
          width: "100%",
        }}
      >
        <LinearGradient
          style={{
            width: "100%",
            height: "100%",
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
              position: "relative",
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
                    style={{
                      fontFamily: "oS-B",
                      fontSize: 16,
                      color: colors.greyTitle,
                    }}
                  >
                    Symbol
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
                    Last Trading Price
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
                  <Text
                    style={{
                      fontFamily: "iT-B",
                      fontSize: 16,
                      color: colors.greyTitle,
                    }}
                  >
                    Qty
                  </Text>
                </View>
                <View
                  style={{
                    height: "50%",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "iT",
                      fontSize: 13,
                      color: colors.greyTitle,
                    }}
                  >
                    Holdings%
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
                  style={{
                    fontFamily: "iT-B",
                    fontSize: 15,
                    color: colors.greyTitle,
                  }}
                >
                  Chg%
                </Text>
              </View>
              <View
                style={{
                  height: "50%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "iT",
                    fontSize: 14,
                    color: colors.greyTitle,
                  }}
                >
                  Chg
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  componentDidUpdate(prevProps) {
    if (prevProps.clientsInfo !== this.props.clientsInfo) {
      this.setState({ clientsInfo: this.props.clientsInfo });
    }
  }

  componentDidMount() {
    // this.props.navigation.addListener("focus", () => {
    //   this.props.navigation.jumpTo("DetailedD", {
    //     focused: true,
    //     dName: "DetailedD",
    //   });
    // });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.clientsInfo.length !== 0 ? (
          <FlatList
            data={this.state.clientsInfo}
            renderItem={this.renderItem}
            ListHeaderComponent={this.HeaderComponent}
            keyExtractor={(item) => item.security}
          />
        ) : (
          <this.HeaderComponent />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  clientsInfo: state.portfolio.clientInfo,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Detailed);

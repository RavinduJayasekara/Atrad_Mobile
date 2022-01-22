import React, { Component } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../colors";
import LosersTile from "../../Components/Market/LosersTile";
import { fetchLosers } from "../../store/actions/TopStocks";
import { connect } from "react-redux";
const { height } = Dimensions.get("window");

class Losers extends Component {
  state = {
    newLosers: [],
  };

  renderItem = (itemData) => {
    return <LosersTile itemData={itemData} />;
  };

  headerComponent = () => (
    <View
      style={{
        height: height * 0.08,
        width: "100%",
        borderBottomColor: colors.greyStroke,
        borderBottomWidth: 2,
      }}
    >
      <LinearGradient
        style={{
          width: "100%",
          height: "100%",
          paddingHorizontal: "5%",
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
                  Description
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
                  Last Price
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
                  Last Quantity
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
                style={{
                  fontFamily: "iT-B",
                  fontSize: 15,
                  color: colors.greyTitle,
                }}
              >
                Chg
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
                Chg%
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  componentDidMount() {
    this.props.navigation.addListener("focus", async () => {
      await this.props.fetchLosers(this.props.route.params.brokerUrl);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.losers.status === 200) {
      if (prevProps.losers.data !== this.props.losers.data) {
        this.setState({ newLosers: this.props.losers.data });
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.newLosers}
          renderItem={this.renderItem}
          ListHeaderComponent={this.headerComponent}
          keyExtractor={(item) => item.security}
          contentContainerStyle={{ backgroundColor: colors.white }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  losers: state.topStocks.losers,
});

const mapDispatchToProps = {
  fetchLosers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Losers);

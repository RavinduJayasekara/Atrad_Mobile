import React, { Component } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import IndicesTile from "../../Components/Market/IndicesTile";
import colors from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
import { fetchIndices } from "../../store/actions/Market";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");
const data = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];

const setDate = () => {
  const newDate = new Date();
  const month = newDate.getMonth() + 1;
  return month + "%2F" + newDate.getDate() + "%2F" + newDate.getFullYear();
};

class Indices extends Component {
  state = { newIndices: [] };

  headerComponent = () => (
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
                  Index
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
                  Price
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
                  Volume
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

  renderItem = (itemData) => {
    return <IndicesTile item={itemData.item} />;
  };

  componentDidMount() {
    const date = setDate();
    this.props.navigation.addListener("focus", async () => {
      await this.props.fetchIndices(this.props.route.params.brokerUrl, date);
      //   this.props.navigation.jumpTo("IndicesD", {
      //     focused: true,
      //     dName: "IndicesD",
      //   });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.indices.status === 200) {
      if (prevProps.indices.data !== this.props.indices.data) {
        this.setState({
          newIndices: this.props.indices.data,
        });
      }
    } else {
      //todo:
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ backgroundColor: colors.white }}
          keyExtractor={(item) => item.sector}
          data={this.state.newIndices}
          renderItem={this.renderItem}
          ListHeaderComponent={this.headerComponent}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  indices: state.market.indices,
});

const mapDispatchToProps = {
  fetchIndices,
};

export default connect(mapStateToProps, mapDispatchToProps)(Indices);

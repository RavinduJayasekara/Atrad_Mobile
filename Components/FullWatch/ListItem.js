import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const width = Dimensions.get("window").width;

class ListItem extends React.Component {
  state = {
    securityCode: this.props.item.security,
    companyName: this.props.item.companyname,
    tradePrice: this.props.item.tradeprice,
    totalVolume: this.props.item.totvolume,
    perChange: this.props.item.perchange,
    netChange: this.props.item.netchange,
    visible: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.item.netchange !== this.state.netChange ||
      nextProps.item.perchange !== this.state.perChange ||
      nextProps.item.tradeprice !== this.state.tradePrice ||
      nextProps.item.totvolume !== this.state.totalVolume
    ) {
      return true;
    } else {
      return false;
    }
  }

  onPress = () => {
    this.setState({ visible: true });
  };

  render() {
    let color = this.props.selected ? "#ff0000" : "#ffffff";
    let perChangeValueColor = "#1D9531";
    if (this.props.item.perchange) {
      const perChangeValue = parseFloat(this.props.item.perchange);
      if (perChangeValue < 0) {
        perChangeValueColor = "#EB1C24";
      } else if (perChangeValue === 0) {
        perChangeValueColor = "#676767";
      }
    }

    return (
      <View style={{ height: "98%", width: "100%" }} key={this.props.item.id}>
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <View style={{ width: "10%", height: "100%" }}>
            <TouchableHighlight
              onPress={this.onPress}
              underlayColor="yellow"
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-down" size={15} />
            </TouchableHighlight>
          </View>
          <View style={{ width: "90%", height: "100%" }}>
            <TouchableOpacity
              style={{ width: "100%", height: "100%", flexDirection: "row" }}
              onPress={() =>
                this.props.navigation.navigate("QuoteT", {
                  security: this.props.item.security,
                  companyName: this.props.item.companyname,
                })
              }
            >
              <View style={{ width: "45%", height: "100%" }}>
                <View
                  style={{
                    height: "58%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ fontFamily: "oS-eB", fontSize: 16 }}
                    numberOfLines={1}
                  >
                    {this.props.item.security}
                  </Text>
                </View>
                <View style={{ height: "40%", width: "100%" }}>
                  <Text numberOfLines={1}>{this.props.item.companyname}</Text>
                </View>
              </View>
              <View
                style={{ width: "27%", height: "100%", alignItems: "flex-end" }}
              >
                <View style={{ height: "58%", justifyContent: "center" }}>
                  <Text
                    style={{ fontFamily: "oS-eB", fontSize: 16 }}
                    numberOfLines={1}
                  >
                    {this.props.item.tradeprice}
                  </Text>
                </View>
                <View style={{ height: "40%" }}>
                  <Text numberOfLines={1}>{this.props.item.totvolume}</Text>
                </View>
              </View>
              <View
                style={{ width: "26%", height: "100%", alignItems: "flex-end" }}
              >
                <View style={{ height: "58%", justifyContent: "center" }}>
                  <Text
                    style={{
                      fontFamily: "oS-eB",
                      fontSize: 16,
                      color: perChangeValueColor,
                    }}
                    numberOfLines={1}
                  >
                    {this.props.item.perchange}%
                  </Text>
                </View>
                <View style={{ height: "40%" }}>
                  <Text numberOfLines={1}>{this.props.item.netchange}</Text>
                </View>
              </View>
              <View style={{ width: "2%" }} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: width,
            alignItems: "center",
            height: "2%",
            backgroundColor: "white",
          }}
        >
          <View
            style={{
              height: "100%",
              backgroundColor: "#DADADA",
              width: "96%",
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: width,
    backgroundColor: "#dddddd",
  },
  selected: {
    backgroundColor: "#a9a9a9",
  },
  item: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#48BBEC",
  },
});

export default ListItem;

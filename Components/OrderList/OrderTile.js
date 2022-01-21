import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import colors from "../../colors";
import addCommas from "../RequestBody/AddCommas";
import { Entypo } from "@expo/vector-icons";

export default class OrderTile extends Component {
  state = {
    orderVisible: false,
  };

  orderOpenHandler = () => {
    this.setState({ orderVisible: true });
  };

  orderCloseHandler = () => {
    this.setState({ orderVisible: false });
  };

  render() {
    return (
      <View
        style={{
          height: this.props.height,
          width: "100%",
          paddingHorizontal: "5%",
        }}
      >
        {!this.state.orderVisible ? (
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              borderColor: colors.greyStroke,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                width: "60%",
                height: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "50%", height: "100%" }}>
                <View
                  style={{
                    height: "50%",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text style={styles.securityTitle}>
                    {this.props.item.securitycode}
                  </Text>
                </View>
                <View style={{ height: "50%", width: "100%" }}>
                  <Text
                    style={{
                      ...styles.subTitle,
                      ...{ color: colors.greyTitle },
                    }}
                  >
                    {this.props.item.action} ({this.props.item.ordertype})
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  justifyContent: "flex-start",
                }}
              >
                <View
                  style={{
                    height: "50%",
                    width: "100%",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.title}>
                    {addCommas(this.props.item.orderQuantity)}
                  </Text>
                </View>
                <View
                  style={{
                    height: "50%",
                    width: "100%",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.subTitle}>
                    {this.props.item.orderprice}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ width: "30%", height: "100%" }}>
              <View
                style={{
                  width: "100%",
                  height: "50%",
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={styles.title}>{this.props.item.orderStatus}</Text>
              </View>
              <View
                style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
              >
                <Text style={styles.subTitle}>
                  {this.props.item.timeinforce}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                width: "10%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={this.orderOpenHandler}
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Entypo name="chevron-right" size={30} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              borderColor: colors.greyStroke,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "30%",
                paddingHorizontal: "2%",
                paddingVertical: "2%",
                justifyContent: "center",
              }}
            >
              <Button
                title="Amend"
                onPress={() => {}}
                color={"rgba(0,0,53,0.8)"}
              />
            </View>
            <View
              style={{
                height: "100%",
                width: "30%",
                paddingHorizontal: "2%",
                paddingVertical: "2%",
                justifyContent: "center",
              }}
            >
              <Button
                title="Cancel"
                onPress={() => {}}
                color={"rgba(0,0,53,0.8)"}
              />
            </View>
            <View
              style={{
                height: "100%",
                width: "30%",
                paddingHorizontal: "2%",
                paddingVertical: "2%",
                justifyContent: "center",
              }}
            >
              <Button
                title="History"
                onPress={() => {}}
                color={"rgba(0,0,53,0.8)"}
              />
            </View>
            <View
              style={{
                flex: 1,
                width: "10%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={this.orderCloseHandler}
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Entypo name="chevron-left" size={30} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 14,
    fontFamily: "iT",
  },
  title: {
    fontSize: 16,
    fontFamily: "iT-B",
  },
  securityTitle: {
    fontSize: 16,
    fontFamily: "oS-B",
  },
});

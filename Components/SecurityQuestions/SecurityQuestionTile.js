import React, { Component } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
const { width, height } = Dimensions.get("window");

export default class SecurityQuestionTile extends Component {
  state = {
    touched: false,
  };

  touchInHandler = () => {
    this.setState({ touched: true });
  };

  touchOutHandler = () => {
    this.setState({ touched: false });
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: this.state.touched ? "#000036" : "white",
        }}
      >
        <TouchableOpacity
          style={{ padding: 5 }}
          onPressIn={this.touchInHandler}
          onPress={this.props.onPress}
          onPressOut={this.touchOutHandler}
        >
          <Text
            style={{
              color: this.state.touched ? "white" : "#000036",
              fontSize: height * 0.023,
            }}
          >
            {this.props.secQuestion}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

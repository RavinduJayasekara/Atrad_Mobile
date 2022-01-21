import React, { Component } from "react";
import { View, Dimensions, Modal, TouchableOpacity, Text } from "react-native";
import SecurityQuestionTile from "./SecurityQuestionTile";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
const securityQuestions = [
  { id: "1", data: "What is the name of your favorite pet?" },
  { id: "2", data: "In what city or town was your first job?" },
  { id: "3", data: "What is your favorite movie?" },
  { id: "4", data: "What is the maiden name of your mother?" },
  { id: "5", data: "When is your anniversary?" },
  { id: "6", data: "What is the name of your first school?" },
  { id: "7", data: "What street did you grow up on?" },
  {
    id: "8",
    data: "What is the first and last name of your your oldest cousin?",
  },
  { id: "9", data: "What was the second best birthday present you ever got?" },
  { id: "10", data: "Why is the sky blue?" },
];

export default class SecurityQuestions extends Component {
  render() {
    return (
      <View style={{ height: "100%" }}>
        <TouchableOpacity
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "row",
          }}
          onPress={this.props.secQuestionVisibleHandler}
        >
          <View
            style={{
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: width * 0.034,
                color: "#666666",
                fontFamily: "oS-sB",
              }}
              numberOfLines={1}
            >
              {this.props.secQuestion}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Ionicons
              name="chevron-down"
              size={width * 0.053}
              color="#A0A4A8"
            />
          </View>
        </TouchableOpacity>
        <Modal visible={this.props.modalVisible} transparent={true}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 54,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: width * 0.8,
                backgroundColor: "white",
              }}
            >
              {securityQuestions.map((item) => (
                <SecurityQuestionTile
                  key={item.id}
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    borderBottomWidth: 2,
                  }}
                  fontSize={this.props.fontSize}
                  secQuestion={item.data}
                  onPress={this.props.onPress.bind(this, item.data)}
                />
              ))}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

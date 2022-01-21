import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from "react-native";
import Messages from "../../messages/Messages";
import requestBody from "../RequestBody/RequestFunction";
import SecurityQuestions from "../SecurityQuestions/SecurityQuestions";

const { width, height } = Dimensions.get("window");
const randomPasswordGenerator = (
  policyApplicable,
  minCharacters,
  minNumerics,
  minChars,
  minCapLetters,
  minSpChars
) => {
  var chars = "123456789QWERTYUPASDFGHJKLZXCVBNMqwertyupasdfghkzxcvbnm";
  var nums = "123456789";
  var CapLetters = "QWERTYUPASDFGHJKLZXCVBNM";
  var simLetters = "qwertyupasdfghkzxcvbnm";
  var spChars = "@$<>?=";
  var string_length =
    policyApplicable == 1 && minCharacters != 0 ? minCharacters : 8;
  var randomstring = "";

  for (var z = 0; z < string_length; ) {
    for (var i = 0; i < minNumerics && z < string_length; i++) {
      var rnum = Math.floor(Math.random() * (nums.length - 2));
      randomstring += nums.substring(rnum, rnum + 1).replace(/\s/g, "@");
      z++;
    }
    for (var j = 0; j < minChars && z < string_length; j++) {
      var rnum = Math.floor(Math.random() * (simLetters.length - 2));
      randomstring += simLetters.substring(rnum, rnum + 1).replace(/\s/g, "@");
      z++;
    }
    for (var k = 0; k < minCapLetters && z < string_length; k++) {
      var rnum = Math.floor(Math.random() * (CapLetters.length - 2));
      randomstring += CapLetters.substring(rnum, rnum + 1).replace(/\s/g, "@");
      z++;
    }
    for (var l = 0; l < minSpChars && z < string_length; l++) {
      var rnum = Math.floor(Math.random() * (spChars.length - 2));
      randomstring += spChars.substring(rnum, rnum + 1).replace(/\s/g, "@");
      z++;
    }
    if (z == 0) {
      for (var m = 0; m < string_length; m++) {
        var rnum = Math.floor(Math.random() * (chars.length - 2));
        randomstring += chars.substring(rnum, rnum + 1);
        z++;
      }
    }
  }
  randomstring = randomstring.replace(/\s/g, "@");
  return randomstring;
};

export default class ForgotPassword extends Component {
  state = {
    secQuestion: "",
    modalVisible: false,
    loading: false,
    passwordPolicy: [],
    userName: "",
    secAnswer: "",
  };

  // submitHandler = async () => {
  submitHandler = async (userName, securityQuestion, securityAnswer) => {
    const pwPolicy = this.state.passwordPolicy;
    const randomPassword = randomPasswordGenerator(
      pwPolicy[0],
      pwPolicy[2],
      pwPolicy[3],
      pwPolicy[4],
      pwPolicy[6],
      pwPolicy[5]
    );
    const secQuestion = securityQuestion.replace(/[\s]/g, "%20");
    const response = await requestBody(
      "GET",
      this.props.brokerInformation.serverUrl,
      `login?action=resetPassword&format=json&userName=${userName}&randomPassword=${randomPassword}&secQuestion=${securityQuestion}&secAnswer=${securityAnswer}`,
      "",
      {}
    );
    if (response.status === 200) {
      if (response.data.description === "success") {
        if (
          response.data.data.validation[0] === false &&
          response.data.data.email[0] === ""
        ) {
          Alert.alert("Warning!", "Given credentials are incorrect", [
            { text: "Close", onPress: null },
          ]);
        } else if (
          response.data.data.validation[0] === true &&
          response.data.data.email[0] === ""
        ) {
          Alert.alert(
            "Warning!",
            "Sorry. You cannot reset the password without having a valid email address. Please contact your respective stock broker."
          );
        } else if (
          response.data.data.validation[0] === true &&
          response.data.data.email[0] !== ""
        ) {
          Alert.alert(
            "Success!",
            "New password will be sent to" + response.data.data.email[0],
            [{ onPress: null, text: "Okay!" }]
          );
        }
      } else {
        Alert.alert("Warning!", response.data.data);
      }
    } else {
      //todo: else needs to be implemented
    }
  };

  secQuestionHandler = (keyVal) => {
    this.setState({ secQuestion: keyVal, modalVisible: false });
  };
  secQuestionVisibleHandler = () => {
    this.setState({ modalVisible: true });
  };

  getPasswordPolicy = async () => {
    try {
      const response = await requestBody(
        "GET",
        this.props.brokerInformation.serverUrl,
        "login?action=getPasswordPolicy&format=json&exchangeid=CSE",
        "",
        {}
      );

      if (response.status === 200) {
        const pwSettings = response.data.data.pwSettings;
        this.setState({ passwordPolicy: pwSettings });
      } else {
        //todo:
      }
    } catch (e) {
      Alert.alert(Messages.unknownErrorTitle, Messages.passwordPolicyError);
    }
  };

  userNameHandler = (text) => {
    this.setState({
      userName: text.replace(/[\s]/g, ""),
    });
  };

  securityAnswerHandler = (text) => {
    this.setState({
      secAnswer: text.replace(/[\s]/g, ""),
    });
  };

  componentDidMount() {
    if (this.state.secQuestion === "") {
      this.setState({ secQuestion: "What is the name of your favorite pet?" });
    }
    this.getPasswordPolicy();
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 27,0.1)",
        }}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <View
            style={{
              flex: 1,
              height: height,
              width: width,
              paddingTop: height * 0.27,
              alignItems: "center",
            }}
          >
            <ScrollView style={{ flex: 1 }}>
              <View
                style={{
                  height: height * 0.62,
                  width: width * 0.88,
                  borderRadius: width * 0.01,
                  backgroundColor: "white",
                  borderWidth: 2,
                }}
              >
                <View
                  style={{
                    marginHorizontal: width * 0.025,
                  }}
                >
                  <View style={{ height: width * 0.08 }} />
                  <View
                    style={{
                      width: "100%",
                      height: width * 0.064,
                    }}
                  >
                    <Text style={{ fontSize: width * 0.05 }}>
                      Forgot Password
                    </Text>
                  </View>
                  <View style={{ height: width * 0.05 }} />
                  <View style={{ height: width * 0.06 }}>
                    <Text>
                      <Text
                        style={{ fontSize: width * 0.04, color: "#F06F6F" }}
                      >
                        *
                      </Text>
                      <Text
                        style={{
                          fontSize: width * 0.04,
                          paddingLeft: width * 0.03,
                          color: "#666666",
                          fontFamily: "oS-sB",
                        }}
                      >
                        Username
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      height: height * 0.06,
                      borderWidth: 1,
                      marginTop: height * 0.005,
                      width: "100%",
                      borderColor: "#DBDDE0",
                    }}
                  >
                    <TextInput
                      value={this.state.userName}
                      onChangeText={this.userNameHandler}
                      style={{
                        width: "100%",
                        height: "100%",
                        fontSize: width * 0.04,
                        color: "#BDBDBD",
                      }}
                    />
                  </View>
                  <View style={{ height: height * 0.03 }} />
                  <View style={{ height: height * 0.03 }}>
                    <Text style={{ textAlign: "center" }}>
                      <Text
                        style={{
                          fontSize: width * 0.048,
                          color: "#F06F6F",
                          marginRight: width * 0.03,
                        }}
                      >
                        *
                      </Text>
                      <Text
                        style={{ fontSize: width * 0.048, fontFamily: "oS-sB" }}
                      >
                        Select Security Question
                      </Text>
                    </Text>
                  </View>
                  <View style={{ height: height * 0.02 }} />
                  <View
                    style={{
                      height: height * 0.044,
                      width: "100%",
                      borderWidth: 1,
                      borderColor: "#DBDDE0",
                      flexDirection: "row",
                      borderRadius: width * 0.008,
                    }}
                  >
                    <SecurityQuestions
                      fontSize={width * 0.034}
                      onPress={this.secQuestionHandler}
                      modalVisible={this.state.modalVisible}
                      secQuestionVisibleHandler={this.secQuestionVisibleHandler}
                      secQuestion={this.state.secQuestion}
                    />
                  </View>
                  <View style={{ height: height * 0.03 }} />
                  <View
                    style={{
                      height: height * 0.06,
                      borderWidth: 1,
                      borderColor: "#DBDDE0",
                      width: "100%",
                    }}
                  >
                    <TextInput
                      value={this.state.secAnswer}
                      onChangeText={this.securityAnswerHandler}
                      placeholder="Security Answer"
                      style={{
                        fontSize: width * 0.04,
                        height: "100%",
                        width: "100%",
                        textAlign: "center",
                        color: "#666666",
                        fontFamily: "oS-sB",
                      }}
                      placeholderTextColor="#666666"
                    />
                  </View>
                  <View style={{ height: height * 0.03 }} />
                  <View
                    style={{
                      height: height * 0.056,
                      borderRadius: width * 0.005,
                      overflow: "hidden",
                    }}
                  >
                    {
                      <TouchableOpacity
                        style={{
                          height: "100%",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          backgroundColor: "#000036",
                        }}
                        onPress={this.submitHandler.bind(
                          this,
                          this.state.userName,
                          this.state.secQuestion,
                          this.state.secAnswer
                        )}
                      >
                        <Text
                          style={{
                            fontSize: height * 0.023,
                            color: "white",
                            fontFamily: "oS-sB",
                          }}
                        >
                          Submit
                        </Text>
                      </TouchableOpacity>
                    }
                  </View>
                  <View style={{ height: height * 0.02 }} />
                  <View
                    style={{
                      height: width * 0.11,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      onPress={this.props.modalHandler}
                      style={{
                        color: "#0186D5",
                        fontSize: width * 0.04,
                        fontFamily: "oS-sB",
                      }}
                    >
                      Back to login
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

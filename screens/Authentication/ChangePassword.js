import React, { Component, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
const { height, width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import requestBody from "../../Components/RequestBody/RequestFunction";
import { signIn, signOut } from "../../store/actions/Auth";
import SecurityQuestions from "../../Components/SecurityQuestions/SecurityQuestions";
import Messages from "../../messages/Messages";
const screenHeight = height;

class ChangePassword extends Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    toolTipVisible: false,
    secAnswer: "",
    loading: false,
    passwordPolicy: [],
    oldPasswordVisible: false,
    newPasswordVisible: false,
    confirmPasswordVisible: false,
    pwdPolicyVisible: false,
    secQuestion: "",
    modalVisible: false,
  };

  signOutHandler = async () => {
    await this.props.signOut();
  };

  loginHandler = async (username, password) => {
    const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
    const headers = {
      Accept: "*/*",
      "Content-Type": "application/x-www-form-urlencoded",
    };
    try {
      await this.props.signIn(
        "POST",
        this.props.brokerUrl,
        // "http://192.168.25.36:8080/atsweb/",
        "login",
        body,
        headers,
        username,
        password,
        this.props.broker
      );
    } catch (e) {
      Alert.alert("Warning!", "Request Time Out", [
        { text: "Okay!", style: "destructive", onPress: this.signOutHandler },
      ]);
    }
  };

  oldPasswordHandler = (text) => {
    this.setState({
      oldPassword: text.replace(/[\s]/g, ""),
    });
  };

  newPasswordHandler = (text) => {
    const textVal = text.replace(/[\s]/g, "");

    this.setState({
      newPassword: textVal,
    });
  };

  confirmPasswordHandler = (text) => {
    this.setState({
      confirmPassword: text.replace(/[\s]/g, ""),
    });
  };

  secAnswerHandler = (text) => {
    this.setState({
      secAnswer: text.replace(/[\s]/g, ""),
    });
  };

  newPasswordFocused = () => {
    this.setState({ toolTipVisible: true });
  };

  newPasswordBlur = () => {
    this.setState({ toolTipVisible: false });
  };

  passwordPolicyHandler = () => {
    this.setState({ loading: false, newPassword: "", confirmPassword: "" });
  };

  getPasswordPolicy = async () => {
    try {
      const response = await requestBody(
        "GET",
        this.props.brokerUrl,
        `client?action=getPasswordPolicy&format=json&exchangeid=CSE&brokerid=${this.props.brokerName}`,
        "",
        {}
      );

      if (response.status === 200) {
        const pwSettings = response.data.data.pwSettings;

        console.log(pwSettings);

        this.setState({ passwordPolicy: pwSettings });
      } else {
        //todo:
      }
    } catch (e) {
      Alert.alert(Messa, "Can't reach out to password policy!");
    }
  };

  clearPasswords = () => {
    this.setState({
      newPassword: "",
      confirmPassword: "",
      loading: false,
    });
  };

  clearOldPasswords = () => {
    this.setState({
      oldPassword: "",
      loading: false,
    });
  };

  clearAllPasswords = () => {
    this.setState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
    });
  };

  submitHandler = async (
    oldPassword,
    newPassword,
    confirmPassword,
    securityQuestion,
    securityAnswer
  ) => {
    this.setState({ loading: true });
    if (
      oldPassword === "" ||
      newPassword === "" ||
      confirmPassword === "" ||
      securityAnswer === ""
    ) {
      Alert.alert("Warning!", "Check the inputs!", [
        { onPress: () => this.setState({ loading: false }) },
      ]);
    } else if (newPassword !== confirmPassword) {
      Alert.alert("Warning!", "Password mismatch.", [
        { onPress: this.clearPasswords, text: "Okay", style: "destructive" },
      ]);
    } else if (oldPassword !== this.props.passWord) {
      Alert.alert("Warning!", "Invalid Old Password.", [
        { onPress: this.clearOldPasswords, text: "Okay", style: "destructive" },
      ]);
    } else if (oldPassword === newPassword) {
      Alert.alert(
        "Warning!",
        "Old Password and New Password cannot be the same.",
        [
          {
            onPress: this.clearAllPasswords,
            text: "Okay",
            style: "destructive",
          },
        ]
      );
    } else {
      // this.setState({ pSettings: response.data.pwSettings });
      // if (response.data.pwSettings.length != 0) {
      //   this.policyApplicable = response.data.pwSettings[0];
      //   this.minCharacters = response.data.pwSettings[2];
      //   if (this.policyApplicable == 1) {
      //     this.password_length = this.minCharacters;
      //   }
      //   this.minNumerics = response.data.pwSettings[3];
      //   this.minChars = response.data.pwSettings[4];
      //   this.minSpChars = response.data.pwSettings[5];
      //   this.minCapLetters = response.data.pwSettings[6];
      // }
      let arrNums = 0;
      let arrSp = 0;
      let arrSim = 0;
      let arrCl = 0;
      const newPasswordValue = newPassword;
      const passwordLength = newPasswordValue.length;
      const pwPolicy = this.state.passwordPolicy;
      const maxLength = 30;
      const minLength = pwPolicy[2];
      const minNumbers = pwPolicy[3];
      const minChars = pwPolicy[4];
      const minSpChars = pwPolicy[5];
      const minCapLetters = pwPolicy[6];
      const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
      const simpleLetters = /[a-z]/g;
      const capitalLetters = /[A-Z]/g;
      const numbers = /[0-9]/g;
      const arraySp = newPasswordValue.match(specialChars);
      const arraySimpL = newPasswordValue.match(simpleLetters);
      const arrayCl = newPasswordValue.match(capitalLetters);
      const arrayNumbers = newPasswordValue.match(numbers);
      if (arrayNumbers === null) {
        arrNums = 0;
      } else {
        arrNums = arrayNumbers.length;
        console.log(arrNums);
      }
      if (arraySp === null) {
        arrSp = 0;
      } else {
        arrSp = arraySp.length;
        console.log(arrSp);
      }
      if (arraySimpL === null) {
        arrSim = 0;
      } else {
        arrSim = arraySimpL.length;
        console.log(arrSim);
      }
      if (arrayCl === null) {
        arrCl = 0;
      } else {
        arrCl = arrayCl.length;
        console.log(arrCl);
      }
      if (
        passwordLength <= maxLength &&
        passwordLength >= minLength &&
        arrNums >= minNumbers &&
        arrSp >= minSpChars &&
        arrSim >= minChars &&
        arrCl >= minCapLetters
      ) {
        try {
          const body = `action=changePasswordSecQuestion&format=json&txtUsername=${this.props.userName}&txtOldPassword=${oldPassword}&txtNewPassword=${newPassword}&txtConfirmPassword=${confirmPassword}&ddlSecQuestion=${securityQuestion}&txtSecAnswer=${securityAnswer}`;
          const headers = {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
          };
          const response = await requestBody(
            "POST",
            this.props.brokerUrl,
            // "http://192.168.25.36:8080/atsweb/",
            "login?",
            body,
            headers
          );
          if (response.status === 200) {
            if (response.data.data.validation[0] === true) {
              Alert.alert(
                Messages.successfulTitle,
                "New Password and Question submitted successfully!",
                [
                  {
                    onPress: this.loginHandler.bind(
                      this,
                      this.props.userName,
                      newPassword
                    ),
                  },
                ]
              );
            } else {
              this.setState({
                pwdPolicyVisible: true,
                loading: false,
              });
            }
          } else {
            //todo:
          }
        } catch (e) {
          Alert.alert(
            Messages.unknownErrorTitle,
            Messages.unknownErrorDescription,
            [
              {
                onPress: () => {
                  this.setState({ loading: false });
                },
                text: Messages.okayButtonTitle,
                style: "destructive",
              },
            ]
          );
        }
      } else {
        Alert.alert(
          Messages.unknownErrorTitle,
          "Password is not according to the password policy",
          [
            {
              onPress: this.passwordPolicyHandler,
              text: Messages.okayButtonTitle,
              style: "destructive",
            },
          ]
        );
      }
    }
  };

  oldPasswordVisibleHandler = () => {
    const visible = this.state.oldPasswordVisible;
    this.setState({ oldPasswordVisible: !visible });
  };
  newPasswordVisibleHandler = () => {
    const visible = this.state.newPasswordVisible;
    this.setState({ newPasswordVisible: !visible });
  };
  confirmPasswordVisibleHandler = () => {
    const visible = this.state.confirmPasswordVisible;
    this.setState({ confirmPasswordVisible: !visible });
  };

  secQuestionVisibleHandler = () => {
    this.setState({ modalVisible: true });
  };
  secQuestionHandler = (keyVal) => {
    this.setState({ secQuestion: keyVal, modalVisible: false });
  };
  secQuestionVisibleHandler = () => {
    this.setState({ modalVisible: true });
  };
  componentDidMount() {
    if (this.state.secQuestion === "") {
      this.setState({ secQuestion: "What is the name of your favourite pet?" });
    }
    this.getPasswordPolicy();
  }

  componentWillUnmount() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const userName = this.props.userName;
    return (
      <View style={{ flex: 1, backgroundColor: "#000036" }}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            width: width,
            height: screenHeight,
          }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={
            Platform.OS === "ios" ? screenHeight * 0.11 : null
          }
        >
          <ScrollView style={{ flexGrow: Platform.OS === "ios" ? 1 : null }}>
            <View style={{ height: screenHeight * 0.09, width: width }} />
            <View
              style={{
                height: screenHeight * 0.17,
                width: width,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: screenHeight * 0.1,
                  width: width,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/atrad_logo.png")}
                  style={{
                    height: "100%",
                    width: width,
                  }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ height: screenHeight * 0.03, width: width }} />
              <View
                style={{ height: screenHeight * 0.04, width: width * 0.87 }}
              >
                <Text style={{ fontSize: screenHeight * 0.03, color: "white" }}>
                  Change Password
                </Text>
              </View>
            </View>
            <View style={{ height: screenHeight * 0.02, width: width }} />
            <View
              style={{
                height: screenHeight * 0.33,
                width: width,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: width * 0.87,
                  height: (screenHeight * 0.3) / 4,
                  justifyContent: "flex-end",
                  marginVertical: (screenHeight * 0.03) / 8,
                }}
              >
                <TextInput
                  placeholder={userName}
                  editable={false}
                  placeholderTextColor="#BDBDBD"
                  style={{
                    fontSize: screenHeight * 0.025,
                    borderBottomColor: "#CFD2D8",
                    borderBottomWidth: 1,
                  }}
                />
              </View>
              <View
                style={{
                  width: width * 0.87,
                  marginVertical: (screenHeight * 0.03) / 8,
                  height: (screenHeight * 0.3) / 4,
                  borderBottomColor: "#CFD2D8",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: "85%",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextInput
                    placeholderTextColor="#BDBDBD"
                    placeholder="* Old Password"
                    onChangeText={this.oldPasswordHandler}
                    value={this.state.oldPassword}
                    style={{
                      fontSize: screenHeight * 0.025,
                      color: "#BDBDBD",
                    }}
                    passwordRules="minlength: 20; required: lower; required: upper; required: digit; required: [-];"
                    secureTextEntry={!this.state.oldPasswordVisible}
                  />
                </View>
                <View
                  style={{
                    width: "15%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Ionicons
                    name={this.state.oldPasswordVisible ? "eye" : "eye-off"}
                    size={(screenHeight * 0.3) / 8}
                    color="white"
                    onPress={this.oldPasswordVisibleHandler}
                  />
                </View>
              </View>
              <View
                style={{
                  width: width * 0.87,
                  marginVertical: (screenHeight * 0.03) / 8,
                  height: (screenHeight * 0.3) / 4,
                  borderBottomColor: "#CFD2D8",
                  borderBottomWidth: 1,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    width: "85%",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextInput
                    placeholderTextColor="#BDBDBD"
                    placeholder="* New Password"
                    onChangeText={this.newPasswordHandler}
                    value={this.state.newPassword}
                    style={{
                      fontSize: screenHeight * 0.025,
                      color: "#BDBDBD",
                    }}
                    secureTextEntry={!this.state.newPasswordVisible}
                  />
                </View>
                <View
                  style={{
                    width: "15%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Ionicons
                    name={this.state.newPasswordVisible ? "eye" : "eye-off"}
                    size={(screenHeight * 0.3) / 8}
                    color="white"
                    onPress={this.newPasswordVisibleHandler}
                  />
                </View>
              </View>
              <View
                style={{
                  width: width * 0.87,
                  marginVertical: (screenHeight * 0.03) / 8,
                  height: (screenHeight * 0.3) / 4,
                  flexDirection: "row",
                  alignItems: "flex-end",
                  borderBottomColor: "#CFD2D8",
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    width: "85%",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <TextInput
                    placeholderTextColor="#BDBDBD"
                    placeholder="* Confirm Password"
                    onChangeText={this.confirmPasswordHandler}
                    value={this.state.confirmPassword}
                    style={{
                      fontSize: screenHeight * 0.025,
                      color: "#BDBDBD",
                    }}
                    secureTextEntry={!this.state.confirmPasswordVisible}
                  />
                </View>
                <View
                  style={{
                    width: "15%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Ionicons
                    name={this.state.confirmPasswordVisible ? "eye" : "eye-off"}
                    size={(screenHeight * 0.3) / 8}
                    color="white"
                    onPress={this.confirmPasswordVisibleHandler}
                  />
                </View>
              </View>
            </View>
            <View style={{ height: screenHeight * 0.09, width: width }} />
            <View
              style={{
                height: screenHeight * 0.17,
                width: width,
                alignItems: "center",
              }}
            >
              <View style={{ height: screenHeight * 0.03 }}>
                <Text
                  style={{
                    fontSize: screenHeight * 0.025,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Select Security Question
                </Text>
              </View>
              <View
                style={{
                  height: screenHeight * 0.09,
                  justifyContent: "center",
                  width: width,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "80%",
                    height: "50%",
                    borderWidth: 2,
                    borderColor: "#DBDDE0",
                    borderRadius: screenHeight * 0.01,
                    overflow: "hidden",
                  }}
                >
                  <SecurityQuestions
                    onPress={this.secQuestionHandler}
                    modalVisible={this.state.modalVisible}
                    secQuestionVisibleHandler={this.secQuestionVisibleHandler}
                    secQuestion={this.state.secQuestion}
                  />
                </View>
              </View>
              <View
                style={{
                  width: width * 0.87,
                  height: screenHeight * 0.05,
                  justifyContent: "flex-end",
                }}
              >
                <TextInput
                  placeholder="Select Answer"
                  placeholderTextColor="#BDBDBD"
                  style={{
                    fontSize: screenHeight * 0.025,
                    color: "#BDBDBD",
                    textAlign: "center",
                    borderBottomColor: "#CFD2D8",
                    borderBottomWidth: 1,
                  }}
                  value={this.state.secAnswer}
                  onChangeText={this.secAnswerHandler}
                />
              </View>
            </View>
            <View style={{ height: screenHeight * 0.03, width: width }} />
            <View
              style={{
                height: screenHeight * 0.06,
                width: width,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: width * 0.6,
                  height: "100%",
                  borderRadius: 30,
                  overflow: "hidden",
                }}
              >
                {!this.state.loading ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FBD44B",
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={this.submitHandler.bind(
                      this,
                      this.state.oldPassword,
                      this.state.newPassword,
                      this.state.confirmPassword,
                      this.state.secQuestion,
                      this.state.secAnswer
                    )}
                  >
                    <Text
                      style={{
                        fontSize: screenHeight * 0.02,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                    >
                      SUBMIT
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      borderWidth: 2,
                      borderColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#000036",
                      height: "100%",
                      width: "100%",
                      borderRadius: 30,
                    }}
                  >
                    <ActivityIndicator size="small" color="white" />
                  </View>
                )}
              </View>
            </View>
            <Modal visible={this.state.pwdPolicyVisible} transparent={true}>
              <View
                style={{ flex: 1, backgroundColor: "rgba(39, 89, 220,0.3)" }}
              >
                <View
                  style={{
                    height: screenHeight * 0.5,
                    width: width * 0.6,
                    backgroundColor: "white",
                  }}
                >
                  <Text>{this.state.passwordPolicyString}</Text>
                  <Button
                    title="Close"
                    onPress={() => this.setState({ pwdPolicyVisible: false })}
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { userName: state.auth.userName };
};

const mapDispatchToProps = {
  signIn,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

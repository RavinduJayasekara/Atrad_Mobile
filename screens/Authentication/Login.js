import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
  ScrollView,
  ActivityIndicator,
  Modal,
  StatusBar,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import appJson from "../../app.json";
import requestBody from "../../Components/RequestBody/RequestFunction";
import { signIn } from "../../store/actions/Auth";
import { connect } from "react-redux";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgotPassword from "../../Components/Login/ForgotPassword";
import Messages from "../../messages/Messages";

const { width, height } = Dimensions.get("window");

class Login extends Component {
  _isMounted = false;

  state = {
    rememberMe: false,
    userName: "",
    passWord: "",
    loading: false,
    storedUserName: "",
    storedPassWord: "",
    storedRememberMe: "",
    brokerInformation: null,
    forgotPasswordVisibility: false,
  };

  modalHandler = () => {
    this.setState({ forgotPasswordVisibility: false });
  };

  rememberMeHandler = () => {
    const rememberMeCopy = this.state.rememberMe;
    const rememberMeCopyOpp = !rememberMeCopy;
    this.setState({ rememberMe: rememberMeCopyOpp });
  };

  usernameHandler = (text) => {
    this.setState({
      userName: text.replace(/\s/g, ""),
    });
  };

  passwordHandler = (text) => {
    this.setState({
      passWord: text.replace(/\s/g, ""),
    });
  };

  modalVisible = () => {
    this.setState({ forgotPasswordVisibility: true });
  };

  savePasswordHandler = async () => {
    this._isMounted = true;
    try {
      const username = await SecureStore.getItemAsync("username");
      const password = await SecureStore.getItemAsync("password");
      const rememberme = await SecureStore.getItemAsync("rememberme");
      const brokerVal = await AsyncStorage.getItem("brokerInformation");
      if (this._isMounted) {
        if (username && password && rememberme && brokerVal) {
          this.setState({
            userName: rememberme === "false" ? "" : username,
            passWord: rememberme === "false" ? "" : password,
            rememberMe: rememberme === "false" ? false : true,
            storedUserName: username,
            storedPassWord: password,
            storedRememberMe: rememberme === "false" ? "false" : "true",
            brokerInformation: JSON.parse(brokerVal),
          });
        }
      }
    } catch (e) {
      Alert.alert("Warning!", "Request Time Out.");
    }
  };

  deleletStoredValues = async () => {
    try {
      const dUsername = await SecureStore.deleteItemAsync("username");
      const dPassword = await SecureStore.deleteItemAsync("password");
      const dRememberme = await SecureStore.deleteItemAsync("rememberme");
      return "Successful";
    } catch (e) {
      return "Failed";
    }
  };

  requestBodyHandler = async (username, password, serverImage) => {
    this.setState({ loading: true });
    if (username === "" || password === "") {
      Alert.alert("Warning!", "Enter a valid Username or Password!", [
        {
          onPress: () => this.setState({ loading: false }),
          text: "Okay!",
          style: "destructive",
        },
      ]);
    } else {
      try {
        const body = `action=login&format=json&txtUserName=${username}&txtPassword=${password}&product=Mobile`;
        const headers = {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
        };

        // console.log(this.props);

        const loginStatus = await this.props.signIn(
          "POST",
          this.state.brokerInformation.serverUrl,
          // "http://192.168.25.36:8080/atsweb/",
          "login",
          body,
          headers,
          username,
          password,
          serverImage
        );

        if (loginStatus === "Success") {
          if (
            this.state.storedRememberMe !== "" &&
            this.state.storedPassWord !== "" &&
            this.state.storedUserName !== "" &&
            this.state.brokerInformation !== null &&
            this.state.rememberMe
          ) {
            try {
              const deleteValues = await this.deleletStoredValues();
              const v = await AsyncStorage.mergeItem(
                "brokerInformation",
                JSON.stringify(this.state.brokerInformation)
              );
              console.log("merge val", v);
              if (deleteValues === "Successful") {
                await SecureStore.setItemAsync("username", username);
                await SecureStore.setItemAsync("password", password);
                await SecureStore.setItemAsync(
                  "rememberme",
                  this.state.rememberMe.toString()
                );
                await AsyncStorage.setItem(
                  "brokerInformation",
                  JSON.stringify(this.state.brokerInformation)
                );
              }
            } catch (e) {
              throw "Username and Password cannot be stored";
            }
          } else if (!this.state.rememberMe) {
            const result = await this.deleletStoredValues();
          } else {
            await SecureStore.setItemAsync("username", username);
            await SecureStore.setItemAsync("password", password);
            await SecureStore.setItemAsync(
              "rememberme",
              this.state.rememberMe.toString()
            );
            const setItem = await AsyncStorage.setItem(
              "brokerInformation",
              JSON.stringify(this.state.brokerInformation)
            );
            console.log("setItem", setItem);
          }
        }
      } catch (err) {
        Alert.alert(Messages.unknownErrorTitle, err, [
          { onPress: () => this.setState({ loading: false }) },
        ]);
      }
    }
  };

  _unsubscribe = () => {};

  componentDidMount() {
    this.savePasswordHandler().then(() => {
      if (!this.state.brokerInformation) {
        this.props.navigation.navigate("BrokerSelection");
      }
    });

    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.state.loading) {
        this.setState({ loading: false });
      }
      if (this.state.storedRememberMe === "") {
        this.setState({
          userName: "",
          passWord: "",
        });
      }
    });
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.route.params) {
      if (
        prevProps.brokerInformation !==
        this.props.route.params.brokerInformation
      ) {
        this.setState({
          brokerInformation: this.props.route.params.brokerInformation,
        });
      }
    }
  }

  componentWillUnmount() {
    this._unsubscribe();
    this._isMounted = false;
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#000036" }}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <StatusBar hidden={false} />
            <View
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  width: width,
                  alignItems: "center",
                  height: height * 0.11,
                }}
              >
                <View>
                  <Text style={{ color: "#6F6F6F" }}>
                    Version {appJson.expo.version}
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    width: width,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ height: height * 0.1, width: width * 0.6 }}
                    source={require("../../assets/atrad_logo.png")}
                  />
                </View>
              </View>
              <View
                style={{
                  width: width,
                  alignItems: "center",
                  height: height * 0.2,
                  justifyContent: "space-evenly",
                }}
              >
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: "white",
                    height: height * 0.05,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: this.state.brokerInformation
                        ? this.state.brokerInformation.serverImage
                        : null,
                    }}
                    style={{ width: width * 0.3, height: "100%" }}
                  />
                </View>
                {this.state.brokerInformation ? (
                  this.state.brokerInformation.serverName === "" ? (
                    <Text style={{ color: "#9E9E9E" }}>
                      {this.state.brokerInformation.brokerName}
                    </Text>
                  ) : (
                    <Text style={{ color: "#9E9E9E" }}>
                      {this.state.brokerInformation.brokerName} -
                      {this.state.brokerInformation.serverName}
                    </Text>
                  )
                ) : null}
              </View>
              <View
                style={{
                  alignItems: "center",
                  height: height * 0.25,
                  justifyContent: "space-evenly",
                }}
              >
                <View style={styles.textInputViewStyle}>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="* Username"
                    placeholderTextColor="#BDBDBD"
                    textContentType="username"
                    onChangeText={this.usernameHandler}
                    value={this.state.userName}
                  />
                </View>
                <View style={styles.textInputViewStyle}>
                  <TextInput
                    style={styles.textInputStyle}
                    placeholder="* Password"
                    placeholderTextColor="#BDBDBD"
                    textContentType="password"
                    onChangeText={this.passwordHandler}
                    value={this.state.passWord}
                    secureTextEntry={true}
                  />
                </View>
                <View
                  style={{
                    width: width * 0.9,
                    alignItems: "flex-start",
                  }}
                >
                  <CheckBox
                    containerStyle={{
                      backgroundColor: null,
                      borderWidth: 0,
                      padding: 0,
                    }}
                    title="Remember Me"
                    textStyle={{ color: "white", fontWeight: "normal" }}
                    checked={this.state.rememberMe}
                    onPress={this.rememberMeHandler}
                    checkedColor="white"
                  />
                </View>
              </View>
              <View
                style={{
                  width: width,
                  height: height * 0.075,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "80%",
                    overflow: "hidden",
                    borderRadius: 30,
                    backgroundColor: "#FADB70",
                    height: "100%",
                  }}
                >
                  {!this.state.loading && this.state.brokerInformation ? (
                    <TouchableOpacity
                      onPress={
                        // () => this.props.navigation.navigate("ChangePassword")
                        this.requestBodyHandler.bind(
                          this,
                          this.state.userName,
                          this.state.passWord,
                          this.state.brokerInformation.serverImage
                        )
                      }
                      style={{
                        borderRadius: 30,
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        backgroundColor: "#FBD44B",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "black",
                          fontSize: height * 0.03,
                        }}
                      >
                        LOGIN
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#000036",
                        borderColor: "white",
                        borderWidth: 2,
                        borderRadius: 30,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator size="small" color={"white"} />
                    </View>
                  )}
                </View>
              </View>
              <View
                style={{
                  width: width,
                  justifyContent: "space-evenly",
                  height: height * 0.25,
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    onPress={this.modalVisible}
                    style={{ color: "#0186D5" }}
                  >
                    Forgot password?
                  </Text>
                </View>
                <View
                  style={{
                    width: width,
                    height: height * 0.1,
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="ios-finger-print"
                    size={height * 0.1}
                    color="white"
                  />
                </View>
                <View>
                  <Text
                    style={{ color: "#0186D5" }}
                    onPress={() =>
                      this.props.navigation.navigate("BrokerSelection")
                    }
                  >
                    Change Broker
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        <Modal visible={this.state.forgotPasswordVisibility} transparent={true}>
          <ForgotPassword
            modalHandler={this.modalHandler}
            brokerInformation={this.state.brokerInformation}
          />
        </Modal>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = {
  signIn,
};

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
  },
  textInputStyle: {
    width: width * 0.9,
    borderBottomColor: "white",
    borderBottomWidth: 2,
    color: "white",
    fontSize: height * 0.02,
    paddingBottom: 10,
  },
  textInputViewStyle: {
    marginVertical: height * 0.02,
  },
});

export const screenOptions = { headerTitle: "", headerBackVisible: false };

export default connect(null, mapDispatchToProps)(Login);

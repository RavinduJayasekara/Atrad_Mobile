import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  Button,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
const { width, height } = Dimensions.get("window");

const BrokerTile = (props) => {
  const [brokerServer, setBrokerServer] = useState("");
  const [visible, setVisible] = useState("");
  const [serverInfo, setServerInfo] = useState();

  const serverSelectHandler = async (keyValue) => {
    setBrokerServer(keyValue);
    const serverObject = props.serverUrls.find(
      (item) => item.server === keyValue
    );
    setServerInfo(serverObject);
  };

  const loginHandler = (oneServer) => {
    if (oneServer) {
      props.navigation.navigate("Login", {
        brokerInformation: {
          serverUrl: brokerServer,
          serverName: "",
          serverImage: props.image,
          brokerName: props.item.brokerName,
        },
      });
    } else {
      props.navigation.navigate("Login", {
        brokerInformation: {
          serverUrl: brokerServer,
          serverName: serverInfo.serverName,
          serverImage: props.image,
          brokerName: props.item.brokerName,
          brokerInformation: props.item,
        },
      });
    }
  };

  const okayHandler = () => {
    setVisible(false);
    loginHandler(false);
  };
  const cancelHandler = () => {
    setVisible(false);
  };

  const modalHandler = () => {
    if (props.serverUrls.length === 1) {
      loginHandler(true);
    } else {
      setVisible(true);
    }
  };

  return (
    <View
      key={props.item.id}
      style={{
        height: props.tileHeight,
        width: props.tileWidth,
        borderColor: "#D6D6D6",
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal: props.tileWidth * 0.055,
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
        }}
        onPress={modalHandler}
      >
        <View
          style={{
            height: "70%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="contain"
            source={{ uri: props.item.brokerImage }}
            style={{
              width: "80%",
              height: "100%",
            }}
          />
        </View>
        <View
          style={{
            height: "30%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: height * 0.017, textAlign: "center" }}>
            {props.item.brokerName}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal visible={visible} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0,0.5)",
            paddingTop: height * 0.35,
            alignItems: "center",
            width: width,
          }}
        >
          {Platform.OS === "ios" ? (
            <View style={{ width: "100%" }}>
              <View
                style={{
                  width: width,
                  height: height * 0.3,
                  backgroundColor: "white",
                }}
              >
                <Picker
                  style={{ width: "100%", height: "100%" }}
                  itemStyle={{ width: "100%", height: "100%" }}
                  onValueChange={serverSelectHandler}
                  selectedValue={
                    brokerServer !== ""
                      ? brokerServer
                      : serverSelectHandler(props.serverUrls[0].server)
                  }
                >
                  {props.serverUrls.map((item) => (
                    <Picker.Item
                      style={{ backgroundColor: "white" }}
                      key={item.server}
                      label={item.serverName}
                      value={item.server}
                    />
                  ))}
                </Picker>
              </View>
              <View
                style={{
                  width: width * 0.7,
                  height: height * 0.2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  // backgroundColor: "white",
                }}
              >
                <View style={{ width: width * 0.3, height: height * 0.1 }}>
                  <Button
                    title={"Okay"}
                    onPress={okayHandler}
                    color={Platform.OS === "android" ? "#D6D6D6" : "white"}
                  />
                </View>
                <View style={{ width: width * 0.3, height: height * 0.1 }}>
                  <Button
                    title={"Cancel"}
                    onPress={cancelHandler}
                    color={Platform.OS === "android" ? "#D6D6D6" : "white"}
                  />
                </View>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  width: width * 0.95,
                  height: height * 0.23,
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    paddingVertical: height * 0.01,
                    paddingHorizontal: height * 0.03,
                  }}
                >
                  <Text style={{ fontSize: height * 0.03 }}>Select Option</Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    height: height * 0.08,
                    width: "100%",
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      width: "95%",
                      borderRadius: height * 0.01,
                      backgroundColor: "#E9E9E9",
                    }}
                  >
                    <Picker
                      style={{
                        width: "100%",
                        height: "100%",
                        color: "#191919",
                      }}
                      itemStyle={{
                        width: "100%",
                        height: "100%",
                      }}
                      onValueChange={serverSelectHandler}
                      selectedValue={
                        brokerServer !== ""
                          ? brokerServer
                          : serverSelectHandler(props.serverUrls[0].server)
                      }
                    >
                      {props.serverUrls.map((item) => (
                        <Picker.Item
                          key={item.server}
                          label={item.serverName}
                          value={item.server}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={{ marginTop: height * 0.01 }}>
                  <View
                    style={{
                      backgroundColor: "#DADADA",
                      height: height * 0.001,
                      opacity: 0.5,
                      width: width,
                    }}
                  />
                </View>
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View
                    style={{
                      height: height * 0.08,
                      width: "50%",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        width: "100%",
                      }}
                      onPress={okayHandler}
                    >
                      <Text
                        style={{ fontSize: height * 0.03, color: "#0186D5" }}
                      >
                        DONE
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      height: height * 0.08,
                      width: "50%",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        width: "100%",
                      }}
                      onPress={cancelHandler}
                    >
                      <Text
                        style={{ fontSize: height * 0.03, color: "#0186D5" }}
                      >
                        CANCEL
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default BrokerTile;

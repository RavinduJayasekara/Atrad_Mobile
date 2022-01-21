import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import * as Network from "expo-network";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Broker from "../../Components/Broker";

const { height, width } = Dimensions.get("window");

const downloadImages = async (data) => {
  return await Promise.all(
    data.map(async (item) => {
      const imageUrl = item.brokerImage;
      const imageName = imageUrl.split("/").pop();
      const dImage = await FileSystem.downloadAsync(
        item.brokerImage,
        FileSystem.documentDirectory + imageName
      );

      return {
        id: item.id,
        brokerImage: dImage.uri,
        brokerName: item.brokerName,
        serverUrl: item.serverUrl,
      };
    })
  );
};

export default class BrokerSelection extends Component {
  state = {
    internetReachable: false,
    brokers: [],
    visible: false,
  };

  getBrokersHandler = async () => {
    this.setState({ visible: true });
    const postResponse = await AsyncStorage.getItem("brokerJson");
    const newResponse = await fetch(
      "https://atrad.lk/atradbrokerSelecttest/brokerSelection.json"
    );
    const newObject = await newResponse.json();

    if (postResponse !== null) {
      const postObject = JSON.parse(postResponse);
      if (newObject.versionNumber === postObject.versionNumber) {
        console.log("Similar Version");
        const similarBrokerObject = postObject.data.reduce(function (
          result,
          value,
          index,
          array
        ) {
          if (index % 3 === 0) result.push(array.slice(index, index + 3));
          return result;
        },
        []);
        this.setState({ brokers: similarBrokerObject });
      } else {
        console.log("New Version");
        const brokersArray = await downloadImages(newObject.data);

        const newBrokerObject = brokersArray.reduce(function (
          result,
          value,
          index,
          array
        ) {
          if (index % 3 === 0) result.push(array.slice(index, index + 3));
          return result;
        },
        []);

        this.setState({
          brokers: newBrokerObject,
        });

        newObject.data = brokersArray;

        console.log("New Version", newObject);

        const storeJson = JSON.stringify(newObject);

        await AsyncStorage.mergeItem("brokerJson", storeJson);
      }
    } else {
      console.log("Newest version");

      const brokersArray = await downloadImages(newObject.data);

      const newestBrokerObject = newObject.data.reduce(function (
        result,
        value,
        index,
        array
      ) {
        if (index % 3 === 0) result.push(array.slice(index, index + 3));
        return result;
      },
      []);

      this.setState({
        brokers: newestBrokerObject,
      });

      newObject.data = brokersArray;

      console.log("Newest Version", newObject);

      const storeJson = JSON.stringify(newObject);

      await AsyncStorage.mergeItem("brokerJson", storeJson);
    }
    this.setState({ visible: false });
  };

  networkHandler = async () => {
    const networkResponse = await Network.getNetworkStateAsync();
    if (networkResponse.isInternetReachable) {
      this.setState({ internetReachable: true });
      await this.getBrokersHandler();
    } else {
      this.setState({ internetReachable: false });
      Alert.alert("Connection Error", "Connected to the internet", [
        { text: "Okay", onPress: () => this.networkHandler() },
      ]);
    }
  };

  componentDidMount() {
    this.networkHandler();
  }

  render() {
    if (!this.state.internetReachable) {
      <View style={{ flex: 1 }} />;
    }

    if (this.state.visible) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000036" />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <StatusBar hidden={false} />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {this.state.brokers.map((item, index) => {
            return (
              <Broker
                navigation={this.props.navigation}
                key={index.toString()}
                brokerTriple={item}
                bHeight={width * 0.35}
                bWidth={width * 0.3}
                sWidth={width}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export const screenOptions = {
  headerTitle: "Select a Broker",
  headerBackVisible: false,
};

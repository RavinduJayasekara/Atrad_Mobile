import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Modal } from "react-native";
import BrokerTile from "./Broker/BrokerTile";

export default class Broker extends Component {
  render() {
    const brokerInformation = this.props;
    const tileHeight = brokerInformation.bHeight;
    const tileWidth = brokerInformation.bWidth;

    return (
      <View style={{ width: brokerInformation.sWidth, flexDirection: "row" }}>
        {brokerInformation.brokerTriple.map((item) => (
          <BrokerTile
            navigation={brokerInformation.navigation}
            image={item.brokerImage}
            key={item.id}
            item={item}
            serverUrls={item.serverUrl}
            tileHeight={tileHeight}
            tileWidth={tileWidth}
            brokerImage={item.brokerImage}
            brokerName={item.brokerName}
          />
        ))}
      </View>
    );
  }
}

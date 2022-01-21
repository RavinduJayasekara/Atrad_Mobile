import { Picker } from "@react-native-picker/picker";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../colors";
import addCommas from "../../Components/RequestBody/AddCommas";
import requestBody from "../../Components/RequestBody/RequestFunction";
import { fetchClients, storeClients } from "../../store/actions/Portfolio";
const { height } = Dimensions.get("window");

const uRLencode = (clientCode) => {
  const arr = clientCode.split("/");
  return arr.join("%2F");
};

class Summary extends Component {
  _isMounted = false;

  state = {
    clients: [],
    client: {},
    clientName: "",
    totalCost: "0",
    marketValue: "0",
    salesCommision: "0",
    salesProceeds: "0",
    unrealizedGL: "0",
    unrealizedGLT: "0",
    modalVisible: false,
    clientJ: {},
  };

  onPress = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  clientHandlerIosName = (item) => {
    const clientJ = JSON.parse(item);
    this.setState({
      client: item,
      clientName: clientJ.clientCode,
      clientJ: clientJ,
    });
  };

  clientHandlerIosRequest = async (client) => {
    if (Object.keys(client).length !== 0) {
      const clientUrl = uRLencode(client.clientCode);

      const body = `action=getPortfolio&format=json&exchange=CSE&broker=NDB&portfolioClientAccount=${clientUrl}+(${client.initials}+${client.lastName})&portfolioAsset=EQUITY`;
      const headers = {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      const response = await requestBody(
        "POST",
        this.props.route.params.brokerUrl,
        "client",
        body,
        headers
      );

      let clientInfoArr = [];
      let totQuantity = 0;
      let totalC = 0;
      let marketV = 0;
      let salesC = 0;
      let salesP = 0;
      let totalG = 0;
      if (response.status === 200) {
        if (response.data.data.portfolios) {
          clientInfoArr = response.data.data.portfolios;
          if (response.data.data.quantityTot) {
            totQuantity = parseFloat(response.data.data.quantityTot);
          }
          clientInfoArr.map((item) => {
            totalC = totalC + parseFloat(item.totCost);
            marketV = marketV + parseFloat(item.marketValue);
            salesC = salesC + parseFloat(item.commission);
            salesP = salesP + parseFloat(item.salesproceeds);
            totalG = totalG + parseFloat(item.netGain);
          });
        }

        this.props.storeClients(clientInfoArr, totQuantity);

        this.setState({
          totalCost: addCommas(totalC.toFixed(2)),
          marketValue: addCommas(marketV.toFixed(2)),
          salesCommision: addCommas(salesC.toFixed(2)),
          salesProceeds: addCommas(salesP.toFixed(2)),
          unrealizedGL: addCommas(totalG.toFixed(2)),
          modalVisible: false,
        });
      } else {
        this.setState({
          modalVisible: false,
        });
      }
    } else {
      //todo:
    }
  };

  clientHandler = async (item, broker) => {
    // this._isMounted = true;
    // const clientUrl = uRLencode(item.clientCode);
    // const body = `action=getPortfolio&format=json&exchange=CSE&broker=${broker}&portfolioClientAccount=${clientUrl}+(${item.initials}+${item.lastName})&portfolioAsset=EQUITY`;
    // const headers = {
    //   Accept: "*/*",
    //   "Content-Type": "application/x-www-form-urlencoded",
    // };
    // const response = await requestBody(
    //   "POST",
    //   this.props.route.params.brokerUrl,
    //   "client",
    //   body,
    //   headers
    // );
    // if (this._isMounted) {
    //   let totQuantity = 0;
    //   let clientInfoArr = [];
    //   let totalC = 0;
    //   let marketV = 0;
    //   let salesC = 0;
    //   let salesP = 0;
    //   let totalG = 0;
    //   let totalGT = 0;
    //   if (response.status) {
    //     if (response.data.data.portfolios) {
    //       clientInfoArr = response.data.data.portfolios;
    //       if (response.data.data.quantityTot) {
    //         totQuantity = parseFloat(response.data.data.quantityTot[0]);
    //       }
    //       clientInfoArr.map((item) => {
    //         totalC = totalC + parseFloat(item.totCost);
    //         marketV = marketV + parseFloat(item.marketValue);
    //         salesC = salesC + parseFloat(item.commission);
    //         salesP = salesP + parseFloat(item.salesproceeds);
    //         totalG = totalG + parseFloat(item.netGain);
    //         tGT = parseFloat(item.netGain) * parseFloat(item.quantity);
    //         totalGT = totalGT + tGT;
    //       });
    //     }
    //     this.props.storeClients(clientInfoArr, totQuantity);
    //     this.setState({
    //       client: item,
    //       clientName: item.clientCode,
    //       totalCost: addCommas(totalC.toFixed(2)),
    //       marketValue: addCommas(marketV.toFixed(2)),
    //       salesCommision: addCommas(salesC.toFixed(2)),
    //       salesProceeds: addCommas(salesP.toFixed(2)),
    //       unrealizedGL: addCommas(totalG.toFixed(2)),
    //       unrealizedGLT: addCommas(totalGT.toFixed(2)),
    //     });
    //   }
    // } else {
    //   //todo:
    // }
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.clients !== this.props.clients ||
      prevProps.brokers !== this.props.brokers
    ) {
      if (this.props.clients.length !== 0) {
        this.clientHandler(this.props.clients[0], this.props.brokers[0]);
        this.setState({
          clients: this.props.clients,
          brokers: this.props.brokers,
        });
      }
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      // this.props.navigation.jumpTo("SummaryD", {
      //   focused: true,
      //   dName: "SummaryD",
      // });

      this.props.fetchClients(
        this.props.route.params.brokerUrl,
        this.props.userName
      );
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={{
            height: height * 0.08,
            width: "100%",
            borderBottomWidth: 2,
            borderBottomColor: colors.greyStroke,
            paddingHorizontal: "5%",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: "80%",
              width: "50%",
              borderRadius: 2,
              borderColor: colors.greyStroke,
              borderWidth: 1,
            }}
          >
            {Platform.OS === "android" ? (
              <View style={{ width: "100%", height: "100%" }}>
                {this.state.clients.length !== 0 ? (
                  <Picker
                    style={{ height: "100%", width: "100%" }}
                    onValueChange={this.clientHandler}
                    selectedValue={this.state.clientName}
                  >
                    {this.state.clients.map((item) => (
                      <Picker.Item
                        key={item.clientCode}
                        label={item.clientCode}
                        value={item}
                      />
                    ))}
                  </Picker>
                ) : (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator size={"small"} color={colors.primary} />
                  </View>
                )}
              </View>
            ) : (
              <View style={{ width: "100%", height: "100%" }}>
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onPress={this.onPress}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      paddingLeft: "2%",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 16, fontFamily: "oS-B" }}
                    >
                      {this.state.clientName === ""
                        ? "No client"
                        : this.state.clientName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 1, paddingHorizontal: "5%" }}>
          <View style={{ width: "100%", height: "100%" }}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                height: "10%",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "oS", color: colors.greyTitle }}>
                  Total Cost
                </Text>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "iT-B", fontSize: 15 }}>
                  {this.state.totalCost}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                position: "relative",
                height: "10%",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "oS", color: colors.greyTitle }}>
                  Market Value
                </Text>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "iT-B", fontSize: 15 }}>
                  {this.state.marketValue}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                position: "relative",
                height: "10%",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "oS", color: colors.greyTitle }}>
                  Sales Commision
                </Text>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "iT-B", fontSize: 15 }}>
                  {this.state.salesCommision}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                position: "relative",
                height: "10%",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "oS", color: colors.greyTitle }}>
                  Sales Proceeds
                </Text>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "iT-B", fontSize: 15 }}>
                  {this.state.salesProceeds}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                position: "relative",
                height: "10%",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "oS", color: colors.greyTitle }}>
                  Unrealized Gain/(Loss)
                </Text>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "iT-B", fontSize: 15 }}>
                  {this.state.unrealizedGL}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                position: "relative",
                height: "10%",
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "oS", color: colors.greyTitle }}>
                  Today Gain/(Loss)
                </Text>
              </View>
              <View
                style={{
                  height: "100%",
                  width: "50%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ fontFamily: "iT-B", fontSize: 15 }}>
                  {this.state.unrealizedGLT}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Modal transparent={true} visible={this.state.modalVisible}>
          <View
            style={{
              flex: 1,
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0, 0, 53,0.5)",
            }}
          >
            <TouchableOpacity
              style={{ width: "100%", height: "65%" }}
              onPress={this.closeModal}
            />
            <View
              style={{
                backgroundColor: colors.white,
                height: "35%",
                width: "100%",
                borderTopRightRadius: 2,
                borderTopLeftRadius: 2,
              }}
            >
              <View
                style={{
                  height: "25%",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    width: "30%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    onPress={this.closeModal}
                    style={{
                      fontSize: 20,
                      fontFamily: "oS-sB",
                      color: colors.r1,
                    }}
                  >
                    Cancel
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    onPress={this.clientHandlerIosRequest.bind(
                      this,
                      this.state.clientJ
                    )}
                    style={{
                      fontSize: 20,
                      fontFamily: "oS-sB",
                      color: colors.blue,
                    }}
                  >
                    Okay
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: "75%",
                  width: "100%",
                  justifyContent: "flex-end",
                  borderTopColor: colors.greyStroke,
                  borderTopWidth: 2,
                  borderTopRightRadius: 2,
                  borderTopLeftRadius: 2,
                  overflow: "hidden",
                }}
              >
                {this.state.clients.length !== 0 ? (
                  <Picker
                    style={{
                      height: "100%",
                      width: "100%",
                    }}
                    onValueChange={this.clientHandlerIosName}
                    selectedValue={this.state.client}
                    itemStyle={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {this.state.clients.map((item) => (
                      <Picker.Item
                        key={item.clientCode}
                        label={item.clientCode}
                        value={JSON.stringify(item)}
                      />
                    ))}
                  </Picker>
                ) : (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator size={"small"} color={colors.primary} />
                    <View>
                      <Text style={{ fontFamily: "oS", color: colors.primary }}>
                        Waiting
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  clients: state.portfolio.clients,
  brokers: state.portfolio.brokers,
  userName: state.auth.userName,
});

const mapDispatchToProps = {
  fetchClients,
  storeClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

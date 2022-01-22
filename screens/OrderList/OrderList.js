import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../colors";
import OrderTile from "../../Components/OrderList/OrderTile";
import requestBody from "../../Components/RequestBody/RequestFunction";
import { fetchClients } from "../../store/actions/Portfolio";
const { height, width } = Dimensions.get("window");
const tileHeight = height * 0.1;
const orderTypes = [
  { id: "ALL", value: "all" },
  { id: "NEW", value: "NEW" },
  { id: "P.FILLED", value: "P.FILLED" },
  { id: "FILLED", value: "FILLED" },
  { id: "CANCELED", value: "CANCELED" },
  { id: "AMENDED", value: "AMENDED" },
  { id: "QUEUED", value: "QUEUED" },
  { id: "Q.AMEND", value: "Q.AMEND" },
  { id: "Q.CANCEL", value: "Q.CANCEL" },
  { id: "EXPIRED", value: "EXPIRED" },
  { id: "REJECTED", value: "REJECTED" },
  { id: "PENDINGF", value: "PENDINGF" },
];
const uRLencode = (clientCode) => {
  const arr = clientCode.split("/");
  return arr.join("%2F");
};

class OrderList extends Component {
  _isMounted = false;

  state = {
    clients: [],
    clientCode: "",
    client: "",
    clientJ: {},
    clientVisible: false,
    orderType: orderTypes[0].value,
    orderVisible: false,
    orderName: "",
    order: "",
    orderJ: {},
    blotterData: [],
  };

  clientHandler = (clientCode) => {
    // if (Object.keys(item).length !== 0) {
    // const clientAcc = uRLencode(item.clientCode);
    // const body = `order?action=getBlotterData&format=json&exchange=CSE&clientAcc=${clientAcc}&ordStatus=${this.state.orderType}&ordType=all`;
    // try {
    //   const response = await requestBody(
    //     "GET",
    //     this.props.route.params.brokerUrl,
    //     body,
    //     "",
    //     {}
    //   );
    //   console.log(response);
    this.setState({
      clientCode: clientCode,
      // clientVisible: false,
    });
    // } catch (e) {
    //   console.log(e);
    // }
    // } else {
    //   this.setState({
    //     clientVisible: false,
    //   });
  };

  requestHandler = async (clientCode, orderType) => {
    this._isMounted = true;
    const clientAcc = uRLencode(clientCode);
    const body = `order?action=getBlotterData&format=json&exchange=CSE&clientAcc=${clientAcc}&ordStatus=${orderType}&ordType=all`;
    try {
      const response = await requestBody(
        "GET",
        this.props.route.params.brokerUrl,
        body,
        "",
        {}
      );
      if (response.status === 200) {
        if (this._isMounted) {
          this.setState({
            blotterData: response.data.data.blotterdata,
          });
        }
      } else {
        //todo:
      }
    } catch (e) {
      console.log(e);
    }
  };

  modalOpenHandler = () => {
    this.setState({
      clientVisible: true,
    });
  };

  modalOrderOpenHandler = () => {
    this.setState({
      orderVisible: true,
    });
  };

  modalCloseHandler = () => {
    this.setState({
      clientVisible: false,
    });
  };

  modalOrderCloseHandler = () => {
    this.setState({
      orderVisible: false,
    });
  };

  clientHandlerIosName = (item) => {
    const clientJ = JSON.parse(item);
    this.setState({
      client: item,
      clientJ: clientJ,
    });
  };

  clientHandlerIosRequest = (clientCode) => {
    this.setState({
      clientCode: clientCode,
      clientVisible: false,
    });
  };

  orderTypeHandler = (item) => {
    this.setState({
      orderType: item.value,
      order: item,
    });
  };

  orderHandlerIosName = (item) => {
    const orderJ = JSON.parse(item);
    this.setState({
      orderJ: orderJ,
      order: item,
    });
  };

  orderHandlerIosRequest = (order) => {
    this.setState({
      orderName: order.id,
      orderType: order.value,
      orderVisible: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.clients.status === 200) {
      if (prevProps.clients.data !== this.props.clients.data) {
        if (this.props.clients.data.length !== 0) {
          this.clientHandler("ALL");
          this.clientHandlerIosRequest("ALL");
        }
        this.setState({
          clients: [...[{ clientCode: "ALL" }], ...this.props.clients.data],
        });
      }
    } else {
      //todo: error needs to be show iin UI
    }
    if (
      prevState.clientCode !== this.state.clientCode ||
      prevState.orderType !== this.state.orderType
    ) {
      this.requestHandler(this.state.clientCode, this.state.orderType);
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      // this.props.navigation.jumpTo("OrderListD", {
      //   focused: true,
      //   dName: "OrderListD",
      // });
      this.props.fetchClients(
        this.props.route.params.brokerUrl,
        this.props.userName
      );
      this.orderHandlerIosRequest(orderTypes[0]);
      this.orderTypeHandler(orderTypes[0]);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderItem = (item) => {
    return <OrderTile height={tileHeight} item={item.item} />;
  };

  HeaderComponent = () => {
    return (
      <View
        style={{
          height: tileHeight,
          width: "100%",
          flexDirection: "row",
        }}
      >
        <LinearGradient
          style={{
            paddingHorizontal: "5%",
            width: "100%",
            height: "100%",
            flexDirection: "row",
            borderBottomColor: colors.greyStroke,
            borderBottomWidth: 2,
          }}
          colors={["#FFFFFF", "#F9FAFA", "#F1F2F4"]}
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
                <Text style={styles.securityTitle}>Symbol</Text>
              </View>
              <View style={{ height: "50%", width: "100%" }}>
                <Text style={styles.subTitle}>Side</Text>
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
                <Text style={styles.title}>Qty</Text>
              </View>
              <View
                style={{ height: "50%", width: "100%", alignItems: "flex-end" }}
              >
                <Text style={styles.subTitle}>Price</Text>
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
              <Text style={styles.title}>Status</Text>
            </View>
            <View
              style={{ width: "100%", height: "50%", alignItems: "flex-end" }}
            >
              <Text style={styles.subTitle}>TIF</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: "10%",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomColor: colors.greyStroke,
            borderBottomWidth: 1,
            backgroundColor: colors.white,
            paddingHorizontal: "5%",
          }}
        >
          <View
            style={{
              height: "80%",
              width: "40%",
              borderColor: colors.greyStroke,
              borderWidth: 2,
            }}
          >
            {Platform.OS === "android" ? (
              <View style={{}}>
                {this.state.clients.length !== 0 && (
                  <Picker
                    style={{ width: "100%", height: "100%" }}
                    itemStyle={{
                      justifyContent: "center",
                      height: "100%",
                      width: "100%",
                    }}
                    onValueChange={this.clientHandler}
                    selectedValue={this.state.clientCode}
                  >
                    {this.state.clients.map((item) => {
                      return (
                        <Picker.Item
                          label={item.clientCode}
                          value={item.clientCode}
                          key={item.clientCode}
                        />
                      );
                    })}
                  </Picker>
                )}
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    paddingLeft: "2%",
                  }}
                  onPress={this.modalOpenHandler}
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
                      style={{ fontSize: 16, fontFamily: "iT-sB" }}
                    >
                      {this.state.clientCode}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View
            style={{
              height: "80%",
              width: "45%",
              borderColor: colors.greyStroke,
              borderWidth: 2,
            }}
          >
            {Platform.OS === "android" ? (
              <View style={{}}>
                <Picker
                  style={{ height: "100%", width: "100%" }}
                  onValueChange={this.orderTypeHandler}
                  selectedValue={this.state.order}
                  itemStyle={{
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {orderTypes.map((item) => (
                    <Picker.Item
                      key={item.id}
                      label={item.id}
                      value={JSON.stringify(item)}
                    />
                  ))}
                </Picker>
              </View>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  onPress={this.modalOrderOpenHandler}
                >
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      paddingLeft: "1%",
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{ fontSize: 16, fontFamily: "iT-sB" }}
                    >
                      {this.state.orderName}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {this.state.blotterData.length !== 0 && (
            <FlatList
              data={this.state.blotterData}
              keyExtractor={(item) => item.exchangeorderid}
              ListHeaderComponent={this.HeaderComponent}
              renderItem={this.renderItem}
              contentContainerStyle={{
                backgroundColor: colors.white,
              }}
            />
          )}
        </View>
        <Modal visible={this.state.clientVisible} transparent={true}>
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 53, 0.5)" }}>
            <View style={{ height: "65%", width: "100%" }}>
              <TouchableOpacity
                style={{ height: "100%", width: "100%" }}
                onPress={this.modalCloseHandler}
              />
            </View>
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
                    onPress={this.modalCloseHandler}
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
                      this.state.clientJ.clientCode
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
                    onValueChange={this.clientHandlerIosName}
                    selectedValue={this.state.client}
                    itemStyle={{
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {this.state.clients.map((item) => (
                      <Picker.Item
                        value={JSON.stringify(item)}
                        label={item.clientCode}
                        key={item}
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
        <Modal visible={this.state.orderVisible} transparent={true}>
          <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 53, 0.5)" }}>
            <View style={{ height: "65%", width: "100%" }}>
              <TouchableOpacity
                style={{ height: "100%", width: "100%" }}
                onPress={this.modalOrderCloseHandler}
              />
            </View>
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
                    onPress={this.modalOrderCloseHandler}
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
                    onPress={this.orderHandlerIosRequest.bind(
                      this,
                      this.state.orderJ
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
                <Picker
                  onValueChange={this.orderHandlerIosName}
                  selectedValue={this.state.order}
                  itemStyle={{
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {orderTypes.map((item) => (
                    <Picker.Item
                      value={JSON.stringify(item)}
                      label={item.id}
                      key={item.id}
                    />
                  ))}
                </Picker>
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
  userName: state.auth.userName,
});

const mapDispatchToProps = {
  fetchClients,
};

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 15,
    fontFamily: "iT",
    color: colors.greyTitle,
  },
  title: {
    fontSize: 15,
    fontFamily: "iT-B",
    color: colors.greyTitle,
  },
  securityTitle: {
    fontSize: 15,
    fontFamily: "oS-B",
    color: colors.greyTitle,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);

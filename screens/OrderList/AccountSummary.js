import React, { Component } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../colors";
import { fetchClients } from "../../store/actions/Portfolio";
import { Picker } from "@react-native-picker/picker";
import requestBody from "../../Components/RequestBody/RequestFunction";
import addCommas from "../../Components/RequestBody/AddCommas";

const uRLencode = (clientCode) => {
  const arr = clientCode.split("/");
  return arr.join("%2F");
};

const getDate = () => {
  const date = new Date();
  return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
};

class AccountSummary extends Component {
  _isMounted = false;

  state = {
    clients: [],
    clientCode: "",
    clientVisible: false,
    client: {},
    clientJ: {},
    totalPortfolioCost: "-",
    totalPortfolioMarketValue: "-",
    totalGainLoss: "",
    cashBalance: "-",
    buyingPower: "-",
    totalPendingBuyOrderValue: "-",
    exposurePercentage: "-",
    marginAmount: "-",
    marginAmountD: "-",
    cashBlock: "-",
    marginBlock: "-",
  };

  clientHandlerIosName = (item) => {
    const clientJ = JSON.parse(item);
    this.setState({
      client: item,
      clientJ: clientJ,
    });
  };

  modalOpenHandler = () => {
    this.setState({
      clientVisible: true,
    });
  };

  modalCloseHandler = () => {
    this.setState({
      clientVisible: false,
    });
  };

  clientHandlerIosRequest = async (client) => {
    this._isMounted = true;
    if (Object.keys(client).length !== 0) {
      const cCode = uRLencode(client.clientCode);
      const date = getDate();
      const body = `client?action=getClientAccountSummary&format=json&exchange=CSE&account=${cCode}&broker=NDB&accStmtdate=${date}&clientAnctId=${client.clientacntid}`;
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
            clientCode: client.clientCode,
            clientVisible: false,
            totalPortfolioCost: addCommas(
              parseFloat(
                response.data.data.clientSummary.totalPortfolioCost
              ).toFixed(2)
            ),
            totalPortfolioMarketValue: addCommas(
              parseFloat(
                response.data.data.clientSummary.totalPortfolioMarketValue
              ).toFixed(2)
            ),
            totalGainLoss: response.data.data.clientSummary.totalGainLoss,
            cashBalance: response.data.data.clientSummary.cashBalance,
            buyingPower: response.data.data.clientSummary.buyingPower,
            totalPendingBuyOrderValue: parseFloat(
              response.data.data.clientSummary.totalPendingBuyOrderValue
            ).toFixed(2),
            exposurePercentage:
              response.data.data.clientSummary.exposurePercentage,
            marginAmount: response.data.data.clientSummary.marginAmount,
            marginAmountD: response.data.data.clientSummary.marginAmount,
            cashBlock: response.data.data.clientSummary.cashBlock,
            marginBlock: parseFloat(
              response.data.data.clientSummary.marginBlock
            ).toFixed(2),
          });
        }
      } else {
        //todo:
      }
    } else {
      this.setState({
        clientVisible: false,
      });
    }
  };

  clientHandler = (item) => {
    // const clientJ = JSON.parse(item);
    this.clientHandlerIosRequest(item);
    this.setState({ clientCode: item.clientCode });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.clients.status === 200) {
      if (prevProps.clients.data !== this.props.clients.data) {
        if (this.props.clients.data.length !== 0) {
          this.clientHandler(this.props.clients.data[0]);
        }
        this.setState({
          clients: this.props.clients.data,
        });
      }
    } else {
      //todo:
    }
    if (prevState.clientCode !== this.state.clientCode) {
      console.log(this.state.clientCode);
    }
  }

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      // this.props.navigation.jumpTo("AccountSummaryD", {
      //   focused: true,
      //   dName: "AccountSummaryD",
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
    let totGL = "";
    if (this.state.totalGainLoss !== "") {
      totGL = parseFloat(this.state.totalGainLoss).toFixed(2);
    }
    const cashBL = parseFloat(this.state.cashBalance);
    const buyP = parseFloat(this.state.buyingPower);
    let gLColor = colors.greyTitle;
    if (totGL < 0) {
      gLColor = colors.r1;
    } else if (totGL > 0) {
      gLColor = colors.g1;
    }
    let cBColor = colors.greyTitle;
    if (cashBL < 0) {
      cBColor = colors.r1;
    } else if (cashBL > 0) {
      cBColor = colors.g1;
    }
    let bPColor = colors.greyTitle;
    if (buyP === 0) {
      bPColor = colors.r1;
    } else if (buyP > 0) {
      bPColor = colors.g1;
    }

    if (this.state.totalPortfolioCost === "-") {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.white,
          }}
        >
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: "10%",
            width: "100%",
            justifyContent: "center",
            paddingHorizontal: "5%",
            borderBottomWidth: 1,
            borderBottomColor: colors.greyStroke,
            backgroundColor: colors.white,
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
              <View
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Picker
                  style={{
                    fontSize: 16,
                    fontFamily: "iT-sB",
                    height: "100%",
                    width: "100%",
                  }}
                  selectedValue={this.state.clientCode}
                  onValueChange={this.clientHandler}
                  itemStyle={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  {this.state.clients.map((item) => (
                    <Picker.Item
                      value={item}
                      label={item.clientCode}
                      key={item}
                    />
                  ))}
                </Picker>
              </View>
            ) : (
              <View style={{ width: "100%", height: "100%" }}>
                {this.state.clients.length !== 0 ? (
                  <TouchableOpacity
                    style={{ width: "100%", height: "100%" }}
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
                        style={{ fontFamily: "iT-sB", fontSize: 16 }}
                      >
                        {this.state.clientCode}
                      </Text>
                    </View>
                  </TouchableOpacity>
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
            )}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "90%",
            paddingHorizontal: "5%",
            backgroundColor: colors.white,
          }}
        >
          <View style={{ width: "100%", height: "9%", flexDirection: "row" }}>
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Total Cost Of The Portfolio
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.totalPortfolioCost}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", height: "9%", flexDirection: "row" }}>
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Total Market Value Of The Portfolio
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.totalPortfolioMarketValue}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", height: "9%", flexDirection: "row" }}>
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Total Gain/Loss
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text
                numberOfLines={1}
                style={{ ...styles.valueStyle, ...{ color: gLColor } }}
              >
                {totGL !== "" ? addCommas(totGL) : "-"}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "9%",
              flexDirection: "row",
              borderTopColor: colors.greyStroke,
              borderTopWidth: 1,
            }}
          >
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Cash Balance
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text
                numberOfLines={1}
                style={{ ...styles.valueStyle, ...{ color: cBColor } }}
              >
                {this.state.cashBalance}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "9%",
              flexDirection: "row",
              borderBottomColor: colors.greyStroke,
              borderBottomWidth: 1,
            }}
          >
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Buying Power
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text
                numberOfLines={1}
                style={{ ...styles.valueStyle, ...{ color: bPColor } }}
              >
                {addCommas(this.state.buyingPower)}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", height: "9%", flexDirection: "row" }}>
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Total Pending Buy Order Value
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.totalPendingBuyOrderValue}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", height: "9%", flexDirection: "row" }}>
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Exposure Percentage
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.exposurePercentage}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "9%",
              flexDirection: "row",
              borderTopWidth: 1,
              borderTopColor: colors.greyStroke,
            }}
          >
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Exposure Margin Amount-Equity
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.marginAmount}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: "9%",
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: colors.greyStroke,
            }}
          >
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Exposure Margin Amount-Debt
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.marginAmountD}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", height: "9%", flexDirection: "row" }}>
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Cash Block Amount
              </Text>
            </View>

            <View
              style={{ width: "37%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.cashBlock}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", height: "9%", flexDirection: "row" }}>
            <View
              style={{ width: "63%", height: "100%", justifyContent: "center" }}
            >
              <Text numberOfLines={1} style={styles.title}>
                Margin Block Amount
              </Text>
            </View>

            <View
              style={{
                width: "37%",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Text numberOfLines={1} style={styles.valueStyle}>
                {this.state.marginBlock}
              </Text>
            </View>
          </View>
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
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "oS",
    fontSize: 14,
    color: colors.greyTitle,
  },
  valueStyle: { fontFamily: "iT-B", fontSize: 14, textAlign: "right" },
});

const mapStateToProps = (state) => ({
  clients: state.portfolio.clients,
});

const mapDispatchToProps = {
  fetchClients,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountSummary);

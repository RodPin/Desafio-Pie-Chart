import React, { Component } from "react";
import { View, TouchableOpacity, Dimensions, Text } from "react-native";
import { Icon } from "react-native-elements";
import { PieChart } from "react-native-svg-charts";
import { Icon2 } from "react-native-vector-icons/MaterialCommunityIcons";
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const BLUE = "#0066ff";
const BACKGROUND = "#cce0ff";
const TO_PAY_COLOR = "#ffb3b3";
const AVAILABLE_COLOR = BLUE;
const SPENT_COLOR = "red";
const COLORS = [SPENT_COLOR, TO_PAY_COLOR, AVAILABLE_COLOR];
const MAX = 1000;
const SmallCircle = ({ color }) => (
  <View
    style={{
      height: 17,
      width: 17,
      backgroundColor: color,
      borderRadius: 17
    }}
  />
);
const Board = ({ color, label, amount }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 20,
        height: 40,
        alignItems: "center",
        width: WIDTH * 0.76,
        marginBottom: 10,
        paddingLeft: 20
      }}
    >
      <SmallCircle color={color} />
      <Text style={{ fontSize: 15, marginLeft: 15 }}>{label}</Text>
      <Text
        style={{
          fontSize: 19,
          color: color,
          left: 190,
          position: "absolute"
        }}
      >
        R$: {amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
      </Text>
    </View>
  );
};
const Pie = ({ data }) => {
  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: COLORS[index]
      },
      key: `pie-${index}`
    }));

  return <PieChart style={{ height: 200 }} data={pieData} />;
};
class BottomNavigator extends Component {
  state = { selectedTab: 0, data: [50, 10, 40] };
  render() {
    const { selectedTab, data } = this.state;
    return (
      // PIE CHART
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: BACKGROUND
        }}
      >
        <View
          style={{
            justifyContent: "center",
            marginTop: HEIGHT * 0.15,
            marginBottom: HEIGHT * 0.05
          }}
        >
          <Pie data={data} />
          <View style={{ position: "absolute", alignSelf: "center" }}>
            <Text
              style={{ fontSize: 17, color: "#999999", textAlign: "center" }}
            >
              Saldo
            </Text>
            <Text style={{ fontSize: 20, textAlign: "center" }}>
              {this.state.data[2]
                .toFixed(2)
                .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
            </Text>
          </View>
        </View>

        {/* BOARDS */}
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Board color={COLORS[0]} label={"GASTOU"} amount={data[0]} />
          <Board color={COLORS[1]} label={"A PAGAR"} amount={data[1]} />
          <Board color={COLORS[2]} label={"DISPONIVEL"} amount={data[2]} />
        </View>

        {/* BOTTOM NAVIGATION BAR */}

        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            backgroundColor: BACKGROUND,
            width: 70,
            height: 70,
            borderRadius: 35,
            bottom: 25,
            zIndex: 10
          }}
        >
          <TouchableOpacity
            onPress={() =>
              this.setState({
                data: [
                  Math.floor(Math.random() * MAX),
                  Math.floor(Math.random() * MAX),
                  Math.floor(Math.random() * MAX)
                ]
              })
            }
          >
            <Icon
              name="add"
              type="material"
              color={BLUE}
              containerStyle={{ alignSelf: "center" }}
              reverse
              size={28}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            backgroundColor: "white",
            bottom: 0,
            zIndex: 1,
            width: "100%",
            height: 60,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            paddingVertical: 10
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedTab: 0 });
              }}
              style={{ marginLeft: 20 }}
            >
              <Icon
                name="home"
                type="feather"
                color={selectedTab == 0 ? BLUE : "grey"}
                size={35}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedTab: 1 });
              }}
              style={{ marginLeft: 30 }}
            >
              <Icon
                name="chart-line-variant"
                type="material-community"
                color={selectedTab == 1 ? BLUE : "grey"}
                size={35}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedTab: 2 });
              }}
              style={{ marginRight: 30 }}
            >
              <Icon
                name="clock"
                type="feather"
                color={selectedTab == 2 ? BLUE : "grey"}
                size={35}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ selectedTab: 3 });
              }}
              style={{ marginRight: 20 }}
            >
              <Icon
                name="settings"
                type="material"
                color={selectedTab == 3 ? BLUE : "grey"}
                size={35}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default BottomNavigator;

import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

const WIDTH = Dimensions.get("window").width;

export default function SelectDepartureCard() {
  return (
    <View style={styles.Cardcontainer}>
      <View style={styles.cardTop}>
        <View style={styles.ticketMainContainer}>
          <Image
            style={styles.ticket}
            source={require("../assets/icons/ticket.png")}
          />

          <View>
            <Text style={styles.businessText}>Business</Text>
            <Text style={styles.stationsText}>RYD - DMM</Text>
          </View>
        </View>

        <View style={styles.seatsPriceContainer}>
          <Text style={styles.seatText}>12 seat left</Text>
          <Text style={styles.seatPrice}>170.00 SAR</Text>
        </View>
      </View>

      <View style={styles.seprator} />

      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.fromtext}>From</Text>

          <View style={styles.fromTimeTextContainer}>
            <Image
              style={styles.clock}
              source={require("../assets/icons/clock.png")}
            />

            <Text style={styles.fromTimeText}>06:45am</Text>
          </View>
        </View>

        <View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color="#FA7C56"
          />
          <Text style={styles.totalTime}>2h 35m</Text>
        </View>

        <View>
          <Text style={styles.fromtext}>To</Text>

          <View style={styles.fromTimeTextContainer}>
            <Image
              style={styles.clock}
              source={require("../assets/icons/clock.png")}
            />

            <Text style={styles.fromTimeText}>11:45am</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Cardcontainer: {
    width: WIDTH - 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: RFValue(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  ticket: {
    width: 43,
    height: 43,
    marginRight: RFValue(14),
  },

  businessText: {
    fontSize: RFValue(12),
    color: "#858D8C",
    fontFamily: "PoppinsRegular",
  },
  stationsText: {
    fontSize: RFValue(14),
    fontFamily: "PoppinsRegular",
    color: "#252828",
  },
  ticketMainContainer: {
    flexDirection: "row",
  },
  seatText: {
    fontSize: RFValue(12),
    fontFamily: "PoppinsRegular",
    color: "#FA7C56",
  },
  seatPrice: {
    color: "#44C07C",
    fontSize: RFValue(17),
    fontFamily: "PoppinsRegular",
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  seprator: {
    width: WIDTH - 50,
    borderWidth: 0.8,
    borderRadius: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
    alignSelf: "center",
    marginTop: RFValue(30),
  },
  fromtext: {
    color: "#858D8C",
    fontSize: RFValue(12),
    fontFamily: "PoppinsRegular",
  },

  clock: {
    width: 16,
    height: 16,
  },

  fromTimeText: {
    color: "#252828",
    fontSize: RFValue(14),
    fontFamily: "PoppinsRegular",
    marginLeft: 8,
    marginTop: 2,
  },
  fromTimeTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowRight: {},
  totalTime: {
    fontSize: RFValue(11),
    color: "#FA7C56",
    fontFamily: "PoppinsRegular",
  },
  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFValue(30),
  },
});

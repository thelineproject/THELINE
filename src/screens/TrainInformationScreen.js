import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function TrainInformationScreen({ navigation, route }) {
  const { booking } = route.params;
  // console.log(booking, 'BOOKINGS_')
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.arrowback}
            source={require("../assets/icons/arrow-back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.titleScreen}>Train Information</Text>

        <View style={styles.trainInformationMainContainer}>
          <View style={styles.trainInfoTopContainer}>
            <View>
              <Text style={styles.stationName}>{booking.departureTrain.arrivalStationCode}</Text>
              <Text style={styles.trainTime}>{booking.departureTrain.arrivaltime}</Text>
            </View>

            <View>
              <Image
                style={styles.trainIcon}
                source={require("../assets/icons/train.png")}
              />
              <Text style={styles.trainarriveTime}>{booking.departureTrain.duration}</Text>
              <View style={styles.seprator} />
            </View>

            <View>
              <Text style={styles.stationName}>{booking.departureTrain.departureStationCode}</Text>
              <Text style={{ ...styles.trainTime, textAlign: "right" }}>
                {booking.departureTrain.departuretime}
              </Text>
            </View>
          </View>

          <Text style={styles.date}>{booking.departureDate}</Text>

          <View style={styles.line} />

          {
            booking.userInfo.lenght != 0 && booking.userInfo.map((key, index) => {
              return (
                <View key={index}>
                  <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.passengerText}>Passenger{' ' + Number(index + 1)}</Text>
                    <Text style={styles.passengerName}>{key.name}</Text>
                  </View>
                  <View style={styles.seatClassgateContainer}>
                    <View>
                      <Text style={styles.passengerText}>Seat</Text>
                      {/* <Text style={styles.passengerName}>{key.id}</Text> */}
                      <Text style={styles.passengerName}>{Math.floor(Math.random() * (150 - 1) + 1)}</Text>
                    </View>
                    <View>
                      <Text style={styles.passengerText}>Class</Text>
                      <Text style={styles.passengerName}>{booking.classs}</Text>
                    </View>
                    <View>
                      <Text style={styles.passengerText}>Gate</Text>
                      <Text style={styles.passengerName}>{Math.floor(Math.random() * (12 - 1) + 1)}</Text>
                    </View>
                  </View>
                </View>
              )
            })
          }

          <View style={styles.dottedLine} />

          <TouchableOpacity onPress={() => navigation.navigate('RouteScreen', { booking })}>
            <Text style={styles.manageBooking}>Manage booking</Text>
          </TouchableOpacity>

          <Image
            source={require("../assets/icons/code.png")}
            style={styles.qrcode}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleScreen: {
    fontSize: RFValue(16),
    fontFamily: "PoppinsMedium",
    color: "#262630",
    alignSelf: "center",
  },
  arrowback: {
    width: 30,
    height: 30,
    marginTop: RFValue(30),
    marginHorizontal: RFValue(20),
  },

  trainInformationMainContainer: {
    paddingTop: 20,
    width: widthPercentageToDP("89%"),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  trainInfoTopContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  stationName: {
    //  fontFamily:'PoppinsRegular',
    fontSize: RFValue(30),
    color: "#10A5F9",
  },

  trainTime: {
    color: "#BDBDC2",
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(12),
  },

  trainIcon: {
    width: 19,
    height: 32,
    alignSelf: "center",
  },
  trainarriveTime: {
    fontSize: RFValue(11),
    fontFamily: "PoppinsRegular",
    color: "#262630",
    textAlign: "center",
    marginTop: 6,
  },
  seprator: {
    width: 150,
    borderWidth: 0.7,
    borderRadius: 2,
    borderStyle: "dashed",
    borderColor: "#10A5F9",
    opacity: 0.2,
  },

  line: {
    width: widthPercentageToDP("80%"),
    height: 1,
    backgroundColor: "#BDBDC2",
    alignSelf: "center",
    opacity: 0.3,
    marginTop: 28,
  },
  date: {
    color: "#262630",
    fontSize: RFValue(12),
    fontFamily: "PoppinsRegular",
    textAlign: "right",
    marginRight: 12,
    marginTop: 5,
  },

  passengerText: {
    color: "#BDBDC2",
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(12),

    marginTop: RFValue(20),
  },

  passengerName: {
    color: "#262630",
    fontFamily: "PoppinsMedium",
    fontSize: RFValue(14),
  },

  seatClassgateContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  dottedLine: {
    width: widthPercentageToDP("80%"),
    borderWidth: 0.7,
    borderRadius: 2,
    borderStyle: "dashed",
    borderColor: "#BDBDC2",
    alignSelf: "center",
    opacity: 0.3,
    marginTop: 36,
  },

  manageBooking: {
    fontSize: RFValue(12),
    fontFamily: "PoppinsRegular",
    color: "#10A5F9",
    textAlign: "center",
    marginTop: 25,
  },
  qrcode: {
    width: widthPercentageToDP("79%"),
    height: 75,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 80,
  },
});

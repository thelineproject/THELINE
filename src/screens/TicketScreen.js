import {
  Dimensions, Image, Platform, SafeAreaView, ScrollView, StatusBar,
  StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get("window").width;
import { fetchBooking } from '../redux/actions/actions';

export default function TicketScreen({ navigation }) {
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => state.reducer.currentUser);
  let booking = useSelector((state) => state.reducer.booking);

  useEffect(() => {
    dispatch(fetchBooking(currentUser.docId))
  }, [])

  const viewBooking = (key) => {
    navigation.navigate('TrainInformationScreen', { booking: key })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View style={styles.yourTicketContainer}>
          <View style={styles.yourTicketInputContainer}>
            <Text style={styles.yourTicketText}>Your Ticket</Text>
          </View>
        </View>

        {
          booking.map((key, index) => {
            let departure = key.departureTrain
            // console.log(departure, 'INSIDE_MAP')
            return (
              <View key={index}>
                <TouchableOpacity
                  // onPress={() => navigation.navigate('TrainInformationScreen')}
                  onPress={() => viewBooking(key)}
                  activeOpacity={0.5}
                  style={styles.ticketContentContainer}
                >
                  <View style={styles.ticketContentContainerTop}>
                    <View style={styles.ticketContentRight}>
                      <Text style={styles.cityName}>{departure.arrivalStationCode}</Text>
                      <Image
                        style={{ width: 12, height: 12 }}
                        source={require("../assets/icons/blue.png")}
                      />
                      <Image
                        style={{ width: 23, height: 1 }}
                        source={require("../assets/icons/dash.png")}
                      />
                    </View>
                    <View style={styles.ticketContentRight}>
                      <Image
                        style={{ width: 23, height: 1, marginRight: 8 }}
                        source={require("../assets/icons/dash.png")}
                      />
                      <Image
                        style={{ width: 12, height: 12, marginRight: 8 }}
                        source={require("../assets/icons/green.png")}
                      />
                      <Text style={styles.cityName}>{departure.departureStationCode}</Text>
                    </View>
                  </View>
                  <Text style={styles.totalTime}>{departure.duration}</Text>
                  <View style={styles.timeRangeContainer}>
                    <Text style={styles.timeText}>{departure.arrivaltime}</Text>
                    <Text style={styles.timeText}>{departure.departuretime}</Text>
                  </View>
                  <View style={styles.timeRangeContainer}>
                    <Text style={styles.dateText}>{key.departureDate}</Text>
                    {/* <Text style={styles.dateText}>{key.departureDate}</Text> */}
                  </View>
                  <View style={styles.seprator} />
                  <Image
                    style={styles.barCode}
                    source={require("../assets/icons/code.png")}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    ...styles.seprator,
                    opacity: 1,
                    marginTop: 24,
                    width: WIDTH - 50,
                  }}
                />
                {/* <View style={{ ...styles.ticketContentContainer, marginTop: 24 }}>
                  <View style={styles.ticketContentContainerTop}>
                    <View style={styles.ticketContentRight}>
                      <Text style={styles.cityName}>{departure.arrivalStationCode}</Text>
                      <Image
                        style={{ width: 12, height: 12 }}
                        source={require("../assets/icons/blue.png")}
                      />
                      <Image
                        style={{ width: 23, height: 1 }}
                        source={require("../assets/icons/dash.png")}
                      />
                    </View>
                    <View style={styles.ticketContentRight}>
                      <Image
                        style={{ width: 23, height: 1, marginRight: 8 }}
                        source={require("../assets/icons/dash.png")}
                      />
                      <Image
                        style={{ width: 12, height: 12, marginRight: 8 }}
                        source={require("../assets/icons/green.png")}
                      />
                      <Text style={styles.cityName}>{departure.departureStationCode}</Text>
                    </View>
                  </View>
                  <Text style={styles.totalTime}>{departure.duration}</Text>
                  <View style={styles.timeRangeContainer}>
                    <Text style={styles.timeText}>{departure.arrivaltime}</Text>
                    <Text style={styles.timeText}>{departure.departuretime}</Text>
                  </View>
                  <View style={styles.timeRangeContainer}>
                    <Text style={styles.dateText}>{key.departureDate}</Text>
                  </View>
                  <View style={styles.seprator} />
                </View> */}
              </View>
            )
          })
        }

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  seprator: {
    width: WIDTH - 80,
    borderWidth: 0.7,
    borderColor: "#CCCCCC",
    borderRadius: 1,
    borderStyle: "dashed",
    alignSelf: "center",
    marginTop: 50,
    opacity: 0.3,
  },
  barCode: {
    width: WIDTH - 100,
    height: 75,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  yourTicketContainer: {
    width: WIDTH - 100,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignSelf: "center",
    marginTop: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignSelf: "center",
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  yourTicketInputContainer: {
    width: WIDTH - 110,
    height: 37,
    borderRadius: 12,
    backgroundColor: "#3F8395",
    justifyContent: "center",
    alignItems: "center",
  },

  yourTicketText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: "#fff",
  },

  ticketContentContainer: {
    alignSelf: "center",
    marginTop: 70,
    width: WIDTH - 40,
    paddingTop: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    borderRadius: 12,
  },

  cityName: {
    color: "#130F26",
    fontSize: RFValue(17),
    fontFamily: "PoppinsSemiBold",
    marginRight: 8,
  },

  ticketContentRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  ticketContentContainerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  totalTime: {
    alignSelf: "center",
    color: "#CCCCCC",
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
  timeText: {
    fontSize: RFValue(17),
    color: "#130F26",
    fontFamily: "PoppinsRegular",
  },
  timeRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  dateText: {
    color: "#CCCCCC",
    fontFamily: "PoppinsSemiBold",
    fontSize: RFValue(11),
    marginTop: 12,
  },
});

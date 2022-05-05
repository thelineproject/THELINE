import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Header from "../components/Header";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "../components/Button";
import { AntDesign } from '@expo/vector-icons';

const WIDTH = Dimensions.get("window").width;

export default function RouteScreen({ navigation, route }) {
  const { booking } = route.params;
  // console.log(booking, 'BOOKINGS_')

  const [show, setShow] = React.useState('none')
  const [show2, setShow2] = React.useState('none')

  const onPressFirst = () => {
    show === 'none' ? setShow('flex') : setShow('none')
  }

  const onPresssecond = () => {
    show2 === 'none' ? setShow2('flex') : setShow2('none')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Header title="Route" />

        <View style={styles.routeCardContainer}>

          {/* <View style={styles.cardHeader}>
            <Image
              style={styles.greenDot}
              source={require("../assets/icons/ogreen.png")}
            />
            <View style={styles.headerRight}>
              <Text style={styles.stationName}>London Bridge Station</Text>
              <Text style={styles.stationAddress}>
                Nun aliquam tortor accumsan 365 st
              </Text>
            </View>
          </View> */}

          {/* <View style={styles.seprator} /> */}

          <View style={{ ...styles.cardHeader, marginTop: RFValue(18) }}>
            <Image
              style={styles.locationDot}
              source={require("../assets/icons/olocation.png")}
            />

            <View style={styles.headerRight}>
              {/* <Text style={styles.stationName}>London Bridge Station</Text>
              <Text style={styles.stationAddress}>Nun aliquam tortor accumsan 365 st</Text> */}

              <Text style={styles.stationName}>{booking.departureTrain.arrivalTrain}</Text>
              <Text style={styles.stationAddress}>{booking.departureTrain.departureTrain}</Text>

            </View>
          </View>

          <View style={styles.routemainContainer}>
            <View style={styles.routeContainer}>
              <Image
                style={styles.line}
                source={require("../assets/icons/line1.png")}
              />

              <View>
                <Text style={styles.stationName}>{booking.departureTrain.arrivalTrain}</Text>
                <TouchableOpacity
                  onPress={() => onPressFirst()}
                  style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text
                    style={{
                      ...styles.stationAddress,
                      color: "#3F8395",
                      marginTop: 10,
                    }}
                  >
                    {/* Ride 5 Stop 2 Min */}
                    Ride {booking.stops.length - 2 + ' '} Stop
                  </Text>

                  <AntDesign style={{ marginLeft: 5, marginTop: 5 }} name="down" size={14} color="black" />
                </TouchableOpacity>

                <View style={{ display: show }}>
                  {
                    booking.stops.length != 0 && booking.stops.map((key, index) => {
                      return (
                        <>
                          {
                            (key === 'Railway' || key === 'an Naseem') ? (
                              <Text key={index} style={{ color: 'orange', fontFamily: 'PoppinsRegular' }}>* {' ' + key}</Text>
                            ) : null
                          }
                          {
                            (key === 'SABIC') ? (
                              <Text key={index} style={{ color: '#6a0dad', fontFamily: 'PoppinsRegular' }}>* {' ' + key}</Text>
                            ) : null
                          }
                          {
                            (key !== 'SABIC' && key !== 'Railway' && key !== 'an Naseem' && index != 0 && index != booking.stops.length - 1) ? (
                              <Text key={index} style={{ color: 'black', fontFamily: 'PoppinsRegular' }}>* {' ' + key}</Text>
                            ) : null
                          }
                        </>
                      )
                    })
                  }
                  {/* <Text style={{ color: '#000', fontFamily: 'PoppinsRegular' }}>* Rayad</Text>
                  <Text style={{ color: '#000', fontFamily: 'PoppinsRegular' }}>* Damam</Text> */}
                </View>

                <Text style={{ ...styles.stationName, marginTop: 10 }}>
                  {/* Tortor Accumsan */}
                  {booking.departureTrain.departureTrain}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: RFValue(35) }}>
              <Text style={styles.stationName}>{booking.departureTrain.duration}</Text>
              <Text
                style={{
                  ...styles.stationAddress,
                  color: "#20B9FC",
                  marginTop: 2,
                }}
              >
                On-Time
              </Text>
            </View>
          </View>

          <View style={styles.seprator} />

          {/* <View style={styles.routemainContainer}>
            <View style={styles.routeContainer}>
              <Image
                style={styles.line}
                source={require("../assets/icons/line2.png")}
              />

              <View>
                <Text style={styles.stationName}>Mauris Auctor</Text>
                <TouchableOpacity
                  onPress={() => onPresssecond()}
                  style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text
                    style={{
                      ...styles.stationAddress,
                      color: "#3F8395",
                      marginTop: 10,
                    }}
                  >
                    Ride 3 Stops 9 Min
                  </Text>

                  <AntDesign style={{ marginLeft: 5, marginTop: 5 }} name="down" size={14} color="black" />
                </TouchableOpacity>

                <View style={{ display: show2 }}>
                  <Text style={{ color: '#000', fontFamily: 'PoppinsRegular' }}>* Jeddah</Text>
                  <Text style={{ color: '#000', fontFamily: 'PoppinsRegular' }}>* Madina</Text>
                </View>

                <Text style={{ ...styles.stationName, marginTop: 10 }}>
                  Nullam sagittis mollis
                </Text>
              </View>
            </View>

            <View style={{ marginTop: RFValue(35) }}>
              <Text style={styles.stationName}>5.6 Min</Text>
              <Text
                style={{
                  ...styles.stationAddress,
                  color: "#20B9FC",
                  marginTop: 2,
                }}
              >
                On-Time
              </Text>
            </View>
          </View> */}
        </View>

        <View style={{ marginTop: 100 }}>
          <Button
            onpress={() => navigation.navigate("TicketScreen")}
            title="Manage Bookings"
          />
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  routeCardContainer: {
    width: WIDTH - 30,
    backgroundColor: "#fff",
    padding: 14,
    alignSelf: "center",
    borderRadius: 8,
    marginTop: RFValue(60),
  },
  greenDot: {
    width: 20,
    height: 20,
    marginRight: RFValue(18),
  },

  stationName: {
    color: "#1E2022",
    fontFamily: "PoppinsMedium",
    fontSize: RFValue(13),
  },
  stationAddress: {
    color: "#77838F",
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(13),
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  seprator: {
    width: WIDTH - 50,
    height: 2,
    backgroundColor: "#F4F4F4",
    alignSelf: "center",
    marginTop: RFValue(15),
  },

  locationDot: {
    width: 28,
    height: 28,
    marginRight: RFValue(18),
  },

  line: {
    width: 20,
    height: 92,
    marginRight: RFValue(22),
    marginLeft: RFValue(4),
  },
  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  routemainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: RFValue(14),
  },
});

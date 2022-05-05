import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMsg } from '../redux/actions/actions';
import Header from "../components/Header";
import Button from "../components/Button";
const WIDTH = Dimensions.get("window").width;

export default function SelectDepartureScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { data, slot, } = route.params;
  const [click, setClick] = useState("");
  const [departureDate, setdepartureDate] = useState(data.departureDate);
  const [selectedTrain, setselectedTrain] = useState(null);
  let isError = useSelector((state) => state.reducer.isError);

  const next = () => {
    if (selectedTrain === null) {
      dispatch(setErrorMsg('Please select train'))
    }
    else {
      if (data.returDate != '') {
        navigation.navigate("SelectReturnScreen", { departureDate, departureTrain: [selectedTrain], data })
      }
      else {
        navigation.navigate("PassengerInformationScreen", { departureDate, departureTrain: [selectedTrain], data, returnTrain: null, })
      }
    }
  }

  const renderItem = ({ item, index }) => {
    const OnClick = () => {
      setClick(index);
      setselectedTrain(item)
    };
    return (
      <TouchableOpacity
        onPress={() => OnClick()}
        style={{
          ...styles.Cardcontainer,
          borderWidth: index === click ? 1 : 0,
        }}
      >
        <View style={styles.cardTop}>
          <View style={styles.ticketMainContainer}>
            <Image
              style={styles.ticket}
              source={require("../assets/icons/ticket.png")}
            />
            <View>
              <Text style={styles.businessText}>{data.classs}</Text>
              <Text style={styles.stationsText}>{item.arrivalStationCode} - {item.departureStationCode}</Text>
            </View>
          </View>
          <View style={styles.seatsPriceContainer}>
            {/* <Text style={styles.seatText}>12 seat left</Text> */}
            <Text style={styles.seatPrice}>{item.price} SAR</Text>
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
              <Text style={styles.fromTimeText}>{item.arrivaltime}</Text>
            </View>
          </View>

          <View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="#FA7C56"
            />
            <Text style={styles.totalTime}>{item.duration}</Text>
          </View>

          <View>
            <Text style={styles.fromtext}>To</Text>
            <View style={styles.fromTimeTextContainer}>
              <Image
                style={styles.clock}
                source={require("../assets/icons/clock.png")}
              />
              <Text style={styles.fromTimeText}>{item.departuretime}</Text>
            </View>
          </View>

        </View>

      </TouchableOpacity>
    );
  };

  const FlatListHeader = () => {
    return (
      <View>
        <Header title="Select Departure" />
        <View>
          <CalendarStrip
            selectedDate={data.departureDate}
            onDateSelected={date => setdepartureDate(date.format('YYYY-MM-DD'))}
            scrollable
            calendarAnimation={{ type: "sequence", duration: 30 }}
            daySelectionAnimation={{
              type: "border",
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: "#3F8395",
            }}
            highlightDateNumberStyle={{ color: "#3F8395" }}
            highlightDateNameStyle={{ color: "#3F8395" }}
            style={{
              height: 100,
              width: widthPercentageToDP("90%"),
              alignSelf: "center",
              borderRadius: 4,
              marginTop: RFValue(30),
              marginBottom: 30,
            }}
            calendarColor={"#fff"}
            calendarHeaderStyle={{ color: "#3F8395", paddingTop: 10 }}
            dateNumberStyle={{
              color: "#252828",
              fontSize: RFValue(12),
              fontFamily: "PoppinsRegular",
            }}
            dateNameStyle={{
              color: "#858D8C",
              fontSize: RFValue(12),
              fontFamily: "PoppinsRegular",
            }}
            iconContainer={{ flex: 0.1 }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={slot}
          renderItem={renderItem}
          ListHeaderComponent={FlatListHeader}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
        }}
      >
        <Button
          onpress={() => next()}
          title={"Next"}
        />
        {
          isError !== '' &&
          <View
            style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', width: '90%', marginHorizontal: '5%', }}
          >
            <Text style={{ color: 'red', textAlign: 'center' }}>{isError}</Text>
          </View>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  Cardcontainer: {
    width: WIDTH - 20,
    padding: 10,
    borderColor: "#3F8395",

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

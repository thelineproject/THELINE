import React, { useState, useEffect } from "react";
import {
  Dimensions, Image, SafeAreaView, ScrollView, StyleSheet,
  Text, TouchableOpacity, View,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import SelectPicker from "react-native-form-select-picker";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { setErrorMsg } from '../redux/actions/actions';
// components
import LocationToDestination from "../components/LocationToDestination";
import DepartureReturnContainer from "../components/DepartureReturnContainer";
// JSON
let trainSlots = require('../TrainSlots/slots.json');
//Local Images and Icons
import Back from "../assets/icons/back.png";
import Button from "../components/Button";
const BackIocn = Back;
const WIDTH = Dimensions.get("window").width;

const Passenger = ["1 ADULT", "2 ADULT", "3 ADULT", "4 ADULT", "5 ADULT"];
const Class = ["BUSINESS", "ECONOMY"];


export default function TrainSearchScreen({ navigation }) {
  const dispatch = useDispatch();
  const [selectedlocation, setselectedlocation] = useState("");
  const [selectedDestination, setselectedDestination] = useState("");
  const [stops, setstops] = useState([]);
  const [passenger, setPassenger] = useState("1 ADULT");
  const [classs, setClass] = useState("BUSINESS");
  const [departureDate, setdepartureDate] = useState("");
  const [returDate, setreturDate] = useState("");
  let isError = useSelector((state) => state.reducer.isError);

  const search = () => {
    let data = {
      yourLocation: selectedlocation,
      destination: selectedDestination,
      // yourLocation: 'Dammam Railway Station',
      // destination: 'Buqayq Railway Station',
      stops: stops,
      departureDate: departureDate,
      returDate: returDate,
      passenger: passenger,
      classs: classs,
      seats: Math.floor(Math.random() * (12 - 1) + 1) + ' seat Left',
    }
    if (data.yourLocation === '') {
      dispatch(setErrorMsg('Please select your location'))
    }
    else if (data.destination === '') {
      dispatch(setErrorMsg('Please select destination'))
    }
    else if (data.departureDate === '') {
      dispatch(setErrorMsg('Please select departure date'))
    }
    // else if (data.returDate === '') {
    //   dispatch(setErrorMsg('Please select return date'))
    // }
    else if (data.passenger === '') {
      dispatch(setErrorMsg('Please select passenger'))
    }
    else if (data.classs === '') {
      dispatch(setErrorMsg('Please select class'))
    }
    else {
      const results = trainSlots.filter(element => { return element.arrivalTrain === data.yourLocation && element.departureTrain === data.destination && element.arrivaltime != 'N/A' && element.departuretime != 'N/A' });
      navigation.navigate("SelectDepartureScreen", { data: data, slot: results })
    }
    // const results = trainSlots.filter(element => { return element.arrivalTrain === data.yourLocation && element.departureTrain === data.destination });
    // navigation.navigate("SelectDepartureScreen", { data: data, slot: results })
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <SafeAreaView style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image style={styles.backIocn} source={BackIocn} />
          </TouchableOpacity>
          <Text style={styles.screenTitle}>Search for a trip..</Text>
        </View>

        <LocationToDestination selectedlocation={selectedlocation} setselectedlocation={setselectedlocation} selectedDestination={selectedDestination} setselectedDestination={setselectedDestination} setstops={setstops} />

        <DepartureReturnContainer departureDate={departureDate} setdepartureDate={setdepartureDate} returDate={returDate} setreturDate={setreturDate} />

        <View>
          <View style={styles.locationPickerContainer}>
            <Text style={styles.yourLocationText}>Passenger</Text>
            <View>
              <SelectPicker
                onSelectedStyle={{
                  fontFamily: "PoppinsRegular",
                  color: "#BABEC5",
                  fontSize: RFValue(16),
                }}
                placeholder="1 ADULT"
                placeholderStyle={styles.placeholder}
                style={styles.picker}
                onValueChange={(value) => {
                  setPassenger(value);
                }}
                selected={passenger}
              >
                {
                  Object.values(Passenger).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                  ))
                }
              </SelectPicker>
            </View>
          </View>

          <View style={styles.locationPickerContainer}>
            <Text style={styles.yourLocationText}>Class</Text>
            <View>
              <SelectPicker
                onSelectedStyle={{
                  fontFamily: "PoppinsRegular",
                  color: "#BABEC5",
                  fontSize: RFValue(16),
                }}
                placeholder="BUSINESS"
                placeholderStyle={styles.placeholder}
                style={styles.picker}
                onValueChange={(value) => {
                  setClass(value);
                }}
                selected={classs}
              >
                {Object.values(Class).map((val, index) => (
                  <SelectPicker.Item label={val} value={val} key={index} />
                ))}
              </SelectPicker>
            </View>
          </View>
        </View>

        <View
          style={{ marginTop: RFValue(40), marginBottom: 50 }}
        >
          <Button
            onpress={() => search()}
            title="Search"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  backIocn: {
    width: RFValue(18),
    height: RFValue(18),
    marginLeft: RFValue(20),
    marginTop: RFValue(40),
  },

  screenTitle: {
    color: "#201A1A",
    fontFamily: "PoppinsSemiBold",
    fontSize: RFValue(23),
    marginTop: RFValue(29),
    alignSelf: "center",
  },
  locationIcon: {
    width: RFValue(16),
    height: RFValue(16),
  },
  yourLocationText: {
    fontSize: RFValue(13),
    color: "#A8A8A8",
    fontFamily: "PoppinsRegular",
    marginLeft: RFValue(30),
  },
  yourLocationContainer: {
    flexDirection: "row",
    marginLeft: 20,
  },
  picker: {
    width: WIDTH - 45,
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",

    color: "#BABEC5",
  },

  placeholder: {
    color: "#BABEC5",
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(16),
  },

  locationPickerContainer: {
    marginTop: RFValue(25),
  },
});

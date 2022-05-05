import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import SelectPicker from "react-native-form-select-picker";
const WIDTH = Dimensions.get("window").width;
// Images
import locationIcon from "../assets/icons/oblack.png";
const LocationIcon = locationIcon;
import DestinationIcon from "../assets/icons/ogreen.png";
const destinationIcon = DestinationIcon;
import verticalLine from "../assets/icons/Line.png";
const line = verticalLine;

const Location = ["Dammam Railway Station", "Buqayq Railway Station", "Hofuf Railway Station", "Riyadh Rail Station Riyadh", "Majmaah Railway Station", "Qassim Railway Station", "Hail Railway Station"];
const LocationCopy = ["Dammam Railway Station", "Buqayq Railway Station", "Hofuf Railway Station", "Riyadh Rail Station Riyadh", "Railway", "an Naseem", "SABIC", "Riyadh SAR Station Riyadh", "Majmaah Railway Station", "Qassim Railway Station", "Hail Railway Station"];
let Destination = [];

export default function LocationToDestination({ selectedlocation, setselectedlocation, selectedDestination, setselectedDestination, setstops }) {
  const [firstDrp, setfirstDrp] = useState("");
  const [secondDrp, setsecondDrp] = useState("");

  useEffect(() => {
    func()
  }, [secondDrp])

  const func = () => {
    var firstDrpInd = LocationCopy.indexOf(firstDrp);
    var secondDrpInd = LocationCopy.indexOf(secondDrp);
    var makeStop = [];

    if (firstDrpInd > secondDrpInd) {
      if ((secondDrpInd === 3 || firstDrpInd === 7) && (firstDrpInd === 8 || firstDrpInd === 9 || firstDrpInd === 10)) {
        for (let index = 0; index < LocationCopy.length; index++) {
          const element = LocationCopy[index];
          if (index <= firstDrpInd && index >= 7) makeStop.unshift(element)
        }
      }
      else {
        for (let index = 0; index < LocationCopy.length; index++) {
          const element = LocationCopy[index];
          if (index <= firstDrpInd && index >= secondDrpInd) makeStop.unshift(element)
        }
      }
    }

    else {
      if ((firstDrpInd === 3 || firstDrpInd === 7) && (secondDrpInd === 8 || secondDrpInd === 9 || secondDrpInd === 10)) {
        makeStop = LocationCopy.slice(7, secondDrpInd + 1)
      }
      else {
        makeStop = LocationCopy.slice(firstDrpInd, secondDrpInd + 1)
      }
    }
    // console.log(firstDrpInd, secondDrpInd, "secondDrp", makeStop, "IndsecondDrpInd", firstDrp, secondDrp)
    // console.log(makeStop, "IndsecondDrpInd",)
    setstops(makeStop)
  }

  const deleteDestination = (val) => {
    let DestinationClone = [];
    console.log(val, 'val')
    for (let index = 0; index < Location.length; index++) {
      const element = Location[index];
      if (val != element) {
        DestinationClone.push(element)
      }
    }
    Destination = DestinationClone;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.line} source={line} />
      <View style={styles.yourLocationContainer}>
        <Image style={styles.locationIcon} source={LocationIcon} />
        <View style={styles.locationPickerContainer}>
          <Text style={styles.yourLocationText}>Your Location</Text>
          <View>
            <SelectPicker
              onSelectedStyle={{
                fontFamily: "PoppinsRegular",
                color: "#BABEC5",
              }}
              placeholder="From"
              placeholderStyle={styles.placeholder}
              style={styles.picker}
              onValueChange={(value) => {
                setselectedlocation(value)
                deleteDestination(value)
                setfirstDrp(value)
              }
              }
              selected={selectedlocation}
            >
              {
                Object.values(Location).map((val, index) => (
                  <SelectPicker.Item label={val} value={val} key={index} />
                ))
              }
            </SelectPicker>
          </View>
        </View>
      </View>

      <View style={{ ...styles.yourLocationContainer, marginTop: RFValue(16) }}>
        <Image style={styles.locationIcon} source={destinationIcon} />
        <View style={styles.locationPickerContainer}>
          <Text style={styles.yourLocationText}>Destination</Text>
          <View>
            <SelectPicker
              onSelectedStyle={{ fontFamily: "PoppinsRegular", color: "#BABEC5" }}
              placeholder="To"
              placeholderStyle={styles.placeholder}
              style={{ ...styles.picker, borderBottomWidth: 0 }}
              onValueChange={(value) => {
                setselectedDestination(value)
                setsecondDrp(value)
                // func(value)
              }}
              selected={selectedDestination}
            >
              {
                Object.values(Destination).map((val, index) => (
                  <SelectPicker.Item label={val} value={val} key={index} />
                ))
              }
            </SelectPicker>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 40,
    padding: RFValue(1),
    borderRadius: RFValue(10),
    borderWidth: 1,
    borderColor: "#E2E2E2",
    alignSelf: "center",
    paddingTop: 20,
    marginTop: RFValue(23),
  },
  locationIcon: {
    width: RFValue(16),
    height: RFValue(16),
  },
  yourLocationText: {
    fontSize: RFValue(13),
    color: "#242527",
    fontFamily: "PoppinsMedium",
  },
  yourLocationContainer: {
    flexDirection: "row",
    marginLeft: 20,
  },
  picker: {
    width: RFValue(260),
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    marginHorizontal: RFValue(-10),
    color: "#BABEC5",
  },

  placeholder: {
    color: "#BABEC5",
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(13),
  },

  locationPickerContainer: {
    marginLeft: RFValue(13),
  },

  line: {
    width: 1,
    height: RFValue(80),
    position: "absolute",
    top: RFValue(24),
    left: RFValue(30),
  },
});

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import DatePickerr from "./DatePicker";
import DatePickerrReturn from "./DatePickerReturn";

export default function DepartureReturnContainer({ departureDate, setdepartureDate, returDate, setreturDate }) {
  return (
    <View style={styles.container}>
      <View style={styles.departureContainer}>
        <Text style={styles.departureText}>Departure</Text>
        <DatePickerr departureDate={departureDate} setdepartureDate={setdepartureDate} />
      </View>
      <View style={styles.departureContainer}>
        <Text style={styles.departureText}>Return</Text>
        <DatePickerrReturn departureDate={departureDate} returDate={returDate} setreturDate={setreturDate} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: RFValue(40),
  },
  departureText: {
    color: "#201A1A",
    fontSize: RFValue(12),
    fontFamily: "PoppinsRegular",
  },
});

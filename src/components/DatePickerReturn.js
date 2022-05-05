import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Image, } from "react-native";
import DatePicker from "react-native-datepicker";
import { RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get('window').width

const DatePickerrReturn = ({ departureDate, returDate, setreturDate }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Image
          style={styles.calendar}
          source={require("../assets/icons/calendar.png")}
        />
        <DatePicker
          style={styles.datePickerStyle}
          date={returDate}
          mode="date"
          androidMode={"spinner"}
          placeholder="Select Date"
          // format="DD.MM.YYYY"
          format="YYYY-MM-DD"
          minDate={departureDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            placeholderText: {
              color: "#979797",
              fontFamily: "PoppinsMedium",
              fontSize: RFValue(16),
            },
            dateIcon: {
              display: "none",
            },
            dateText: {
              fontSize: RFValue(16),
              color: "#979797",
              fontFamily: "PoppinsMedium",
            },
            dateInput: {
              borderRadius: 10,
              borderWidth: 0,
              position: "absolute",
              left: 0,
            },
          }}
          onDateChange={(date) => { setreturDate(date) }}
        />
      </View>
    </View>
  );
};

export default DatePickerrReturn;

const styles = StyleSheet.create({
  innercontainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  datePickerStyle: {
    width: WIDTH / 2.5,
    paddingHorizontal: RFValue(25),
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  calendar: { width: 14, height: 16, position: "absolute", top: RFValue(9) },
});

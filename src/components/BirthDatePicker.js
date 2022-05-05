import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

const WIDTH = Dimensions.get("window").width;
import DatePicker from "react-native-datepicker";
import { RFValue } from "react-native-responsive-fontsize";

const BirthDatePicker = ({ setbDate, bDate, }) => {
  const [date, setDate] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Image
          style={styles.calendar}
          source={require("../assets/icons/calendar.png")}
        />
        <DatePicker
          style={styles.datePickerStyle}
          date={bDate}
          mode="date"
          androidMode={"spinner"}
          placeholder="Select Date"
          format="DD-MM-YYYY"
          // minDate="01.01.1995"
          // maxDate="01.01.2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            placeholderText: {
              color: "#979797",
              fontFamily: "PoppinsMedium",
              fontSize: RFValue(15),
            },
            dateIcon: {
              display: "none",
            },
            dateText: {
              fontSize: RFValue(15),
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
          onDateChange={(date) => {
            setbDate(date);
          }}
        />
      </View>
    </View>
  );
};

export default BirthDatePicker;

const styles = StyleSheet.create({
  innercontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
  },

  datePickerStyle: {
    width: WIDTH / 2.5,
    paddingHorizontal: RFValue(25),
  },
  calendar: { width: 14, height: 16, position: "absolute", top: RFValue(9) },
});

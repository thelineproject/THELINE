import { Dimensions, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

const WIDTH = Dimensions.get("window").width;
export default function Button(props) {
  return (
    <TouchableOpacity disabled={props.disabled ? props.disabled : false} onPress={props.onpress} style={styles.container}>
      {
        (props.isLoader) ? (
          <ActivityIndicator color="white" size="small" />
        ) :
          (
            <Text style={styles.title}>{props.title}</Text>
          )
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 40,
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#3F8395",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  title: {
    fontSize: RFValue(18),
    color: "#fff",
    fontFamily: "PoppinsSemiBold",
  },
});

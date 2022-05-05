import { StyleSheet, Text, View, TextInput, Dimensions } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get("window").width;

export default function Textinput(props) {
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={props.secure}
        placeholder={props.placeholder}
        placeholderTextColor={" rgba(0, 0, 0, 0.8)"}
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  input: {
    width: WIDTH - 35,
    height: RFValue(42),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 8,
    alignSelf: "center",
    paddingHorizontal: RFValue(15),
    marginBottom:RFValue(14)
  },
});

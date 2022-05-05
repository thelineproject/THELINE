import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={styles.back}
          source={require("../assets/icons/back.png")}
        />
      </TouchableOpacity>
      <Text style={styles.selectDeparturetext}>{props.title}</Text>

      <Entypo name="dots-three-vertical" size={20} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: RFValue(30),
  },

  back: {
    width: 18,
    height: 18,
  },

  selectDeparturetext: {
    fontSize: RFValue(15),
    color: "#252828",
    fontFamily: "PoppinsRegular",
  },
});

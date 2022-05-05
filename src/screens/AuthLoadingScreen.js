import {
    Image, ImageBackground, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text,
    ActivityIndicator, View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";

export default function AuthLoading({ navigation }) {
    return (
        <ImageBackground
            style={styles.background}
            source={require("../assets/images/background.png")}
        >
            <SafeAreaView style={styles.container}>
                <Image
                    style={styles.smartLogo}
                    source={require("../assets/icons/smartlogo.png")}
                />
                <ActivityIndicator color="#3F8395" size="large" style={{ marginTop: 20 }} />
                <Text style={{ marginTop: 10 }}>Loading...</Text>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowback: {
        width: RFValue(34),
        height: RFValue(34),
        marginTop: RFValue(14),
        marginLeft: RFValue(8),
    },
    smartLogo: {
        width: RFValue(110),
        height: RFValue(110),
    },
    helloText: {
        fontSize: RFValue(40),
        color: "#3F8395",
        fontFamily: "PoppinsSemiBold",
        marginLeft: RFValue(25),
        marginTop: RFValue(45),
    },

    inputsContainer: {
        marginTop: RFValue(30),
    },

    emailadreesText: {
        fontSize: RFValue(10),
        fontFamily: "PoppinsRegular",
        color: "rgba(0, 0, 0, 0.5)",
        marginLeft: RFValue(29),
        marginBottom: RFValue(6),
    },

    buttonContainer: {
        marginTop: RFValue(10),
    },
    socialButtons: {
        marginTop: RFValue(20),
    },
});

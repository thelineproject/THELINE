import React, { useState, useEffect } from "react";
import { View, Image, ActivityIndicator, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { auth, db, } from "../config/config";
import { getCurrentUser } from '../redux/actions/actions';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignupScreen from "../screens/SignupScreen";
import LogiinScreen from "../screens/LogiinScreen";
import PasswordRecovery from "../screens/PasswordRecovery";
import TrainSearchScreen from "../screens/TrainSearchScreen";
import SelectReturnScreen from "../screens/SelectReturnScreen";
import SelectDepartureScreen from "../screens/SelectDepartureScreen";
import RouteScreen from "../screens/RouteScreen";
import TicketScreen from "../screens/TicketScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import PassengerInformationScreen from "../screens/PassengerInformationScreen";
import TripSummaryScreen from "../screens/TripSummaryScreen";
import TrainInformationScreen from "../screens/TrainInformationScreen";
import AuthLoading from "../screens/AuthLoadingScreen";

const Stack = createNativeStackNavigator();

function Navigation() {
  const dispatch = useDispatch();
  let isAuthenticated = useSelector((state) => state.reducer.isAuthenticated);
  const [loader, setLoader] = React.useState(true)

  useEffect(() => {
    setLoader(true)
    dispatch(getCurrentUser(setLoader))
  }, [])

  if (loader) {
    return (
      <AuthLoading />
    )
  }

  return (
    <NavigationContainer>
      {
        isAuthenticated === false ?
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LogiinScreen" component={LogiinScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
          </Stack.Navigator> :
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tabs" component={MyTabs} />
            <Stack.Screen name="TrainSearchScreen" component={TrainSearchScreen} />
            <Stack.Screen name="SelectDepartureScreen" component={SelectDepartureScreen} />
            <Stack.Screen name="SelectReturnScreen" component={SelectReturnScreen} />
            <Stack.Screen name="RouteScreen" component={RouteScreen} />
            <Stack.Screen name="PassengerInformationScreen" component={PassengerInformationScreen} />
            <Stack.Screen name="TripSummaryScreen" component={TripSummaryScreen} />
            <Stack.Screen name="TrainInformationScreen" component={TrainInformationScreen} />
          </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

export default Navigation;

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      lazy={false}
      initialRouteName="TrainSearchScreen"
      tabBarOptions={{
        tabStyle: {
          width: "100%",
          height: 80,
          backgroundColor: "#3F8395",
        },
        iconStyle: {
          top: Platform.OS === "android" ? 0 : 16,
        },
        style: {
          backgroundColor: "#3F8395",
          width: "100%",
          height: 80,
        },
      }}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor, color }) => {
            if (focused)
              return (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/home.png")}
                    style={{ width: 34, height: 34, tintColor: "#000" }}
                  />
                </View>
              );
            else
              return (
                <Image
                  source={require("../assets/icons/home.png")}
                  style={{ width: 34, height: 34, tintColor: "#fff" }}
                />
              );
          },
        }}
        name="TrainSearchScreen"
        component={TrainSearchScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor, color }) => {
            if (focused)
              return (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/tickett.png")}
                    style={{ width: 32, height: 32, tintColor: "#000" }}
                  />
                </View>
              );
            else
              return (
                <Image
                  source={require("../assets/icons/tickett.png")}
                  style={{ width: 30, height: 30, tintColor: "#fff" }}
                />
              );
          },
        }}
        name="TicketScreen"
        component={TicketScreen}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ focused, tintColor, color }) => {
            if (focused)
              return (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#fff",
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/icons/profile.png")}
                    style={{ width: 32, height: 32, tintColor: "#000" }}
                  />
                </View>
              );
            else
              return (
                <Image
                  source={require("../assets/icons/profile.png")}
                  style={{ width: 34, height: 34, tintColor: "#fff" }}
                />
              );
          },
        }}
        name="EditProfileScreen"
        component={EditProfileScreen}
      />
    </Tab.Navigator>
  );
}

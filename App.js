import React from "react";
import { useFonts } from "expo-font";
import { LogBox, View } from 'react-native';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import Navigation from "./src/navigations/Navigation";

export default function App() {
  const [loaded] = useFonts({
    PoppinsSemiBold: require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsMedium: require("./src/assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("./src/assets/fonts/Poppins-Regular.ttf"),
  });
  if (!loaded) {
    return false;
  }
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Navigation />
      </View>
    </Provider>
  );
}

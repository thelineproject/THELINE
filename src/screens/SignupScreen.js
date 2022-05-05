import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { useDispatch, useSelector } from 'react-redux';
import Textinput from "../components/Textinput";
import Button from "../components/Button";
import SocialButton from "../components/SocialButton";
import { RegisterUser, setErrorMsg, facebookAuth, googleAuth } from '../redux/actions/actions';
import { validateEmail } from '../utils/uuidValidate';

export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  let isError = useSelector((state) => state.reducer.isError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoader, setisLoader] = useState(false);

  const submit = () => {
    if (email === '') {
      dispatch(setErrorMsg('Email is required'))
    }
    else if (password === '') {
      dispatch(setErrorMsg('Password is required'))
    }
    else if (!validateEmail(email)) {
      dispatch(setErrorMsg('Please Enter a Valid Email Address'))
    }
    else {
      setisLoader(true)
      dispatch(RegisterUser(email, password, setisLoader, navigation))
    }
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/images/background.png")}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.arrowback}>
            <Image
              style={styles.arrowback}
              source={require("../assets/icons/arrow-back.png")}
            />
          </TouchableOpacity>

          <Image
            style={styles.smartLogo}
            source={require("../assets/icons/smartlogo.png")}
          />

          <Text style={styles.helloText}>Hello,</Text>

          <View style={styles.inputsContainer}>
            <Text style={styles.emailadreesText}>Email Address</Text>

            <View>
              <Textinput
                secure={false}
                value={email}
                onChangeText={setEmail}
                placeholder="Team@gmail.com"
              />
            </View>

            <Text style={styles.emailadreesText}>Password</Text>

            <View>
              <Textinput
                secure={true}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter Passoword"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              onpress={() => { submit() }}
              title="SignUp"
              isLoader={isLoader}
            />
          </View>

          {
            isError !== '' &&
            <View
              style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', width: '90%', marginHorizontal: '5%', }}
            >
              <Text style={{ color: 'red' }}>{isError}</Text>
            </View>
          }

          <View style={styles.socialButtons}>
            <SocialButton
              title="Continue with Facebook"
              icon={require("../assets/icons/fb.png")}
              onpress={() => dispatch(facebookAuth(navigation))}
            />
            <SocialButton
              title="Continue with Google"
              icon={require("../assets/icons/google.png")}
              onpress={() => dispatch(googleAuth(navigation))}
            />
          </View>

        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
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
    alignSelf: "center",
    marginTop: RFValue(6),
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
    marginTop: RFValue(40),
  },
});

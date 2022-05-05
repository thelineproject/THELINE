import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "../components/Button";
import { Forget, setErrorMsg } from '../redux/actions/actions';
import { validateEmail } from '../utils/uuidValidate';
import { useDispatch, useSelector } from 'react-redux';

const WIDTH = Dimensions.get("window").width;

export default function PasswordRecovery({ navigation }) {
  const dispatch = useDispatch();
  let isError = useSelector((state) => state.reducer.isError);
  const [email, onChangeEmail] = useState('');
  const [isLoader, setisLoader] = useState(false);

  const submit = () => {
    if (email === '') {
      dispatch(setErrorMsg('Email is required'))
    }
    else if (!validateEmail(email)) {
      dispatch(setErrorMsg('Please Enter a Valid Email Address'))
    }
    else {
      setisLoader(true)
      dispatch(Forget(email, setisLoader, navigation))
      onChangeEmail('')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowback}
        >
          <Image
            style={styles.arrowback}
            source={require("../assets/icons/arrow-back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.passwordrecoveryText}>Password recovery</Text>

        <Text style={styles.enterEmailText}>
          Enter your email to recover your password
        </Text>

        <View style={styles.inputContainer}>
          <Image
            style={styles.messageIcon}
            source={require("../assets/icons/message.png")}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder={'Syafrilchoirul17@gmail.com'}
            value={email}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Recovery"
            isLoader={isLoader}
            onpress={() => { submit() }}
          />
        </View>

        {
          isError !== '' &&
          <View
            style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', width: '90%', marginHorizontal: '5%', }}
          >
            <Text style={{ color: 'red', textAlign: 'center' }}>{isError}</Text>
          </View>
        }

        <View style={styles.seprator} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  passwordrecoveryText: {
    fontSize: RFValue(20),
    color: "#3E5481",
    fontFamily: "PoppinsSemiBold",
    alignSelf: "center",
    marginTop: RFValue(110),
  },
  enterEmailText: {
    fontSize: RFValue(14),
    fontFamily: "PoppinsMedium",
    color: "#9FA5C0",
    marginTop: RFValue(25),
    alignSelf: "center",
  },

  inputContainer: {
    width: WIDTH - 70,
    height: RFValue(50),
    backgroundColor: "#fff",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "#D0DBEA",
    alignSelf: "center",
    marginTop: RFValue(28),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  messageIcon: {
    width: 24,
    height: 24,
  },
  input: {
    width: WIDTH - 70,
    height: RFValue(50),
    paddingLeft: 10,
    fontSize: RFValue(12),
    fontFamily: "PoppinsMedium",
    color: "#2E3E5C",
  },
  buttonContainer: {
    marginTop: RFValue(40),
  },

  seprator: {
    width: WIDTH - 50,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    alignSelf: "center",
    marginTop: RFValue(45),
  },
  arrowback: {
    width: RFValue(34),
    height: RFValue(34),
    marginTop: RFValue(14),
    marginLeft: RFValue(8),
  },
});

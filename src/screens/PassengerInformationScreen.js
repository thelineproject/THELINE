import {
  Dimensions,
  Image,
  Platform,
  TextInput,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import SelectPicker from "react-native-form-select-picker";
import DatePickerr from "../components/DatePicker";
import BirthDatePicker from "../components/BirthDatePicker";
import Button from "../components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMsg } from '../redux/actions/actions';

const WIDTH = Dimensions.get("window").width;
const Gender = ["Male", "Female"];

export default function PassengerInformationScreen({ navigation, route }) {
  const { departureTrain, returnTrain, departureDate, returnDate, data } = route.params;
  const dispatch = useDispatch();
  let isError = useSelector((state) => state.reducer.isError);
  const [formQty, setformQty] = useState([]);
  // passenger form
  const [state, setState] = useState({
    name0: "", id0: "", gender0: "", bDate0: "",
    name1: "", id1: "", gender1: "", bDate1: "",
    name2: "", id2: "", gender2: "", bDate2: "",
    name3: "", id3: "", gender3: "", bDate3: "",
    name4: "", id4: "", gender4: "", bDate4: "",
  });

  useEffect(() => {
    let qty = []
    for (let index = 0; index < data.passenger.charAt(0); index++) {
      qty.push(index)
    }
    setformQty(qty)
  }, [])

  const submit = () => {
    let passengerQty = Number(data.passenger.charAt(0))
    // p1
    if (state.name0 === "" && passengerQty == 1) {
      dispatch(setErrorMsg("Please type passenger 1 name"))
    }
    else if (state.id0 === "" && passengerQty == 1) {
      dispatch(setErrorMsg("Please type passenger 1 ID"))
    }
    else if (state.gender0 === "" && passengerQty == 1) {
      dispatch(setErrorMsg("Please select passenger 1 gender"))
    }
    else if (state.bDate0 === "" && passengerQty == 1) {
      dispatch(setErrorMsg("Please select passenger 1 birth date"))
    }
    // p2
    else if (state.name1 === "" && passengerQty == 2) {
      dispatch(setErrorMsg("Please type passenger 2 name"))
    }
    else if (state.id1 === "" && passengerQty == 2) {
      dispatch(setErrorMsg("Please type passenger 2 ID"))
    }
    else if (state.gender1 === "" && passengerQty == 2) {
      dispatch(setErrorMsg("Please select passenger 2 gender"))
    }
    else if (state.bDate1 === "" && passengerQty == 2) {
      dispatch(setErrorMsg("Please select passenger 2 birth date"))
    }
    // p3
    else if (state.name2 === "" && passengerQty == 3) {
      dispatch(setErrorMsg("Please type passenger 3 name"))
    }
    else if (state.id2 === "" && passengerQty == 3) {
      dispatch(setErrorMsg("Please type passenger 3 ID"))
    }
    else if (state.gender2 === "" && passengerQty == 3) {
      dispatch(setErrorMsg("Please select passenger 3 gender"))
    }
    else if (state.bDate2 === "" && passengerQty == 3) {
      dispatch(setErrorMsg("Please select passenger 3 birth date"))
    }
    // p4
    else if (state.name3 === "" && passengerQty == 4) {
      dispatch(setErrorMsg("Please type passenger 4 name"))
    }
    else if (state.id3 === "" && passengerQty == 4) {
      dispatch(setErrorMsg("Please type passenger 4 ID"))
    }
    else if (state.gender3 === "" && passengerQty == 4) {
      dispatch(setErrorMsg("Please select passenger 4 gender"))
    }
    else if (state.bDate3 === "" && passengerQty == 4) {
      dispatch(setErrorMsg("Please select passenger 4 birth date"))
    }
    // p5
    else if (state.name4 === "" && passengerQty == 5) {
      dispatch(setErrorMsg("Please type passenger 5 name"))
    }
    else if (state.id4 === "" && passengerQty == 5) {
      dispatch(setErrorMsg("Please type passenger 5 ID"))
    }
    else if (state.gender4 === "" && passengerQty == 5) {
      dispatch(setErrorMsg("Please select passenger 5 gender"))
    }
    else if (state.bDate4 === "" && passengerQty == 5) {
      dispatch(setErrorMsg("Please select passenger 5 birth date"))
    }

    else {
      let passenger = []
      let passengerQty = Number(data.passenger.charAt(0))
      let arr = [
        {
          name: state.name0,
          id: state.id0,
          gender: state.gender0,
          bDate: state.bDate0
        },
        {
          name: state.name1,
          id: state.id1,
          gender: state.gender1,
          bDate: state.bDate1
        },
        {
          name: state.name2,
          id: state.id2,
          gender: state.gender2,
          bDate: state.bDate2
        },
        {
          name: state.name3,
          id: state.id3,
          gender: state.gender3,
          bDate: state.bDate3
        },
        {
          name: state.name4,
          id: state.id4,
          gender: state.gender4,
          bDate: state.bDate4
        }
      ]
      for (let index = 0; index < passengerQty; index++) {
        const element = arr[index];
        passenger.push(element)
      }
      // console.log(passenger, 'BOOKING_CREATE')
      if (data.returDate != '') {
        navigation.navigate("TripSummaryScreen", { userInfo: passenger, departureTrain, returnTrain, departureDate, returnDate, data })
      }
      else {
        navigation.navigate("TripSummaryScreen", { userInfo: passenger, departureTrain, returnTrain: null, departureDate, returnDate: null, data })
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RFValue(140) }}
      >
        <View style={styles.header}>
          <MaterialIcons
            onPress={() => navigation.goBack()}
            name="arrow-back-ios"
            size={24}
            color="#fff"
          />

          <Text style={styles.selectTrainText}>Select Train</Text>
        </View>

        <Text style={styles.passengerInfotext}>Passenger Information</Text>

        <Text style={styles.fillInInformationText}>
          Please fill in the required information:
        </Text>
        <View style={styles.seprator} />

        {
          formQty.map((key, index) => {
            return (
              <View key={index} style={styles.InputsMainContainer}>
                <Text style={styles.passengerNumber}>Passenger {' ' + Number(index + 1)}</Text>
                <View style={styles.fullNameContainer}>
                  <Text style={styles.fullNameText}>Full Name:</Text>
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor={"#808089"}
                    style={styles.input}
                    onChangeText={(value) => { setState(prevState => ({ ...prevState, [`name${index}`]: value })); }}
                  // value={[`name${index}`]}
                  />
                </View>
                <View>
                  <Text style={styles.fullNameText}>Gendar:</Text>
                  <SelectPicker
                    onSelectedStyle={{
                      fontFamily: "PoppinsRegular",
                      color: "#BABEC5",
                      fontSize: RFValue(13),
                    }}
                    placeholder="Gendar"
                    placeholderStyle={styles.placeholder}
                    style={styles.input}
                    onValueChange={(value) => {
                      setState(prevState => ({ ...prevState, [`gender${index}`]: value }));
                    }}
                  // selected={[`gender${index}`]}
                  >
                    {
                      Object.values(Gender).map((val, index) => (
                        <SelectPicker.Item label={val} value={val} key={index} />
                      ))
                    }
                  </SelectPicker>
                </View>
                <View style={styles.fullNameContainer}>
                  <Text style={styles.fullNameText}>ID Number:</Text>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Empty"
                    placeholderTextColor={"#808089"}
                    style={styles.input}
                    onChangeText={(value) => {
                      setState(prevState => ({ ...prevState, [`id${index}`]: value }));
                    }}
                  // value={[`id${index}`]}
                  />
                </View>
                <View style={styles.fullNameContainer}>
                  <Text style={styles.fullNameText}>Birth Date</Text>
                  <View>
                    <BirthDatePicker
                      setbDate={(value) => { setState(prevState => ({ ...prevState, [`bDate${index}`]: value })); }}
                      bDate={state[`bDate${index}`]}
                    />
                  </View>
                </View>
              </View>
            )
          })
        }
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          // onpress={() => navigation.navigate("TripSummaryScreen")}
          onpress={() => submit()}
          title="Proceed to Pay"
        />
        {
          isError !== '' &&
          <View
            style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', width: '90%', marginHorizontal: '5%', }}
          >
            <Text style={{ color: 'red', textAlign: 'center' }}>{isError}</Text>
          </View>
        }
      </View>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  header: {
    width: WIDTH,
    height: RFValue(70),
    backgroundColor: "#3F8395",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: RFValue(20),
  },

  selectTrainText: {
    fontSize: RFValue(17),
    fontFamily: "PoppinsSemiBold",
    color: "#fff",
    marginLeft: 10,
  },

  passengerInfotext: {
    color: "#77777C",
    fontFamily: "PoppinsSemiBold",
    fontSize: RFValue(17),
    marginTop: RFValue(30),
    marginLeft: RFValue(20),
  },

  fillInInformationText: {
    color: "#27272A",
    fontFamily: "PoppinsSemiBold",
    fontSize: RFValue(13),
    marginLeft: RFValue(20),
    marginTop: RFValue(30),
  },

  seprator: {
    width: WIDTH - 40,
    height: 1,
    backgroundColor: "#EBEBF0",
    alignSelf: "center",
    marginTop: RFValue(8),
  },
  passengerNumber: {
    color: "blue",
    fontFamily: "PoppinsSemiBold",
    fontSize: RFValue(15),
    marginLeft: RFValue(20),
  },

  fullNameText: {
    color: "#27272A",
    fontFamily: "PoppinsSemiBold",
    fontSize: RFValue(13),
    marginLeft: RFValue(20),
  },

  input: {
    width: WIDTH - 45,
    height: 40,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#DDDDE3",
    paddingHorizontal: 20,
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(12),
    marginTop: 5,
    marginBottom: 15,
  },

  InputsMainContainer: {
    marginTop: 8,
  },
  placeholder: {
    color: "#BABEC5",
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(12),
  },

  buttonContainer: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
  },
});

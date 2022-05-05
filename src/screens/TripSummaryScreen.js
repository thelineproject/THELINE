import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get("window").width;
import { Feather, Entypo } from "@expo/vector-icons";
import Button from "../components/Button";
import { CreditCardInput } from "react-native-credit-card-input";
import Modal from "react-native-modal";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMsg, addBooking, fetchBooking } from '../redux/actions/actions';

export default function TripSummaryScreen({ navigation, route }) {
  const { userInfo, departureTrain, returnTrain, departureDate, returnDate, data } = route.params;
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [cardInfo, setcardInfo] = useState(null);
  const [isLoader, setisLoader] = useState(false);
  const [createBooking, setcreateBooking] = useState(null);
  let isError = useSelector((state) => state.reducer.isError);
  let user = useSelector((state) => state.reducer.currentUser);

  const _onChange = (v) => {
    setcardInfo(v.status)
  }

  const onPressPayButton = () => {
    const { number, expiry, cvc, name } = cardInfo
    // console.log(number, expiry, cvc, name, cardInfo, "Card_info")
    if (number === "incomplete") {
      dispatch(setErrorMsg("Please type card number"))
    }
    else if (expiry === "incomplete") {
      dispatch(setErrorMsg("Please type card expiry"))
    }
    else if (cvc === "incomplete") {
      dispatch(setErrorMsg("Please type cvs"))
    }
    else if (name === "incomplete") {
      dispatch(setErrorMsg("Please type card holders name"))
    }
    else {
      setisLoader(true)
      let booking = {
        userInfo: userInfo,
        departureTrain: departureTrain[0],
        returnTrain: returnTrain,
        departureDate: departureDate,
        returnDate: returnDate,
        passenger: data.passenger,
        classs: data.classs,
        stops: data.stops,
        paid: true,
        userId: user.docId
      }
      console.log(booking, "BOOKING_CREATE")
      setcreateBooking(booking)
      setModalVisible(false);
      setSuccessModal(true);
      dispatch(addBooking(booking, setisLoader, navigation))
      dispatch(fetchBooking(user.docId))
    }
  };

  const onPressGoToHomePage = () => {
    setSuccessModal(false);
    navigation.navigate("TrainInformationScreen", { booking: createBooking });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trip Summary" />

      <View style={styles.railwaysContainer}>
        <Image
          style={styles.locationIcon}
          source={require("../assets/icons/olocation.png")}
        />
        <Text style={styles.railwaytext}>Saudi Arabia Railways</Text>
      </View>

      <View style={styles.fromToMainContainer}>
        <View>
          <Text style={styles.fromText}>
            From:{" "}
            <Text
              style={{
                ...styles.fromText,
                color: "#77838F",
                fontFamily: "PoppinsRegular",
              }}
            >
              {" "}
              {/* Riyadh */}
              {departureTrain[0].arrivalTrain}
            </Text>
          </Text>

          <Text style={styles.fromText}>
            To:{" "}
            <Text
              style={{
                ...styles.fromText,
                color: "#77838F",
                fontFamily: "PoppinsRegular",
              }}
            >
              {" "}
              {/* Dammam */}
              {departureTrain[0].departureTrain}
            </Text>
          </Text>
        </View>

        <Image
          style={styles.train}
          source={require("../assets/icons/train.png")}
        />
      </View>

      <View style={styles.seprator} />

      <View style={styles.rydToDMMMainContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.rydText}>{departureTrain[0].arrivalStationCode}</Text>
          <Feather
            style={{ marginRight: 10, marginLeft: 5 }}
            name="arrow-right"
            size={22}
            color="black"
          />
          <Text style={styles.rydText}>{departureTrain[0].departureStationCode + " "} | {" " + departureTrain[0].duration} </Text>
        </View>
      </View>

      <View style={styles.rydToDMMMainContainer}>
        <Text style={styles.passengerText}>{data.passenger + " "} Passenger(s)</Text>
      </View>

      <View style={styles.seprator} />

      <Text style={styles.priceText}>PRICE:</Text>

      {/* <View style={styles.vatContainer}>
        <Text style={styles.vatText}>VAT</Text>
        <Text style={styles.priceTextt}>15 SAR</Text>
      </View> */}

      <View style={styles.totalContainer}>
        <Text style={styles.vatText}>Departure</Text>
        <Text style={styles.priceTextt}>{departureTrain[0].price * data.passenger.charAt(0) + ' '} SAR</Text>
      </View>

      {
        returnTrain != null &&
        <View style={styles.totalContainer}>
          <Text style={styles.vatText}>Arival Price</Text>
          <Text style={styles.priceTextt}>{returnTrain.price * data.passenger.charAt(0) + ' '} SAR</Text>
        </View>
      }

      <View style={styles.totalContainer}>
        <Text style={styles.vatText}>TOTAL</Text>
        {
          returnTrain != null &&
          <Text style={styles.priceTextt}>{departureTrain[0].price * data.passenger.charAt(0) + returnTrain.price * data.passenger.charAt(0) + ' '} SAR</Text>
        }
        {
          returnTrain == null &&
          <Text style={styles.priceTextt}>{departureTrain[0].price * data.passenger.charAt(0) + ' '} SAR</Text>
        }
      </View>

      <View style={{ position: "absolute", bottom: 30, alignSelf: "center" }}>
        <Button onpress={() => setModalVisible(true)} title="Proceed to Pay" />
      </View>

      <Modal hasBackdrop={true} backdropOpacity={0.7} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.modalTop}>
            <Text style={styles.confirmPayText}>Confirm and pay</Text>
            <Entypo
              onPress={() => setModalVisible(false)}
              name="cross"
              size={24}
              color="black"
            />
          </View>
          <View></View>
          <View
            style={{
              marginTop: RFValue(20),
              height: heightPercentageToDP("40%"),
            }}
          >
            <CreditCardInput
              cardImageFront={require("../assets/images/card.png")}
              autoFocus
              requiresName
              requiresCVC
              cardScale={1.0}
              labelStyle={styles.label}
              inputStyle={styles.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}
              onChange={(v) => _onChange(v)}
            />
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.vatText}>TOTAL</Text>
            {/* <Text style={styles.priceTextt}>170 SAR</Text> */}
            {
              returnTrain != null &&
              <Text style={styles.priceTextt}>{departureTrain[0].price * data.passenger.charAt(0) + returnTrain.price + ' '} SAR</Text>
            }
            {
              returnTrain == null &&
              <Text style={styles.priceTextt}>{departureTrain[0].price * data.passenger.charAt(0) + ' '} SAR</Text>
            }
          </View>
          <View style={{ position: "absolute", bottom: 20 }}>
            <Button disabled={cardInfo != null ? false : true} isLoader={isLoader} onpress={() => onPressPayButton()} title="Pay now" />
            {
              isError !== '' &&
              <View
                style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', width: '90%', marginHorizontal: '5%', }}
              >
                <Text style={{ color: 'red', textAlign: 'center' }}>{isError}</Text>
              </View>
            }
          </View>
        </View>
      </Modal>

      <View>
        <Modal hasBackdrop={true} backdropOpacity={0.7} visible={successModal}>
          <View style={styles.modalView}>
            <View style={styles.modalTop}>
              <Text style={styles.confirmPayText}></Text>
              <Entypo
                onPress={() => setSuccessModal(false)}
                name="cross"
                size={24}
                color="black"
              />
            </View>
            <Image
              style={styles.successIcon}
              source={require("../assets/icons/success.png")}
            />
            <View>
              <Text style={styles.bookingConfirmedText}>
                Your booking is Confirmed!{" "}
              </Text>
            </View>

            <Text style={styles.bookingDescription}>
              We’ll recive the booking details on your{"\n"}
              email and phone number.
            </Text>

            <TouchableOpacity onPress={() => onPressGoToHomePage()}>
              <Text style={styles.gotohomepage}>Go to homepage</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  locationIcon: {
    width: 28,
    height: 28,
  },

  railwaytext: {
    fontSize: RFValue(13),
    color: "#1E2022",
    fontFamily: "PoppinsMedium",
    marginLeft: RFValue(10),
  },

  railwaysContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: RFValue(15),
    marginTop: RFValue(70),
  },

  fromToMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: RFValue(20),
    marginRight: 5,
    marginTop: 23,
  },

  fromText: {
    color: "#1E2022",
    fontFamily: "PoppinsMedium",
    fontSize: RFValue(13),
  },
  train: {
    width: 24,
    height: 50,
  },

  seprator: {
    width: WIDTH - 50,
    height: 1,
    backgroundColor: "#000000",
    opacity: 0.1,
    alignSelf: "center",
    marginTop: 18,
  },

  passengerText: {
    fontSize: RFValue(13),
    color: "#1E2022",
    opacity: 0.6,
    fontFamily: "PoppinsRegular",
  },

  rydToDMMMainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 26,
    marginBottom: 4,
  },

  priceText: {
    color: "#1E2022",
    fontFamily: "PoppinsMedium",
    fontSize: RFValue(13),
    marginLeft: RFValue(20),
    marginTop: 30,
    marginBottom: 16,
  },
  vatContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 10,
  },

  vatText: {
    color: "#000000",
    fontFamily: "PoppinsRegular",
    fontSize: RFValue(16),
  },
  priceTextt: {
    fontFamily: "PoppinsSemiBold",
    fontSize: RFValue(20),
    color: "#44C07C",
  },
  modalView: {
    width: WIDTH,
    height: RFPercentage(75),
    position: "absolute",
    bottom: -20,
    alignSelf: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH,
    paddingHorizontal: 20,
    marginTop: RFValue(30),
  },
  confirmPayText: {
    color: "#000000",
    fontSize: RFValue(14),
    fontFamily: "PoppinsSemiBold",
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: WIDTH,
  },

  successIcon: {
    width: RFValue(107),
    height: RFValue(110),
    alignSelf: "center",
    marginTop: RFValue(40),
  },
  bookingConfirmedText: {
    fontFamily: "PoppinsSemiBold",
    color: "#000000",
    fontSize: RFValue(15),
    marginTop: RFValue(50),
  },

  bookingDescription: {
    fontFamily: "PoppinsSemiBold",
    color: "#BCBCBC",
    fontSize: RFValue(14),
    textAlign: "center",
  },
  gotohomepage: {
    fontFamily: "PoppinsSemiBold",
    color: "#000000",
    fontSize: RFValue(15),
    marginTop: RFValue(50),
  },
});

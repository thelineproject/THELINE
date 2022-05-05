import {
  Image, ImageBackground, Platform, Dimensions, TextInput,
  SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,
  View, ScrollView,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from "react-native-responsive-fontsize";
const WIDTH = Dimensions.get("window").width;
import PhoneInput from "react-native-phone-number-input";
import { Entypo } from "@expo/vector-icons";
import DropDown from '../components/dropDownLogout'
import Button from "../components/Button";
import { signout, updateProfile, ProfileImageHandler } from '../redux/actions/actions';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { create_UUID } from '../utils/uuidValidate';

export default function EditProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.reducer.currentUser);
  const [email, onChangeEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setcode] = useState("GB");
  const [formattedValue, setFormattedValue] = useState("");
  const [value, setValue] = useState("");
  const [dropDownShow, setdropDownShow] = useState(false);
  const phoneInput = useRef(null);
  const [isLoader, setisLoader] = useState(false);
  const [profileImage, setProfileImage] = useState("")
  const [isVisibleProfilePic, setisVisibleProfilePic] = useState(false)
  const [isflag, setisFlag] = useState(false)

  useEffect(() => {
    const { email, fullName, code, phone, photoUrl, docId } = user
    console.log(code, 'user_fetch')
    onChangeEmail(email)
    setName(fullName)
    setcode(code)
    setFormattedValue(phone)
    setProfileImage(photoUrl)
    setisFlag(true)
  }, [])

  const logout = () => {
    setdropDownShow(false)
    dispatch(signout(setdropDownShow))
  }

  const updateUserInfo = () => {
    setisLoader(true)
    let updatedUser = {
      email: email,
      fullName: name,
      phone: value,
      code: code.cca2 ? code.cca2 : 'GB',
    }
    console.log(updatedUser, user.docId, 'updateProfile')
    dispatch(updateProfile(updatedUser, user.docId, setisLoader))
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    let data = {
      uri: result.uri,
      docId: user.docId,
      id: create_UUID()
    }
    dispatch(ProfileImageHandler(data, setisVisibleProfilePic))
    if (!result.cancelled) {
      setProfileImage(result.uri);
      setisVisibleProfilePic(false)
    }
  };

  // console.log(profileImage, 'updateProfile')

  return (
    <ImageBackground
      source={require("../assets/images/background.png")}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <SafeAreaView>
          <View style={styles.header}>
            <View style={{ flex: 9, flexDirection: 'row', }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Image
                  style={styles.arrowback}
                  source={require("../assets/icons/arrow-back.png")}
                />
              </TouchableOpacity>
              <Text style={styles.editProfiletext}>Edit profile </Text>

            </View>

            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => setdropDownShow(!dropDownShow)}
            >
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </TouchableOpacity>
            {
              dropDownShow ? <DropDown logout={logout} /> : null
            }
          </View>

          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center', zIndex: -1 }}
            onPress={() => setisVisibleProfilePic(true)}
          >
            <View style={styles.editImage}>
              <Image
                style={{ width: 150, height: 150, }}
                source={{ uri: profileImage && profileImage }}
              >
                {/* <Image
                  style={styles.camera}
                  source={require("../assets/icons/camera.png")}
                /> */}
              </Image>
            </View>

          </TouchableOpacity>

          <View style={styles.inputsContainer}>
            <Text style={styles.inputTitel}>Email</Text>
            <View style={styles.inputContainer}>
              <Image
                style={styles.emailIcon}
                source={require("../assets/icons/email.png")}
              />
              <TextInput
                placeholder="Email"
                style={styles.input}
                onChangeText={onChangeEmail}
                value={email}
                editable={false}
              />
            </View>

            <Text style={styles.inputTitel}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Image
                style={styles.messageIcon}
                source={require("../assets/icons/name.png")}
              />
              <TextInput
                placeholder="Name"
                style={styles.input}
                onChangeText={setName}
                value={name}
              />
            </View>

          </View>

          <Text style={styles.inputTitel}>Mobile Number</Text>

          <View style={{ alignSelf: "center" }}>
            {
              isflag &&
              <PhoneInput
                ref={phoneInput}
                // defaultValue={formattedValue}
                value={formattedValue}
                defaultCode={code}
                layout="first"
                onChangeCountry={(text) => { setcode(text) }}
                onChangeText={(text) => { setValue(text) }}
                onChangeFormattedText={(text) => { setFormattedValue(text) }}
                textContainerStyle={{ backgroundColor: "#fff" }}
                containerStyle={{
                  backgroundColor: "#fff",
                  borderBottomWidth: 1,
                  borderBottomColor: "#C4C4C4",
                }}
              />
            }
          </View>
        </SafeAreaView>
      </ScrollView >
      <View style={{ position: "absolute", alignSelf: "center", bottom: 10 }}>
        <Button
          title="Save"
          onpress={() => updateUserInfo()}
          isLoader={isLoader}
        />
      </View>

      <Modal
        backdropOpacity={0.8}
        isVisible={isVisibleProfilePic}
        onBackdropPress={() => setisVisibleProfilePic(false)}
        style={{ position: 'absolute', width: '90%', bottom: '10.5%', }}
      >
        <View style={{ borderRadius: 10 }}>
          <Button
            title="UPLOAD"
            onpress={() => pickImage()}
            style={{ width: '90%', alignSelf: 'center', marginTop: 30, }}
          />
        </View>
      </Modal>


    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  arrowback: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15
  },
  editProfiletext: {
    color: "#000",
    fontFamily: "PoppinsMedium",
    fontSize: RFValue(20),
  },

  editImage: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 9,
    borderRadius: 100,
    overflow: 'hidden'
  },
  camera: {
    width: 45,
    height: 39,
  },
  inputContainer: {
    width: WIDTH - 50,
    height: RFValue(50),
    backgroundColor: "#fff",
    borderRadius: 32,
    borderBottomWidth: 1,
    borderColor: "#D0DBEA",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 29,
    marginBottom: 36,
  },

  messageIcon: {
    width: 20,
    height: 20,
  },

  emailIcon: {
    width: 18,
    height: 16.5,
  },
  input: {
    width: WIDTH - 50,
    height: RFValue(50),
    paddingLeft: 15,
    fontSize: RFValue(12),
    fontFamily: "PoppinsMedium",
    color: "#2E3E5C",
  },

  inputsContainer: {
    marginTop: 43,
  },

  inputTitel: {
    paddingHorizontal: 50,
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#000",
  },
});

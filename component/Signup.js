import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground, TextInput,SafeAreaView} from "react-native"
import { useFonts } from 'expo-font'

export default function Signupemail() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.Signupemail}>
      <View style={styles.SignupContainer}>
        <Image
          style={styles.Ellipse15}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/vCUqZuT4mOJ3BtY5LAa972-121%3A151?alt=media&token=be481888-72ef-42d7-88f1-5db900589bec",
          }}
        />
        <Image
          style={styles.Ellipse151}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/vCUqZuT4mOJ3BtY5LAa972-121%3A152?alt=media&token=31196df5-da95-4a79-9af2-4968f3ec2b82",
          }}
        />
        <View style={styles.Group275}>
          <View style={styles.Group0106}>
            <Image
              style={styles.Group6}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/vCUqZuT4mOJ3BtY5LAa972-121%3A153?alt=media&token=cb43a39c-b080-40a1-aabb-0e4e5b7cd95d",
              }}
            />
          </View>
          <View style={styles.Group29}>
            <Text style={styles.Txt084}>Hello,</Text>
            <View style={styles.Group7}>
              <View style={styles.Group581}>
                <Text style={styles.Txt551}>Email Address</Text>
                <View style={styles.Rectangle7} />
              </View>




              <TextInput
        style={styles.EnterUser}
        placeholder="Email."
        placeholderTextColor="#003f5c"
        onChangeText={(email) => setEmail(email)}
             />
      





            </View>
            <View style={styles.Group8}>
                <View style={styles.Group581}>
                <Text style={styles.Txt551}>Password</Text>
                <View style={styles.Rectangle8} />
            </View>



            <SafeAreaView>
              <TextInput
        style={styles.EnterPassword}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
            />
             </SafeAreaView>




            </View>
          </View>
          <View style={styles.ButtonLarge}>
            <Text style={styles.Txt949}>Sign up </Text>
          </View>
          <View style={styles.Group28}>
            <Image
              style={styles.Image9}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/vCUqZuT4mOJ3BtY5LAa972-153%3A137?alt=media&token=db8b02f6-8414-4eb2-abb0-997cb2395b05",
              }}
            />
            <Text style={styles.Txt895}>Continue with Facebook</Text>
          </View>
          <View style={styles.Group27}>
            <Image
              style={styles.Image10}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/vCUqZuT4mOJ3BtY5LAa972-153%3A138?alt=media&token=7daa0316-0e64-4b13-a788-9e0c2354845b",
              }}
            />
            <Text style={styles.Txt895}>Continue with Google</Text>
          </View>
        </View>
      </View>
      <Image
        style={styles.Photo202202161325441}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/vCUqZuT4mOJ3BtY5LAa972-150%3A237?alt=media&token=4b6b749a-dfb5-442d-9e96-997112e03a0d",
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Signupemail: {
    display: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    borderRadius: 220,
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 414,
    height: 896,
    top: -40,
  },
  SignupContainer: {
    display: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "absolute",
    top: 0,
    left: 0,
    width: 414,
    height: 896,
    
  },
  Ellipse15: {
    position: "absolute",
    top: 76,
    left: 209,
    width: 205,
    height: 248,
  },
  Ellipse151: {
    position: "absolute",
    top: 993,
    left: 132,
    width: 166.44,
    height: 230.59,
  },
  Group275: {
    display: "flex-start",
    flexDirection: "column",
    position: "absolute",
    top: 75,
    width: 375,
    height: 745,
  },
  Group0106: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 6,
    paddingRight: 6,
    marginBottom: 197,
    borderRadius: 2,
    backgroundColor: "rgba(237,237,237,1)",
    width: 34,
    height: 34,
    top: 111,
  },
  Group6: {
    width: 19.53,
    height: 12.44,
  },

  Group29: {
    display: "center",
    flexDirection: "column",
    marginBottom: 23,
    width: 366,
    height: 257,
    left: 20,

  },
  Txt084: {
    fontSize: 48,
    // // fontFamily: "Montserrat",
    fontWeight: "600",
    color: "rgba(63,131,149,1)",
    marginBottom: 32,
  },
  Group7: {
    //position: "relative",
    marginBottom: 14,
    width: 366,
    height: 67,
  },
  Group581: {
    display: "flex-start",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    width: 366,
    height: 67,
  },
  Txt551: {
    fontSize: 10,
    // // fontFamily: "Montserrat",
    fontWeight: "400",
    color: "rgba(0,0,0,0.5)",
    marginBottom: 7,
  },
  Rectangle7: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.15)",
    height: 44,
    borderRadius: 8,
    width: 344,

  },

  EnterUser: {
  textAlign: "left",
   height: 40,
   margin: 12,
   // borderWidth: 1,
   // padding: 10,
   top: 10,
  },

  Group8: {
    position: "relative",
    width: 366,
    height: 71,
  },
  Group581: {
    display: "flex-start",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    width: 366,
    height: 67,
  },
  Txt551: {
    fontSize: 10,
    // // fontFamily: "Montserrat",
    fontWeight: "400",
    color: "rgba(0,0,0,0.5)",
    marginBottom: 7,
  },
  Rectangle8: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.15)",
    height: 44,
    borderRadius: 8,
    width: 344,
  },

  EnterPassword: {
  textAlign: "left",
  height: 40,
   margin: 12,
   // borderWidth: 1,
   // padding: 10,
   top: 10,
  },

  ButtonLarge: {
    display: "center",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 24,
    paddingBottom: "center",
    paddingLeft: "center",
    paddingRight: 12,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "rgba(63,131,149,1)",
    shadowColor: "rgba(0,0,0,0.1)",
    elevation: 422,
    width: 344,
    left:20,
  },
  Txt949: {
    fontSize: 30,
    // fontFamily: "Montserrat",
    fontWeight: "700",
    color: "rgba(255, 255, 255, 1)",
    textAlign: "center",
    justifyContent: "center",
    width: 344,
    top: -10,
  },

  Group28: {
    display: "flex-start",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 14,
    paddingLeft: 83,
    paddingRight: 98,
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: "rgba(237,237,237,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.02)",
    width: 344,
    left:20,

  },
  Image9: {
    width: 20,
    height: 20,
    marginRight: 17,
  },
  Txt895: {
    fontSize: 12,
    // fontFamily: "Montserrat",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
  },

  Group27: {
    display: "flex-start",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 13,
    paddingLeft: 83,
    paddingRight: 107,
    borderRadius: 10,
    backgroundColor: "rgba(237,237,237,1)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0,0,0,0.02)",
    width: 344,
    left:20,
  },
  Image10: {
    width: 20,
    height: 20,
    marginRight: 23,
  },
  Txt895: {
    fontSize: 12,
    // fontFamily: "Montserrat",
    fontWeight: "400",
    color: "rgba(0,0,0,1)",
  },

  Photo202202161325441: {
    position: "absolute",
    top: 75,
    left: 113,
    width: 206,
    height: 224,
  },
})

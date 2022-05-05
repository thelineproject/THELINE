
import * as firebase from 'firebase';
import { auth, db, storage, facebookProvider, googleProvider } from "../../config/config";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

// set error msg function
export const setErrorMsg = (msg) => async dispatch => {
  dispatch({ type: "isError", payload: msg });
  setTimeout(() => {
    dispatch({ type: "isError", payload: '' });
  }, 5000);
};

// get current user function
export const getCurrentUser = (setLoader) => async dispatch => {
  try {
    await auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('users')
          .where('email', '==', user.email)
          .get()
          .then(function (querySnapshot) {
            let currentUser = {};
            querySnapshot.forEach(function (doc) {
              currentUser = { docId: doc.id, ...doc.data() };
            });
            dispatch({ type: "current_User", payload: currentUser });
            setLoader && setLoader(false)
          });
      }
      else {
        setLoader && setLoader(false)
      }
    })
  } catch (err) {
    console.log(err.message, 'err_getuser')
    setLoader && setLoader(false)
  }
}

// signup function
export const RegisterUser = (email, password, setisLoader, navigation) => async dispatch => {
  try {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        if (user) {
          db.collection('users').doc(user.user.uid).set({
            userId: user.user.uid,
            email: email.toLowerCase(),
            fullName: null,
            phone: null,
            code: 'GB',
            photoUrl: 'https://skansecampus.com/wp-content/uploads/2019/08/no-user-picture.gif',
          });
        }
        setisLoader(false)
        navigation.navigate('tabs')
      });
  } catch (err) {
    setisLoader(false)
    dispatch(setErrorMsg(err.message))
    console.log(err.message, 'err_register')
  }
};

// signin function
export const SigninUser = (email, password, setisLoader, navigation) => async dispatch => {
  try {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        setisLoader(false)
        dispatch(getCurrentUser())
        navigation.navigate('tabs')
      })
  } catch (err) {
    setisLoader(false)
    dispatch(setErrorMsg(err.message))
    console.log(err.message, 'err_signin')
  }
};

// signout function
export const signout = (setdropDownShow) => async dispatch => {
  auth.signOut().then(() => {
    console.log('Sign-out successful.')
    dispatch({ type: "logout_User" });
    setdropDownShow(false)
  }).catch((error) => {
    // An error happened.
    console.log(error, 'Logout_error')
  })
};

// forget the password function
export const Forget = (email, setisLoader,) => async dispatch => {
  try {
    await auth
      .sendPasswordResetEmail(email)
      .then(function (e) {
        setisLoader(false)
        dispatch(setErrorMsg('check your email'))
      })
  } catch (err) {
    console.log(err.message, 'err_forget')
    setisLoader(false)
    dispatch(setErrorMsg('Email not found'))
  }
};

export const updateProfile = (updatedUser, docId, setisLoader,) => async dispatch => {
  console.log(updatedUser, docId, "Action")
  await db.collection('users').doc(docId).update(updatedUser);
  dispatch(getCurrentUser())
  setisLoader(false)
};

// facebook auth function
export const facebookAuth = (navigation) => async dispatch => {
  try {
    await Facebook.initializeAsync({
      appId: '4670444049721963',
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      // const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`)
      const credential = facebookProvider.credential(token)
      await auth
        .signInWithCredential(credential)
        .then(async (user) => {
          if (user) {
            let userInfo = {
              accessToken: token,
              fullName: user.user.displayName,
              email: user.user.email,
              userId: user.user.uid,
              photoUrl: user.user.photoURL,
              phone: null,
              code: 'GB',
            };
            await db.collection('users').doc(user.user.uid).set(userInfo);
            dispatch(getCurrentUser())
            navigation.navigate('tabs')
          }
        })
        .catch((error) => {
          console.log(error, error.message, 'err_facebook_auth')
          dispatch(setErrorMsg(error.message))
        })
    }
    else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    console.log(message, 'error occured');
    alert(`Facebook Login Error: ${message}`);
  }
};

// google auth function
export const googleAuth = (navigation) => async dispatch => {
  try {
    const result = await Google.logInAsync({
      iosClientId: `112026775227-0dvfcjh2qjsuc3p608plclduc9bq0d30.apps.googleusercontent.com`,
      iosStandaloneAppClientId: `112026775227-8m1qs0e8rku2qhrt9l7tpsr1og98f5tr.apps.googleusercontent.com`,
      androidClientId: `112026775227-h9o7ulept8cum8ps0km55rsh29qu9mrp.apps.googleusercontent.com`,
      androidStandaloneAppClientId: `112026775227-br1joec6lnlu0afpijbj17ofmampmo6v.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    });
    if (result.type === 'success') {
      let user = result.user
      let token = result.accessToken
      let idToken = result.idToken
      dispatch(authWithFirebaseAndSaveToDB(token, idToken, user));
      navigation.navigate('tabs')
    }
    else {
      return { cancelled: true };
    }
  }
  catch (e) {
    return { error: true };
  }
}

// sync google with firebase function
export const authWithFirebaseAndSaveToDB = (accessToken, idToken, user) => async dispatch => {
  const googleCredential = googleProvider.credential(idToken, accessToken);
  auth
    .signInWithCredential(googleCredential)
    .then(fsUser => {
      if (fsUser) {
        let userInfo = {
          accessToken: accessToken,
          fullName: user.name,
          email: user.email,
          uid: fsUser.user.uid,
          photoUrl: user.photoUrl,
          phone: null,
          code: 'GB',
          googleId: user.id,
        };
        db.collection('users').doc(userInfo.uid).set(userInfo);
        dispatch(getCurrentUser())
      }
    })
    .catch((error) => {
      console.log(error, 'err_google_auth')
      dispatch(setErrorMsg(error.message))
    })
}

// image upload function
export const ProfileImageHandler = (data, setisVisibleProfilePic) => async dispatch => {
  let { uri, docId, id } = data;
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    let ref = storage.ref().child(new Date().toISOString())
    let snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
      },
      (err) => {
        console.log('err', err);
        blob.close();
        return
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          blob.close();
          setisVisibleProfilePic(false)
          dispatch(UploadProfile(url, docId,))
        })
      }
    )
  }
  catch (e) {
    console.log('err=>>>>', e);
    setisVisibleProfilePic(false)
  }
}

// image save to db function
const UploadProfile = (url, docId,) => async dispatch => {
  try {
    await db.collection('users').doc(docId).update({ photoUrl: url });
    dispatch(getCurrentUser())
  } catch (err) {
    console.log(err, 'err_update_image',)
  }
};

// booking save to db function
export const addBooking = (bok, setisLoader, navigation) => async dispatch => {
  try {
    await db.collection('bookings').add(bok);
    setisLoader(false)
    // navigation.navigate('tabs')
    dispatch(saveTicket(bok))
  } catch (err) {
    console.log(err, 'err_create_booking',)
    setisLoader(false)
    navigation.navigate('tabs')
  }
};

// ticket save to db function
export const saveTicket = (bok) => async dispatch => {
  let ticket = {
    userInfo: bok.userInfo,
    userId: bok.userId,
    departureDate: bok.departureDate,
    returnDate: bok.returnDate,
    paid: true,
  }
  try {
    await db.collection('tickets').add(ticket);
  } catch (err) {
    console.log(err, 'err_create_booking',)
  }
};

// get bookings 
export const fetchBooking = (docId) => async dispatch => {
  db.collection("bookings").where("userId", "==", docId)
    .get()
    .then((querySnapshot) => {
      let booking = []
      querySnapshot.forEach((doc) => {
        booking.push(doc.data())
      });
      console.log(booking, "booking_fetch",);
      dispatch({ type: "set_bookings", payload: booking });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

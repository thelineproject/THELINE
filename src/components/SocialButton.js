import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

const WIDTH = Dimensions.get('window').width
export default function SocialButton(props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={props.onpress}
    >
      <Image
        style={styles.icon}
        source={props.icon}
      />
      <Text style={styles.title}>{props.title}</Text>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  container:
  {
    width: WIDTH - 40,
    height: RFValue(50),
    backgroundColor: '#EDEDED',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.02)',
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: RFValue(16)

  },

  icon:
  {
    width: 20,
    height: 20,
  },
  title:
  {
    color: '#000000',
    fontFamily: 'PoppinsRegular',
    fontSize: RFValue(12),
    marginLeft: RFValue(17)
  }

})

import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

export default DropDown = ({ ...props }) => {
    const { height, width } = Dimensions.get('window');
    return (
        <View style={[styles.container, { height: height / 12, }]}>
            <TouchableOpacity activeOpacity={0.95} style={styles.options}
                onPress={() => props.logout()}
            >
                <Text style={{ color: "black", fontWeight: "bold", marginLeft: 20 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        position: "absolute",
        top: 40,
        right: 10,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 8,
    },
    options: {
        width: "100%",
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        borderBottomColor: "#F5F7FB",
        borderBottomWidth: 1,
    }

})

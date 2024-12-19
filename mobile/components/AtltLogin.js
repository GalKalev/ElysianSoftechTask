import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'

const AtltLogin = ({ disableBtns }) => {
    return (
        <View>
            <View style={styles.orContainer}>
                <View style={styles.orLine}></View>
                <Text style={[styles.orTxt, { fontFamily: 'Lato' }]}>Or</Text>
                <View style={styles.orLine}></View>
            </View>
            <View style={styles.altBtnsContainer}>
                <Pressable
                    style={[styles.altBtn, disableBtns && styles.altBtnDisable]}
                    disabled={disableBtns}
                >
                    <Image source={require('../assets/Google.png')} style={styles.altBtnIcon} />
                    <Text style={[styles.altBtnTxt, { fontFamily: 'Lato' }]}>Google</Text>
                </Pressable>

                <Pressable
                    style={[styles.altBtn, disableBtns && styles.altBtnDisable]}
                    disabled={disableBtns}>
                    <Image source={require('../assets/SocialIcon.png')} style={styles.altBtnIcon} />
                    <Text style={[styles.altBtnTxt, { fontFamily: 'Lato' }]}>Facebook</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '60%',
        alignSelf: 'center',
        marginTop: 6

    },
    orLine: {
        borderTopWidth: 1,
        borderTopColor: '#E6E9FA',
        flex: 1
    },
    orTxt: {
        color: '#828282'
    },

    altBtnsContainer: {
        flexDirection: 'row',
        gap: 10,
        width: '80%',
        marginTop: 15,
    },
    altBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        borderRadius: 40,
        borderColor: "#3949AB",
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 30,
        width: 146
    },
    altBtnDisable: {
        backgroundColor: '#F0F0F0',
        opacity:0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        borderRadius: 40,
        borderColor: "#3949AB",
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 30,
        width: 146
    },
    altBtnIcon: {
        width: 24,
        height: 24,
    },
    altBtnTxt: {
        color: '#3949AB'
    }
})

export default AtltLogin
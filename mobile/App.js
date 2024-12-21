import { Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useCallback, useState } from 'react';
import axios from 'axios';
import {EXPO_SERVER_URL, EXPO_SERVER_PORT} from '@env'

// Fonts imports
import { useFonts } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen'
// Password icons import
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

// Components import
import AltLogin from './components/AtltLogin';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Lato': require("./fonts/Lato/Lato-Regular.ttf")
  })

  // User data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)

  // State to activates the focused style of an input
  const [focusedInput, setFocusedInput] = useState(null)

  // State to disabled button when needed
  const [disableBtns, setDisableBtns] = useState(false)

  // Font import
  const OnLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Function to toggle password visibility
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Handle user submitted data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(`email: ${email}, password: ${password}`);
      setDisableBtns(true)

      const response = await axios.post(`http://${EXPO_SERVER_URL}:${EXPO_SERVER_PORT}/login`, {
        password,
        email: email.toLowerCase()
      });

      ToastAndroid.show(response.data.message, ToastAndroid.SHORT)


    } catch (error) {
      console.error('Error submitting data:', error.response.data.message);
      ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)

    } finally {
      setDisableBtns(false)
    }
  };


  return (
    <View style={styles.container} onLayout={OnLayoutRootView}>
      {/* Logo */}
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      {/* Log in title */}
      <Text style={[styles.title, { fontFamily: 'Lato' }]}>Log in</Text>

      {/* User form */}
      <View style={styles.inputContainer}>
        {/* Email input */}
        <View style={[styles.inputSection, , focusedInput === 'email' && styles.inputFocusedSection]}>
          <MaterialIcons style={styles.inputIcon} name='mail-outline' size={24} color={'#828282'} />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
            placeholderTextColor={'#828282'}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        {/* Password input */}
        <View style={[styles.inputSection, , focusedInput === 'password' && styles.inputFocusedSection]}>
          <MaterialIcons style={styles.inputIcon} name='lock-outline' size={24} color={'#828282'} />

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder='Password'
            placeholderTextColor={'#828282'}
            secureTextEntry={showPassword ? false : true}
            onFocus={() => setFocusedInput('password')}
            onBlur={() => setFocusedInput(null)}

          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons style={styles.inputIcon} name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={'gray'} />
          </Pressable>

        </View>


      </View>

      {/* Forgot password button */}
      <Pressable style={[styles.forgotContainer, disableBtns && styles.forgotDisable]} disabled={disableBtns}>
        <Text style={[styles.forgotTxt, { fontFamily: 'Lato' }]}>Forgot password?</Text>
      </Pressable>

      {/* Log in button */}
      <Pressable
        onPress={handleSubmit}
        style={[styles.loginBtnContainer, email === '' || password === '' || disableBtns? styles.loginBtnContainerDisabled : styles.loginBtnContainerAble]}
        disabled={email === '' || password === '' ? true : false}>
        <Text style={[styles.loginBtnTtx, { fontFamily: 'Lato' }]}>Log in</Text>
      </Pressable>

      {/* Alternative log in methods - google and facebook */}
      <AltLogin disableBtns={disableBtns} />

      <Text style={[styles.registerText, { fontFamily: 'Lato' }]}>Have no account yet?</Text>
      {/* Register button */}
      <Pressable style={[styles.registerBtn, disableBtns && styles.forgotDisable]}>
        <Text style={[styles.registerBtnTxt, { fontFamily: 'Lato' }]}>Register</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 49.23,
    height: 49,
  },

  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: 600,
    color: '#3949AB',
    marginTop: 36,
    marginBottom: 45

  },

  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    gap: 14
  },

  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    width: '100%',
    paddingHorizontal: 10,
    height: 50,

  },

  inputIcon: {
    marginRight: 10,

  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  inputFocusedSection: {
    borderColor: '#5769D4',
    boxShadow: '0px 0px 0px 3px #5769D44D'

  },

  forgotContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    width: '80%',
    marginTop: 15
  },

  forgotTxt: {
    color: '#3949AB',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 16.8,
    textAlign: 'left',
    textUnderlinePosition: 'from-font',
    textDecorationSkipInk: 'none',

  },

  forgotDisable: {
    opacity: 0.5
  },

  loginBtnContainer: {
    width: '80%',
    height: 40,
    padding: '0px 96px 0px 96px',
    gap: 8,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  loginBtnContainerAble: {
    backgroundColor: '#3949AB',
  },

  loginBtnContainerDisabled: {
    backgroundColor: '#a9b1e3',
  },

  loginBtnTtx: {
    color: '#FFFFFF',
    textAlign: 'center'
  },

  registerText: {
    color: '#7B7B7B',
    margin: 20
  },
  registerBtn: {
    borderWidth: 1,
    borderColor: '#3949AB',
    width: '80%',
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  registerBtnTxt: {
    textAlign: 'center',
    color: '#3949AB'
  }


});

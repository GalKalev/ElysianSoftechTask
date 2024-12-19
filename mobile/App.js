import { Image, Pressable, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { useCallback, useState } from 'react';
import axios from 'axios';

// Fonts imports
import { useFonts } from '@expo-google-fonts/lato';
import * as SplashScreen from 'expo-splash-screen'

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AltLogin from './components/AtltLogin';



SplashScreen.preventAutoHideAsync();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Lato': require("./fonts/Lato/Lato-Regular.ttf")
  })

  // User data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false)

  const [focusedInput, setFocusedInput] = useState(null)

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

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Handle user submitted data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(`email: ${email}, password: ${password}`);
      setDisableBtns(true)

      console.log(email.toLowerCase());
      const response = await fetch('http://10.0.0.25:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
          email: email.toLowerCase(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        console.error('Error:', response.status);
        throw Error();
      }


    } catch (error) {
      console.error('Error submitting data:', error.message);
      console.log(error)

    } finally {
      setDisableBtns(false)
    }
  };


  // TODO: delete function later and the onclick of the button
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      console.log(`REG email: ${formData.email}, password: ${formData.password}`);
      const response = await axios.post('http://10.0.0.25:5000/register', {
        password,
        email
      });

      console.log(response.data.message)


    } catch (error) {
      console.error('Error submitting data:', error);

    }
  }


  return (
    <View style={styles.container} onLayout={OnLayoutRootView}>
      <Image source={require('./assets/logo.png')} style={styles.logo} />
      <Text style={[styles.title, { fontFamily: 'Lato' }]}>Log in</Text>

      <View style={styles.inputContainer}>
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

      <Pressable style={[styles.forgotContainer, disableBtns && styles.forgotDisable]} disabled={disableBtns}>
        <Text style={[styles.forgotTxt, { fontFamily: 'Lato' }]}>Forgot password?</Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit}
        style={[styles.loginBtnContainer, email === '' || password === '' ? styles.loginBtnContainerDisabled : styles.loginBtnContainerAble]}
        disabled={email === '' || password === '' ? true : false}>
        <Text style={[styles.loginBtnTtx, { fontFamily: 'Lato' }]}>Log in</Text>
      </Pressable>

      {/* Alternative log in methods - google and facebook */}
      <AltLogin disableBtns={disableBtns} />

      <Text style={[styles.registerText, { fontFamily: 'Lato' }]}>Have no account yet?</Text>

      <Pressable style={[styles.registerBtn, styles.forgotDisable]}>
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
    // backgroundColor:'red'
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
    // backgroundColor:'red',
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

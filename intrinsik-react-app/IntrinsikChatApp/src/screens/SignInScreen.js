import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../actions/auth';
import {BusyLoader} from '../components/busyLoader';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.auth);
  const {errorMessageLogin} = auth;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image source={{uri: 'chat_icon'}} style={{width: 100, height: 100}} />
      <Text style={styles.logo}>Intrinsik OMS</Text>
      <View style={styles.signInWrapper}>
        <Text style={styles.signInText}>Sign In</Text>
      </View>
      {errorMessageLogin && (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={styles.errorMessage}>{errorMessageLogin}</Text>
        </View>
      )}
      <View style={styles.inputView}>
        {email !== '' && <Text style={styles.inputLabel}>Email</Text>}
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#15C39A"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        {password !== '' && <Text style={styles.inputLabel}>Password</Text>}
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#15C39A"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => dispatch(login(email, password))}>
        <Text style={styles.loginText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpBtn}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
      <BusyLoader loading={auth.loggingIn}></BusyLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#9e9d9d',
    marginBottom: 40,
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  inputView: {
    width: '90%',
    height: 50,
    marginBottom: 25,
    justifyContent: 'center',
    padding: 20,
  },
  inputLabel: {
    marginLeft: 5,
    color: '#15C39A',
    fontWeight: 'bold',
  },
  inputText: {
    fontWeight: 'bold',
    height: 50,
    borderBottomColor: '#D2D2D2',
    borderBottomWidth: 1,
  },
  forgot: {
    color: 'white',
    fontSize: 11,
  },
  loginBtn: {
    width: '75%',
    borderRadius: 5,
    backgroundColor: '#15C39A',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signUpBtn: {
    marginTop: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#15C39A',
    fontWeight: 'bold',
  },
  signInWrapper: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 20,
  },
  errorMessage: {
    color: 'red',
  },
});

export default SignInScreen;

import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  NativeModules,
  View,
  DeviceEventEmitter,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('goToResult', comment => {
      navigation.navigate('Result', {comment: comment, email: email});
    });
    return () => {
      listener.remove();
    };
  }, [email]);

  const onPressLogin = async () => {
    if (email.length > 7 && password.length > 7) {
      try {
        let response = await auth().signInWithEmailAndPassword(email, password);
        if (response && response.user) {
          NativeModules.CustomModules.navigateToHome();
        }
      } catch (e) {
        Alert.alert('Login Failed ', 'Your user ID or password is incorrect');
      }
    } else {
      Alert.alert('Email and Password must have at least 8 characters.');
    }
  };

  const onChangeEmail = text => {
    setEmail(text);
  };

  const onChangePassword = text => {
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Log In Now</Text>
        <Text style={styles.subHeading}>
          Please login to continue using app
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={onChangeEmail}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
          onChangeText={onChangePassword}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={onPressLogin}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  subHeading: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#eb2138',
    width: '80%',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 30,
  },
  btnStyle: {
    padding: 5,
    width: 80,
    backgroundColor: 'blue',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#eb2138',
    width: '80%',
    alignItems: 'center',
    padding: 17,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default Login;

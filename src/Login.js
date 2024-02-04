import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
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
  ActivityIndicator,
} from "react-native";

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener("goToResult", (comment) => {
      navigation.navigate("Result", { comment: comment, phoneNo: phoneNo });
    });
    return () => {
      listener.remove();
    };
  }, [phoneNo]);

  const onPressButton = async () => {
    console.log("Check phone nO and OTP", phoneNo, otp);
    if (otpSent) {
      setLoading(true);
      otpSent
        ?.confirm(otp)
        .then((res) => {
          console.log(res);
          setLoading(false);
          NativeModules.CustomModules.navigateToHome();
          setOtpSent(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          Alert.alert("Login Failed ", "Incorrect Otp");
        });
    } else {
      if (phoneNo.length === 10) {
        setLoading(true);
        auth()
          .signInWithPhoneNumber(`+91 ${phoneNo}`)
          .then((res) => {
            setOtpSent(res);
            setLoading(false);
            console.log("===>>>", res);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            Alert.alert("Login Failed ", "Please Enter valid Phone No");
          });
      } else {
        Alert.alert("Login Failed ", "Please Enter valid Phone No");
      }
    }
  };

  const onChange = (text) => {
    otpSent ? setOtp(text) : setPhoneNo(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.heading}>Log In Now</Text>
        <Text style={styles.subHeading}>
          {otpSent ? 'Please enter Otp to login' :'Please enter phone number to login'}
        </Text>
        <TextInput
          style={styles.textInput}
          keyboardType="number-pad"
          placeholder={otpSent ? "Enter otp" : "Phone No"}
          placeholderTextColor={"grey"}
          onChangeText={onChange}
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          disabled={loading}
          onPress={onPressButton}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.btnText}>
              {otpSent ? "Log In" : "Send Otp"}
            </Text>
          )}
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
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "black",
    fontSize: 20,
    fontWeight: "700",
  },
  subHeading: {
    marginBottom: 20,
    color:'#263840'
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#eb2138",
    width: "80%",
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#eb2138",
    width: "80%",
    alignItems: "center",
    padding: 17,
    borderRadius: 5,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default Login;

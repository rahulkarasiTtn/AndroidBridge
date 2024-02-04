import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Result = ({route}) => {
  const {comment, phoneNo} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTxt}>Welcome React Native</Text>
      <View style={styles.flexRow}>
        <Text style={styles.heading}>Phone No : </Text>
        <Text style={styles.text}>{phoneNo}</Text>
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.heading}>Comment : </Text>
        <Text style={styles.text}>{comment}</Text>
      </View>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeTxt: {
    fontSize: 28,
    fontWeight: '700',
    color:'#263840'
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems:"baseline"
  },
  text:{
    color:'#263840',
    fontWeight:'500'
  }
});

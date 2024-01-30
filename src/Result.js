import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Result = ({route}) => {
  const {comment, email} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeTxt}>Welcome React Native</Text>
      <View style={styles.flexRow}>
        <Text style={styles.heading}>User : </Text>
        <Text>{email}</Text>
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.heading}>Comment : </Text>
        <Text>{comment}</Text>
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
});

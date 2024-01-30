import React from 'react';
import Login from './src/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Result from './src/Result';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Result' component={Result}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;

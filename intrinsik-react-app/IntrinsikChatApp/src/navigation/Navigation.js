import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'react-native';
import {logout} from '../actions/auth';
import ChatScreen from '../screens/ChatScreen';
const Stack = createStackNavigator();

export default function Navigation(props) {
  const auth = useSelector((state) => state.auth);
  const userToken = auth.user ? auth.user.token : null;
  const dispatch = useDispatch();
  return (
    <Stack.Navigator style={{backgroundColor: 'red'}}>
      {userToken === null ? (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignIn"
          component={SignInScreen}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'My Message',
              headerRight: () => (
                <Button
                  onPress={() => dispatch(logout())}
                  title="Logout"
                  color="#15C39A"
                />
              ),
            }}
          />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

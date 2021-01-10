import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {Text, StyleSheet} from 'react-native';
import {logout} from '../actions/auth';
import ChatScreen from '../screens/ChatScreen';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
const Stack = createStackNavigator();

export default function Navigation(props) {
  const auth = useSelector((state) => state.auth);
  const userToken = auth.user ? auth.user.token : null;
  const dispatch = useDispatch();
  return (
    <Stack.Navigator>
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
              title: 'Intrinsik',
              headerTintColor: '#15C39A',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => dispatch(logout())}
                  style={styles.logout}>
                  <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  logout: {
    backgroundColor: '#15C39A',
    marginRight: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 80,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
});

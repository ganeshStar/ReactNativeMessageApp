import AsyncStorage from '@react-native-community/async-storage';
export async function getAuthAsyncStorage() {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const user = await AsyncStorage.getItem('userData');
    return {
      token,
      user: JSON.parse(user),
    };
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(error);
  }
}

export async function setAuthAsyncStorage(response, endPointtype = 0) {
  if (endPointtype === 0) {
    await AsyncStorage.setItem('userToken', response.data.token);
    await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
    await AsyncStorage.setItem(
      'userMessageItems',
      JSON.stringify(response.data.groups),
    );
  } else {
    await AsyncStorage.setItem(
      'userMessageItems',
      JSON.stringify(response.data.groups),
    );
  }
}

export async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('userMessageItems');
}

export async function getUserAsyncStorage() {
  try {
    const messages = await AsyncStorage.getItem('userMessageItems');
    console.log('messages===', messages);
    return JSON.parse(messages);
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert(error);
  }
}

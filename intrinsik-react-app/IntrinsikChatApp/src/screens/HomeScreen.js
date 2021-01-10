import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {TouchableOpacity, FlatList, View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getChatUserItems} from '../actions/chat';
import {BusyLoader} from '../components/busyLoader';
import {getUserAsyncStorage} from '../services/getAuthAsyncStorage';
import {navigate} from '../services/navRef';
import {Avatar} from 'react-native-elements';
const HomeScreen = ({navigation}) => {
  const [chatListItems, setChatListItems] = useState([]);
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const load = async () => {
    const chatStorage = await getUserAsyncStorage();
    if (chatStorage) {
      var tempArray = [];
      var i = 1;
      chatStorage.forEach((element, index) => {
        tempArray.push({
          key: 'key_' + index,
          userGroupName: element,
          newLastMessage: 'test',
          avatarURL: 'https://picsum.photos/40/40?random=' + i,
        });
        i++;
      });
      setChatListItems(tempArray);
    }
  };

  useEffect(() => {
    dispatch(getChatUserItems());
    load();
  }, [dispatch]);

  const listItemHandler = () => {
    //alert('xx');
    navigation.navigate('Chat');
  };

  const renderListItem = ({item}) => {
    return (
      <>
        <TouchableOpacity onPress={listItemHandler}>
          <View>
            <View style={styles.itemContent}>
              <Avatar
                size="medium"
                rounded
                title="MT"
                source={{
                  uri: item.avatarURL,
                }}
                onPress={() => console.log('Works!')}
              />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  {item.userGroupName}
                </Text>
                <Text>{item.newLastMessage}</Text>
              </View>
            </View>
            <View style={styles.itemseparator}></View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <BusyLoader loading={chat.isloading}></BusyLoader>
      <FlatList
        data={chatListItems}
        renderItem={(item) => renderListItem(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  errorMessage: {
    color: '#ff0000',
  },
  itemseparator: {
    backgroundColor: '#D2D2D2',
    height: 1,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default HomeScreen;

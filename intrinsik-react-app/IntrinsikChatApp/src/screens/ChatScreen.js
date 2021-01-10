import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ChatItem} from '../components/ChatItem';
var randomSentence = require('random-sentence');

const ChatScreen = ({navigation}) => {
  var data = [
    {
      authorId: 1,
      authorUsername: 'Sam',
      text: 'Hello',
      timestamp: getDateWithFormate(),
    },
    {
      authorId: 2,
      authorUsername: 'Denho',
      text: 'Hi..There',
      timestamp: getDateWithFormate(),
    },
  ];
  const [text, setText] = useState('');
  const [messages, setMessages] = useState(data);
  const messgeInputTextRef = useRef();

  useEffect(() => {
    setInterval(() => {
      startConvertion();
    }, 1000);
    setInterval(() => {
      startAnotherConvertion();
    }, 900);
  });
  const onTyping = (text) => {
    if (text && text.length > 0) {
      setText(text);
    }
  };
  const startConvertion = () => {
    var messageTempItem = messages;
    var dummyItem = {
      authorId: 2,
      authorUsername: 'Denho',
      text: randomSentence(),
      timestamp: getDateWithFormate(),
    };
    messageTempItem.splice(0, 0, dummyItem);
    setMessages(messageTempItem);
  };

  const startAnotherConvertion = () => {
    var messageTempItem = messages;
    var dummyItem = {
      authorId: 3,
      authorUsername: 'Smith',
      text: randomSentence(),
      timestamp: getDateWithFormate(),
    };
    messageTempItem.splice(0, 0, dummyItem);
    setMessages(messageTempItem);
  };

  function getDateWithFormate() {
    var d = new Date(),
      dformat =
        [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
  }
  const onSendBtnPressed = () => {
    var tempMessages = messages;
    var msgObj = {
      authorId: 1,
      authorUsername: 'Sam',
      text: text,
      timestamp: getDateWithFormate(),
    };
    tempMessages.splice(0, 0, msgObj);
    setMessages(tempMessages);
    setText('');
    messgeInputTextRef.current.clear();
    Keyboard.dismiss();
  };

  const showListOrSpinner = () => {
    return (
      <FlatList
        inverted
        data={messages}
        extraData={messages}
        renderItem={(item) => renderChatItem(item)}
        keyExtractor={keyExtractor}
      />
    );
  };
  const renderChatItem = ({item}) => {
    return <ChatItem message={item} userId={1} />;
  };
  const keyExtractor = (item, index) => index.toString();
  return (
    <View style={styles.container}>
      {showListOrSpinner()}
      <KeyboardAvoidingView>
        <View style={styles.inputBar}>
          <TextInput
            style={styles.textBox}
            multiline
            ref={messgeInputTextRef}
            placeholder="Type here..."
            onChangeText={(text) => onTyping(text)}
          />

          <TouchableOpacity style={styles.sendBtn} onPress={onSendBtnPressed}>
            <Image
              source={{uri: 'send_icon'}}
              style={{width: 50, height: 50}}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderTopColor: '#D2D2D2',
  },
  textBox: {
    fontSize: 17,
    flex: 1,
    marginLeft: 10,
  },
  sendBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginLeft: 5,
  },
  enabledBtn: {
    backgroundColor: '#476DC5',
  },
  disabledBtn: {
    backgroundColor: '#89a9f4',
  },
});

export default ChatScreen;

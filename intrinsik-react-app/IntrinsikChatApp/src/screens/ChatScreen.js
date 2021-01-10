import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Platform,
  Keyboard,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ChatItem} from '../components/ChatItem';

const ChatScreen = ({navigation}) => {
  var data = [
    {
      authorId: 1,
      authorUsername: 'Sam',
      text: 'Hello',
    },
    {
      authorId: 2,
      authorUsername: 'Denho',
      text: 'Hello hi',
    },
  ];
  const [text, setText] = useState('');
  const [disabled, setdisabled] = useState(true);
  const [messages, setMessages] = useState(data);
  const messgeInputTextRef = useRef();

  useEffect(() => {});
  const onTyping = (text) => {
    if (text && text.length > 0) {
      setText(text);
    }
  };

  const onSendBtnPressed = () => {
    //this.props.sendMessage(this.state.text, this.props.user);
    var tempMessages = messages;
    var msgObj = {
      authorId: 1,
      authorUsername: 'sam',
      text: text,
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

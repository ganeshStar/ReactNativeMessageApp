//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

// create a component
export const ChatItem = (props) => {
  const message = props.message;
  const isMyMessage = message.authorId == props.userId;
  const textContainerExtra = isMyMessage
    ? styles.textContainerRight
    : styles.textContainerLeft;
  return (
    <View style={styles.messageContainer}>
      <View style={[styles.textContainer, textContainerExtra]}>
        <Text style={styles.sender}>{message.authorUsername}</Text>
        <Text style={styles.message}>{message.text}</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  textContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
  },
  textContainerLeft: {
    alignItems: 'flex-start',
    backgroundColor: '#15C39A',
    borderRadius: 15,
    marginRight: 80,
  },
  textContainerRight: {
    alignItems: 'flex-end',
    marginLeft: 80,
    borderRadius: 15,
    borderColor: '#15C39A',
    color: '#15C39A',
    borderWidth: 2,
  },
  message: {
    fontSize: 16,
  },
  sender: {
    fontWeight: 'bold',
    paddingRight: 10,
  },
});

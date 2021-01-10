import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

export const BusyLoader = ({loading}) => {
  if (loading !== undefined && loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#15C39A"
        style={{
          opacity: 1,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
      />
    );
  } else {
    return null;
  }
};

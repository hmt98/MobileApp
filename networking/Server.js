import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
  TextInput,
  SafeAreaView,
  Keybroad,
  keyboardType,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';

const apiBlog = 'https://apiofblog.000webhostapp.com/';
const apiNguoiDung =
  'https://5e57414d4c695f001432fb16.mockapi.io/api/tblNguoiDung';

async function getBlogFromServer() {
  try {
    let respond = await fetch(apiBlog);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {}
}

async function getUserFromServer() {
  try {
    let respond = await fetch(apiNguoiDung);
    let respondJson = await respond.json();
    return respondJson;
  } catch (error) {}
}

export {getBlogFromServer};
export {getUserFromServer};

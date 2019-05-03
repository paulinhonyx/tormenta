import React, { Component } from "react";
import { View } from "react-native";
import {
  Appbar,
  TextInput,
  HelperText,
  Button,
  Dialog,
  Portal,
  Paragraph
} from "react-native-paper";

import styles from "./styles";

export default class Principal extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });
  state = {
    
  };
  render() {
    return (
      <View>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => this.props.navigation.pop()} />
          <Appbar.Content title="Principal" />
        </Appbar.Header>
        
      </View>
    );
  }
}

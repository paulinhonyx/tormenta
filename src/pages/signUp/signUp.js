import React, { Component } from "react";
import { View } from "react-native";
import { Appbar, TextInput, Button, Text } from "react-native-paper";
import PropTypes from "prop-types";

import styles from "../../config/styles";
import api from "../../services/api";

export default class signUp extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func
    }).isRequired
  };

  state = {
    usuario: "katchaca",
    senha: "12345678 ",
    confSenha: "12345678",
    visible: false,
    error: "",
    success: ""
  };
  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  usuarioChange = usuario => this.setState({ usuario });

  senhaChange = senha => this.setState({ senha });

  singUpPress = async () => {
    if (
      this.state.usuario.length === 0 ||
      this.state.senha.length === 0 ||
      this.state.confSenha.length === 0
    ) {
      this.setState(
        { error: "Preencha todos os campos para continuar!" },
        () => false
      );
    } else {
      try {
        await api.post("/cadastro", {
          nome: "katchaca",
          senha: "12345678 "
        });
        console.log(api);
        this.setState({
          success: "Conta criada com sucesso! Redirecionando para o login",
          error: ""
        });
        this.props.navigation.navigate("Home");
        //setTimeout(this.goToLogin, 500);
      } catch (_err) {
        this.setState({
          error:
            "Houve um problema com o cadastro, verifique os dados preenchidos!"
        });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "SignIn" })]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction onPress={() => this.props.navigation.pop()} />
          <Appbar.Content title="Cadastro" />
        </Appbar.Header>
        <TextInput
          label="Usuario"
          style={styles.textContainer}
          value={this.state.usuario}
          onChangeText={this.usuarioChange}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
        <TextInput
          label="Senha"
          style={styles.textContainer}
          value={this.state.senha}
          onChangeText={this.senhaChange}
          secureTextEntry={true}
        />
        <TextInput
          label="Confirmar Senha"
          style={styles.textContainer}
          value={this.state.confSenha}
          onChangeText={confSenha => this.setState({ confSenha })}
          secureTextEntry={true}
        />
        {this.state.error.length !== 0 && <Text>{this.state.error}</Text>}
        <Button
          style={styles.cadastrar}
          mode="contained"
          onPress={this.singUpPress}
        >
          Cadastrar
        </Button>
      </View>
    );
  }
}

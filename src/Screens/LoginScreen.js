import { Flex, Input, Button } from "native-base";
import React, { Component } from "react";
import { getDataObject, storeDataObject } from "../Utils/AsyncStorage";
import { theme } from "../Utils/Theme";
import { emailValidator, passwordValidator } from "../Utils/Validator";

class Login extends Component {
  state = {
    email: " ",
    password: " ",
    error: "",
  };

  onRegister = () => {
    this.props.navigation.navigate("REGISTER");
  };
  onLogin = async () => {
    const { email, password } = this.state;

    const emailError = emailValidator(email);
    if (emailError) {
      this.setState({
        error: emailError,
      });
      return;
    }

    const passwordError = passwordValidator(password);
    console.log(passwordError);
    if (passwordError) {
      this.setState({
        error: passwordError,
      });
      return;
    }

    const user = await getDataObject(email.trim());
    if (!user) {
      this.setState({
        error: "Email or Password invalid!",
      });
      return;
    }
    if (user.password !== password) {
      this.setState({
        error: "Password invalid!",
      });
      return;
    }

    // Update storage
    storeDataObject("user", user);

    // Clear error
    this.setState({
      error: "",
    });

    this.props.navigation.navigate("HOME");
  };
  render() {
    return (
      <Flex height="100%" justify="center" align="center" bg="#ccc">
        <Flex
          height={250}
          width="100%"
          justify="center"
          align="center"
          bg="bgPrimary"
        >
          <Input
            bg="#fff"
            variant="underlined"
            w="80%"
            my={10}
            placeholder="Email"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(value) => {
              this.setState({
                email: value,
              });
            }}
          />
          <Input
            bg="#fff"
            variant="underlined"
            w="80%"
            type="password"
            placeholder="Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
            onChangeText={(value) => {
              this.setState({
                password: value,
              });
            }}
          />
          <Flex _text={{ color: "red.800" }} mt={5}>{this.state.error}</Flex>
        </Flex>
        <Flex
          bg="bgSecondary"
          height={100}
          width="100%"
          direction="row"
          align="center"
          justifyContent="space-between"
        >
          <Button
            style={theme.ButtonPrimary}
            ml="10%"
            onPress={this.onLogin}
            w={100}
          >
            SUBMIT
          </Button>
          <Button
            _pressed={{ bg: "transparent" }}
            colorScheme="light"
            onPress={this.onRegister}
            variant="link"
            mr="10%"
            height={50}
            padding={0}
          >
            Register
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default Login;

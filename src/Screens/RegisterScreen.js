import React, { Component } from "react";
import { Flex, Input, Button } from "native-base";
import { storeDataObject } from "../Utils/AsyncStorage";
import { theme } from "../Utils/Theme";
import { emailValidator, passwordValidator } from "../Utils/Validator";

class Register extends Component {
  state = {
    email: " ",
    password: " ",
    confirmPassword: "",
    error: "",
  };

  onLogin = () => {
    this.props.navigation.navigate("LOGIN");
  };
  onRegister = () => {
    const { email, password, confirmPassword } = this.state;

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

    if (password.trim() !== confirmPassword.trim()) {
      this.setState({
        error: "Password and Confirm Password not match ! ",
      });
      return;
    }
    storeDataObject(email, { email, password, maxCount: 3 });
    this.props.navigation.navigate("LOGIN");
  };
  render() {
    return (
      <Flex h="100%" justify="center" align="center" bg="#ccc">
        <Flex
          h={350}
          w="100%"
          justify="center"
          align="center"
          bg="bgPrimary"
        >
          <Input
            bg="#fff"
            variant="underlined"
            w="80%"
            my={10}
            onChangeText={(value) => {
              this.setState({
                email: value,
              });
            }}
            placeholder="Email"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
          <Input
            bg="#fff"
            variant="underlined"
            w="80%"
            onChangeText={(value) => {
              this.setState({
                password: value,
              });
            }}
            type="password"
            placeholder="Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
          <Input
            mb={5}
            bg="#fff"
            variant="underlined"
            w="80%"
            mt={10}
            onChangeText={(value) => {
              this.setState({
                confirmPassword: value,
              });
            }}
            type="password"
            placeholder="Confirm Password"
            _light={{
              placeholderTextColor: "blueGray.400",
            }}
            _dark={{
              placeholderTextColor: "blueGray.50",
            }}
          />
          <Flex _text={{ color: "red.800" }}>{this.state.error}</Flex>
        </Flex>
        <Flex
          bg="bgSecondary"
          h={100}
          width="100%"
          direction="row"
          align="center"
          justifyContent="space-between"
        >
          <Button
            style={theme.ButtonPrimary}
            ml="10%"
            onPress={this.onRegister}
            w={100}
            h={50}
          >
            Register
          </Button>
          <Button
            _pressed={{ bg: "transparent" }}
            colorScheme="light"
            onPress={this.onLogin}
            h={50}
            variant="link"
            mr="10%"
            padding={0}
          >
            Login
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default Register;

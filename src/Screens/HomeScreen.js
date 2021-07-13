import { Text, Flex, Button, FlatList, HamburgerIcon, Menu } from "native-base";
import React, { Component } from "react";
import { getDataObject, storeDataObject } from "../Utils/AsyncStorage";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { Alert, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { testData } from "../Utils/TestData";

class Home extends Component {
  state = {
    date: new Date(),
    mode: "date",
    show: false,
    array: testData,
    vote: 3,
    user: {},
  };

  async componentDidMount() {
    const { array, date } = this.state;

    // Store data into core array
    storeDataObject("coreArray", array);

    const user = await getDataObject("user");
    // Filter item by date
    const arrayNew = array.filter((item) => {
      const result = this.convertDateToTime(date) == item.date;
      if (result) {
        return item;
      }
    });
    this.setState({ user, array: arrayNew });
  }
  onChange = async (event, selectedDate) => {
    const { date } = this.state;
    const currentDate = selectedDate || date;

    // Get data from core array
    const array = await getDataObject("coreArray");

    // Filter item by date
    const arrayNew = array.filter((item) => {
      const result = this.convertDateToTime(currentDate) == item.date;
      if (result) {
        return item;
      }
    });

    // Update state
    this.setState({
      date: currentDate,
      array: arrayNew,
      show: false,
    });
  };
  vote = async (value) => {
    let { user, array } = this.state;

    // Get core array
    let coreArray = await getDataObject("coreArray");
    if (user.maxCount === 0) {
      Alert.alert("See you again", "You've run out of votes", [{ text: "OK" }]);
      return;
    }

    // Update array state
    array = this.updateArray(array, value);

    // Update array core
    coreArray = this.updateArray(coreArray, value);

    // Update max count
    const index = array.findIndex((item) => item.name === value);
    if (array[index].active) {
      user.maxCount -= 1;
    } else {
      user.maxCount += 1;
    }
    this.setState({
      array: array,
      user,
    });

    storeDataObject("coreArray", coreArray);
    storeDataObject(user.email, user);
  };

  updateArray = (array, value) => {
    const index = array.findIndex((item) => item.name === value);
    if (array[index].active) {
      array[index].count = array[index].count - 1;
    } else {
      array[index].count = array[index].count + 1;
    }
    array[index].active = !array[index].active;
    return array;
  };

  convertDateToTime = (myDate) => {
    var dd = String(myDate.getDate()).padStart(2, "0");
    var mm = String(myDate.getMonth() + 1).padStart(2, "0"); // January is 0!
    var yyyy = myDate.getFullYear();

    myDate = dd + "-" + mm + "-" + yyyy;
    return myDate;
  };

  render() {
    let { date, array, mode, show, user } = this.state;
    return (
      <Flex h="100%">
        <Flex
          pt={10}
          px={5}
          bg="bgPrimary"
          direction="row"
          justifyContent="space-between"
        >
          <Flex
            justifyContent="center"
            pr={3}
            direction="row"
            alignItems="center"
          >
            <Menu
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="More options menu"
                    {...triggerProps}
                  >
                    <HamburgerIcon color="#fff" />
                  </Pressable>
                );
              }}
            >
              <Menu.Item>
                <Button
                  colorScheme="primary"
                  onPress={() => {
                    user.maxCount = 3;
                    storeDataObject(user.email, user);
                    this.setState({
                      user,
                    });
                    Alert.alert("Congratulations", "You can continue to vote!", [{ text: "OK" }]);
                  }}
                >
                  Reset votes of user
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button
                  colorScheme="primary"
                  onPress={() => {
                    this.props.navigation.navigate("LOGIN");
                  }}
                >
                  Logout
                </Button>
              </Menu.Item>
            </Menu>
            {Platform.OS === "ios" && (
              <DateTimePicker
                width={200}
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.onChange}
              />
            )}
            {Platform.OS === "android" && (
              <Flex>
                <Button
                  _pressed={{ bg: "transparent" }}
                  bg="transparent"
                  onPress={() => {
                    this.setState({
                      show: true,
                    });
                  }}
                  endIcon={
                    <AntDesign name="caretdown" size={12} color="#fff" />
                  }
                >
                  {this.convertDateToTime(date)}
                </Button>
                {show && (
                  <DateTimePicker
                    width={200}
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                  />
                )}
              </Flex>
            )}
          </Flex>
          <Button
            _pressed={{ bg: "transparent" }}
            padding={0}
            bg="transparent"
            startIcon={
              <FontAwesome name="user-circle-o" size={24} color="#fff" />
            }
          ></Button>
        </Flex>
        <FlatList
          data={array}
          renderItem={({ item }) => (
            <Flex p={5}>
              <Flex direction="row" bg="bgSecondary" w="100%">
                <Flex width="50%" justifyContent="center" pl={3}>
                  {item.name}
                </Flex>
                <Flex width="50%" alignItems="flex-end">
                  <Button
                    onPress={() => this.vote(item.name)}
                    w={60}
                    height={50}
                    bg="transparent"
                    endIcon={
                      item.active ? (
                        <FontAwesome name="heart" size={24} color="red" />
                      ) : (
                        <FontAwesome name="heart-o" size={24} color="#fff" />
                      )
                    }
                  >
                    {item.count.toString()}
                  </Button>
                </Flex>
              </Flex>
              <Flex
                height={200}
                width="100%"
                alignItems="flex-end"
                justifyContent="center"
                alignItems="center"
                bg="bgPrimary"
              >
                <Text color="#fff" p={5}>
                  {item.content}
                </Text>
              </Flex>
            </Flex>
          )}
          keyExtractor={(item) => item.name}
        />
      </Flex>
    );
  }
}

export default Home;

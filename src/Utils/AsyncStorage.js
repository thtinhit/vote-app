import AsyncStorage from "@react-native-async-storage/async-storage";

// Storing string value
const storeDataString = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("error " + e);
  }
};

// Storing object value
const storeDataObject = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log("error " + e);
  }
};

// Reading string value
const getDataString = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Value previously stored
    }
  } catch (e) {
    console.log("error " + e);
  }
};

// Reading object value
const getDataObject = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log("error " + e);
  }
};
const removeDataObject = async (keyDataObject, keyStore, listData) => {
  try {
    var newArrayList = [];
    // Create list data not contain object is removed
    newArrayList = listData.list?.filter(
      (item) => item.buildingName != keyDataObject
    );
    const newdata = { list: newArrayList };
    // Update store
    storeDataObject(keyStore, newdata);

    return newdata;
  } catch (e) {
    console.log("error " + e);
  }
};

export {
  storeDataString,
  storeDataObject,
  getDataString,
  getDataObject,
  removeDataObject
};

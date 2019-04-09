import AsyncStorage from '@react-native-community/async-storage';
import getById from "../scripts/GetById.js";
import dearray from "../scripts/Dearray.js";
import update from "../scripts/Update.js";

export default async function auth() {

  try {
    const id = await AsyncStorage.getItem("id");
    const api_token = await AsyncStorage.getItem("api_token")
    if (id !== null && api_token !== null) {
      let user = await getById(id, "user");
      user = dearray(user);
      if(user.api_token == api_token)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
  }
}

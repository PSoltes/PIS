import { AsyncStorage } from "react-native";
import getById from "../scripts/GetById.js";
import dearray from "../scripts/Dearray.js";
import update from "../scripts/Update.js";

export default async function logOff() {
    console.log("lul");
  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("current_user");
      console.log(value);
      if (value !== null) {
        let user = await getById(value.id, "user");
        user = dearray(user);
        user.api_token = null;
        const response = await update(user, user.id, "user");
      }
    } catch (error) {
        console.log(error);
    }

    removeUser = async () => {
        try {
          await AsyncStorage.removeItem('current_user');
          console.log("navigujem na login");
        } catch (error) {
            console.log(error);
        }
      };
  };
}

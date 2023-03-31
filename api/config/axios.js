// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { baseURL } from "../enviroments/enviroments";

// const getToken = () => {
//   let token = "";

//   AsyncStorage.getItem("token").then((value) => {
//     if (value) {
//       token = value;
//     }
//   });
//   return token;
// };

export const API = (props) => {
  const API_INSTANCE = axios.create({
    baseURL: props?.customUrl || baseURL,
  });

  // const token = null;

  API_INSTANCE.interceptors.request.use(
    (config) => {
      const configuration = config;

      if (configuration.headers) {
        if (props?.contentType) {
          configuration.headers["Content-Type"] = props?.contentType;
        }

        // TODO posible use later
        // if (Object.values(props?.customHeaders || {}).length > 0) {
        // 	configuration.headers = {
        // 		...configuration.headers,
        // 		...props?.customHeaders
        // 	}
        // }
        // if (token) {
        //   configuration.headers.Authorization = `${token}`;
        // }
        if (props?.customAuthorization) {
          configuration.headers.Authorization = `${props?.customAuthorization}`;
        }
      }
      if (props?.no_credentials) {
        configuration.withCredentials = false;
      }
      return configuration;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return API_INSTANCE;
};

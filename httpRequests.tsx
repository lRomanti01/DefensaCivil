import axios from "axios";
import NetInfo from "@react-native-community/netinfo";

const baseUrl = "https://adamix.net/defensa_civil/"

type Configuration = {
  method: string,
  url: string,
  data?: object
}

const fetchData = async (url: string) => {
  const isConnected = await checkInternetConnection();

  if (!isConnected) {
    return { error: "No hay conexión a Internet" };
  }

  try {
    const configuration: Configuration = {
      method: "get",
      url: `${baseUrl}` + url,
    };
    const response = await axios(configuration);
    return response.data;
  } catch (error: any) {
    return error
  }
};

const sendData = async (url: string, data: object) => {
  try {
    const configuration: Configuration = {
      method: "post",
      url: `${baseUrl}` + url,
      data: data,
    };

    const response = await axios(configuration);
    return response.data;
  } catch (error: any) {
    return error
  }
};

const sendDataPut = async (url: string, data: {}) => {
  try {
    const configuration: Configuration = {
      method: "put",
      url: `${baseUrl}` + url,
      data: data,
    };

    const response = await axios(configuration);
    return response.data;
  } catch (error: any) {
    return error
  }
};

const deleteData = async (url: string) => {
  try {
    const configuration: Configuration = {
      method: "delete",
      url: `${baseUrl}` + url,
    };
    const response = await axios(configuration);
    return response.data;
  } catch (error: any) {
    return error
  }
};

const checkInternetConnection = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
};

export { fetchData, sendData, sendDataPut, deleteData };

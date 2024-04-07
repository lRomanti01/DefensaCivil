import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const checkStorage = (key: string, callback: any) => {
  const data = AsyncStorage.getItem(key);
  data.then((response: any) => {
    callback(response);
  });
};

const transformObjetToFormData = (data: object)=> {
  let formData = new FormData();

  if (data != null) {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      formData.append(key, value);
    });
  }
  return formData;
};

const hideLoadingModal = (callback: Function, setShowLoading: Function) => {
  setShowLoading(false);
  callback();
};


const showGoodToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    containerStyle: { backgroundColor: "green", width: "80%" },
  });
};

const showErrorToast = (message: string) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    containerStyle: { backgroundColor: "red", width: "80%" },
  });
};

export { checkStorage, transformObjetToFormData, showErrorToast, showGoodToast, hideLoadingModal };

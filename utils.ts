import AsyncStorage from "@react-native-async-storage/async-storage";

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

export { checkStorage, transformObjetToFormData };

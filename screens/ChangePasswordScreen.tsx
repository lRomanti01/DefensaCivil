import {
  Ionicons,
} from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import InputPassword from "../components/InputPassword";
import { checkStorage, showErrorToast, showGoodToast, transformObjetToFormData } from "../utils";
import { sendData } from "../httpRequests";
import { ApiResponse } from "../types";

interface UserData {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  token?: string;
}

interface Password {
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmation: string;
}

export default function ChangePasswordScreen({ navigation, route }: any) {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    checkStorage("USER_DATA", (data: string) => {
      setUser(JSON.parse(data));
    });
  }, []);

  const updatePassword = (data: Password) => {
    if(data.newPassword != data.newPasswordConfirmation){
        showErrorToast("Las contraseñas no coinciden")
        return
    }

    const dataToSend = {
        token: user.token,
        clave_anterior: data.oldPassword,
        clave_nueva: data.newPassword
    }

    const newValues = transformObjetToFormData(dataToSend)

    const url = "def/cambiar_clave.php"
    sendData(url, newValues).then((response: ApiResponse) => {
        if(response.exito){
            navigation.goBack()
            showGoodToast("La contraseña se ha cambiado correctamente")
        } else {
            showErrorToast("Clave actual incorrecta")
            console.log(response.mensaje)
        }
    }).catch((err) => {
        showErrorToast("Error al cambiar contraseña")
    }) 
  };

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "flex-end", marginHorizontal: 5 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <View
            style={{
              borderRadius: 5,
              marginHorizontal: 5,
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={35}
              style={{ color: "#000" }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <Text
          style={{
            fontSize: 25,
            color: "#000",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Cambiar contraseña
        </Text>
      </View>

      <Formik
        initialValues={{
          oldPassword: "",
          newPassword: "",
          newPasswordConfirmation: "",
        }}
        onSubmit={(values) => updatePassword(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <View style={styles.inputContainer}>
                <InputPassword
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.oldPassword}
                  inputTitle={"Contraseña actual"}
                  name={"oldPassword"}
                />
              </View>

              <View style={styles.inputContainer}>
                <InputPassword
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.newPassword}
                  inputTitle={"Contraseña nueva"}
                  name={"newPassword"}
                />
              </View>

              <View style={styles.inputContainer}>
                <InputPassword
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.newPasswordConfirmation}
                  inputTitle={"Confirmar contraseña nueva"}
                  name={"newPasswordConfirmation"}
                />
              </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={!values.oldPassword || !values.newPassword || !values.newPasswordConfirmation ? styles.SubmitButtonDisabled :styles.SubmitButton }
                disabled={!values.oldPassword || !values.newPassword || !values.newPasswordConfirmation}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.registerButtonText} >Enviar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "column",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 10,
    width: "90%",
  },
  inputTitle: {
    fontWeight: "500",
    color: "#8B8B97",
  },
  inputIconOther: {
    position: "absolute",
    left: 4,
    top: "35%",
    zIndex: 2,
    padding: 10,
    color: "#0F3D87",
  },
  buttonContainer: {
    padding: 20,
    marginBottom: 10,
  },
  SubmitButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#EB7508",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  SubmitButtonDisabled: {
    width: "100%",
    height: 50,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  registerButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

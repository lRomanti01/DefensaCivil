import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import HeaderComponent from "../components/Header";
import Toast from "react-native-root-toast";
import { sendData } from "../httpRequests";
import asyncStorage from "@react-native-async-storage/async-storage";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { checkStorage, hideLoadingModal, showErrorToast, transformObjetToFormData } from "../utils";
import { ApiResponse } from "../types";

export default function SignInScreen({ navigation }: any) {
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [errorMesage, setErrorMesage] = useState<String>("");
  const [error, setError] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);

  useEffect(() => {
    checkStorage("USER_DATA", (response: string) => {
      if (!!response) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "Root",
              screen: "Home",
            },
          ],
        });
      } else {
        setShowLogin(true);
      }
    });
  }, []);

  const onSignIn = (values: object) => {
    setShowLoading(true);
    const url = "def/iniciar_sesion.php";

    /* Utilizar metodo tranformObject para transformar la 
    data del objecto a un FormData que es lo que debe recibir el endpoint */

    const newValues = transformObjetToFormData(values);
    sendData(url, newValues).then((response: ApiResponse) => {
      hideLoadingModal(() => {
        console.log(response);
        if (response.exito) {
          setAuthUser(response.datos);
          console.log(response.datos);
        } else {
          setError(true);
          setErrorMesage(response.mensaje);
        }
      }, setShowLoading);
    });
  };

  const setAuthUser = (data: any[]) => {
    asyncStorage.setItem("USER_DATA", JSON.stringify(data));
    navigation.reset({
      index: 0,
      routes: [{ name: "Root" }],
    });
  };

  function InputPassword({ handleChange, handleBlur, value }: any) {
    const [showPassword, setShowPassword]: any = useState(false);
    const [passwordIcon, setPasswordIcon]: any = useState("eye-slash");

    const toggleShowPassword = () => {
      if (showPassword) {
        setShowPassword(false);
        setPasswordIcon("eye-slash");
      } else {
        setShowPassword(true);
        setPasswordIcon("eye");
      }
    };

    return (
      <>
        <Text style={styles.labelInput}>Password</Text>
        <View style={styles.formInputIcon}>
          <TextInput
            style={[styles.textInput, { zIndex: 1 }]}
            onChangeText={handleChange("clave")}
            onBlur={handleBlur("clave")}
            value={value}
            secureTextEntry={!showPassword}
            keyboardType={!showPassword ? undefined : "visible-password"}
          />
          <FontAwesome
            style={styles.inputIcon}
            name={passwordIcon}
            size={16}
            onPress={() => toggleShowPassword()}
          />
        </View>
      </>
    );
  }

  return (
    <Container keyboard={false}>
      {showLogin && (
        <>
          <HeaderComponent screen="signin" navigation={navigation} />
          <Loading showLoading={showLoading} />
          <View style={styles.body}>
            <Text style={styles.title}>Login</Text>
            <Formik
              initialValues={{ cedula: "40229298068", clave: "Test123456" }}
              onSubmit={(values) => onSignIn(values)}
            >
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <>
                  <Text style={styles.labelInput}>Cedula</Text>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={handleChange("cedula")}
                    onBlur={handleBlur("cedula")}
                    value={values.cedula}
                    autoCapitalize={"none"}
                  />
                  <InputPassword
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    value={values.clave}
                  />

                  {error && (
                    <View
                      style={{
                        alignItems: "center",
                        backgroundColor: "#FDC0C6",
                        paddingVertical: 20,
                        borderRadius: 5,
                        borderLeftWidth: 8,
                        borderColor: "#FC808E",
                        borderRightWidth: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "#C10516",
                          fontWeight: "bold",
                          fontSize: 17,
                        }}
                      >
                        {errorMesage}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.loginButtonText}>Inicia sesión</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={styles.registerLink}>
                      ¿Olvidaste tu contraseña?
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 20,
                    }}
                  >
                    <Text style={styles.registerText}>
                      ¿No tienes una cuenta?
                    </Text>
                    <Text
                      style={styles.registerLink}
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      Registrate
                    </Text>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  title: {
    fontSize: 33,
    fontWeight: "500",
    marginVertical: 15,
    marginBottom: 30,
  },
  labelInput: {
    fontSize: 15,
    color: "#8B8B97",
    marginTop: 20,
  },
  textInput: {
    height: 50,
    width: "100%",
    backgroundColor: "#F7F7F7",
    paddingRight: 45,
    paddingLeft: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  formInputIcon: {
    position: "relative",
    flexDirection: "row",
  },
  inputIcon: {
    position: "absolute",
    right: 5,
    top: "25%",
    zIndex: 2,
    padding: 10,
  },
  forgotPassword: {
    width: 180,
    alignSelf: "flex-end",
    textAlign: "right",
    padding: 5,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#EB7508",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 30,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  registerText: {
    textAlign: "center",
    fontSize: 14,
  },
  registerLink: {
    padding: 5,
    color: "#EB7508",
  },
});

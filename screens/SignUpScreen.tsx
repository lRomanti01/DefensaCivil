import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  Linking,
  Alert,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import HeaderComponent from "../components/Header";
import { fetchData, sendData } from "../httpRequests";
import Toast from "react-native-root-toast";
import asyncStorage from "@react-native-async-storage/async-storage";
import Container from "../components/Container";
import Loading from "../components/Loading";
import { ApiResponse } from "../types";
import { showErrorToast, transformObjetToFormData } from "../utils";

interface registerData {
  cedula: string;
  clave: string;
}

export default function SignUpScreen({ navigation }: any) {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const validationSchema = yup.object().shape({
    nombre: yup.string().required("El campo nombre es requerido"),
    apellido: yup.string().required("El campo apellido es requerido"),
    cedula: yup.string().required("El campo cedula es requerido"),
    correo: yup
      .string()
      .email("Ingresa un email válido")
      .required("El campo email es requerido"),
    telefono: yup.string().required("El campo telefono es requerido"),
    clave: yup
      .string()
      .matches(/\w*[a-z]\w*/, "La contraseña debe tener una letra minuscula")
      .matches(/\w*[A-Z]\w*/, "La contraseña debe tener una letra mayuscula")
      .matches(/\d/, "La contraseña debe tener un numero")
      .min(
        8,
        ({ min }) =>
          "La contraseña debe tener al menos 8 caracteres" +
          min /* `Password must be at least ${min} characters` */
      )
      .required("El campo contraseña es requerido"),
    confirmarClave: yup
      .string()
      .oneOf([yup.ref("clave")], "Las contraseñas no coinciden")
      .required("El campo confirmar contraseña es requerido"),
  });

  const onSignUp = (values: registerData) => {
    const { cedula, clave } = values;
    const newValues = transformObjetToFormData(values);
    const newValuesLogin = transformObjetToFormData({ cedula, clave });

    setShowLoading(true);
    const url = "def/registro.php";
    sendData(url, newValues)
      .then((response: ApiResponse) => {
        hideLoadingModal(() => {
            console.log(response)
          if (response.exito) {
              const url = "def/iniciar_sesion.php";
            sendData(url, newValuesLogin).then((response: ApiResponse) => {
              if (response.exito) {
                console.log(response.datos);
                setAuthUser(response.datos);
              }
            });
          } else {
            showErrorToast(response.mensaje);
          }
        });
      })
      .catch((error) => {
        hideLoadingModal(() => {
          showErrorToast(error);
        });
      });
  };

  const setAuthUser = (data: any[]) => {
    asyncStorage.setItem("USER_DATA", data.toString());
  };

  const hideLoadingModal = (callback: Function) => {
    setShowLoading(false);
    callback();
  };

  function InputPassword({
    handleChange,
    handleBlur,
    value,
    label,
    name,
  }: any) {
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
      <View style={{ backgroundColor: "white" }}>
        <Text style={styles.labelInput}>{label}</Text>
        <View style={styles.formInputIcon}>
          <TextInput
            style={[styles.textInput, { zIndex: 1 }]}
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
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
      </View>
    );
  }

  const handleChangePhone = (text: string) => {
    let formattedText = text.replace(/[^\d]/g, ""); // Eliminar caracteres que no sean dígitos
    let phoneNumber = formattedText;

    if (formattedText.length > 3) {
      phoneNumber = `(${formattedText.substring(0, 3)})`;

      if (formattedText.length > 6) {
        phoneNumber += ` ${formattedText.substring(
          3,
          6
        )}-${formattedText.substring(6, 10)}`;
      } else {
        phoneNumber += ` ${formattedText.substring(3)}`;
      }
    }
    console.log(phoneNumber);
    return phoneNumber;
  };

  return (
    <Container keyboard={false}>
      <Loading showLoading={showLoading} />
      <View style={{ marginBottom: 30 }}>
        <HeaderComponent navigation={navigation} />
      </View>

      <Text style={styles.title}>Registrate</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          cedula: "40229298068",
          correo: "romanti159@gmail.com",
          nombre: "Romantiezer",
          apellido: "Rodriguez",
          clave: "Test123456",
          confirmarClave: "Test123456",
          telefono: "",
        }}
        onSubmit={(values: any) => onSignUp(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
          touched,
          setFieldValue,
        }: any) => (
          <View>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              <Text style={styles.labelInput}>Cedula</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("cedula")}
                onBlur={handleBlur("cedula")}
                value={values.cedula}
              />
              <Text style={styles.labelInput}>Nombre</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
              />
              <Text style={styles.labelInput}>Apellido</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("apellido")}
                onBlur={handleBlur("apellido")}
                value={values.apellido}
              />

              <Text style={styles.labelInput}>Email</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={handleChange("correo")}
                onBlur={handleBlur("correo")}
                value={values.correo}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.labelInput}>Teléfono</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(item: any) => {
                  setFieldValue("telefono", handleChangePhone(item));
                }}
                onBlur={handleBlur("telefono")}
                value={values.telefono}
                maxLength={14}
              />

              <InputPassword
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.clave}
                label={"Contraseña"}
                name={"clave"}
              />
              <InputPassword
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.confirmarClave}
                label={"Confimar contraseña"}
                name={"passwordConfirmation"}
              />
            </ScrollView>

            <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
              <TouchableOpacity
                style={
                  Object.keys(errors).length > 0
                    ? styles.registerButton
                    : styles.registerButtonDisabled
                }
                onPress={() =>
                  Object.keys(errors).length > 0
                    ? console.log(errors)
                    : handleSubmit()
                }
              >
                <Text style={styles.registerButtonText}>Registrate</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>

        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("SignIn")}
        >
          Iniciar Sesión
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  termCoditions: {
    // flex: 1,
    paddingHorizontal: 16,
    // marginBottom:40,
    color: "#128780",
  },

  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
    justifyContent: "center",
  },
  label: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 33,
    fontWeight: "500",
    marginBottom: 5,
    paddingLeft: 25,
  },
  labelInput: {
    fontSize: 15,
    color: "#8B8B97",
    marginTop: 10,
  },
  textInput: {
    height: 50,
    width: "100%",
    borderColor: "#F7F7F7",
    borderWidth: 2,
    backgroundColor: "#F7F7F7",
    paddingRight: 45,
    paddingLeft: 20,
    borderRadius: 5,
  },
  formInputIcon: {
    position: "relative",
    flexDirection: "row",
  },
  inputIcon: {
    position: "absolute",
    right: 5,
    top: "15%",
    zIndex: 2,
    padding: 10,
  },
  errorText: {
    maxHeight: 20,
    textAlign: "center",
  },
  registerButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#EB7508",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  registerButtonDisabled: {
    width: "100%",
    height: 50,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 20,
  },

  registerButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
  },
  loginLink: {
    padding: 5,
    color: "#EB7508",
  },
  dropdown: {
    height: 50,
    borderBottomColor: "gray",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#CCCCCD",
    paddingLeft: 10,
    fontWeight: "500",
  },
  selectedTextStyle: {
    height: 50,
    width: "100%",
    borderColor: "#F7F7F7",
    borderWidth: 0.5,
    backgroundColor: "#F7F7F7",
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 13,
    borderRadius: 5,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 50,
    borderColor: "#F7F7F7",
    backgroundColor: "#F7F7F7",
    borderRadius: 5,
  },
  scrollViewContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

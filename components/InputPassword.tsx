import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function InputPassword({ handleChange, handleBlur, value, name, inputTitle }: any) {
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
    }
  
    return (
      <>
        <Text style={styles.labelInput}>{inputTitle}</Text>
        <View style={styles.formInputIcon}>
          <TextInput
            style={[styles.textInput, { zIndex: 1 }]}
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
            placeholder="Ingresa una contraseña..."
            value={value}
            secureTextEntry={!showPassword}
            keyboardType={!showPassword ? undefined : "visible-password"}
          />
          <Ionicons
            style={styles.inputIconOther}
            name="lock-closed"
            size={20}
            color="black"
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


const styles = StyleSheet.create({
    labelInput: {
      fontSize: 15,
      color: "#8B8B97"
    },
    textInput: {
      height: 50,
      width: "100%",
      backgroundColor: "#F7F7F7",
      paddingRight: 45,
      paddingLeft: 40,
      borderRadius: 5,
      marginVertical: 10,
      borderBottomColor: "red",
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
      color: "#EB7508",
    },
    inputIconOther: {
      position: "absolute",
      left: 4,
      top: "20%",
      zIndex: 2,
      padding: 10,
      color: "#EB7508",
    },
  });
  
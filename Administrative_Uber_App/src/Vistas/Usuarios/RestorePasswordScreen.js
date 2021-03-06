import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Alert, View } from 'react-native';


import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitulo,
    Subtitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    StyledScroll
} from '../../Componentes/styleUser';

const { color2, color6, color5 } = Colors;

import { IP, RESTABLECERCONTRA, PORT } from '@env';



const RestorePassword = ({ navigation }) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [hidePassword2, setHidePassword2] = useState(true);
    const Ruta = "http://" + IP + ":" + PORT + RESTABLECERCONTRA;
    return (
        <StyledScroll>
            <StyledContainer>
                <StatusBar style="light" />
                <InnerContainer>
                    <PageLogo resizeMode="contain" source={require('../../../assets/img/LogouBER2.png')} />
                    <PageTitulo>Sistema de Uber</PageTitulo>
                    <Subtitle>Iniciar Sesión</Subtitle>

                    <Formik
                        initialValues={{ pin: '', contrasenia: '',confirmarContrasenia:'' }}
                        onSubmit={async (values) => {
                            try {
                                // console.log(values);
                                const respuesta = await fetch(Ruta, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(values)
                                });

                                const json = await respuesta.json();
                                const data = json.Información;

                                if(json.Titulo == "Restablecer Contraseña")
                                {
                                    navigation.navigate("Login");
                                }
                                else
                                {
                                    console.log("Error");
                                }
                                
                                console.log("Mensaje: ", json.Mensaje);
                                Alert.alert("Aviso", json.Mensaje);


                            } catch (error) {
                                console.log(error);
                                Alert.alert("Error", "error: " + error.message);
                            }

                        }} >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Pin de Recuperacion"
                                    icon="person"
                                    placeholder="Ingrese su pin"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('pin')}
                                    onBlur={handleBlur('pin')}
                                    values={values.pin}

                                />

                                <MyTextInput
                                    label="Contraseña"
                                    icon="lock"
                                    placeholder="Ingrese su contraseña"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('contrasenia')}
                                    onBlur={handleBlur('contrasenia')}
                                    values={values.contrasenia}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}

                                />

                                <MyTextInput
                                    label="Confirmar Contraseña"
                                    icon="lock"
                                    placeholder="Ingrese su contraseña"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('confirmarContrasenia')}
                                    onBlur={handleBlur('confirmarContrasenia')}
                                    values={values.confirmarContrasenia}
                                    secureTextEntry={hidePassword2}
                                    isPassword={true}
                                    hidePassword={hidePassword2}
                                    setHidePassword={setHidePassword2}

                                />

                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Aceptar</ButtonText>
                                </StyledButton>
                                <Line />
                             

                                <ExtraView>
                                    <TextLink onPress={() => navigation.navigate("Login")}>
                                        <TextLinkContent>Iniciar Sesión</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </StyledScroll>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={color5} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={color5} />
                </RightIcon>
            )}
        </View>
    )
}



export default RestorePassword;
import React, { useState, ScrollView } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Alert, SectionList, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { IP, CIUDADES, PORT } from '@env';

const Ciudades = ({ navigation }) => {
    const Ruta = "http://" + IP + ":" + PORT + CIUDADES
    return (
        <StyledScroll>
            <StyledContainer>
                <StatusBar style="light" />
                <InnerContainer>
                    <PageTitulo>Registro de Ciudades</PageTitulo>
                    <Formik
                        initialValues={
                            {
                                descripcion_Ciudad: '',
                            }
                        }
                        onSubmit={async (values) => {
                            try {
                                const token = await AsyncStorage.getItem('token');

                                // console.log(Ruta);
                                // console.log(values);

                                const respuesta = await fetch(Ruta, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                        Authorization: 'Bearer ' + token
                                    },
                                    body: JSON.stringify(values)
                                });

                                const json = await respuesta.json();
                                const data = json.Información;
                                console.log(data);


                                console.log("Mensaje: ", json.Mensaje);
                                Alert.alert("Aviso", json.Mensaje);

                            } catch (error) {
                                console.log(error);
                                Alert.alert("Error", "error: " + error.message);
                            }

                        }} > 
                      
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput label="Ciudad"
                                    icon="credit-card"
                                    placeholder="Ingrese la ciudad"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('descripcion_Ciudad')}
                                    onBlur={handleBlur('descripcion_Ciudad')}
                                    values={values.descripcion_Ciudad} />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Registrar Ciudad</ButtonText>
                                </StyledButton>
                                <Line />
                                <StyledButton btn2={true} onPress={() => navigation.navigate("Menú Principal")}>
                                    <ButtonText btn2={true} >Cancelar</ButtonText>
                                </StyledButton>
                                <Line />
                            </StyledFormArea>
                        )}

                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </StyledScroll>
    );
};
const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={color5} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
        </View>
    )
}
export default Ciudades
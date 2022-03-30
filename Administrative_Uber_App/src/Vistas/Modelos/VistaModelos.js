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
import { IP, MODELOS, PORT } from '@env';

const Modelos = ({ navigation }) => {
    const Ruta = "http://" + IP + ":" + PORT + MODELOS
    return (
        <StyledScroll>
            <StyledContainer>
                <StatusBar style="light" />
                <InnerContainer>
                    <PageTitulo>Registro de Modelos</PageTitulo>
                    <Formik
                        initialValues={
                            {
                                descripcion_Modelo: '',
                                estado_Modelo: '',
                                id_Marca: '',
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
                                <MyTextInput label="Modelo"
                                    icon="credit-card"
                                    placeholder="Ingrese el Modelo"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('descripcion_Modelo')}
                                    onBlur={handleBlur('descripcion_Modelo')}
                                    values={values.descripcion_Modelo} />

                                <MyTextInput label="Estado"
                                    icon="credit-card"
                                    placeholder="Ingrese el Estado"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('estado_Modelo')}
                                    onBlur={handleBlur('estado_Modelo')}
                                    values={values.estado_Modelo} />

                                <MyTextInput label="Marca"
                                    icon="credit-card"
                                    placeholder="Ingrese la Marca"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('id_Marca')}
                                    onBlur={handleBlur('id_Marca')}
                                    values={values.id_Marca} />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Registrar Modelo</ButtonText>
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
export default Modelos
import React, { useState, ScrollView,useEffect } from 'react';
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
import { IP, EDITARCIUDADES, PORT } from '@env';

const EditarCiudades = ({ navigation }) => {
    
    const [Ciudades,setCiudades] = useState([]);
    useEffect(async () => {
        const dataCiudades = JSON.parse(await AsyncStorage.getItem('DataCiudades'));
        setCiudades(dataCiudades);
    }, []);

    console.log(Ciudades);
    return (
        <StyledScroll>
            <StyledContainer>
                <StatusBar style="light" />
                <InnerContainer>
                    <PageTitulo>Editar Ciudades</PageTitulo>
                    {Ciudades?.Ciudad && (
                    <Formik
                        initialValues={
                            {
                                descripcion_Ciudad: Ciudades?.Ciudad,
                            }
                        }
                        onSubmit={async (values) => {
                            try {
                                const Ruta = "http://" + IP + ":" + PORT + EDITARCIUDADES + "id_Ciudad=" + Ciudades?.Id;
                                
                                
                                const token = await AsyncStorage.getItem('token');

                                // console.log(Ruta);
                                // console.log(values);

                                const respuesta = await fetch(Ruta, {
                                    method: 'PUT',
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
                                navigation.navigate("Menú Principal");
                                
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
                                    defaultValue={Ciudades?.Ciudad}
                                    onChangeText={handleChange('descripcion_Ciudad')}
                                    onBlur={handleBlur('descripcion_Ciudad')}
                                    values={values.descripcion_Ciudad} />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Editar Ciudad</ButtonText>
                                </StyledButton>
                                <Line />
                                <StyledButton btn2={true} onPress={() => navigation.navigate("Menú Principal")}>
                                    <ButtonText btn2={true} >Cancelar</ButtonText>
                                </StyledButton>
                                <Line />
                            </StyledFormArea>
                        )}

                    </Formik>
                    )}
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
export default EditarCiudades
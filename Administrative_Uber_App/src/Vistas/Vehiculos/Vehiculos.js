import React, { useState, ScrollView } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Alert, SectionList, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker'

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
import { IP, VEHICULOS, PORT, LISTARVEHICULOS } from '@env';

const Vehiculos = ({ navigation }) => {

    const Ruta = "http://" + IP + ":" + PORT + VEHICULOS
    const RutaListar = "http://" + IP + ":" + PORT + LISTARVEHICULOS

    const Lista = ["Vehiculo","Pera"];
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: Lista[0], value: 3 },
        { label: Lista[1], value: 4 }
    ])

    return (          
            <StyledContainer>
                <StatusBar style="light" />
                <InnerContainer>

                    <PageTitulo>Registro de Vehículos</PageTitulo>
                    <Formik
                        initialValues={
                            {
                                placa: '',
                                anio: '',
                                id_Modelo: '',
                                color: '',
                                descripcion_Modelo: ''
                            }}
                        onSubmit={async (values) => {

                            try {
                                const token = await AsyncStorage.getItem('token');

                                //Peticion para guardar vehiculos
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

                                <MyTextInput
                                    label="Placa"
                                    icon="credit-card"
                                    placeholder="Ingrese la Placa"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('placa')}
                                    onBlur={handleBlur('placa')}
                                    values={values.placa}
                                />

                                <MyTextInput
                                    label="Año"
                                    icon="person"
                                    placeholder="Ingrese el Año"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('anio')}
                                    onBlur={handleBlur('anio')}
                                    values={values.anio}
                                />
                                <View>
                                    <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        onSelectItem = {(item) =>{
                                            values.id_Modelo = value;
                                        }}
                                        style = {{backgroundColor: color5}}
                                    />
                                </View>

                                <MyTextInput
                                    label="Color"
                                    icon="person"
                                    placeholder="Ingrese el color"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('color')}
                                    onBlur={handleBlur('color')}
                                    values={values.color}
                                />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Registrar Vehículo</ButtonText>
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
export default Vehiculos;
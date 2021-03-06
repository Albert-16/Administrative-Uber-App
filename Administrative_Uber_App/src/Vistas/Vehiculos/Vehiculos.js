import React, { useState, ScrollView, useEffect } from 'react';
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
import { IP, VEHICULOS, PORT, LISTARMODELOSC } from '@env';

const Vehiculos = ({ navigation }) => {

    const Ruta = "http://" + IP + ":" + PORT + VEHICULOS
    const RutaListar = "http://" + IP + ":" + PORT + LISTARMODELOSC
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([])
    
    useEffect(async () => {

        
        const token = await AsyncStorage.getItem('token');
        console.log(RutaListar);
        await fetch(RutaListar, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        })
          .then((res) => res.json()).then((resJson) => {
            setItems(resJson);
          })
          .catch(console.error)          
      }, []);

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
                                descripcion_Modelo: '',
                                nombre: ''
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
                                if(json.Mensaje === "Registro almacenado con éxito.")
                                {
                                    navigation.navigate("AdminVehiculos");
                                }

                            } catch (error) {
                                console.log(error);
                                Alert.alert("Error", "error: " + error.message);
                            }

                        }} >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>

                                <MyTextInput
                                    label="Nombre"
                                    icon="person"
                                    placeholder="Ingrese el nombre"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('nombre')}
                                    onBlur={handleBlur('nombre')}
                                    values={values.nombre}
                                />
                                <MyTextInput
                                    label="Placa"
                                    icon="credit-card"
                                    placeholder="Ingrese la placa"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('placa')}
                                    onBlur={handleBlur('placa')}
                                    values={values.placa}
                                />

                                <MyTextInput
                                    label="Año"
                                    icon="tasklist"
                                    placeholder="Ingrese el año"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('anio')}
                                    onBlur={handleBlur('anio')}
                                    values={values.anio}
                                />
                                <View>
                                <StyledInputLabel>Modelo</StyledInputLabel>
                                <DropDownPicker
                                        open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        onChangeValue = {(value) =>{                                       
                                            values.id_Modelo = value;
                                            console.log(value);
                                        }}
                                        style = {{backgroundColor: color2,marginBottom: open == true ? 100:0 }}
                                        searchable={true}
                                        searchPlaceholder="Escribe el modelo que buscas"
                                        placeholder="Seleccione un Modelo"
                                        theme='DARK'
                                    />
                                </View>

                                <MyTextInput
                                    label="Color"
                                    icon="star"
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
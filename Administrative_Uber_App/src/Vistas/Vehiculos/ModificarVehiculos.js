import React, { useState, ScrollView, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Alert, SectionList, View, SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from 'react-native-dropdown-picker'
import tw from 'tailwind-react-native-classnames'
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
import { IP, VEHICULOS, PORT, LISTARMODELOSC, MODIFICARVEHICULOS } from '@env';


const VehiculosModificar = ({ navigation }) => {

    const Ruta = "http://" + IP + ":" + PORT + VEHICULOS
    const RutaListar = "http://" + IP + ":" + PORT + LISTARMODELOSC
   

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(1);
    const [items, setItems] = useState([]);
    const [estado, setEstado] = useState([{
        label: 'Activo',
        value: 1
    }, {
        label: 'Inactivo',
        value: 0
    }]);
    const [Vehiculos, setVehiculos] = useState([]);
    
    
    
    //console.log(Vehiculos?.Estado)
    useEffect(async () => {
        const token = await AsyncStorage.getItem('token');
        const dataVehiculo = JSON.parse(await AsyncStorage.getItem('DataVehiculos'));
        setVehiculos(dataVehiculo);
        

       
        await fetch(RutaListar, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => res.json()).then((resJson) => {
                console.log(resJson)
                setItems(resJson);
                 
            })
            .catch(console.error)


             
    }, []);

    
   
    
    return (

        <StyledContainer>
            <StatusBar style="light" />
            <InnerContainer>

                <PageTitulo>Modificar Vehículo</PageTitulo>
                {Vehiculos?.Estado && (
                <Formik
                    initialValues={
                        {
                            placa: Vehiculos?.Placa,
                            anio: Vehiculos?.Año,
                            id_Modelo: Vehiculos?.id_Modelo,
                            color: Vehiculos?.Color,
                            nombre: Vehiculos?.title,
                            estado: 1
                        }}
                    onSubmit={async (values) => {

                        try {                           
                            const RutaModificar = "http://" + IP + ":" + PORT + MODIFICARVEHICULOS + "id_Vehiculo=" + Vehiculos?.Id;

                            const token = await AsyncStorage.getItem('token');
                            //Peticion para guardar vehiculos
                            const respuesta = await fetch(RutaModificar, {
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
                            if(json.Titulo == "Registro Actualizado"){
                                navigation.navigate("Menú Principal");
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
                                label="Nombre"
                                icon="person"
                                defaultValue={Vehiculos?.title}
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
                                defaultValue={Vehiculos?.Placa}
                                onChangeText={handleChange('placa')}
                                onBlur={handleBlur('placa')}
                                values={values.placa}
                            />

                            <MyTextInput
                                label="Año"
                                icon="tasklist"
                                defaultValue={String(Vehiculos?.Año)}
                                placeholder="Ingrese el año"
                                placeholderTextColor={color5}
                                onChangeText={handleChange('anio')}
                                onBlur={handleBlur('anio')}
                                values={values.anio}
                            />

                            <View>
                            <StyledInputLabel>Estado</StyledInputLabel>
                                <DropDownPicker
                                    open={open2}
                                    value={value2}
                                    items={estado}
                                    setOpen={setOpen2}
                                    setValue={setValue2}
                                    setItems={setEstado}
                                    onChangeValue={(value) => {
                                        values.estado = value;
                                        //console.log(value);
                                    }}
                                    style={{ backgroundColor: color2 }}
                                   
                                    placeholder="Seleccione un Estado"
                                    theme='DARK'
                                />
                            </View>

                            <MyTextInput
                                label="Color"
                                icon="star"
                                defaultValue={Vehiculos?.Color}
                                placeholder="Ingrese el color"
                                placeholderTextColor={color5}
                                onChangeText={handleChange('color')}
                                onBlur={handleBlur('color')}
                                values={values.color}
                            />

                            


                            <View style={tw`flex-grow`}>
                            <StyledInputLabel>Modelo</StyledInputLabel>
                                <DropDownPicker
                                    open={open}
                                    value={Vehiculos?.id_Modelo}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    onChangeValue={(value) => {
                                        values.id_Modelo = value;
                                        //console.log(value);
                                    }}
                                    style={{ backgroundColor: color2 }}
                                    searchable={true}
                                    searchPlaceholder="Escribe el modelo que buscas"
                                    placeholder="Seleccione un Modelo"
                                    theme='DARK'
                                />
                            </View>

                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Modificar Vehículo</ButtonText>
                            </StyledButton>
                            <Line />
                            <StyledButton btn2={true} onPress={() => navigation.navigate("Menú Principal")}>
                                <ButtonText btn2={true} >Cancelar</ButtonText>
                            </StyledButton>


                        </StyledFormArea>
                    )}
                </Formik>
                )}
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
export default VehiculosModificar;
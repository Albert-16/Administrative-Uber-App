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
import { IP, MODELOS, PORT, LISTARMARCASC } from '@env';

const Modelos = ({ navigation }) => {
    const Ruta = "http://" + IP + ":" + PORT + MODELOS
    const RutaListar = "http://" + IP + ":" + PORT + LISTARMARCASC
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(1);
    const [estado, setEstado] = useState([{
        label: 'Activo',
        value: 1
    }, {
        label: 'Inactivo',
        value: 0
    }]);
    //console.log(RutaListar);
    useEffect(async () => {
        const token = await AsyncStorage.getItem('token');

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
                            //console.log(values);

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


                            <View>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onChangeValue={(value) => {
                                    values.id_Marca = value;
                                   
                                }}
                                style={{ backgroundColor: color2}}
                                searchable={true}
                                searchPlaceholder="Escribe la marca que buscas"
                                placeholder="Seleccione una marca"
                                theme='DARK'
                            />
                            </View>

                        
                            <View>

                            <DropDownPicker

                                open={open2}
                                value={value2}
                                items={estado}
                                
                                setOpen={setOpen2}
                                setValue={setValue2}
                                setItems={setEstado}
                                onChangeValue={(value) => {
                                    values.estado_Modelo = value;
                                    console.log(value);
                                }}
                                style={{ backgroundColor: color2, marginTop: open === true ? 200:0}}

                                placeholder="Seleccione un Estado"
                                theme='DARK'
                            />
                            </View>
                           
                           

                            <StyledButton style={{marginTop:100}} onPress={handleSubmit}>
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
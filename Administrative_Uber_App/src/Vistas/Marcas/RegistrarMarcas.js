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
import { IP, MARCAS, PORT } from '@env';
import DropDownPicker from 'react-native-dropdown-picker';
const Marcas = ({ navigation }) => {
    const Ruta = "http://" + IP + ":" + PORT + MARCAS
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Activo', value: '1' },
        { label: 'Inactivo', value: '0' }
    ]);
    return (
       
            <StyledContainer>
                <StatusBar style="light" />
                <InnerContainer>
                    <PageTitulo>Registro de Marcas</PageTitulo>
                    <Formik
                        initialValues={
                            {
                                descripcion_Marca: '',
                                estado_Marca: '',
                            }
                        }
                        onSubmit={async (values) => {
                            try {
                                //console.log(values)
                                
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
                                <MyTextInput label="Marca"
                                    icon="credit-card"
                                    placeholder="Ingrese la marca"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('descripcion_Marca')}
                                    onBlur={handleBlur('descripcion_Marca')}
                                    values={values.descripcion_Marca} />

                                <DropDownPicker
                                    open={open}
                                    style={{backgroundColor: color2,height:60}}
                                    value={value}
                                    items={items}
                                    setOpen={setOpen}
                                    setValue={setValue}
                                    setItems={setItems}
                                    onChangeValue={(value)=> {
                                        values.estado_Marca = value
                                    }}
                                    theme="DARK"
                                    placeholder='Seleccione un Estado'
                                />

                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Registrar Marca</ButtonText>
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
export default Marcas
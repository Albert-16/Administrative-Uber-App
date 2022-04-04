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
import { IP, EDITARMARCAS, PORT } from '@env';
import DropDownPicker from 'react-native-dropdown-picker';
const Marcas = ({ navigation }) => {
    
    
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(1);
    const [Marcas,setMarcas]= useState([])
    const [items, setItems] = useState([
        { label: 'Activo', value: '1' },
        { label: 'Inactivo', value: '0' }
    ]);


    useEffect(async () => {
        const dataMarcas = JSON.parse(await AsyncStorage.getItem('DataMarcas'));
        setMarcas(dataMarcas);
    }, []);

    
    return (
       
            <StyledContainer>
                <StatusBar style="light" />
                <InnerContainer>
                    <PageTitulo>Editar Marcas</PageTitulo>
                {Marcas?.Id  && (
                    <Formik
                        initialValues={
                            {
                                descripcion_Marca: Marcas?.Marca,
                                estado_Marca: 1,
                            }
                        }
                        onSubmit={async (values) => {
                            try {
                                //console.log(values)
                                
                                const Ruta = "http://" + IP + ":" + PORT + EDITARMARCAS + "id_Marca=" + Marcas?.Id;
                                const token = await AsyncStorage.getItem('token');

                                 console.log(Ruta);
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

                                if(json.Mensaje === "El registro se actualizó correctamente.")
                                {
                                        navigation.navigate("AdminMarcas");
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
                                <MyTextInput label="Marca"
                                    icon="credit-card"
                                    placeholder="Ingrese la marca"
                                    placeholderTextColor={color5}
                                    onChangeText={handleChange('descripcion_Marca')}
                                    onBlur={handleBlur('descripcion_Marca')}
                                    defaultValue={Marcas?.Marca}
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
                                    <ButtonText>Editar Marca</ButtonText>
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
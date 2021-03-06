import React, { useState, useEffect, Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, ActivityIndicator, TextInput, Button, ImageBackground, Image, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';

import { IP, PORT, SUBIRIMAGEN } from '@env';
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
    MenuContainer,
    Line,
    ExtraView,
    ExtraText,
    TextLink,
    TextLinkContent,
    StyledScroll
} from '../../Componentes/styleUser';

const { color2 } = Colors;

export default function SubirImagen({ navigation }) {



    const [cargardo, setCargando] = useState(false);
    const [Vehiculos, setVehiculos] = useState([]);

    const [profileImage, setProfileImage] = useState('');

    useEffect(async () => {
        const token = await AsyncStorage.getItem('token');
        const dataVehiculo = JSON.parse(await AsyncStorage.getItem('DataVehiculos'));
        setVehiculos(dataVehiculo);
    }, []);

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        if (status === 'granted') {
            var response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });

            if (!response.cancelled) {
                setProfileImage(response.uri);
                return;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

    };


    const uploadProfileImage = async () => {


        try {
            const RutaModificar = "http://" + IP + ":" + PORT + SUBIRIMAGEN + "id_Vehiculo=" + Vehiculos?.Id;
            const image = new FormData();
            image.append('img', {
                uri: profileImage,
                type: 'image/jpg',
                name: 'img.jpg'
            });
            console.log(image);

            const response = await fetch(RutaModificar,
                {
                    method: 'POST',
                    body: image,
                }
            );
            const json = await response.json();
            console.log(json);
            //console.log(response);
            Alert.alert("Aviso", json.Mensaje);
            if (json.Mensaje === "El archivo se almacen?? con ??xito.") {
                navigation.navigate("AdminVehiculos");
            }
        }
        catch (error) {
            console.log(error);
        }
    };


    return (
        <StyledContainer>
            {
                cargardo ? (
                    <ActivityIndicator
                        visible={cargardo}
                        size="large"
                        textContent={'Espere...'}
                        textStyle={styles.activiti}
                    />
                ) : (

                    <MenuContainer>
                        <PageTitulo >Actualizar Imagen</PageTitulo>

                        <InnerContainer>

                            <View style={styles.conte1}>



                                <View>

                                    {profileImage ? (
                                        <TouchableOpacity
                                            onPress={openImageLibrary}
                                            style={styles.uploadBtnContainer}
                                        >
                                            <Image
                                                source={{ uri: profileImage }}
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <StyledButton btn2={true} onPress={openImageLibrary} >
                                            <ButtonText>Cargar Imagen</ButtonText>
                                        </StyledButton>
                                    )}



                                </View>
                            </View>
                        </InnerContainer>
                        {profileImage ? (
                            <StyledButton
                                onPress={uploadProfileImage}
                            >
                                <ButtonText>Actualizar</ButtonText>
                            </StyledButton>


                        ) : null}
                        <Button title="Salir"
                            onPress={() => { navigation.navigate("ListarV"); }}
                        ></Button>
                    </MenuContainer>

                )

            }

        </StyledContainer>
    );

}

const styles = StyleSheet.create({
    conte1: {
        width: "115%",
        height: 300,
        backgroundColor: color2,
        paddingTop: 70,
        paddingLeft: 20,
        paddingRight: 25,
        margin: 30,
        borderBottomRightRadius: 100,
        transform: [
            { translateX: -20 }, { translateY: -20 }
        ]
    },
    contenedor: {
        backgroundColor: '#fff',
        margin: 0,
        padding: 20,
        width: "100%",
        height: "100%",
    },
    contenedorPantalla: {
        alignItems: "stretch",
        justifyContent: 'center',
        height: "100%",
        width: "100%",
    },
    nav: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 25
    },
    contproduct: {
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18,
        width: "106%",
        height: 200,
        backgroundColor: "gray",
        transform: [
            { translateX: -10 }
        ]
    },
    text: {
        color: "white",
        fontWeight: "bold"
    },
    textcar: {
        color: "black",
        fontWeight: "bold"
    },
    btnProducto: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "#12A8E0",
        color: "white",
        borderRadius: 15,
    },

    btnCarrito: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        padding: 20,
        marginTop: 10,
        backgroundColor: "#F5F5F5",
        color: "white",
        borderRadius: 15,
    },

    btnCerrar: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: "#CA0505",
        color: "white",
        borderRadius: 15,
    },
    sombraControles: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    titulo: {
        position: "relative",
        right: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        marginLeft: 10
    },
    activiti: {
        color: "#495057",
    },
    entradas: {
        width: "90%",
        height: 50,
        borderColor: "black",
        borderStyle: "solid",
        borderBottomWidth: 2,
        marginTop: 10,
        paddingLeft: 25,
        paddingTop: 10
    },
    controles: {
        flex: 4,
        //backgroundColor: "#29291f",
        marginBottom: 10,
        paddingTop: 1,
        paddingLeft: 40,
        paddingRight: 10,
    },
    contenedorBotones: {
        flex: 1,
        padding: 10,
        justifyContent: "space-evenly",
        flexDirection: "row",
    },
    boton: {
        width: "40%",
        height: 45,
        backgroundColor: "#042996",
        borderRadius: 20,
        flex: 1,
        alignItems: "stretch",
        marginLeft: 10,
        marginRight: 10,
        justifyContent: "center",
        marginTop: 15
    },
    icon: {
        width: "8%",
        left: 235,
        bottom: 28,
        color: "black",
        fontSize: 20
    },
    iconuser: {
        width: "8%",
        right: 0,
        top: 50,
        color: "#ccc",
        fontSize: 20
    }
});
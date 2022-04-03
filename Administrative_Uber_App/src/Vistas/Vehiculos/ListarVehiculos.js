import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Octicons, Ionicons, Fontisto, FontAwesome, Entypo } from '@expo/vector-icons';
import {
    PageTitulo,
    StyledButton,
    Line,
    Colors,
    ButtonText,
} from '../../Componentes/styleUser';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import 'intl';
import 'intl/locale-data/jsonp/es-HN';
const { color5, color2, color6 } = Colors;
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

import { IP, IMAGE, PORT, LISTARVEHICULOS, MetodoPago } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Ruta = "http://" + IP + ":" + PORT + IMAGE;
const RutaListar = "http://" + IP + ":" + PORT + LISTARVEHICULOS;
const RutaMetodoPago = "http://" + IP + ":" + PORT + MetodoPago + "id=";
const LeftContent = props => <Avatar.Icon {...props} style={{ backgroundColor: color6 }} icon="car" />
const ListarVehiculos = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const [ListarVeh, setListarVeh] = useState([]);
    const [Cliente, setCliente] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () => {
        const token = await AsyncStorage.getItem('token');
        setIsLoading(true);

        await fetch(RutaListar, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => res.json()).then((resJson) => {
                setListarVeh(resJson)
            })
            .catch(console.error)
            .finally(() => setIsLoading(false));
    }, []);

    const ListaDatos = ListarVeh.Información;

    const EditarDatos = async () => {
        try {


            const InformacionVehiculo = JSON.stringify(selected);
            await AsyncStorage.setItem('DataVehiculos', InformacionVehiculo);

            if (LISTARVEHICULOS.Titulo == "Lista Vacía") {
                navigation.navigate("Menú Principal");
            }
            else {
                navigation.navigate("Modificar Vehículos");
            }
            
        } catch (error) {
            console.log(error.toString());
        }
    }

    const EditarImagen = async () => {
        try {


            const InformacionVehiculo = JSON.stringify(selected);
            await AsyncStorage.setItem('DataVehiculos', InformacionVehiculo);

            if (LISTARVEHICULOS.Titulo == "Lista Vacía") {
                navigation.navigate("Menú Principal");
            }
            else {
                navigation.navigate("SubirImagen");
            }
            
        } catch (error) {
            console.log(error.toString());
        }
    }



    return (
        <SafeAreaView style={tw`flex-grow bg-black`}>
            <View>
                <View>
                    <PageTitulo style={tw`text-white py-3 text-xl  text-center `}>Lista de Vehículos</PageTitulo>
                    <Line />
                </View>
                <FlatList data={ListaDatos}
                    keyExtractor={(item) => item.Id}
                    scrollEnabled={true}
                    renderItem={({ item: { Id, title, image, multiplier, Estado, Modelo, Marca, Año, Color, Placa, id_Modelo }, item }) => (
                        <TouchableOpacity style={tw`flex-row justify-between px-5 items-center`}
                            onPress={() => setSelected(item)}
                        >
                            <Card
                                style={{
                                    width: '100%',
                                    margin: 5
                                }}
                            >
                                <Card.Title title={title} subtitle={Placa} left={LeftContent} />
                                <Card.Content>
                                    <Paragraph>{Marca}</Paragraph>
                                    <Paragraph>{Modelo}</Paragraph>
                                    <Paragraph>{Año}</Paragraph>
                                    <Paragraph>{Color}</Paragraph>
                                </Card.Content>
                                <Card.Cover source={{ uri: Ruta + image }} />
                                <Card.Actions style={{ padding: 5 }}>
                                    <View style={{ padding: 5 }}>
                                        <StyledButton onPress={() => {
                                            setSelected(item);
                                            EditarDatos();
                                        }} disabled={!selected} >
                                            <ButtonText>Editar</ButtonText>
                                        </StyledButton>
                                    </View>
                                    <View style={{ padding: 5 }}>
                                        <StyledButton btn2={true} onPress={() => {
                                            setSelected(item);
                                            EditarImagen();
                                        }} disabled={!selected}>
                                            <ButtonText>Cambiar Imagen</ButtonText>
                                        </StyledButton>
                                    </View>
                                </Card.Actions>
                            </Card>
                        </TouchableOpacity>
                    )}
                />

                <View style={tw`mt-auto border-t border-gray-200`}>
                    <StyledButton disabled={!selected} style={tw`rounded-full`}
                        onPress={async () => {
                            try {


                                const InformacionVehiculo = JSON.stringify(selected);
                                await AsyncStorage.setItem('DataVehiculos', InformacionVehiculo);

                                if (LISTARVEHICULOS.Titulo == "Lista Vacía") {
                                    navigation.navigate("Menú Principal");
                                }
                                else {
                                    navigation.navigate("Modificar Vehículos");
                                }
                                console.log(DataViajes);
                            } catch (error) {
                                console.log(error.toString());
                            }

                        }}
                    >
                        <Text style={tw`text-white text-center text-xl`}>Editar {selected?.title} {selected?.Año}</Text>
                    </StyledButton>
                </View>
            </View>

        </SafeAreaView>

    )
}

export default ListarVehiculos;

const styles = StyleSheet.create({});
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Octicons, Ionicons, Fontisto, FontAwesome, Entypo } from '@expo/vector-icons';
import {
    PageTitulo,
    StyledButton,
    Line,
    Colors,
} from '../../Componentes/styleUser';

import 'intl';
import 'intl/locale-data/jsonp/es-HN';
const { color5 } = Colors;
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

import { IP, IMAGE, PORT, LISTARVEHICULOS, MetodoPago } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Ruta = "http://" + IP + ":" + PORT + IMAGE;
const RutaListar = "http://" + IP + ":" + PORT + LISTARVEHICULOS;
const RutaMetodoPago = "http://" + IP + ":" + PORT + MetodoPago + "id=";



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
                    renderItem={({ item: { Id, title, image, multiplier,Estado,Modelo,Marca,Año }, item }) => (
                        <TouchableOpacity style={tw`flex-row justify-between px-5 items-center ${Id === selected?.Id && "bg-gray-700"}`}
                            onPress={() => setSelected(item)}
                        >
                            <Image
                                source={{
                                    uri: Ruta + image,
                                    method: 'GET',
                                }}
                                resizeMode="contain"
                                style={{ width: 100, height: 100 }}
                            />
                            <View style={tw`-ml-5`}>
                                <Text style={tw`text-white  font-semibold`}>{title} - {Año}</Text>
                                <Text style={tw`text-white`}>Marca: {Marca}</Text>
                                <Text style={tw`text-white`}>Modelo: {Modelo}</Text>
                                
                            </View>
                            <Text style={tw`text-white `}>{Estado}</Text>
                        </TouchableOpacity>
                    )}
                />

                <View style={tw`mt-auto border-t border-gray-200`}>
                    <StyledButton disabled={!selected} style={tw`rounded-full`}
                        onPress={async () => {
                            /*   
                             try {
                               
                               const precio = travelTimeInformation?.distance?.value * surgeChargeRate * selected?.multiplier / 100; 
                                 const DataViajes=[
                                   { 
                                     origen: origin,
                                     destino: destination,
                                     viaje: travelTimeInformation,
                                     Cliente: Cliente,
                                     Vehiculo: selected,
                                     total: precio,
                                   }
                                 ];
                                 const InformacionViaje = JSON.stringify(DataViajes);
                                 await AsyncStorage.setItem('DataViajes',InformacionViaje);
                                 if(MetodoDePago.Titulo == "Lista Vacía")
                                 {
                                   navigation.navigate("Pago");
                                 }
                                 else
                                 {
                                   const tipo = JSON.stringify(ListaMetodoPagos[0]);
                                   await AsyncStorage.setItem('Tipo', tipo);
                                   navigation.navigate("ConfirmarViaje");
                                 }
                                 //console.log(DataViajes);
                             } catch (error) {
                               console.log(error.toString());
                             }
                            */
                        }}
                    >
                        <Text style={tw`text-white text-center text-xl`}>Seleccionar {selected?.title}</Text>
                    </StyledButton>
                </View>
            </View>

        </SafeAreaView>

    )
}

export default ListarVehiculos;

const styles = StyleSheet.create({});
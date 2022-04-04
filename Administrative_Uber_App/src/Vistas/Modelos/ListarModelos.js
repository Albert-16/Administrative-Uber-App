import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Octicons, Ionicons, Fontisto, FontAwesome, Entypo } from '@expo/vector-icons';
import {
    PageTitulo,
    StyledButton,
    Line,
    Colors,
} from '../../Componentes/styleUser';

import 'intl';
import 'intl/locale-data/jsonp/es-HN';
const { color5,color2,color3,color6,color1 } = Colors;
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

import { IP, IMAGE, PORT, LISTARMODELOS } from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";
const Ruta = "http://" + IP + ":" + PORT + IMAGE;
const RutaListar = "http://" + IP + ":" + PORT + LISTARMODELOS;


const ListarMarcas = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const [ListarMod, setListarMod] = useState([]);


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
                setListarMod(resJson)
            })
            .catch(console.error)

    }, []);

    const ListaDatos = ListarMod.Información;
    
    const LeftContent = props => <Avatar.Icon {...props} icon="car" style={{backgroundColor:color6}} />
    return (
        <SafeAreaView style={[tw`flex-grow `,{backgroundColor:"#000"}]}>
            <View>
                <View>
                    <PageTitulo style={tw`text-white py-3 text-xl  text-center `}>Lista de Marcas</PageTitulo>
                    <Line />
                </View>
                <FlatList data={ListaDatos} 
                    keyExtractor={(item) => item.Id}
                    scrollEnabled={true}
                    
                    renderItem={({ item: { Id, Marca, Estado,Modelo }, item }) => (
                        <TouchableOpacity style={[tw`p-2 pl-6 pb-8 pt-4`,{
                            
                        }]}
                            onPress={() => setSelected(item)}
                        >
                            
                            <Card style={
                                {
                                    width:'100%',
                                    backgroundColor: Id === selected?.Id ? color3: "#000",
                                    color: "#fff",
                                    
                                    }}>
                                <Card.Title style={{textAlign: 'center',alignItems: 'center', marginLeft:10}}  left={LeftContent} />
                                <Card.Content>
                                    <Title style={{textAlign:"center",color:"#fff"}}>Modelo: {Modelo}</Title>
                                    <Paragraph style={{textAlign:"center",color:"#fff"}} >Marca: {Marca}</Paragraph>
                                    <Paragraph style={{textAlign:"center",color:"#fff", backgroundColor: Estado === "Activo" ? "#29AA20": "#FF3E30"}}>{Estado}</Paragraph>
                                </Card.Content> 
                            </Card>

                        </TouchableOpacity>
                    )}
                />

                <View style={tw`mt-auto border-t border-gray-200`}>
                    <StyledButton disabled={!selected} style={tw`rounded-full`}
                        onPress={async () => {
                            try {

                                
                                
                                const InformacionModelos = JSON.stringify(selected);
                                await AsyncStorage.setItem('DataModelos',InformacionModelos);
                               
                                if(ListarMod.Titulo == "Lista Vacía")
                                {
                                  navigation.navigate("Menú Principal");
                                }
                                else
                                {
                                  navigation.navigate("EditarModelos");
                                }
                                //console.log(DataViajes);
                                
                            } catch (error) {
                                console.log(error.toString());
                            }

                        }}
                    >
                        <Text style={tw`text-white text-center text-xl`}>Editar {selected?.Modelo}</Text>
                    </StyledButton>
                </View>
            </View>

        </SafeAreaView>

    )
}

export default ListarMarcas;

const styles = StyleSheet.create({});
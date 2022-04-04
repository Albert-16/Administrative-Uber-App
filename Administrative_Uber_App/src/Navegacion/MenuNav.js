import React from 'react';
import { FlatList, Image,  TouchableOpacity } from 'react-native'
import {  AntDesign } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import {
    ButtonText,
    Colors,
    RightIcon
} from '../Componentes/styleUser';


const { color2, color6, color5 } = Colors;
import { IP, IMAGE, PORT } from '@env'
const Ruta = "http://" + IP + ":" + PORT + IMAGE;
const data = [
    {
        id: "1",
        title: "Vehículos",
        screen: "AdminVehiculos",
        icon: "enviroment",
        image: "UberHome.png"
    },
    {
        id: "2",
        title: "Modelos",
        screen: "AdminModelos",
        icon: "enviroment",
        image: "UberModelo.jpeg"
    },
    {
        id: "3",
        title: "Marcas",
        screen: "AdminMarcas",
        icon: "enviroment",
        image: "UberMarcas.jpeg"
    },
    {
        id: "4",
        title: "Ciudades",
        screen: "AdminCiudades",
        icon: "enviroment",
        image: "UberCiudad.jpg"
    }
];
import { useNavigation } from '@react-navigation/native';

const NavOptions = () => {
    const navigation = useNavigation();
    return (


        <FlatList data={data} keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
                <TouchableOpacity style={[tw`p-2 pl-6 pb-8 pt-4   m-2 w-40`, {
                    backgroundColor: color2
                }]}
                   
                    onPress={() => { navigation.navigate(item.screen) }}>
                    <Image
                        source={{
                            uri: Ruta + item.image,
                            method: 'GET',
                        }}
                        resizeMode="contain"
                        style={{ width: 120, height: 120, }}
                    />
                    
                        <ButtonText style={tw`mt-2 text-lg font-semibold`}>{item.title}</ButtonText>
                        
                </TouchableOpacity>

            )}
        />



    );
};

export default NavOptions;
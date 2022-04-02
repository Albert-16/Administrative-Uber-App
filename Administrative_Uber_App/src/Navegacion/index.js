import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Vistas/Usuarios/LoginScreen';
import WelcomeHomeScreen from "../Vistas/Home/WelcomeHomeScreen";
import HomeScreen from "../Vistas/Home/HomeScreen";
import RecoverAccountScreen from "../Vistas/Usuarios/RecoverAccountScreen";
import RestorePasswordScreen from "../Vistas/Usuarios/RestorePasswordScreen";
import Marcas from "../Vistas/Marcas/RegistrarMarcas";
import Ciudades from "../Vistas/Ciudades/vistaAgregarCiudades";
import ListarMarcas from "../Vistas/Marcas/ListarMarcas"; 
import EditarMarcas from "../Vistas/Marcas/EditarMarcas";
import { Colors } from '../Componentes/styleUser';

import "react-native-gesture-handler";

const { color5, color6, color1, color2 } = Colors;

const Stack = createStackNavigator();

const MenuNavegacion = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyled: {
                    backgroundColor: color2
                },
                headerTintColor: color5,
                headerTransparent: true,
                headerBackTitle: '',
                headerLeftContainerStyle: {
                    paddingLeft: 20
                },
            }} initialRouteName="Login" >
                <Stack.Screen name="Login" component={Login}
                    options={{
                        title: ""
                    }}
                />


                <Stack.Screen name="Inicio" component={WelcomeHomeScreen}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="EditarMarcas" component={EditarMarcas}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="ListarM" component={ListarMarcas}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="Recuperar Cuenta" component={RecoverAccountScreen}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="Restablecer Contraseña" component={RestorePasswordScreen}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="Menú Principal" component={HomeScreen}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="Administrar Marcas" component={Marcas}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="Administrar Ciudades" component={Ciudades}
                    options={{
                        title: ""
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MenuNavegacion;
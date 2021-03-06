import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Vistas/Usuarios/LoginScreen';
import WelcomeHomeScreen from "../Vistas/Home/WelcomeHomeScreen";
import HomeScreen from "../Vistas/Home/HomeScreen";
import RecoverAccountScreen from "../Vistas/Usuarios/RecoverAccountScreen";
import RestorePasswordScreen from "../Vistas/Usuarios/RestorePasswordScreen";
import MiPerfil from "../Vistas/Usuarios/MeProfile";
import EditarPerfil from "../Vistas/Usuarios/EditProfile";
import NuevoUsuario from "../Vistas/Usuarios/NewUser";
import Vehiculos from "../Vistas/Vehiculos/Vehiculos"
import ListarV from "../Vistas/Vehiculos/ListarVehiculos"
import ModificarVehiculos from "../Vistas/Vehiculos/ModificarVehiculos"
import SubirImagen from "../Vistas/Vehiculos/SubirImagenVehiculo"
import SubMenuV from "../Vistas/Home/SubVehiculosOptions";
import Marcas from "../Vistas/Marcas/RegistrarMarcas";
import Ciudades from "../Vistas/Ciudades/RegistrarCiudades";
import ListarMarcas from "../Vistas/Marcas/ListarMarcas";
import EditarMarcas from "../Vistas/Marcas/EditarMarcas";
import ListarCiudades from "../Vistas/Ciudades/ListarCiudades";
import EditarCiudades from "../Vistas/Ciudades/EditarCiudades";
import AdminMarcas from "../Vistas/Home/SubMarcasOptions";
import AdminCiudad from "../Vistas/Home/SubCiudadesOptions";
import AdminModelos from "../Vistas/Home/SubModelOptions";
import Modelos from "../Vistas/Modelos/RegistrarModelos";
import ListarModelos from "../Vistas/Modelos/ListarModelos";
import EditarModelos from "../Vistas/Modelos/EditarModelos"
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

                <Stack.Screen name="AdminVehiculos" component={SubMenuV}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="AdminMarcas" component={AdminMarcas}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="AdminCiudades" component={AdminCiudad}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="EditarMarcas" component={EditarMarcas}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="SubirImagen" component={SubirImagen}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="EditarCiudad" component={EditarCiudades}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="ListarM" component={ListarMarcas}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="ListarC" component={ListarCiudades}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="Recuperar Cuenta" component={RecoverAccountScreen}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="Restablecer Contrase??a" component={RestorePasswordScreen}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="Men?? Principal" component={HomeScreen}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="MiPerfil" component={MiPerfil}
                    options={{
                        title: ""
                    }}
                />
                
                <Stack.Screen name="Administrar Marcas" component={Marcas}
                    options={{
                        title: ""
                    }}
                />


                <Stack.Screen name="Administrar Modelos" component={Modelos}
                    options={{
                        title: ""
                    }}
                />



            <Stack.Screen name="EditarPerfil" component={EditarPerfil}
                                options={{
                                    title: ""
                                }}
                            />

                <Stack.Screen name="ListarMo" component={ListarModelos}
                    options={{
                        title: ""
                    }}
                />

<Stack.Screen name="Administrar Ciudades" component={Ciudades}
                    options={{
                        title: ""
                    }}
                />
                
                <Stack.Screen name="EditarModelos" component={EditarModelos}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="NuevoUsuario" component={NuevoUsuario}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="AdminModelos" component={AdminModelos}
                    options={{
                        title: ""
                    }}
                />


                <Stack.Screen name="Registrar Veh??culos" component={Vehiculos}
                    options={{
                        title: ""
                    }}
                />
                <Stack.Screen name="ListarV" component={ListarV}
                    options={{
                        title: ""
                    }}
                />

                <Stack.Screen name="Modificar Veh??culos" component={ModificarVehiculos}
                    options={{
                        title: ""
                    }}
                />

            </Stack.Navigator >
        </NavigationContainer >

            
    );
};

export default MenuNavegacion;
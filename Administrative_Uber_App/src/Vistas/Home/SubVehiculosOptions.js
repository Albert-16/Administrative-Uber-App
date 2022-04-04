import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer,
    InnerContainer,
    PageTitulo,
    Subtitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    MenuContainer,
    Avatar,
    MenuImagen
} from '../../Componentes/styleUser';

const Menu = ({ navigation }) => {

    return (
      
        <StyledContainer>
            <StatusBar style="light" />
           
            <InnerContainer>
            <MenuImagen resizeMode="cover" source={require('../../../assets/img/uber3.jpeg')} />
            
                <MenuContainer>
               
                    <StyledFormArea>
                       
                        <PageTitulo>Administración de Vehículos</PageTitulo>
                 
                        <Line />
                        <StyledButton onPress={() => { navigation.navigate("Registrar Vehículos") }}>
                            <ButtonText>Registrar Vehículos</ButtonText>
                        </StyledButton>
                        <Line />
                        
                        <StyledButton onPress={() => { navigation.navigate("ListarV") }}>
                            <ButtonText>Listar y Editar Vehículos</ButtonText>
                        </StyledButton>
                        <Line />
                       
                    </StyledFormArea>
                  
                </MenuContainer>
               
            </InnerContainer>
           
        </StyledContainer>
        
    );
};

export default Menu;
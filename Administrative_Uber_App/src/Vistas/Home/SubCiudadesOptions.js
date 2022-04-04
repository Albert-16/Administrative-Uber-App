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
                       
                        <PageTitulo >Administración de Ciudades</PageTitulo>
                     
                        <Line />
                        <StyledButton onPress={() => { navigation.navigate("Administrar Ciudades") }}>
                            <ButtonText>Registrar Ciudades</ButtonText>
                        </StyledButton>
                        <Line />
                        
                        <StyledButton onPress={() => { navigation.navigate("ListarC") }}>
                            <ButtonText>Listar y Editar Ciudades</ButtonText>
                        </StyledButton>
                        <Line />
                       
                    </StyledFormArea>
                  
                </MenuContainer>
               
            </InnerContainer>
           
        </StyledContainer>
        
    );
};

export default Menu;
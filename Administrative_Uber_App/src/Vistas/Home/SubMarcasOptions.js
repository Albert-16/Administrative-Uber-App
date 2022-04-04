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
                       
                        <PageTitulo >Administración de Marcas</PageTitulo>
                        
                       
                        <Line />
                        <StyledButton onPress={() => { navigation.navigate("Administrar Marcas") }}>
                            <ButtonText>Registrar Marcas</ButtonText>
                        </StyledButton>
                        <Line />
                        
                        <StyledButton onPress={() => { navigation.navigate("ListarM") }}>
                            <ButtonText>Listar y Editar Marcas</ButtonText>
                        </StyledButton>
                        <Line />
                       
                    </StyledFormArea>
                  
                </MenuContainer>
               
            </InnerContainer>
           
        </StyledContainer>
        
    );
};

export default Menu;
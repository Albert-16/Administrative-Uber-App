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
    MenuImagen,
    StyleScrollView
} from '../../Componentes/styleUser';



const MenuPrincipal = ({ navigation }) => {

    return (

        <StyledContainer>
            <StatusBar style="light" />

            <InnerContainer>


                <MenuContainer>
                    <StyledFormArea>

                        <PageTitulo Menu={true}>Uber</PageTitulo>
                        <Subtitle Menu={true}>Pagina Principal</Subtitle>
                       
                        <Line />
                        
                        <StyledButton onPress={() => { }}>
                            <ButtonText>Marcas</ButtonText>
                        </StyledButton> 
                        <Line />
                        <StyledButton onPress={() => navigation.navigate("Registrar Vehículos")}>
                            <ButtonText>Vehículos</ButtonText>
                        </StyledButton>

                        <Line />

                       
                    </StyledFormArea>
                </MenuContainer>

            </InnerContainer>

        </StyledContainer>

    );
};

export default MenuPrincipal;
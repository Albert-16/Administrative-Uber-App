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
                        <StyledButton onPress={() =>navigation.navigate("Administrar Modelos")}>
                            <ButtonText>Modelos</ButtonText>
                        </StyledButton>

                        <StyledButton onPress={() =>navigation.navigate("ListarMo")}>
                            <ButtonText>Listar Modelos</ButtonText>
                        </StyledButton>
                        <Line />

                       
                    </StyledFormArea>
                </MenuContainer>

            </InnerContainer>

        </StyledContainer>

    );
};

export default MenuPrincipal;
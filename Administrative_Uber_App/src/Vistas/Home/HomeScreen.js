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
                        
                        <StyledButton onPress={() => navigation.navigate("Administrar Marcas")}>
                            <ButtonText>Marcas</ButtonText>
                        </StyledButton>

                        <StyledButton onPress={() => navigation.navigate("Administrar Ciudades")}>
                            <ButtonText>Ciudades</ButtonText>
                        </StyledButton>

                        <StyledButton onPress={() => navigation.navigate("ListarM")}>
                            <ButtonText>Listar Marcas</ButtonText>
                        </StyledButton>

                        <StyledButton onPress={() => navigation.navigate("ListarC")}>
                            <ButtonText>Listar Ciudades</ButtonText>
                        </StyledButton>

                     
                        <Line />

                    </StyledFormArea>
                </MenuContainer>

            </InnerContainer>

        </StyledContainer>

    );
};

export default MenuPrincipal;
import React, { useState,useEffect } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitulo,
  Subtitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledScroll
} from '../../Componentes/styleUser';

import { IP, LISTARMARCAS, PORT } from '@env';

const HomeScreen = () => {
 const RutaListar = "http://" + IP + ":" + PORT + LISTARMARCAS;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

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
        console.log(resJson)
        setItems(resJson);
      })
      .catch(console.error)


      
  }, []);

  return (
    <StyledContainer>
      <InnerContainer>
        <DropDownPicker

          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </InnerContainer>

    </StyledContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
    margin: 100,
    alignItems: "center"
  }
});

export default HomeScreen;
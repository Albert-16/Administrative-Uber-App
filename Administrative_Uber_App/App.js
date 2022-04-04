import React from "react";
import { Provider } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';
import { store } from './src/Store/index';

import MenuNavegacion from "./src/Navegacion/index";

export default function App() {
  return (

    <Provider store={store}>
      <KeyboardAvoidingView style={{flex: 1}}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
      >
      <MenuNavegacion />
      </KeyboardAvoidingView>
      
    </Provider>

  );
}



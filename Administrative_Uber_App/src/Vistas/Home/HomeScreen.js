import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

export default class HomeScreen extends React.Component{
  render(){
    return (
      <View  style={{backgroundColor:"#000",flex:1}}>
        <SafeAreaView style={{flex:1}}>
          <TouchableOpacity style={{alignItems: 'flex-end' ,margin:16}} 
            onPress={() =>{this.props.navigation.openDrawer}}
          >
         
              <FontAwesome5 name="bars" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={{alignItems: 'center',flex:1,justifyContent: 'center'}}>
              <Text style={{color: 'white',fontSize:20,fontWeight:"500"}}>Hola {this.props.name}</Text>
          </View>
        </SafeAreaView>
      </View>
    )
  }
  
}



const styles = StyleSheet.create({})
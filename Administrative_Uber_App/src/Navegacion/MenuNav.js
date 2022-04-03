import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {creatAppContainer} from 'react-navigation'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Dimensions } from 'react-native'
import {Feather} from '@expo/vector-icons'

import {
    WelcomeHomeScreen
} from '../Vistas/Home/'

const DrawerNavigator = createDrawerNavigator({WelcomeHomeScreen})
export default creatAppContainer(DrawerNavigator)

const styles = StyleSheet.create({})
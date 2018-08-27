import React, { Component } from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, NavigationActions, SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'

import LoginScreen from '../Screens/Login.screen'
import RegisterScreen from '../Screens/Register.screen'
import DrawerStack from '../Stacks/Drawer.stack.js'

if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0)
}

const MainStack = createStackNavigator({
  loginScreen: { screen: LoginScreen },
  registerScreen: { screen: RegisterScreen },
  drawerStack: { screen: DrawerStack }
})

export default MainStack

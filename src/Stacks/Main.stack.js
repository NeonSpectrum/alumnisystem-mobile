import React, { Component } from 'react'
import { createStackNavigator, NavigationActions } from 'react-navigation'

import LoginScreen from '../Screens/Login.screen'
import RegisterScreen from '../Screens/Register.screen'
import DrawerStack from '../Stacks/Drawer.stack.js'

const MainStack = createStackNavigator(
  {
    loginScreen: { screen: LoginScreen },
    registerScreen: { screen: RegisterScreen },
    drawerStack: { screen: DrawerStack }
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
)

export default MainStack

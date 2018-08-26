import React, { Component } from 'react'
import { createStackNavigator, NavigationActions, StackActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/Octicons'

import AlumniScreen from '../Screens/Alumni.screen'

const AlumniNavigator = createStackNavigator(
  {
    alumniScreen: { screen: AlumniScreen }
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      headerTransparent: true,
      headerLeft: (
        <Icon
          name="three-bars"
          size={30}
          color="white"
          style={{ paddingLeft: 20 }}
          onPress={() => navigation.openDrawer()}
        />
      )
    })
  }
)

export default AlumniNavigator

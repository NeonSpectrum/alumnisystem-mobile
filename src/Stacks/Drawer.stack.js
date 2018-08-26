import React, { Component } from 'react'
import { DrawerItems } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native'

import DashboardNavigator from '../Navigators/Dashboard.navigator'
import SettingsNavigator from '../Navigators/Settings.navigator'
import AlumniNavigator from '../Navigators/Alumni.navigator'

import { processLogout } from '../Components/Logout.component'

const DrawerContent = props => (
  <View style={{ flex: 1 }}>
    <View style={styles.header}>
      <Image style={styles.picture} source={require('../../assets/id.jpg')} />
    </View>
    <DrawerItems
      {...props}
      onItemPress={({ route, focused }) => {
        if (route.key === 'Logout') {
          processLogout(props)
        } else {
          props.onItemPress({ route, focused })
        }
      }}
    />
    <View style={styles.footer}>
      <Image style={styles.logo} source={require('../../assets/rnd-logo.png')} />
      <Text style={styles.footerText}>This is made in collaboration with</Text>
      <Text style={styles.footerText}>UE CCSS Research and Development Unit</Text>
    </View>
  </View>
)

const DrawerStack = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator
    },
    Settings: {
      screen: SettingsNavigator
    },
    'Alumni Card Preview': {
      screen: AlumniNavigator
    },
    Logout: {
      screen: () => {
        return <View />
      }
    }
  },
  {
    contentOptions: {
      activeTintColor: '#F4054B'
    },
    contentComponent: DrawerContent
  }
)

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F4054B',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10
  },
  logo: {
    height: 50,
    width: 50
  },
  footerText: {
    fontSize: 12
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#ccc'
  },
  buttonList: {
    paddingVertical: 10
  }
})
export default DrawerStack

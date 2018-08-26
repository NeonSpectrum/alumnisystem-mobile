import React, { Component } from 'react'
import { Platform, View, Image, Text, ImageBackground, ActivityIndicator } from 'react-native'

export default class Loading extends Component {
  constructor(props) {
    super(props)
    this.state = { loadingDots: 0 }
    this.tick = this.tick.bind(this)
  }

  componentDidMount() {
    if (!this.props.background) this.tickInterval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    if (!this.props.background) clearInterval(this.tickInterval)
  }

  tick() {
    this.setState(prevState => ({
      loadingDots: ++prevState.loadingDots <= 3 ? prevState.loadingDots : 1
    }))
  }

  render() {
    let { loadingDots } = this.state
    return this.props.background ? (
      <ImageBackground
        source={require('../../assets/splash.png')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator
          style={{
            position: 'absolute',
            bottom: 60
          }}
          size={Platform.OS == 'ios' ? 'large' : 80}
          color="#fff"
        />
      </ImageBackground>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size="large" color="#f00" />
        <Text style={{ fontSize: 20, marginTop: 20 }}>Loading{'.'.repeat(loadingDots)}</Text>
      </View>
    )
  }
}

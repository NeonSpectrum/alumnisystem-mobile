import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  AsyncStorage
} from 'react-native'
import * as ExpoPixi from 'expo-pixi'
import Icon from 'react-native-vector-icons/Octicons'

import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'

import { fetchUserData } from '../Controllers/User.controller'
import { uploadSignature } from '../Reducers/Upload.reducer'

class SignatureScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: null
    }

    this.savePicture = this.savePicture.bind(this)
  }

  componentWillReceiveProps(props) {
    if (this.props.path != props.path) {
      this.props.fetchUserData()
      this.props.navigation.pop()
    }
  }

  async savePicture() {
    const { uri } = await this.sketch.takeSnapshotAsync({
      format: 'png',
      result: 'file'
    })
    this.props.uploadSignature(uri)
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          name="check"
          size={30}
          color="black"
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
          onPress={this.savePicture}
        />
        <View style={styles.container}>
          <View style={styles.sketchContainer}>
            <ExpoPixi.Signature
              ref={ref => (this.sketch = ref)}
              style={styles.sketch}
              strokeColor={'blue'}
              strokeAlpha={1}
            />
          </View>
        </View>
        <Button
          color={'black'}
          title="undo"
          style={styles.button}
          onPress={() => {
            this.sketch.undo()
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center'
  },
  sketch: {
    flex: 1
  },
  sketchContainer: {
    height: 200,
    backgroundColor: 'white'
  },
  image: {
    flex: 1
  },
  label: {
    width: '100%',
    padding: 5,
    alignItems: 'center'
  },
  button: {
    zIndex: 1,
    padding: 20,
    minWidth: 56,
    minHeight: 56
  }
})

const mapStateToProps = ({ UploadReducer }) => {
  let { data } = UploadReducer
  return data || {}
}

const mapDispatchToProps = {
  uploadSignature,
  fetchUserData
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignatureScreen)

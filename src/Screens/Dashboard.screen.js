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
import { NavigationActions, StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import Icon from 'react-native-vector-icons/Octicons'
import PTRView from 'react-native-pull-to-refresh'

import Loading from '../Components/Loading.component'
import Error from '../Components/Error.component'

import { fetchUserData, fetchProfilePath } from '../Controllers/User.controller'
import { takePhoto, uploadPhoto } from '../Reducers/Upload.reducer'

class DashboardScreen extends Component {
  constructor(props) {
    super(props)

    this.fetchData = this.fetchData.bind(this)
    this.takePhoto = this.takePhoto.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.fetchUserData()
  }

  async takePhoto() {
    if ((res = await takePhoto())) {
      await this.props.uploadPhoto(res)
      this.props.fetchProfilePath()
    }
  }

  render() {
    let { loading = true, data, error } = this.props
    if (loading) return <Loading />
    else if (error) return <Error text="Cannot connect to server!" onRefresh={this.fetchData} />
    else {
      let { ID, FirstName, LastName, Birthday, Course, YearGraduated, ProfilePath } = data
      return (
        <PTRView onRefresh={this.fetchData}>
          <ScrollView>
            <View>
              <View style={{ position: 'relative' }}>
                <Image
                  style={styles.imageContainer}
                  source={ProfilePath ? { uri: ProfilePath } : require('../../assets/user-default.png')}
                />
                <View style={styles.imageOverlay} />
              </View>
              <View style={styles.circlePictureContainer}>
                <View style={{ position: 'relative' }}>
                  <Image
                    style={styles.circlePicture}
                    source={ProfilePath ? { uri: ProfilePath } : require('../../assets/user-default.png')}
                  />
                  <TouchableOpacity style={styles.editButton} onPress={this.takePhoto}>
                    <Icon
                      name="pencil"
                      size={25}
                      color="white"
                      style={{
                        lineHeight: 22,
                        padding: 10
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.container}>
                <Text style={styles.name}>{FirstName + ' ' + LastName}</Text>
                <Text style={styles.details}>{Course}</Text>
                <Text style={styles.details}>Alumni since {YearGraduated}</Text>
              </View>
              <View style={{ padding: 20 }}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Student Number</Text>
                  <Text style={styles.infoValue}>{ID}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Birthday</Text>
                  <Moment format="MMMM D, YYYY" element={Text} style={styles.infoValue}>
                    {Birthday}
                  </Moment>
                </View>
              </View>
            </View>
          </ScrollView>
        </PTRView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    height: 225,
    width: '100%'
  },
  imageOverlay: {
    height: 225,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    opacity: 0.5
  },
  circlePictureContainer: {
    marginTop: -75,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150
  },
  circlePicture: {
    borderRadius: 100,
    borderColor: '#ccc',
    borderWidth: 2,
    height: 150,
    width: 150
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 100,
    backgroundColor: '#F4054B',
    height: 40,
    width: 40
  },
  name: {
    fontSize: 30
  },
  details: {
    fontSize: 15,
    color: '#ccc',
    textAlign: 'center'
  },
  infoContainer: {
    marginBottom: 10
  },
  infoLabel: {
    fontSize: 15
  },
  infoValue: {
    fontSize: 30
  }
})

const mapStateToProps = ({ UserReducer }) => {
  let { info } = UserReducer
  return info || {}
}

const mapDispatchToProps = {
  uploadPhoto,
  fetchUserData,
  fetchProfilePath
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen)

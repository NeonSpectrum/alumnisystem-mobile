import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, TouchableOpacity, ScrollView } from 'react-native'
import Gallery from 'react-native-image-gallery'
import { connect } from 'react-redux'
import moment from 'moment'

import Loading from '../Components/Loading.component'
import { fetchCard, fetchUserData } from '../Controllers/User.controller'
import { API_URL } from '../../App'

class AlumniScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      index: 0,
      images: []
    }

    this.fetchData = this.fetchData.bind(this)
    this.onChangeImage = this.onChangeImage.bind(this)
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props.fetchUserData()
    this.props.fetchCard()
  }

  componentWillReceiveProps(props) {
    if (props.loading == false && props.data && props.info) {
      let images = []
      props.data.forEach(data => {
        images.push({
          caption: data.Name,
          source: {
            uri: `${API_URL}/user/card/${props.id}/${data.ID}?t=${moment(data.TimeStamp).format(
              'x'
            )}${props.info.data.ProfileFileName.split('.')
              .shift()
              .replace('upload_', '')}`
          }
        })
      })
      this.setState({
        loading: false,
        images
      })
    }
  }

  onChangeImage(index) {
    this.setState({ index })
  }

  render() {
    let { loading, images, index } = this.state
    let { id, data, error } = this.props
    if (loading) return <Loading />
    else if (error) return <Error text="Cannot connect to server!" onRefresh={this.fetchData} />
    else {
      return (
        <View style={styles.container}>
          <Gallery style={{ flex: 1, backgroundColor: 'white' }} images={images} onPageSelected={this.onChangeImage} />
          <View
            style={{
              bottom: 0,
              height: 65,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              width: '100%',
              position: 'absolute',
              justifyContent: 'center'
            }}
          >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>
              {(images[index] && images[index].caption) || ''}{' '}
            </Text>
          </View>
        </View>
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
  }
})

const mapStateToProps = ({ UserReducer }) => {
  let { cards, info } = UserReducer
  return { ...cards, info } || {}
}

const mapDispatchToProps = {
  fetchUserData,
  fetchCard
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlumniScreen)

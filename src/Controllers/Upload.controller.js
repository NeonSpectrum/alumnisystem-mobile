import { ImagePicker, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
import { fetchJSON } from '../Functions'
import { api_url } from '../../app'

export async function takePhoto() {
  const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA)

  const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

  if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })
    uploadPhoto(pickerResult.uri)
  }
}

export async function uploadPhoto(uri) {
  let id = await AsyncStorage.getItem('id')

  let fileType = uri.split('.').pop()

  let formData = new FormData()
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  })

  return fetchJSON(`${api_url}/user/${id}/upload`, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    method: 'PUT',
    body: formData
  })
}

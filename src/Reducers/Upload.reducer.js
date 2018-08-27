import { ImagePicker, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'
import { api_url } from '../../app'

export const UPLOAD = 'LOAD'
export const UPLOAD_SUCCESS = 'LOAD_SUCCESS'
export const UPLOAD_FAIL = 'LOAD_FAIL'

export default function UploadReducer(state = {}, action) {
  console.log(action.type)

  switch (action.type) {
    case UPLOAD:
      return { ...state, loading: true }
    case UPLOAD_SUCCESS:
      let { success, filename } = action.payload.data
      if (success) {
        return {
          ...state,
          loading: false,
          path: `${api_url}/user/pictures/${filename}`
        }
      }
    case UPLOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching user data'
      }
    default:
      return state
  }
}

export async function takePhoto() {
  const { status: cameraPerm } = await Permissions.askAsync(Permissions.CAMERA)

  const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

  if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1]
    })
    return pickerResult.uri
  }
  return false
}

export function uploadPhoto(uri) {
  return (dispatch, getState) => {
    let fileType = uri.split('.').pop()

    let formData = new FormData()
    formData.append('photo', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    })

    let { id } = getState().UserReducer.auth

    dispatch({
      type: UPLOAD,
      payload: {
        request: {
          method: 'PUT',
          url: `/user/${id}/upload`,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
        }
      }
    })
  }
}

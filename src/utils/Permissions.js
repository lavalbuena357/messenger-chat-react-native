import React from 'react'
import { PermissionsAndroid } from 'react-native'

export const requestStogarePermission = async() => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
      )
    if(granted["android.permission.READ_EXTERNAL_STORAGE"] === 'granted' &&
      granted["android.permission.WRITE_EXTERNAL_STORAGE"] === 'granted') {
      return true
    } else {
      return false
    }
  } catch (error) {console.log(error)}
}

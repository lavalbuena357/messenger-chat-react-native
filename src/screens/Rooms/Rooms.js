import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import Loader from '../../components/Loader/Loader'
import useStyles from './Rooms.styles'

const Rooms = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true)

  const styles = useStyles()
  const {currentUser} = useSelector(state => state)

  useEffect(() => {
    setIsLoading(true)
    if(currentUser !== null) {
      setIsLoading(false)
    }
  }, [currentUser])  

  return (
    <View style={styles.container}>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <Header />
      }
    </View>
  )
}

export default Rooms
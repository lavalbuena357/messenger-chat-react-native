import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import Header from '../../components/Header/Header'
import useStyles from './Contacts.styles'

const Contacts = () => {
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
    <View>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <Header />
      }
    </View>
  )
}

export default Contacts
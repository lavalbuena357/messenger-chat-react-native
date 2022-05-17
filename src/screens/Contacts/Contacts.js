import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import Loader from '../../components/Loader/Loader'
import Header from '../../components/Header/Header'
import ContactItem from '../../components/ContactItem/ContactItem'
import useStyles from './Contacts.styles'

const Contacts = () => {
  const [isLoading, setIsLoading] = useState(true) 

  const styles = useStyles()
  const {currentUser, contacts} = useSelector(state => state)

  useEffect(() => {
    setIsLoading(true)
    if(currentUser !== null) {
      setIsLoading(false)
    }
  }, [currentUser])

  return (
    <View>
      {isLoading ? <Loader color={styles.loading.color} size={60} /> :
      <View>
        <Header />
        {contacts ? 
        <ScrollView>
          {Object.keys(contacts).map(el => (
            <ContactItem
              key={el.uid} />
          ))}
        </ScrollView>
        :
        <Text style={styles.notFound}>La lista de contactos esta vacía</Text>
        }
      </View>      
      }
      <View style={styles.buttonAddcontainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon name='person-add' size={25} color={styles.iconAdd.color} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Contacts
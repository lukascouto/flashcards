import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native'

export default function Deck ({ title, questions }) {
  console.log('Title: ', title)
  return (
    <View>
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{questions.length} cards</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

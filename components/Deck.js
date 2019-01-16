import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default function Deck ({ title, questions }) {
  return (
    <View>
      <View style={styles.container}>
        <Text>{title}</Text>
        <Text>{questions.length} Cartas</Text>
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

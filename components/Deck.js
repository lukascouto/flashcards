import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

class Deck extends Component{
  render() {
    const { item } = this.props
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={item.checked === false ? styles.unchecked : styles.checked} />
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.cards}>{item.questions.length} {item.questions.length === 1 ? 'CARTÃO' : 'CARTÕES'}</Text>
        </View>
      </View>
    )
  }
}

export default Deck

const styles = StyleSheet.create({
  container: {
    width: '98%',
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#151515',
    borderRadius: 5,
  },
  checked: {
    width: '2%',
    marginBottom: 10,
    backgroundColor: '#2ed573',
  },
  unchecked: {
    width: '2%',
    marginBottom: 10,
    backgroundColor: '#5E5A5A',
  },
  title: {
    marginTop: 0,
    fontSize: 40,
    color: '#5E5A5A'
  },
  cards: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 20,
    color: '#5E5A5A'
  }
})

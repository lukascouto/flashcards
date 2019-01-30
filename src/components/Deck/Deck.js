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
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.container}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.cards}>{item.questions.length} {item.questions.length === 1 ? 'cartão' : 'cartões'}</Text>
        </View>
      </View>
    )
  }
}

export default Deck

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 26,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },
  title: {
    marginTop: 0,
    fontSize: 20,
    fontWeight: '400',
    color: '#ff4757'
  },
  cards: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 20,
    color: '#5E5A5A',
  }
})

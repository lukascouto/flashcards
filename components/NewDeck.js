import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { addDeck } from '../actions/decks'
import { connect } from 'react-redux'
import { generateID } from '../utils/helpers'

class NewDeck extends Component {
  state = {
    title: ''
  }

  handleTextChange = (title) => {
    this.setState(() => ({
      title
    }))
  }

  handlePress = () => {

    const { title } = this.state
    const id = generateID()
    
    this.props.dispatch(addDeck({
      id,
      title,
      questions: [],
      checked: false
    }))
    // Navega até a página principal passando o id do último cadastro
    // O id é usado no filtro da Home para exibir apenas o último baralho
    this.props.navigation.navigate('Deck', { id })
  }
  render() {
    const { title } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Qual será o título do seu novo baralho?</Text>
        <TextInput
          value={title}
          onChangeText={this.handleTextChange}
          placeholder="Digite aqui..."
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.btn}>
          <Text style={styles.btnText}>Criar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect()(NewDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    color: '#5E5A5A'
  },
  input: {
    height: 44,
    width: '100%',
    padding: 8,
    borderWidth: 1,
    color: '#5E5A5A',
    borderBottomColor: '#5E5A5A',
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#ff4757',
    width: '100%',
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16
  }
})

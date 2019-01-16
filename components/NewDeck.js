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
      questions: []
    }))
    // Navega até a página principal passando o id do último cadastro
    // O id é usado no filtro da Home para exibir apenas o último baralho
    this.props.navigation.navigate('Home', { id })
  }
  render() {
    const { title } = this.state
    return (
      <View>
        <Text style={styles.container}>Qual é o título do seu novo baralho?</Text>
        <TextInput
          value={title}
          onChangeText={this.handleTextChange}
          placeholder="Título do baralho"
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

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  input: {
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff'
  }
})

export default connect()(NewDeck)

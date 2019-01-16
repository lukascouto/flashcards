import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { addCard } from '../actions/decks'
import { connect } from 'react-redux'
import { generateID } from '../utils/helpers'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handlePress = () => {

    // Recupera a pergunta e resposta do estado local
    // Recupera os dados da navegação
    // e recupera o ID do baralho que irá receber a nova carta
    const { question, answer } = this.state
    const { navigation } = this.props
    const deckID = navigation.getParam('id')
    //const id = generateID()

    this.props.dispatch(addCard(deckID, { question, answer }))
  }
  render() {
    return (
      <View>
        <Text style={styles.container}>Crie uma pergunta e uma resposta para a sua nova carta</Text>
        <TextInput
          onChangeText={(question) => this.setState({ question })}
          placeholder="Crie uma pergunta"
          style={styles.input}
        />
        <TextInput
          onChangeText={(answer) => this.setState({ answer })}
          placeholder="Crie uma resposta"
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

export default connect()(NewCard)

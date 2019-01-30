import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView 
} from 'react-native'
import { addCard } from '../../actions/decks'
import { connect } from 'react-redux'
import { generateID } from '../../utils/helpers'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
  }

  handlePress = () => {

    // Recupera a pergunta e resposta do estado local
    // Recupera os dados da navegação
    // e extrai o ID do baralho que irá receber a nova carta
    const { question, answer } = this.state
    const { navigation } = this.props
    const deckID = navigation.getParam('id')

    if (question === '' || answer === '') {
      alert('Todos os campos precisam ser preenchidos.')
    } else {
      this.props.dispatch(addCard(deckID, { question, answer }))
      this.props.navigation.goBack()
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior='padding'  style={styles.container}>
        <Text style={styles.title}>Crie uma pergunta e uma resposta para o seu cartão</Text>
        <TextInput
          onChangeText={(question) => this.setState({ question })}
          placeholder="Pergunta..."
          placeholderTextColor="#5E5A5A"
          style={styles.input}
        />
        <TextInput
          onChangeText={(answer) => this.setState({ answer })}
          placeholder="Resposta..."
          placeholderTextColor="#5E5A5A"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.btn}>
          <Text style={styles.btnText}>Criar Cartão</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#5E5A5A',
    marginBottom: 40,
  },
  input: {
    height: 44,
    width: '100%',
    padding: 8,
    borderWidth: 1,
    color: '#5E5A5A',
    borderColor: 'transparent',
    borderBottomColor: '#5E5A5A',
    marginBottom: 30
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

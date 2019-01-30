import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native'
import ButtonSolid from '../Buttons/ButtonSolid'
import { addDeck } from '../../actions/decks'
import { connect } from 'react-redux'
import { generateID } from '../../utils/helpers'

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

    if (title === '') {
      alert('Informe um título para o seu novo baralho.')
    } else {
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
  }

  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>Qual será o título do seu novo baralho?</Text>
        <TextInput
          value={title}
          onChangeText={this.handleTextChange}
          placeholder="Digite aqui..."
          style={styles.input}
        />
        <ButtonSolid onPress={this.handlePress}>
          Criar baralho
        </ButtonSolid>
      </KeyboardAvoidingView>
    )
  }
}

export default connect()(NewDeck)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  }
})

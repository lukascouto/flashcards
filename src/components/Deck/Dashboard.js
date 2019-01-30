import React, { Component, Fragment } from 'react'
import { Button, Image, View, FlatList, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import ActionButton from 'react-native-action-button'
import ButtonSolid from '../Buttons/ButtonSolid'
import ButtonOutline from '../Buttons/ButtonOutline'
import { clearLocalNotification } from '../../utils/helpers'

class DeckList extends Component {

  renderItem = ({item}) => (
    <TouchableHighlight
      onPress={() => this.props.navigation.push('Deck', { id: item.id })}
    >
      <Deck item={item}/>
    </TouchableHighlight>
  )

  startQuiz = () => {
    const { decks, navigation, id } = this.props
    decks[0].questions.length === 0 ?
      alert('Adicione pelo menos um cartão para iniciar um Quiz.')
      : navigation.navigate('CardList', { id }) &&
        clearLocalNotification()
  }

  render() {
    const { decks, navigation, id } = this.props

    if (decks.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={{ color: '#5E5A5A' }}>Você ainda não possui baralhos</Text>
          <ActionButton
            buttonColor="#ff4757"
            onPress={() => navigation.navigate('NewDeck')}
          />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        { // Se existir um id, está na página de um baralho
          // Então retorna os botões de adicionar carta e iniciar quiz
          // Caso contrário, está na home, então retorna o botão de adicionar baralho
          id !== undefined ?
            <Fragment>
              <ButtonOutline onPress={() => navigation.navigate('NewCard', { id })}>
                Adicionar Cartão
              </ButtonOutline>
              <ButtonSolid onPress={() => this.startQuiz()}>
                Iniciar Quiz
              </ButtonSolid>
            </Fragment>
          :
          <ActionButton
            buttonColor="#ff4757"
            onPress={() => navigation.navigate('NewDeck')}
          />
        }
      </View>
    )
  }
}

function mapStateToProps ({ decks }, props) {
  // Recupera o id do último cadastro de um deck
  // Transforma os objetos decks em array
  const id = props.navigation.getParam('id')
  const decksArray = Object.values(decks)

  // Se houver um id, retorna apenas o deck criado/clicado
  // Caso contrário, retorna todos os decks existentes (Está na página principal)
  return {
    id,
    decks: id ? decksArray.filter((deck) => deck.id === id) : decksArray
  }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

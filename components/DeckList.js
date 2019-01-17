import React, { Component, Fragment } from 'react'
import { Button, Image, View, FlatList, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'
import ActionButton from 'react-native-action-button'

class DeckList extends Component {

  renderItem = ({item}) => (
    <TouchableHighlight
      onPress={() => this.props.navigation.push('Home', { id: item.id })}
    >
      <Deck item={item}/>
    </TouchableHighlight> 
  )

  render() {
    const { decks, navigation, id } = this.props
    if (decks.length === 0) {
      return (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require('../assets/no-decks-image.png')}
          />
          <Text style={{fontSize: 40, color: '#5E5A5A', marginTop: 40}}>Crie o seu primeiro baralho.</Text>
          <ActionButton
            buttonColor="#ff4757"
            onPress={() => navigation.navigate('New')}
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
              <TouchableOpacity
                style={styles.btnNewCard}
                onPress={() => navigation.navigate('NewCard', { id })}
              > 
                <Text style={{color: '#ff4757'}}>Adicionar Carta</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnStartQuiz}
                onPress={() => navigation.navigate('CardList')}
              >
                <Text style={{color: 'white'}}>Iniciar Quiz</Text>
              </TouchableOpacity>
            </Fragment>
          : 
          <ActionButton
            buttonColor="#ff4757"
            onPress={() => navigation.navigate('New')}
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
    padding: 20,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image : {
    width: 290,
    height: 256,
  },
  btnNewCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff4757',
    width: '100%',
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnStartQuiz: {
    backgroundColor: '#ff4757',
    width: '100%',
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

import React, { Component } from 'react'
import { Button, View, FlatList, Text, TouchableHighlight } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'

class DeckList extends Component {
  render() {
    const { decks, navigation, id } = this.props
    console.log('Id: ', id)
    return (
      <View>
        <FlatList
          data={decks}
          renderItem={({item}) => 
          <TouchableHighlight onPress={() => navigation.navigate('Home', { id: item.id })}>
            <Deck {...item}/>
          </TouchableHighlight>
          }
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
            title="Novo Baralho"
            onPress={() => navigation.navigate('New')}
          />
        {id !== undefined ?
          <View> 
            <Button
              title="Adicionar Carta"
              onPress={() => navigation.navigate('NewCard', { id })} 
            />
            <Button
              title="Iniciar Quiz"
              onPress={() => navigation.navigate('CardList')}
            />
            <Button
              title="Voltar"
              onPress={() => navigation.navigate('Home')}
            />
          </View>
          : null
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

import React, { Component, Fragment } from 'react'
import { Button, Image, View, FlatList, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native'
import Card from './Card'
import { connect } from 'react-redux'

class CardList extends Component {

  render() {
    const { questions, navigation, id } = this.props

    return (
        <View style={styles.container}>
           <Card item={questions[2]}/> 
            
            
            <View style={styles.bottom}>
                <Text style={{color: '#5E5A5A'}}>Já tem a resposta? Clique em 'Ver Resposta' e confira se você acertou.</Text>
                <TouchableOpacity
                    disabled={true}
                    style={styles.btnNewCard}
                    onPress={() => navigation.navigate('NewCard', { id })}
                > 
                    <Text style={{color: '#2ed573'}}>Correta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={true}
                    style={styles.btnStartQuiz}
                    onPress={() => navigation.navigate('CardList', { id })}
                >
                    <Text style={{color: 'white'}}>Incorreta</Text>
                </TouchableOpacity> 
            </View>

        </View>
    )
  }
}

function mapStateToProps ({ decks }, props) {
  // Recupera o id do deck selecionado
  // Pega apenas as questions do deck selecionado
  const id = props.navigation.getParam('id')
  const questions = decks[id].questions
  
  // Se houver um id, retorna apenas o deck criado/clicado
  // Caso contrário, retorna todos os decks existentes (Está na página principal)
  return {
    id,
    questions
  }
}

export default connect(mapStateToProps)(CardList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnNewCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2ed573',
    width: '100%',
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnStartQuiz: {
    backgroundColor: '#cf000f',
    width: '100%',
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

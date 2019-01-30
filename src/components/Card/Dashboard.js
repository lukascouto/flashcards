import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Card from './Card'
import ScreenResult from './ScreenResult'
import { connect } from 'react-redux'

class CardList extends Component {
  state = {
    count: 0,
    score: 0,
    showResult: false
  }
  nextQuestion = (isCorrect) => {
    const { count, score } = this.state
    const { questions } = this.props
    // Enquanto houver questão, passa para a próxima
    // Se isCorrect, então soma mais uma resposta certa no score
    if (count+1 < questions.length) {
      this.setState({
        count: count + 1,
        score: isCorrect ? score + 1 : score,
      })
    } else {
      this.setState({
        score: isCorrect ? score + 1 : score,
        showResult: true,
      })
    }
  }

  // Seta todos os valores default do state e passa o id do baralho para reiniciar o quiz
  restartQuiz = () => {
    const { id } = this.props

    this.setState({
      count: 0,
      score: 0,
      showResult: false
    })
    this.props.navigation.navigate('CardList', { id })
  }

  render() {
    const { questions, navigation, id } = this.props
    const { count, score, showResult } = this.state

    // Se showResult, mostrar o resultado do Quiz
    if (showResult) {
      return <ScreenResult
              questions={questions}
              score={score}
              navigation={navigation}
              id={id}
              onRestartQuiz={this.restartQuiz}
            />
    }

    return (
      <View style={ styles.container }>
        <View style={ styles.status }>
          <Text style={ styles.statusText }>{count+1}/{questions.length}</Text>
          <Text style={ styles.statusText }>
            Toque na questão para ver a resposta
          </Text>
        </View>
        <View style={{ flex: 0.9 }}>
          <Card
            item={questions[count]}
            onNextQuestion={(value) => this.nextQuestion(value)}
          />
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
    backgroundColor: '#F1F1F1',
  },
  status: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  statusText: {
    color: '#5E5A5A',
    fontSize: 16,
    fontWeight: 'bold'
  },
})

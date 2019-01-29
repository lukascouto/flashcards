import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native'

class Card extends Component {
  state = {
    textLink: 'Ver resposta',
    question: true,
  }
  flipCard() {
    if (this.state.question) {
      this.setState({
       question: false,
       textLink: 'Voltar à pergunta'
      })
    } else {
      this.setState({
        question: true,
        textLink: 'Ver resposta'
      })
    }
  }

  nextQuestion = (value) => {
    this.setState({
      question: true,
      textLink: 'Ver resposta'
    })
    this.props.onNextQuestion(value)
  }

  render() {
    const { item } = this.props
    const { question } = this.state

    return (
      <Fragment>
        <View style={{ flex: 1 }}>
          <View style={ styles.preview }>
          {
            question ?
              <ScrollView style={ styles.card }>
                <Text style={ styles.flipText }>{item.question}</Text>
              </ScrollView>
            :
              <ScrollView style={ styles.card }>
                <Text style={styles.flipText}>{item.answer}</Text>
              </ScrollView>
          }
          </View>
            <View style={ styles.link }>
              <TouchableOpacity onPress={() => this.flipCard()}>
                <Text style={ styles.textLink }>{this.state.textLink}</Text>
              </TouchableOpacity>
            </View>
            <View style={ styles.containerButtons }>
              {
                !question ?
                  <View style={ styles.answer }>
                    <View style={{ justifyContent: 'center', alignItems: 'center'} }>
                      <Text style={{ color: '#5E5A5A', fontSize: 20 }}>A sua respota está...</Text>
                    </View>
                    <View style={ styles.buttons }>
                      <TouchableOpacity
                        style={ styles.btnCorrect }
                        onPress={() => this.nextQuestion(true) }
                      >
                        <Text style={{ color: '#2ed573', fontSize: 20, fontWeight: 'bold' }}>Correta</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnIncorrect}
                        onPress={() => this.nextQuestion(false)}
                      >
                        <Text style={{ color: '#cf000f', fontSize: 20, fontWeight: 'bold' }}>Incorreta</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                : null
              }
            </View>
        </View>
      </Fragment>
    )
  }
}

export default Card

const styles = StyleSheet.create({
  preview: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  link: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textLink: {
    color: '#ff4757',
    fontSize: 20
  },
  containerButtons: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  answer: {
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  buttons: {
    flexDirection: 'row',
  },
  btnCorrect: {
    backgroundColor: 'transparent',
    flex: 0.5,
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIncorrect: {
    flex: 0.5,
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    height: '100%',
  },
  flipText: {
    fontSize: 20,
    color: '#5E5A5A',
  }
})

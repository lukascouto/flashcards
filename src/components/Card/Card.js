import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated
} from 'react-native'

class Card extends Component {
  state = {
    question: true,
    animation: new Animated.Value(180)
  }
  flipCard() {
    if (this.state.question) {
      this.startAnimation()
      this.setState({
       question: false,
      })
    } else {
      this.endAnimation()
      this.setState({
        question: true,
      })
    }
  }

  nextQuestion = (value) => {
    this.setState({
      question: true,
      animation: new Animated.Value(180)
    })
    this.props.onNextQuestion(value)
  }

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 600
    }).start();
  }

  endAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 180,
      duration: 600
    }).start();
  }

  render() {
    const { item } = this.props
    const { question } = this.state

    const frontInterpolate =
    this.state.animation.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"],
    })

    const backInterpolate =
    this.state.animation.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"],
    })

    const animatedStyles = {
      transform: [
        {
          rotateY: question ? frontInterpolate : backInterpolate
        }
      ]
    }

    return (
      <Fragment>
        <View style={{ flex: 1 }}>

          <TouchableOpacity
            onPress={() => this.flipCard()}
            style={ styles.preview }
          >
            <Animated.ScrollView style={ [styles.card, animatedStyles]}>
              {
                question ?
                  <Text style={styles.textQuestion}>{item.question}</Text>
                :
                  <Text style={styles.textAnswer}>{item.answer}</Text>
              }
            </Animated.ScrollView>
          </TouchableOpacity>


            <View style={ styles.containerButtons }>
              {
                !question ?
                  <View style={ styles.answer }>
                    <View style={{ justifyContent: 'center', alignItems: 'center'} }>
                      <Text style={{ color: '#5E5A5A' }}>A sua respota está...</Text>
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
    marginTop: 10,
    marginBottom: 20,
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
  textQuestion: {
    transform: [{ rotateY: '-180deg'}],
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4757'
  },
  textAnswer: {
    transform: [{ rotateY: '180deg'}],
    top: 0,
    left: 0,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff4757'
  }
})

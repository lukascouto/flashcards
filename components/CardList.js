import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Card from './Card'
import { connect } from 'react-redux'

class CardList extends Component {

    state = {
        count: 0,
        score: 0,
        isAnswer: false,
        showResult: false
    }

    nextQuestion = (isCorrect) => {

        const { count, score } = this.state
        const { questions, id } = this.props
        
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

    // Recebe um valor booleano para decidir se é para exibir os botões Correto e Incorreto
    isAnswer = (answer) => {
        this.setState({
            isAnswer: answer
        })
    }

    // Seta todos os valores default do state e passa o id do baralho para reiniciar o quiz
    restartQuiz = () => {
        const { id } = this.props
        this.setState({
            count: 0,
            score: 0,
            isAnswer: false,
            showResult: false
        })
        this.props.navigation.navigate('CardList', { id })
    }

    render() {
        const { questions, navigation, id } = this.props
        const { count, score, isAnswer, showResult } = this.state

        // Se showResult, mostrar o resultado do Quiz
        if (showResult) {
            return (
                <View style={{ flex: 1, padding: 15, backgroundColor: '#111111' }}>

                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>  
                        <Text style={{color: '#5E5A5A', fontSize: 26}}>Resultado</Text>
                        <Text style={{color: '#5E5A5A', fontSize: 20, marginTop: 20}}>Você acertou {score} de {questions.length} questões</Text>
                    </View>

                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.btnRestartQuiz}
                            onPress={() => this.restartQuiz()}
                        >
                            <Text style={{color: '#ff4757'}}>Recomeçar Quiz</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnBackToDeck}
                            onPress={() => navigation.navigate('Home', { id })}
                        > 
                            <Text style={{color: 'white'}}>Voltar ao baralho</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            )
        }

        return (
            <View style={{ flex: 1, padding: 15, backgroundColor: '#111111' }}>

                <View style={ styles.status }>
                    <Text style= { styles.statusText }>Questão: {count+1}/{questions.length} | Score: {score}</Text>
                </View>

                <View style={{ flex: 0.9 }}>
                    <Card 
                        item={questions[count]}
                        onAnswer={(answer) => this.isAnswer(answer)}
                    /> 
                </View>
                
                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                {
                    isAnswer ?
                        <View style={styles.answer}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ color: '#5E5A5A', fontSize: 20 }}>A sua respota está...</Text>
                            </View>
                            <View style={styles.buttons}>
                                <TouchableOpacity
                                    style={styles.btnNewCard}
                                    onPress={() => this.nextQuestion(true)}
                                > 
                                    <Text style={{color: '#2ed573', fontSize: 20, fontWeight: 'bold'}}>Correta</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btnStartQuiz}
                                    onPress={() => this.nextQuestion(false)}
                                >
                                    <Text style={{color: '#cf000f', fontSize: 20, fontWeight: 'bold'}}>Incorreta</Text>
                                </TouchableOpacity> 
                            </View>
                            
                        </View> : null
                }
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
    status: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    statusText: {
        color: '#ff4757',
        fontSize: 20,
        textTransform: 'uppercase'
    },
    buttons: { 
        flexDirection: 'row',  
    },
    answer: { 
        width: '100%', 
        position: 'absolute',
        bottom: 0
    },
    btnNewCard: {
        backgroundColor: 'transparent',
        flex: 0.5,
        padding: 16,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStartQuiz: {
        flex: 0.5,
        padding: 16,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    btnRestartQuiz: {
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
      btnBackToDeck: {
        backgroundColor: '#ff4757',
        width: '100%',
        padding: 16,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
})

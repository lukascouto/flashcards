import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  ScrollView
} from 'react-native'

class Card extends Component{

    state = {
        textLink: 'Ver resposta',
        question: true
    }

    flipCard() {
        if (this.state.question) {
            this.props.onAnswer(true)
            this.setState({
               question: false,
               textLink: 'Voltar à pergunta'
               
            })  
        } else {
            this.props.onAnswer(false)
            this.setState({
                question: true,
                textLink: 'Ver resposta'
            })
        }
    }

    render() {

        const { item } = this.props
        const { question } = this.state


        return (
            <Fragment>
<               View style={{ flex: 1 }}>

                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>

                        {
                            question ?

                            <ScrollView style={styles.card}>
                                <Text style={styles.flipText}>{item.question}</Text>
                            </ScrollView>

                            :

                            <ScrollView style={[styles.card, {backgroundColor: '#222222' }]}>
                                <Text style={styles.flipText}>{item.answer}</Text>
                            </ScrollView> 

                        }
  
                    </View>
                    
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this.flipCard()}>
                            <Text style={{color: '#ff4757', fontSize: 20}}>{this.state.textLink}</Text>
                        </TouchableOpacity>
                    </View>

                    

                </View>
            </Fragment>
        )
    }
}

export default Card

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        width: '100%',
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
      },
    card: {
        backgroundColor: '#151515',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        height: '100%'
      },
    flipCardBack: {
        backgroundColor: '#222222'
      },
    flipText: {
        fontSize: 20,
        color: '#5E5A5A',
    }
})
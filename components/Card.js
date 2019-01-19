import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native'

class Card extends Component{

    state = {
        textLink: 'Ver resposta'
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
      } 
    
    componentWillUnmount() {
        this.animatedValue.removeAllListeners()
    }

    flipCard() {
        if (this.value >= 90) {
            this.setState({
               textLink: 'Ver resposta'
            })
            this.props.onAnswer(false)
            Animated.spring(this.animatedValue,{
              toValue: 0,
              friction: 8,
              tension: 10
            }).start();
        } else {
            this.setState({
                textLink: 'Voltar à pergunta'
            })
            this.props.onAnswer(true)
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
    }
    }

    render() {

        const { item } = this.props

        const frontAnimatedStyle = {
            transform: [
              { rotateY: this.frontInterpolate }
            ]
        }

        const backAnimatedStyle = {
            transform: [
              { rotateY: this.backInterpolate }
            ]
        }

        return (
            <Fragment>
<               View style={{ flex: 1 }}>
                    <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center' }}>
                        <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity, width: '100%'}]}>
                            <Text style={styles.flipText}>{item.question}</Text>
                        </Animated.View>
                        <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity, width: '100%'}]}>
                            <Text style={styles.flipText}>{item.answer}</Text>
                        </Animated.View> 
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
    flipCard: {
        backgroundColor: '#151515',
        padding: 15,
        borderRadius: 5,
        backfaceVisibility: 'hidden',
        position: "absolute",
        top: 0,
        height: '100%'
      },
    flipCardBack: {
        backgroundColor: '#222222',
        position: "absolute",
        top: 0
      },
    flipText: {
        fontSize: 20,
        color: '#5E5A5A',
    }
})
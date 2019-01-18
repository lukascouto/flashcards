import React, { Component, Fragment } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native'

class Card extends Component{

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
        console.log('Entrou aqui')
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
              toValue: 0,
              friction: 8,
              tension: 10
            }).start();
          } else {
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
            <View style={styles.container}>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity, width: '100%'}]}>
                    <Text style={styles.flipText}>{item.question}</Text>
                </Animated.View>
                <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity, width: '100%'}]}>
                    <Text style={styles.flipText}>{item.answer}</Text>
                </Animated.View>  
                <View style={{padding: 30}}>
                    <TouchableOpacity onPress={() => this.flipCard()}>
                        <Text style={{color: '#ff4757', fontSize: 20}}>Ver Resposta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Card

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    flipCard: {
        //height: 250,
        flex: 0.8,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: 'white',
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        backgroundColor: '#151515',
        position: 'absolute'
    },
    flipText: {
        fontSize: 20,
        color: '#5E5A5A',
    }
})



/*

<Fragment>
                <View style={styles.container}>
                    <View>
                        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                            <Text style={styles.text}>{item.question}</Text>
                        </Animated.View>
                        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                            <Text style={styles.text}>{item.answer}</Text>
                        </Animated.View>
                    </View>
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableOpacity onPress={() => this.flipCard()}>
                        <Text style={{color: '#ff4757', fontSize: 20}}>Ver resposta</Text>
                    </TouchableOpacity>
                </View>
            </Fragment>


*/
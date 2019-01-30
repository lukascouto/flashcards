import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import ButtonSolid from '../Buttons/ButtonSolid'
import ButtonOutline from '../Buttons/ButtonOutline'
import { VictoryPie } from 'victory-native'


export default function ScreenResult({ score, questions, navigation, id, onRestartQuiz }) {
  const percent = x = Math.round((100 / questions.length) * score)
  return (
    <View style={ styles.container }>
      <View style={ styles.result }>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ position: 'absolute', fontSize: 60, color: '#5E5A5A' }}>
            {percent}%
          </Text>
          <VictoryPie
            labels={() => null} // remove os textos de x
            innerRadius={100} // deixa o círculo vazado
            colorScale={["#EBEBEB", "#2ed573"]} // seta as cores cinza e verde
            data={[
              { x: '', y: questions.length - score }, // erradas
              { x: '', y: score }, // certas
            ]}
          />
        </View>
       <Text style={ styles.subtitle }>
         Você acertou {score} de {questions.length} questões
       </Text>
      </View>
      <View style={ styles.buttons }>
        <ButtonOutline onPress={() => onRestartQuiz()}>
          Recomeçar Quiz
        </ButtonOutline>
        <ButtonSolid onPress={() => navigation.goBack()}>
          Voltar ao baralho
        </ButtonSolid>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F1F1'
  },
  result: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtitle: {
    color: '#5E5A5A',
    fontSize: 20,
  },
  buttons: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
})

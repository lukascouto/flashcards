import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { addDeck } from '../actions/decks'
import { connect } from 'react-redux'

class NewDeck extends Component {
  state = {
    title: ''
  }

  handleTextChange = (title) => {
    this.setState(() => ({
      title
    }))
  }

  handlePress = () => {

    const { title } = this.state
    
    this.props.dispatch(addDeck({
      title,
      questions: []
    }))
    

    this.setState({ title: '' })
  }
  render() {
    const { title } = this.state
    return (
      <View>
        <Text style={styles.container}>Create New Deck</Text>
        <TextInput
          value={title}
          onChangeText={this.handleTextChange}
          placeholder="New"
          style={styles.input}
        />
        <TouchableOpacity
          onPress={this.handlePress}
          style={styles.btn}>
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  input: {
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    marginTop: 20,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#E53224',
    padding: 10,
    paddingLeft: 50,
    paddingRight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff'
  }
})

export default connect()(NewDeck)

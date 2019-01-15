import React, { Component } from 'react'
import { Button, View, FlatList } from 'react-native'
import Deck from './Deck'
import { connect } from 'react-redux'

class DeckList extends Component {

  render() {
    const { decksArray } = this.props
    return (
      <View>
        <FlatList
          data={decksArray}
          renderItem={({item}) => <Deck {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title="+"
          onPress={() => this.props.navigation.navigate('New')}
        />
      </View>
    )
  }
}

function mapStateToProps ({ decks }, props) {

  const decksArray = Object.values(decks)
  return {
    decksArray
  }
}

export default connect(mapStateToProps)(DeckList)

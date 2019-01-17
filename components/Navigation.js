import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './DeckList'
import NewDeck from './NewDeck'
import NewCard from './NewCard'

const AppNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: "Home",
      headerTintColor: 'white',
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        backgroundColor: '#222121',
      },
    },
  },
  New: {
    screen: NewDeck,
    navigationOptions: {
      title: "Novo baralho",
      headerTintColor: 'white',
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        backgroundColor: '#222121',
      }
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: "Nova carta",
      headerTintColor: 'white',
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        backgroundColor: '#222121',
      }
    },
  },
});

export default createAppContainer(AppNavigator)
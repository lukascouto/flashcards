import { createStackNavigator, createAppContainer } from 'react-navigation'
import DeckList from '../components/Deck/Dashboard'
import NewDeck from '../components/Deck/NewDeck'
import NewCard from '../components/Card/NewCard'
import CardList from '../components/Card/Dashboard'

const AppNavigator = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: "Home",
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
    },
  },
  Deck: {
    screen: DeckList,
    navigationOptions: {
      title: "Baralho",
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: "Novo baralho",
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      }
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: "Novo cartão",
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      }
    },
  },
  CardList: {
    screen: CardList,
    navigationOptions: {
      title: `Quiz`,
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      }
    },
  },
});

export default createAppContainer(AppNavigator)

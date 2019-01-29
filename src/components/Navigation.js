import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './Deck/Dashboard'
import NewDeck from './Deck/NewDeck'
import NewCard from './Card/NewCard'
import CardList from './Card/Dashboard'

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
      title: "Deck",
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
      title: "Quiz",
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      }
    },
  },
});

export default createAppContainer(AppNavigator)

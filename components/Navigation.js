import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './DeckList'
import NewDeck from './NewDeck'
import NewCard from './NewCard'

const AppNavigator = createStackNavigator({
  Home: DeckList,
  New: NewDeck,
  NewCard: NewCard,
});

export default createAppContainer(AppNavigator)
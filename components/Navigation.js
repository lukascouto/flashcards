import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './DeckList'
import NewDeck from './NewDeck'

const AppNavigator = createStackNavigator({
  Home: DeckList,
  New: NewDeck,
});

export default createAppContainer(AppNavigator)
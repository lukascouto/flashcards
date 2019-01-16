import { ADD_DECK, ADD_CARD } from '../actions/decks'

function decks (state = {}, action) {
  switch (action.type) {
    case ADD_DECK :
      return {
        ...state,
        [action.deck.id]: action.deck
      }
    case ADD_CARD :
    // Retorna todos os baralhos do estado
    // Modifica a propriedade questions do baralho correspondente ao id passado
    // Concatenando uma nova carta
      return {
        ...state,
				[action.deckID]: {
					...state[action.deckID],
					questions: state[action.deckID].questions.concat([action.card])
				}
      }  
    default :
      return state
  }
}

export default decks

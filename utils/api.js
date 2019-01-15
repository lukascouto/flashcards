import { AsyncStorage } from 'react-native'

export function submitDeck ({ deck, key }) {
  return AsyncStorage.mergeItem(JSON.stringify({
    [key]: deck,
  }))
}
/*
export function fetchAllItems = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        const items = await AsyncStorage.multiGet(keys)

        return items
    } catch (error) {
        console.log(error, "problemo")
    }
}
*/

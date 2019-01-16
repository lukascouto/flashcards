import React, { Component } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import Navigation from './components/Navigation'
import NewDeck from './components/NewDeck'

// Novas importações para o Redux
import reducer from './reducers'
import middleware from './middleware'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Redux Persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)
// Fim Redux Persist

class App extends Component {
  render() {
    AsyncStorage.clear()
    // Substitui o reducer pelo persistedReducer
    // persistStore e PersistGate do pacote redux-persist
    const store = createStore(persistedReducer, middleware)
    const persistor = persistStore(store)
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
})


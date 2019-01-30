import React, { Component } from 'react'
import Navigation from './src/routes/Navigation'
import { AsyncStorage } from 'react-native'
import { setLocalNotification } from './src/utils/helpers'

// Redux
import reducer from './src/reducers'
import middleware from './src/middleware'
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

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    //AsyncStorage.clear()
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

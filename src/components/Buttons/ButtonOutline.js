import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ButtonOutline ({ children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btn}
    >
      <Text style={{ color: '#ff4757' }}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff4757',
    width: '100%',
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

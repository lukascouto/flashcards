import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ButtonSolid ({ children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btn}
    >
      <Text style={{ color: '#fff' }}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#ff4757',
    width: '100%',
    padding: 16,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

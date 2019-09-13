import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

import ShowWeather from './components/ShowWeather'

export default class App extends Component {
  render() {
    return (
      <View style={styles.backgroundGradient}>
        <ShowWeather />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundGradient:{
    backgroundImage: "linear-gradient(21deg, rgba(255,255,255,1) 0%, rgba(0,117,255,1) 48%)",
    height: "100vh"
  }
})

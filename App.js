import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ShowWeather from './components/ShowWeather'
import AddWeather from './components/AddWeather'

const RootStack = createStackNavigator(
  {
    Home: { screen: ShowWeather },
    addWeather: { screen: AddWeather }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
  
)

export default createAppContainer(RootStack)

// const AppContainer = createAppContainer(RootStack)



// export default class App extends Component {

//   render() {
//     return (
//       <View>
//         <AppContainer />
//       </View>
//     )
//   }
// }
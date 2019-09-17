import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, AsyncStorage, TextInput, FlatList, ActivityIndicator } from 'react-native'

export default class AddWeather extends Component {
    state = {
        weatherData: [],
        loading: true,
        weatherDataIndex: 0
    }

    componentDidMount() {
        this.setWeatherData()
        console.log('', this.state.loading)
    }


    async setWeatherData() {
        let tempWeatherData = []
        tempWeatherData = JSON.parse(await AsyncStorage.getItem('weatherData'))
        this.setState({weatherData: tempWeatherData, loading: false})
        console.log('state.WeatherData:', this.state.weatherData)
    }

    onChangeText(text) {

    }

    async setActiveWeather(index){
        await AsyncStorage.setItem('activeWeather', index)
        console.log('Active Weather Storage', await AsyncStorage.getItem('activeWeather'))
    }

    renderWeatherData = (item, index) => {
        console.log('lol', )
        return (
            <View style={{ borderBottom: "1px solid black", padding: 5, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <Text style={{color: "white"}}>{item}</Text>
                <Button 
                    title="Set Active"
                    onPress={()=> this.setActiveWeather(index)}
                />
            </View>
        )
    }

    render() {
        if (!this.state.loading) {
            return (
                <View style={styles.backgroundGradient}>
                    <View>
                        <Button
                            title="Go back"
                            onPress={() => this.props.navigation.goBack()}
                        />
                        <View style={{ marginTop: 10 }}>
                            <Button
                                title="Add Weather"
                                onPress={() => this.setWeatherData()}
                            />
                            <TextInput
                                style={{ height: 40, borderColor: 'grey', borderWidth: 1, backgroundColor: "white" }}
                                onChangeText={text => this.onChangeText(text)}
                            />
                        </View>
                        <FlatList
                            data={this.state.weatherData}
                            renderItem={({item, index}) =>  this.renderWeatherData(item, index)}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <ActivityIndicator style={{ flex: 1, justifyContent: "center", alignItems: "center" }} size={"large"} color={"lightBlue"} />
            )
        }
    }
}

const styles = StyleSheet.create({
    backgroundGradient: {
        backgroundImage: "linear-gradient(21deg, rgba(255,255,255,1) 0%, rgba(0,117,255,1) 48%)",
        height: "100vh"
    }
})

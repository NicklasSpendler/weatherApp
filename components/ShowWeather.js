import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, Image, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class ShowWeather extends Component {

    state = {
        loading: true
    }

    componentDidMount() {
        this.fetchData();

    }

    async fetchData() {
        try {
            //Assign the promise unresolved first then get the data using the json method. 
            const currentWeatherApiCall = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Roskilde,dk&appid=a6934fad987dfa8d074e82f7e6a07791&units=metric');
            const next24HoursWeatherApiCall = await fetch('http://api.weatherbit.io/v2.0/forecast/hourly?key=45a75622ca4143be9f250fbeeed7db73&city=Roskilde,dk&hours=24');

            const currentWeatherData = await currentWeatherApiCall.json();
            const next24HourWeatherData = await next24HoursWeatherApiCall.json();

            this.setState({ currentWeather: currentWeatherData, next24HoursWeather: next24HourWeatherData.data, loading: false });
            console.log(this.state.currentWeather)
        } catch (err) {
            console.log("Error fetching data-----------", err);
        }
    }

    renderHorizontalList = ({ item }) => {
        return (
            <View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "white" }}>{item.temp}°</Text>
                </View>
                <Image source={{ uri: `https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png` }} style={{ height: 64, width: 64 }} />
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: "pink" }}>{item.timestamp_utc.substring(11, 16)}</Text>
                </View>
            </View>
        )
    }

    render() {
        if (!this.state.loading) {
            return (
                <View>
                    <View style={styles.header}>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Image source={{ uri: `http://openweathermap.org/img/wn/${this.state.currentWeather.weather[0].icon}@2x.png` }}
                                style={{ height: 100, width: 100 }}
                            />
                            <View>
                                <Text style={styles.headerText}>{parseFloat(this.state.currentWeather.main.temp).toFixed(1)}°</Text>
                                <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row" }}>
                                    <View style={{flex: 1, alignItems: "center"}}>
                                        <Text style={{color: "white"}}>Min </Text>
                                        <Text style={{ color: "white" }}>{parseFloat(this.state.currentWeather.main.temp_min).toFixed(1)}°</Text>
                                    </View>
                                    <View style={{flex: 1, alignItems: "center"}}>
                                        <Text style={{color: "white"}}>Max</Text>
                                        <Text style={{ color: "white" }}>{parseFloat(this.state.currentWeather.main.temp_max).toFixed(1)}°</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "space-between", flexDirection: "row", marginRight: 20, marginLeft: 20, marginTop: 20 }}>
                        <Text style={{ color: "white", fontSize: 20 }}>
                            {this.state.currentWeather.weather.description}
                        </Text>
                        <Text style={{ color: "white", fontSize: 20 }}>
                            {this.state.currentWeather.city_name}
                        </Text>
                    </View>

                    <View>
                        <FlatList
                            data={this.state.next24HoursWeather}
                            renderItem={this.renderHorizontalList}
                            horizontal={true}
                            style={{ width: "100vw" }}
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
    header: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 50,
        marginRight: 20,
    },
    headerText: {
        fontSize: "50px",
        color: "white"
    }
})

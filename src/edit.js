import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class ChangeColor extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Change Color',
    }
    render() {
        return <View style={
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'green',
            }
        }>
        <Text style={{fontsize: 30}}>
            This is section of filtering image
        </Text>
        </View>
    }
}

class Crop extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Crop',
    }
    render() {
        return <View style={
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'yellow',
            }
        }>
        <Text style={{fontsize: 30}}>
            This is section of cropping images
        </Text>
        </View>
    }
}

const Edit = createBottomTabNavigator({
    ChangeColor: ChangeColor,
  Crop: Crop,
});

export default createAppContainer(Edit);
import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class FromGallery extends React.Component {

    static navigationOptions = {
        tabBarLabel: 'From Gallery',
        
    }

    render() {
        return (
        <View style={
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'grey',
            }
        }>
        <Text style={{color:'#fff'}}>Select Image</Text>
        </View>
        );
    }
}

class TakePhoto extends React.Component {
    static navigationOptions = {
        title: 'Hello!',
        tabBarLabel: 'Take Photo',
        
    }
    render() {
        return <View style={
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
            }
        }>
        {/* <Text style={{fontsize: 30}}>
            This is section of taking photo
        </Text> */}
        </View>
    }
}

const Select = createBottomTabNavigator({
  FromGallery: FromGallery,
  TakePhoto: TakePhoto,
});

export default createAppContainer(Select);
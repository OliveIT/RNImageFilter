import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Gallery from './Gallery';
import TakePhoto from './TakePhoto';

import style from '../../style';

const Select = createAppContainer(createBottomTabNavigator({
  Gallery: Gallery,
  TakePhoto: TakePhoto,
}, {
    tabBarOptions: {
        showIcon: false,
        activeBackgroundColor: '#0081e0',
        labelStyle: {
          fontSize: 15,
          color: '#fff',
        },
        tabStyle: {
            textAlign: 'center',
            justifyContent: 'center',
        },
        style: {
          backgroundColor: '#d5dce0',
        },
    },
}));


export default () => (
    <View style={style.scene}>
        <Select/>
    </View>
);
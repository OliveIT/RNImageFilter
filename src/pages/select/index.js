import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Gallery from './Gallery';
import TakePhoto from './TakePhoto';

import style from '../../style';
import { tabOptions } from '../options';

const Select = createAppContainer(createBottomTabNavigator({
  Gallery: Gallery,
  TakePhoto: TakePhoto,
}, {
    tabBarOptions: tabOptions,
}));


export default () => (
    <View style={style.scene}>
        <Select/>
    </View>
);
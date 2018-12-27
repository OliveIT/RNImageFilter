import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

//import ChangeColor from './ChangeColor';
import Crop from './Crop';

import style from '../../style';
import { tabOptions } from '../options';

const Select = createAppContainer(createBottomTabNavigator({
  Crop: Crop,
  ChangeColor: Crop,
}, {
    tabBarOptions: tabOptions,
}));


export default () => (
    <View style={style.scene}>
        <Select/>
    </View>
);
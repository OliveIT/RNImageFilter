import React from 'react';
import { Text, View, Image, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class SendPost extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'Send Post',
        
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
        <Text style={{fontsize: 30}}>
            This is post section
        </Text>
        <View style={styles.button}>
        <Button title="Go back from this HomeScreen"/>
        </View>
        </View>
    }
}


const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0
  },
});
export default SendPost;

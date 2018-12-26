import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Camera from 'react-native-camera';
import { CameraRollPicker } from 'react-native-camera-roll-picker';

class FromGallery extends React.Component {
    static navigationOptions = {
        tabBarLabel: 'From Gallery',
        
    }
    render() {
        return <View style={
            {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'grey',
            }
        }>
        <Camera ref={(cam) => {
            this.camera = cam
        }}
        style = {styles.view}
        aspect = {Camera.constants.Aspect.fill}>
        <Text style={styles.capture}
        onPress={this.takePicture.bind(this)}>
        [CAPTURE_IMAGE]
        </Text>
        </Camera>
        
        <Text style={{fontsize: 30}}>
            This is section of getting images
        </Text>
        {/* <CameraRollPicker
          groupTypes='SavedPhotos'
          /> */}
        </View>
    }
    takePicture() {
        const options = {}

        this.camera.capture({metadata: options}).then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        })
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
        <Text style={{fontsize: 30}}>
            This is section of taking photo
        </Text>
        </View>
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: 'steelblue',
        borderRadious: 10,
        color: 'red',
        padding: 15,
        margin: 45
    }
});
const Select = createBottomTabNavigator({
  FromGallery: FromGallery,
  TakePhoto: TakePhoto,
});

export default createAppContainer(Select);
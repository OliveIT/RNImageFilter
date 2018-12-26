import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ImagePickerManager from 'react-native-image-picker';

const options = {
    title: 'my pic app',
    takePhotoButtonTitle: 'Take photo with C',
    chooseFromLibraryButtonTitle: 'choose photo from library',
}
class FromGallery extends React.Component {
    constructor(props){
        super(props);
        this.state={
            avatarSource: null
        }
    }
    static navigationOptions = {
        tabBarLabel: 'From Gallery',
        
    }
    myfun=()=>{
        // ImagePickerManager.showImagePicker(options, (response) => {
        //     console.log('Response = ', response);
          
        //     if (response.didCancel) {
        //       console.log('User cancelled image picker');
        //     } else if (response.error) {
        //       console.log('ImagePicker Error: ', response.error);
            
        //     } else {
        //       const source = { uri: response.uri };
          
        //       // You can also display the image using data:
        //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
        //       this.setState({
        //         avatarSource: source,
        //       });
        //     }
        //   });
        alert("ddfwef");
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
        <TouchableOpacity style={{backgroundColor: 'green', margin:10, padding:10}}
        onPress={this.myfun}>
        <Text style={{color:'#fff'}}>Select Image</Text>
        </TouchableOpacity>
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
        <Text style={{fontsize: 30}}>
            This is section of taking photo
        </Text>
        </View>
    }
}

const Select = createBottomTabNavigator({
  FromGallery: FromGallery,
  TakePhoto: TakePhoto,
});

export default createAppContainer(Select);
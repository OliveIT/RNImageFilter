import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from '../../style';
import { setUri } from "../../actions";

const cameraImage = require('../../assets/camera.png');
 
class TakePhoto extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          uri: null
      }
  }

  onTakePhoto() {
    const options = {
        title: 'Take photo',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
    };
    ImagePicker.launchCamera(options, (response) => {
        console.log(response);
        if (!response.uri) return;

        this.props.setUri({
            origin: response.uri
        });
        this.setState({
            uri: response.uri
        })
    });
  }
  
  render() {
    return (
        <View style={style.takePhoto.content}>
            <View style={style.takePhoto.vCenterContent}>
                <TouchableOpacity
                    style={style.takePhoto.imageContent}
                >
                    {
                    this.props.uri.origin ?
                        <Image source={{uri: this.props.uri.origin}}
                            style={style.takePhoto.image}/>
                        :
                        <Image source={cameraImage}
                            style={style.takePhoto.defaultImage}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.takePhoto.button}
                    onPress={() => this.onTakePhoto()}>
                    <Text style={style.takePhoto.buttonText}>take photo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const mapStateToProps = state => ({
    uri: state.selectionInfo.uri
});

export default connect(
    mapStateToProps,
    {
        setUri
    }
)(TakePhoto);
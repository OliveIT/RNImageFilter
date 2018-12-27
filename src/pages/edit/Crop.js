import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import style from '../../style';
import { setUri } from "../../actions";

const cloudImage = require('../../assets/cloud.png');
 
class CropPage extends React.Component {
  constructor(props) {
      super(props);
  }

  async onPressImage() {
    ImagePicker.openCropper({
        path: this.props.uri,
    }).then(image => {
        this.props.setUri(image.path);
    });
  }

  onPressOk() {

  }
  
  render() {
    return (
        <View style={style.crop.content}>
            {
            this.props.uri ? 
            <View>
                <TouchableOpacity style={style.crop.cropContent}
                    onPress={() => this.onPressImage()}>
                    <Image source={{uri: this.props.uri}}
                        style={style.crop.cropContent}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={style.takePhoto.button}
                    onPress={() => this.onPressOk()}>
                    <Text style={style.takePhoto.buttonText}>Ok</Text>
                </TouchableOpacity>
            </View> : 
            <Image source={cloudImage} style={style.crop.defaultImage}/>
            }
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
)(CropPage);
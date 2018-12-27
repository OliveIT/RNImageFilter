import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    contrast,
    saturate
  } from 'react-native-color-matrix-image-filters';
import style from '../../style';
import { setUri } from "../../actions";

const cloudImage = require('../../assets/cloud.png');
 
class ChangeColor extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          uri: null
      }
  }

  onPressImage() {
    ImagePicker.openCropper({
        path: this.props.uri.origin,
    }).then(image => {
        this.setState({
            uri: image.path
        });
    });
  }

  onPressOk() {
    this.props.setUri({
        origin: this.props.uri.origin,
        crop: this.state.uri
    });
    this.setState({
        uri: null
    })
  }

  getImageUri() {
      if (!this.state.uri && !this.props.uri) return null;
      if (this.state.uri)   return this.state.uri;
      if (this.props.uri.color) return this.props.uri.color;
      if (this.props.uri.crop)  return this.props.uri.crop;
      return this.props.uri.origin;
  }
  
  render() {
    return (
        <View style={style.crop.content}>
            {
            this.state.uri || this.props.uri ? 
            <View>
                <TouchableOpacity style={style.crop.cropContent}
                    onPress={() => this.onPressImage()}>
                    <Image source={{uri: this.getImageUri() }}
                        style={style.crop.cropContent}
                    />
                </TouchableOpacity>

                <View style={style.crop.btnContent}>
                    <View style={style.crop.btnSmContent}>
                        <TouchableOpacity
                            style={style.crop.button}
                            onPress={() => this.onPressOk()}>
                            <Text style={style.takePhoto.buttonText}>This is Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
)(ChangeColor);
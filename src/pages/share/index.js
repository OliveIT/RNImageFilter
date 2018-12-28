import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from '../../style';
import { setUri } from "../../actions";

import {
    Normal,
    RGBA,
    Saturate,
    HueRotate,
    LuminanceToAlpha,
    Invert,
    Grayscale,
    Sepia,
    Nightvision,
    Warm,
    Cool,
    Brightness,
    Contrast,
    Temperature,
    Tint,
    Threshold,
    Technicolor,
    Polaroid,
    ToBGR,
    Kodachrome,
    Browni,
    Vintage,
    Night,
    Predator,
    Lsd,
    ColorTone,
    DuoTone,
    Protanomaly,
    Deuteranomaly,
    Tritanomaly,
    Protanopia,
    Deuteranopia,
    Tritanopia,
    Achromatopsia,
    Achromatomaly
} from 'react-native-color-matrix-image-filters';

const cameraImage = require('../../assets/camera.png');
 
class Share extends React.Component {
  filters = [Normal,
    RGBA,
    Saturate,
    HueRotate,
    LuminanceToAlpha,
    Invert,
    Grayscale,
    Sepia,
    Nightvision,
    Warm,
    Cool,
    Brightness,
    Contrast,
    Temperature,
    Tint,
    Threshold,
    Technicolor,
    Polaroid,
    ToBGR,
    Kodachrome,
    Browni,
    Vintage,
    Night,
    Predator,
    Lsd,
    ColorTone,
    DuoTone,
    Protanomaly,
    Deuteranomaly,
    Tritanomaly,
    Protanopia,
    Deuteranopia,
    Tritanopia,
    Achromatopsia,
    Achromatomaly];

  filter = null;

  constructor(props) {
      super(props);
      this.state = {
          uri: null
      }
  }

  getImageUri() {
      if (!this.props.uri.origin) return null;
      if (this.props.uri.crop)  return this.props.uri.crop;
      return this.props.uri.origin;
  }

  onSendPost() {
    console.log(this.filter);

    if (this.getImageUri() == null) return;

    const data = new FormData();
    data.append('photo', {
      uri: this.getImageUri(),
    });
    let url = "http://192.168.42.1/";
    fetch(url, {
      method: 'post',
      body: data
    }).then(res => {
        console.log(res);
    });
  }
  
  render() {
    let CurFilter = this.filters [this.props.uri.filter ? this.props.uri.filter : 0];
    console.log(CurFilter);
    return (
        <View style={style.share.content}>
            <View style={style.share.vCenterContent}>
                <View
                    style={style.takePhoto.imageContent}
                >
                    {
                    this.getImageUri() ?
                        <CurFilter>
                            <Image source={{uri: this.getImageUri()}}
                            style={style.takePhoto.image}
                            ref={ref => this.filter = ref}/>
                        </CurFilter>
                        :
                        <Image source={cameraImage}
                            style={style.takePhoto.defaultImage}/>
                    }
                </View>
                <TextInput
                    placeholder="Write caption..."
                    multiline={true}
                    numberOfLines={4}></TextInput>
            </View>
            <View style={style.share.btnSmContent}>
                <TouchableOpacity
                    style={style.share.bottomBtn}
                    onPress={() => this.onSendPost()}>
                    <Text style={style.share.bottomBtnText}>Send Post</Text>
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
)(Share);
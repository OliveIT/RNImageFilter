import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, TextInput, DeviceEventEmitter } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from '../../style';
import { setUri } from "../../actions";
import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";
import RNFS from 'react-native-fs';


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

  base64Data = null;

  constructor(props) {
      super(props);
      this.state = {
          uri: null
      }
  }

  componentDidMount() {
    const _this = this;
    DeviceEventEmitter.addListener('setImageBufferBase64', function (e) {
        console.log("length", e.data.length, this);
        _this.setImageBufferBase64(e);
    });
  }

  setImageBufferBase64(e) {
    this.base64Data = e.data;
//        uri: "data:image/png;base64," + e.data
  }

  getImageUri() {
      if (!this.props.uri.origin) return null;
      if (this.props.uri.crop)  return this.props.uri.crop;
      return this.props.uri.origin;
  }

  async onSendPost() {
    if (this.getImageUri() == null) return;
    if (this.base64Data == null)    return;

    const tempPath = RNFS.ExternalCachesDirectoryPath + "/temp.jpg";
    await RNFS.writeFile(tempPath, this.base64Data, 'base64');

    let newFileUri = `file://${tempPath}`;

    const data = new FormData();
    const caption = this.refs.inputCaption._lastNativeText;

    data.append('photo', {
      uri: newFileUri,
      name: 'photo.jpg',
      type: 'image/jpg'
    });
    data.append('caption', caption);
    let url = "http://192.168.42.1/work/reactnative/Imagefilter_20181227/server/index.php";
    fetch(url, { 
      headers: {
//        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      method: 'post',
      body: data
    }).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    });
  }

  render() {
    let filterIndex = this.props.uri.filter ? this.props.uri.filter : 0;
    let CurFilter = this.filters [filterIndex];

    return (
        <View style={style.share.content}>
            <View style={style.share.vCenterContent}>
                <View
                    style={style.takePhoto.imageContent}
                >
                    {
                    this.getImageUri() ?
                        <CurFilter isTarget={true}>
                            <Image source={{uri: this.getImageUri()}}
                            style={style.takePhoto.image}/>
                        </CurFilter>
                        :
                        <Image source={cameraImage}
                            style={style.takePhoto.defaultImage}/>
                    }
                    {this.state.uri ?
                    <Image source={{uri: this.state.uri}}
                            style={style.takePhoto.image}/>
                    : null }
                </View>
                <TextInput
                    ref="inputCaption"
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
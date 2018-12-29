import * as React from 'react';
import { connect } from "react-redux";
import { View, 
    StyleSheet, 
    Dimensions, 
    Text, 
    Image, 
    TouchableOpacity, 
    TextInput, 
    Platform } from 'react-native';
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

  targetPath = null;

  constructor(props) {
      super(props);
  }

  componentWillMount() {
    if (Platform.OS == 'android')
      this.targetPath = RNFS.ExternalCachesDirectoryPath + "/temp.jpg";
    else if (Platform.OS == 'ios')
      this.targetPath = RNFS.CachesDirectoryPath + "/temp.jpg";
  }

  getImageUri() {
      if (!this.props.uri.origin) return null;
      if (this.props.uri.crop)  return this.props.uri.crop;
      return this.props.uri.origin;
  }

  async onSendPost() {
    if (this.getImageUri() == null) return;
    if (!await RNFS.exists(this.targetPath))   return;
    
    const tempPath = this.targetPath;

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
        console.log("Success", res);
    }).catch(e => {
        console.log("Error", e);
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
                        <CurFilter isTarget={true}
                            targetPath={this.targetPath}>
                            <Image source={{uri: this.getImageUri()}}
                            style={style.takePhoto.image}/>
                        </CurFilter>
                        :
                        <Image source={cameraImage}
                            style={style.takePhoto.defaultImage}/>
                    }
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
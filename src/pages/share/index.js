import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from '../../style';
import { setUri } from "../../actions";
import Canvas, {Image as CanvasImage} from 'react-native-canvas';

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
  canvas = null;

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

  handleCanvas(canvas) {
    if (this.canvas == null) {
        this.canvas = canvas;
        this.drawCanvas();
    } else
        this.canvas = canvas;
  }

  drawCanvas() {
    window.setTimeout(() => {
        if (this.canvas == null)    return;

        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'purple';
        ctx.fillRect(0, 0, 100, 100);
        
        const image = new CanvasImage(this.canvas);
        image.src = this.getImageUri();
        image.uri = this.getImageUri();
        image.url = this.getImageUri();

        console.log(cameraImage);

        console.log(image);

        image.addEventListener('load', () => {
    //        debugger
            console.log('image is loaded');
            context.drawImage(image, 0, 0, 100, 100);
        });
        image.onload = () => {
        //        debugger
            console.log('image is loaded_onload');
            context.drawImage(image, 0, 0, 100, 100);
        }

        var data = ctx.getImageData(0, 0, 200, 200);
        console.log(data);
    }, 10);
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
//    this.drawCanvas();
    return (
        <View style={style.share.content}>
            <View style={style.share.vCenterContent}>
                <View
                    style={style.takePhoto.imageContent}
                >
                    {
                    this.getImageUri() ?
                        // <Canvas style={style.takePhoto.image}
                        //     ref={ref => this.handleCanvas(ref)}></Canvas>
                        <CurFilter isTarget={true}>
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
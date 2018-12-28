import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
/*import {
    OriginImage,
    GrayscaledImage,
    SepiaFilterImage,
    TintFilterImage,
    SaturateImage,
    ContrastImage,
    InvertImage,
    ColorMatrixImage
} from './Filters';*/

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
import style from '../../style';
import { setUri } from "../../actions";

const cloudImage = require('../../assets/cloud.png');

var window = Dimensions.get('window');
var columnCount = 5;
class ChangeColor extends React.Component {
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

  constructor(props) {
      super(props);
  }

  getImageUri() {
      if (!this.props.uri.origin) return null;
      if (this.props.uri.crop)  return this.props.uri.crop;
      return this.props.uri.origin;
  }

  onSelect(index, filter) {
    this.props.setUri({
        ...this.props.uri,
        filter: index
    });
  }
  
  render() {
    let CurFilter = this.filters [this.props.uri.filter ? this.props.uri.filter : 0];
    return (
        <View>
            {
            this.getImageUri() ? 
            <ScrollView>
                <View>
                    <CurFilter isTarget={false}>
                        <Image
                            source={{ uri: this.getImageUri() }}
                            style={style.gallery.mainImage}
                        />
                    </CurFilter>
                </View>
                
                <FlatList
                    data={this.filters}
                    numColumns={columnCount}
                    style={style.gallery.list}
                    extraData={this.getImageUri()}
                    renderItem={({index, item}) => {
                        var Filter = item;
                        return (<TouchableOpacity
                            onPress={() => this.onSelect(index, item)}
                            style={style.gallery.thumbImage}>
                            {<Filter isTarget={false}>
                                <Image 
                                style={{
                                    width: window.width / columnCount - window.width / 250 * 1.6,
                                    height: window.width / columnCount - window.width / 250 * 1.6,
                                }}
                                source={{ uri: this.getImageUri() }}/>
                            </Filter>}
                        </TouchableOpacity>);
                    }}
                />
            </ScrollView> : 
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
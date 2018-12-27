import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
    GrayscaledImage,
    SepiaFilterImage,
    TintFilterImage,
    ColorMatrixImage
} from './Filters';
import style from '../../style';
import { setUri } from "../../actions";

const cloudImage = require('../../assets/cloud.png');

var window = Dimensions.get('window');
var columnCount = 5;
class ChangeColor extends React.Component {
  filters = [GrayscaledImage, SepiaFilterImage, TintFilterImage, ColorMatrixImage];

  constructor(props) {
      super(props);
      this.state = {
          uri: null
      }
  }

  getImageUri() {
      if (!this.state.uri && !this.props.uri) return null;
      if (this.state.uri)   return this.state.uri;
      if (this.props.uri.color) return this.props.uri.color;
      if (this.props.uri.crop)  return this.props.uri.crop;
      return this.props.uri.origin;
  }

  onSelect() {

  }
  
  render() {
    return (
        <View>
            {
            this.getImageUri() ? 
            <ScrollView>
                <View>
                    <Image
                        source={{ uri: this.getImageUri() }}
                        style={style.gallery.mainImage}
                    />
                </View>
                
                <FlatList
                    data={this.filters}
                    numColumns={columnCount}
                    style={style.gallery.list}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => this.onSelect(item)}
                            style={style.gallery.thumbImage}>
                            {item({ 
                                style:{
                                    width: window.width / columnCount - window.width / 250 * 1.6,
                                    height: window.width / columnCount - window.width / 250 * 1.6,
                                },
                                source:{ uri: this.getImageUri() }
                            })}
                        </TouchableOpacity>
                    )}
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
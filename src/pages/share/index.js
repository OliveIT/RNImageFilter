import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import style from '../../style';
import { setUri } from "../../actions";

const cameraImage = require('../../assets/camera.png');
 
class Share extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          uri: null
      }
  }

  getImageUri() {
      if (!this.props.uri.origin) return null;
      if (this.props.uri.color) return this.props.uri.color;
      if (this.props.uri.crop)  return this.props.uri.crop;
      return this.props.uri.origin;
  }

  onSendPost() {
    if (this.getImageUri() == null) return;

    const data = new FormData();
    data.append('photo', {
      uri: this.getImageUri(),
    });
    let url = "http://google.com/"
    fetch(url, {
      method: 'post',
      body: data
    }).then(res => {
        console.log(res);
    });
  }
  
  render() {
    return (
        <View style={style.share.content}>
            <View style={style.share.vCenterContent}>
                <View
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
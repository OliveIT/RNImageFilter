import * as React from 'react';
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import style from '../../style';
 
class TakePhoto extends React.Component { 
  render() {
    return (
      <View>
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
    }
)(TakePhoto);
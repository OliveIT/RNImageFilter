import * as React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, CameraRoll, Button, ScrollView, FlatList } from 'react-native';
import style from '../../style';

var window = Dimensions.get('window');
var columnCount = 4;

class Gallery extends React.Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            mainImageUri: 0,
        };
    }

    componentWillMount() {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
        .then(r => {
            var photos = [];
            for (var i = 0; i < 30; i ++)
                r.edges.map(value => {
                    photos.push(value.node.image);
                });
            
            var mainImageUri = null;
            if (photos.length)
                mainImageUri = photos [0].uri;
            this.setState({ 
                photos: photos,
                mainImageUri: mainImageUri });
        })
        .catch((err) => {
            //Error Loading Images
        });
    };

    onSelect(photo) {
        this.setState({
            mainImageUri: photo.uri
        });
    }

    render() {
        return (
        <View>
            <ScrollView>
                {this.state.mainImageUri ?
                    <View>
                        <Image
                            source={{ uri: this.state.mainImageUri }}
                            style={style.gallery.mainImage}
                        />
                    </View> : null }
                <FlatList
                    data={this.state.photos}
                    numColumns={columnCount}
                    style={style.gallery.list}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => this.onSelect(item)}
                            style={style.gallery.thumbImage}>
                            <Image
                                style={{
                                    width: window.width / columnCount,
                                    height: window.width / columnCount,
                                }}
                                source={{ uri: item.uri }}
                                />
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
      </View>
    );
  }
}

export default Gallery;
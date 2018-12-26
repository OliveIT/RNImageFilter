import { Dimensions } from 'react-native';

var window = Dimensions.get('window');

const style = {
    scene: {
        flex: 1,
    },

    gallery: {
        list: {
            marginLeft: - window.width / 250,
            marginRight: - window.width / 250,
            marginTop: window.width / 250,
            marginBottom: window.width / 250,
        },
        mainImage: {
            width: window.width,
            height: window.width
        },
        thumbImage: {
            padding: window.width / 250
        }
    }
};

export default style;
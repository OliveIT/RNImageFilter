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
    },

    takePhoto: {
        content: {
            flex: 1,
            flexDirection: "vertical",
            justifyContent: 'center',
        },
        vCenterContent: {
            justifyContent: 'center',
            background: "#f00",
            height: 100
        }
    }
};

export default style;
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
            width: window.width,
            height: window.height * 0.8,
        },
        vCenterContent: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'center',

            height: 100,
            width: window.width,
            paddingHorizontal: window.width * 0.05
        },
        imageContent: {
            width: window.width * 0.9,
            height: window.width * 0.9,
            backgroundColor: "#ddd",
            flexDirection: "column",
            justifyContent: 'center'
        },
        image: {
            width: window.width * 0.9,
            height: window.width * 0.9,
        },
        defaultImage: {
            width: window.width * 0.3,
            height: window.width * 0.3,
            margin: window.width * 0.3,
            opacity: 0.3
        },
        button: {
            borderRadius: 50,
            backgroundColor: '#0081e0',
            width: window.width * 0.9,
            marginTop: window.width * 0.05
        },
        buttonText: {
            fontSize: 20,
            color: "#fff",
            textAlign: "center",
            width: window.width * 0.9,
            padding: window.width * 0.02
        }
    },

    crop: {
        content: {
            width: window.width,
            height: window.height * 0.8,
        },
        cropContent: {
            width: window.width,
            height: window.width,
        },
        defaultImage: {
            width: window.width * 0.4,
            height: window.width * 0.4,
            margin: window.width * 0.3
        }
    }
};

export default style;
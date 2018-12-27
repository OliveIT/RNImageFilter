import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import SelectRoute from './pages/select';
import EditRoute from './pages/edit';
import SharePage from './pages/share';
 
/*const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
  </View>
);
const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
  </View>
);
const ThirdRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]}>
  </View>
);*/
 
export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'select' },
      { key: 'second', title: 'Edit' },
      { key: 'third', title: 'share' },
    ],
  };
 
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: SelectRoute,
          second: EditRoute,
          third: SharePage
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    );
  }
}
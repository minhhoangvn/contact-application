import React from 'react';
import { Button, Text, View, Dimensions, Platform } from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';

export default class App extends React.Component {
  render() {
    return <MyNavigator />;
  }
}
let screen = Dimensions.get('window');

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

class ScreenComponentOne extends React.Component {
  static navigationOptions = {
    headerTitle: 'First screen'
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'teal'
        }}
      >
        <Button
          title="Go to two"
          onPress={() => this.props.navigation.navigate('RouteNameTwo')}
        />
      </View>
    );
  }
}

class ScreenComponentTwo extends React.Component {
  static navigationOptions = {
    headerTitle: 'Second screen'
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          borderWidth: 25,
          borderColor: 'orange'
        }}
      >
        <Button
          title="Go to three"
          onPress={() =>
            this.props.navigation.navigate('RouteNameThree', {
              randomNumber: getRandomNumber()
            })
          }
        />
      </View>
    );
  }
}

class ScreenComponentThree extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: `Number: ${navigation.getParam('randomNumber')}`
    };
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 25,
          borderColor: 'purple'
        }}
      >
        <Text style={{ fontSize: 25 }}>
          {this.props.navigation.getParam('randomNumber')}
        </Text>
        <Button
          title="Get a new random number"
          onPress={() => {
            this.props.navigation.setParams({
              randomNumber: getRandomNumber()
            });
          }}
        />
        <Button
          title="Add another two"
          onPress={() => this.props.navigation.push('RouteNameTwo')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const Tabs = createBottomTabNavigator({
  'screen 1': {
    screen: ScreenComponentOne,
    navigationOptions: {
      tabBarLabel: 'Contact',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-albums" type="ionicon" size={28} color={tintColor} />
      )
    }
  },
  'screen 2': {
    screen: ScreenComponentTwo,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-heart" type="ionicon" size={28} color={tintColor} />
      )
    }
  },
  'screen 3': {
    screen: ScreenComponentThree,
    navigationOptions: {
      tabBarLabel: 'Groups',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-nuclear" type="ionicon" size={28} color={tintColor} />
      )
    }
  }
});

const MyNavigator = createAppContainer(
  createStackNavigator({
    Tabs: {
      screen: Tabs,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  })
);

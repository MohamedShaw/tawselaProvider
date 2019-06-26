import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { AppImage } from '../common';

export default class ImagePlaceholder extends Component {
  static defaultProps = {
    duration: 750,
    showActivityIndicator: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fadeAnim: new Animated.Value(1),
      loadEnded: false,
    };
  }

  onProgress = event => {
    const progress = event.nativeEvent.loaded / event.nativeEvent.total;
    this.setState({ isLoading: progress < 1 });
  };

  onLoadEnd = () => {
    this.setState({
      loadEnded: true,
    });
  };

  getPlaceholderStyles() {
    const container = [styles.placeholderContainer];
    if (!this.state.isLoading) {
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: this.props.duration,
      }).start();
      container.push({ opacity: this.state.fadeAnim });
    }
    container.push(this.props.placeholderContainerStyle);
    return container;
  }

  renderPlaceholder = () => (
    <Animated.View style={this.getPlaceholderStyles()}>
      <AppImage
        style={[styles.placeholder, this.props.placeholderStyle]}
        source={{ uri: this.props.placeholder }}
        flex
        stretch
      />
      {this.renderActivityIndicator()}
    </Animated.View>
  );

  renderActivityIndicator() {
    if (this.props.showActivityIndicator) {
      if (this.props.ActivityIndicator) {
        return this.props.ActivityIndicator;
      }
      return (
        <ActivityIndicator
          {...this.props.activityIndicatorProps}
          animating={this.state.isLoading}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <AppImage
          onProgress={this.onProgress}
          onLoadEnd={this.onLoadEnd}
          style={[styles.image, this.props.imageStyle]}
          source={{ uri: this.props.src }}
          flex
          stretch
        />
        {this.state.loadEnded ? null : this.renderPlaceholder()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
  placeholderContainer: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    flex: 1,
    alignSelf: 'stretch',
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    flex: 1,
    // zIndex: 5000,
  },
});

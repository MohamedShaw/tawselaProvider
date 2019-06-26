import React, { PureComponent } from 'react';
import {
  Modal,
  View as RNView,
  TouchableWithoutFeedback,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {
  AppScrollView,
  responsiveHeight,
  windowWidth,
  windowHeight,
  screenHeight,
} from '../common';
import { runTiming } from '../utils/animation';

const { Clock } = Animated;

const styles = StyleSheet.create({
  fullscreen: {
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: windowHeight,
    width: windowWidth,
  },
});

class BottomSheet extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };

    this.clock = new Clock();
    this.yPosition = runTiming(this.clock, screenHeight, 0, 300);
  }

  show = () => {
    this.setState({
      isVisible: true,
    });
  };

  hide = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    if (this.props.onLayout) {
      this.props.onLayout();
    }
  }

  render() {
    const { close } = this.props;
    return (
      <Modal
        hardwareAccelerated
        animationType="none"
        transparent
        visible={this.state.isVisible}
        onRequestClose={() => {
          this.setState({ isVisible: false });
        }}
      >
        <TouchableWithoutFeedback onPress={this.hide}>
          <RNView
            style={[
              styles.fullscreen,
              {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                height: screenHeight,
                justifyContent: 'flex-end',
              },
            ]}
          >
            <RNView
              style={{
                backgroundColor: 'white',
                width: windowWidth,
                height: screenHeight - windowHeight,
              }}
            />
          </RNView>
        </TouchableWithoutFeedback>

        <Animated.View
          pointerEvents="box-none"
          style={[
            styles.fullscreen,
            {
              justifyContent: 'flex-end',
              transform: [
                {
                  translateY: this.yPosition,
                },
              ],
            },
          ]}
        >
          <KeyboardAvoidingView behavior="padding" enabled>
            <RNView
              style={{
                alignSelf: 'stretch',
                width: windowWidth,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundColor: 'white',
                height:
                  responsiveHeight(this.props.height || 60) +
                  (screenHeight - windowHeight),
              }}
            >
              <AppScrollView
                showsVerticalScrollIndicator={false}
                flex
                stretch
                paddingTop={2}
                paddingBottom={6}
                style={{
                  width: windowWidth,
                }}
                flexGrow
              >
                {this.props.children}
                <RNView
                  style={{
                    backgroundColor: 'white',
                    width: windowWidth,
                    height: screenHeight - windowHeight,
                  }}
                />
              </AppScrollView>
            </RNView>
          </KeyboardAvoidingView>
        </Animated.View>
      </Modal>
    );
  }
}

export default BottomSheet;

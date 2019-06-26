import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppView,
  AppIcon,
  AppImage,
  AppNavigation,
  responsiveFontSize,
  moderateScale,
  AppInputError,
} from '../common';

const placholder = require('../assets/imgs/avatar.png');
// const placholder = require('../assets/imgs/chef.png');

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUri: this.props.initialUriValue || null,
    };
  }

  selectProfileImg = uri => {
    this.setState({
      imgUri: uri,
    });
    this.props.onChange(uri);
  };

  renderPlusIcon = () => (
    <AppView
      center
      equalSize={6}
      borderRadius={5}
      backgroundColor="primary"
      style={{
        position: 'absolute',
        top: 0,
        right: moderateScale(0),
      }}
    >
      <AppIcon
        type="font-awesome5"
        name="pen"
        size={7}
        color="button"
        style={{
          lineHeight: responsiveFontSize(8),
        }}
        marginLeft={-1}
      />
    </AppView>
  );

  render() {
    const {
      error,
      errorTextMarginBottom,
      errorTextMarginHorizontal,
    } = this.props;
    return (
      <AppView>
        {this.state.imgUri ? (
          <AppView padding={5} center>
            <AppView
              borderWidth={1}
              borderColor="grey"
              circleRadius={26}
              touchableOpacity
              onPress={() =>
                AppNavigation.push({
                  name: 'photoSelection',
                  passProps: {
                    action: this.selectProfileImg,
                  },
                })
              }
              style={{
                overflow: 'visible',
              }}
            >
              <AppImage
                source={{ uri: this.state.imgUri }}
                resizeMode="cover"
                flex
                stretch
                circleRadius={26}
              />
            </AppView>
            {!this.state.imgUri && (
              <AppInputError
                error="reqiered"
                errorTextMarginHorizontal={errorTextMarginHorizontal ? 4 : 10}
                size={5}
                errorTextMarginBottom={errorTextMarginBottom}
              />
            )}
          </AppView>
        ) : (
          <React.Fragment>
            <AppView padding={5} center>
              <AppView
                borderWidth={1}
                borderColor="grey"
                circleRadius={26}
                center
                onPress={() =>
                  AppNavigation.push({
                    name: 'photoSelection',
                    passProps: {
                      action: this.selectProfileImg,
                    },
                  })
                }
                style={{
                  overflow: 'visible',
                }}
              >
                <AppImage
                  source={placholder}
                  circleRadius={26}
                  resizeMode="contain"
                />
              </AppView>
              {this.renderPlusIcon()}
              {!this.state.imgUri && (
                <AppInputError
                  error="reqiered"
                  errorTextMarginHorizontal={errorTextMarginHorizontal ? 4 : 10}
                  size={5}
                  errorTextMarginBottom={errorTextMarginBottom}
                />
              )}
            </AppView>
          </React.Fragment>
        )}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Avatar);

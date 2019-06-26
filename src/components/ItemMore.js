import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {
  AppView,
  AppText,
  AppButton,
  AppImage,
  AppIcon,
  getTheme,
} from '../common';

import avatar from '../assets/imgs/avatar.png';

class ItemMore extends Component {
  static propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    textSize: PropTypes.number,
    text: PropTypes.string,
    nameLeft: PropTypes.string,
    type: PropTypes.string,
    typeLeft: PropTypes.string,
    sizeLeft: PropTypes.number,
    textMargin: PropTypes.number,
    borderBottomColor: PropTypes.string,
    borderBottomWidth: PropTypes.number,
    onPress: PropTypes.func,
    colorLeft: PropTypes.string,
    leftItem: PropTypes.node,
    rightItem: PropTypes.node,

    transparent: PropTypes.bool,
  };

  static defaultProps = {
    color: '#484848',
    size: 6,
    textSize: 6,
    nameLeft: 'ios-arrow-forward',
    typeLeft: 'ion',
    sizeLeft: 8,
    textMargin: 10,
    // borderBottomColor: '#ccc',
    // borderBottomWidth: 0.5,
    colorLeft: '#BFBFBF',
  };

  renderLeftIcon = c => {
    const { leftItem, size } = this.props;

    return React.cloneElement(leftItem, {
      size: leftItem.props.size || size * 1.4,
      color: leftItem.props.color || c,
    });
  };

  renderRightIcon = c => {
    const { rightItem, size } = this.props;

    return React.cloneElement(rightItem, {
      size: rightItem.props.size || size * 1.4,
      color: rightItem.props.color || c,
    });
  };

  render() {
    const {
      name,
      color,
      size,
      textSize,
      text,
      nameLeft,
      type,
      typeLeft,
      sizeLeft,
      borderBottomcolor,
      borderBottomWidth,
      onPress,
      colorLeft,
      textMargin,
      leftItem,
      rightItem,
      paddingHorizontal,

      ...rest
    } = this.props;

    return (
      <AppView
        {...rest}
        stretch
        borderBottomcolor={borderBottomcolor}
        borderBottomWidth={borderBottomWidth}
        // paddingVertical={5}
        onPress={onPress}
      >
        <AppView stretch spaceBetween row paddingHorizontal={paddingHorizontal}>
          {rightItem ? (
            this.renderRightIcon()
          ) : (
            <AppView row center paddingHorizontal={6}>
              <AppIcon
                name={name}
                type={type}
                size={size}
                lineHeight={size}
                flip={!this.props.rtl}
              />
              <AppText
                color={color}
                size={textSize}
                marginHorizontal={textMargin}
              >
                {text}
              </AppText>
            </AppView>
          )}

          {leftItem ? (
            this.renderLeftIcon()
          ) : (
            <AppIcon
              name="right"
              type="ant"
              size={sizeLeft}
              color={colorLeft}
              paddingHorizontal={6}
              flip
            />
          )}
        </AppView>
      </AppView>
    );
  }
}
const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  isConnected: state.network.isConnected,
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemMore);

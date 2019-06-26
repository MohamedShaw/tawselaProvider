import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions } from 'react-native';
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  getColors,
  AppImage,
} from '../../common';
import styles from './styles';

export default class OptionButton extends Component {
  renderCheckBox = () => {
    const { tagScroll, onPress, selected, value, style, text } = this.props;
    return (
      <>
        {text ? (
          <AppView
            borderColor={selected ? getColors().primary : getColors().grey}
            borderWidth={1}
            borderRadius={3}
            paddingHorizontal={2}
            style={style}
            onPress={() => {
              onPress(value);
            }}
            marginHorizontal={2}
            marginBottom={5}
          >
            <AppView
              style={{ position: 'absolute', top: 0, right: 0 }}
              // borderColor="red"
              backgroundColor={selected && getColors().primary}
            >
              {selected && (
                <AppIcon
                  name="check"
                  type="entypo"
                  size={4}
                  color="white"
                  backgroundColor="balck"
                />
              )}
            </AppView>
            <AppText paddingVertical={5} size={5} paddingHorizontal={2}>
              {text}
            </AppText>
          </AppView>
        ) : null}
      </>
    );
  };

  renderTagScrool = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX {...rest}>
        <AppView
          borderWidth={1.5}
          borderColor={selected ? getColors().primary : '#E9E9E9'}
          style={styles.radius}
          backgroundColor={selected ? getColors().primary : '#E9E9E9'}
          padding={5}
          center
          onPress={() => {
            onPress(value);
          }}
        >
          {tagScroll && (
            <AppText color={selected ? 'white' : '#8B8B8B'}>{text}</AppText>
          )}
        </AppView>
      </AppView>
    );
  };

  renderKitchenScroll = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      kitchen,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX {...rest}>
        <AppView
          borderWidth={1}
          borderColor="primary"
          backgroundColor={selected ? 'primary' : 'white'}
          paddingHorizontal={6}
          paddingVertical={1}
          center
          onPress={() => {
            onPress(value);
          }}
          borderRadius={3}
          touchableOpacity
        >
          {kitchen && (
            <AppText color={selected ? 'white' : 'primary'}>{text}</AppText>
          )}
        </AppView>
      </AppView>
    );
  };

  renderCategoryScroll = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      category,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX {...rest}>
        <AppView
          backgroundColor={
            selected ? getColors().primary : getColors().darkgrey
          }
          paddingHorizontal={6}
          paddingVertical={1}
          center
          onPress={() => {
            onPress(value);
          }}
          borderRadius={3}
        >
          {category && <AppText color="white">{text}</AppText>}
        </AppView>
      </AppView>
    );
  };

  renderDefault = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      gender,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX flex={!gender} {...rest}>
        <AppView
          borderWidth={1.5}
          borderColor={selected ? getColors().primary : getColors().grey}
          circleRadius={12}
          center
          onPress={() => {
            onPress(value);
          }}
          touchableOpacity
          marginHorizontal={2}
        >
          {name && (
            <AppImage
              source={name}
              marginHorizontal={1}
              resizeMode="contain"
              equalSize={12}
            />
          )}
        </AppView>
        {text && (
          <AppView center marginTop={2}>
            <AppText
              color={selected ? '#676767' : '#8B8B8B'}
              center
              size={5}
              bold={selected}
            >
              {text}
            </AppText>
          </AppView>
        )}
      </AppView>
    );
  };

  render() {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      gender,
      kitchen,
      category,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        {checkBox
          ? this.renderCheckBox()
          : tagScroll
          ? this.renderTagScrool()
          : kitchen
          ? this.renderKitchenScroll()
          : category
          ? this.renderCategoryScroll()
          : this.renderDefault()}
      </React.Fragment>
    );
  }
}

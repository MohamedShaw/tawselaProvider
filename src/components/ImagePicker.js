import React, { Component } from 'react';

import {
  AppView,
  AppScrollView,
  AppIcon,
  AppNavigation,
  AppImage,
  AppInputError,
} from '../common';

import LightBox from './LightBox';
import upload from '../assets/imgs/avatar.png';

export default class Imagesicker extends Component {
  static defaultProps = {
    maxImages: 10,
  };

  constructor(props) {
    super(props);
    this.state = {
      images: props.data ? props.data || [] : [],
      isLightBoxVisible: false,
      currentImageIndex: undefined,
    };
  }

  handleChange = () => {
    const { name, onChange, requiredImages, maxImages } = this.props;

    let imgs = this.state.images;
    if (requiredImages && requiredImages !== this.state.images.length) {
      imgs = [];
    }

    if (maxImages === 1) {
      if (imgs.length) imgs = imgs[0];
      else imgs = '';
    }

    if (onChange) {
      if (name) {
        onChange(
          name,
          imgs,
          requiredImages === 1
            ? false
            : !(
                this.state.images.length === 0 ||
                (requiredImages && imgs.length === requiredImages)
              ),
        );
      } else onChange(imgs);
    }
  };

  addNewImage = () => {
    if (!this.props.editable) return;

    AppNavigation.push({
      name: 'photoSelection',
      passProps: {
        action: uri => {
          this.setState(
            prevState => ({
              images: [...prevState.images, uri],
            }),
            () => {
              this.handleChange();
            },
          );
        },
      },
    });
  };

  showImage = index => {
    if (!this.props.editable) return;

    this.setState({
      isLightBoxVisible: true,
      currentImageIndex: index,
    });
  };

  renderPlaceholder = () => (
    <AppView
      borderColor="primary"
      borderWidth={1}
      circleRadius={12}
      backgroundColor="#f7f7f7"
      center
      onPress={this.addNewImage}
      marginHorizontal={2}
    >
      <AppIcon name="add" type="material" size={12} color="primary" />
    </AppView>
  );

  renderPlaceholderImage = () => (
    <AppView
      center
      onPress={this.addNewImage}
      backgroundColor="#E6E8EA"
      width={10}
      height={6}
    >
      <AppImage source={upload} equalSize={9} center />
    </AppView>
  );

  render() {
    const {
      error,
      upload,
      errorTextMarginHorizontal,
      errorTextMarginBottom,
      noValidation,
      ...rest
    } = this.props;

    const Container = upload
      ? this.renderPlaceholderImage()
      : this.renderPlaceholder();
    return (
      <>
        <AppScrollView
          {...rest}
          horizontal
          stretch
          alwaysBounceHorizontal={false}
          marginBottom={noValidation ? errorTextMarginBottom : null}
        >
          {this.state.images.map((img, index) =>
            upload ? (
              <AppImage
                key={String(index)}
                source={{
                  uri: img,
                }}
                borderWidth={1}
                borderColor="grey"
                marginLeft={3}
                equalSize={10}
                onPress={() => {
                  this.showImage(index);
                }}
              />
            ) : (
              <AppImage
                key={String(index)}
                source={{
                  uri: img,
                }}
                borderWidth={1}
                borderColor="grey"
                circleRadius={12}
                marginLeft={3}
                onPress={() => {
                  this.showImage(index);
                }}
              />
            ),
          )}
          {this.state.images.length < this.props.maxImages ? Container : null}
        </AppScrollView>
        {!noValidation ? (
          <AppInputError
            error={error}
            errorTextMarginHorizontal={errorTextMarginHorizontal ? 4 : 10}
            size={5}
            errorTextMarginBottom={errorTextMarginBottom}
          />
        ) : null}

        <LightBox
          isVisible={this.state.isLightBoxVisible}
          images={this.state.images}
          currentImageIndex={this.state.currentImageIndex}
          changeImages={imgs => {
            this.setState(
              {
                images: imgs,
              },
              () => {
                this.handleChange();
              },
            );
          }}
          changeState={v => {
            this.setState({
              isLightBoxVisible: v,
            });
          }}
        />
      </>
    );
  }
}

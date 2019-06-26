import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import { AppView, AppModal, AppIcon, AppButton, AppImage } from '../common';

class InfoModal extends Component {
  static propTypes = {
    type: PropsTypes.string,
  };

  static defaultProps = {
    type: 'success',
  };

  constructor(props) {
    super(props);

    this.state = {
      currentIndex: props.currentImageIndex || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isVisible !== this.props.isVisible && nextProps.isVisible) {
      this.setState({
        currentIndex: nextProps.currentImageIndex,
      });
    }
  }

  removeImage = () => {
    const index = this.state.currentIndex;
    const newValue = [
      ...this.props.images.slice(0, index),
      ...this.props.images.slice(index + 1),
    ];
    this.props.changeImages(newValue);

    if (newValue.length === 0) {
      this.props.changeState(false);
    } else if (!newValue[this.state.currentIndex]) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1,
      }));
    }
  };

  render() {
    const { isVisible, ...rest } = this.props;

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        lock
        {...rest}
      >
        <AppView row>
          <AppButton
            transparent
            touchableOpacity
            onPress={() => {
              if (this.state.currentIndex > 0) {
                this.setState(prevState => ({
                  currentIndex: prevState.currentIndex - 1,
                }));
              }
            }}
            leftIcon={
              <AppIcon
                type="ion"
                name="ios-arrow-back"
                color="white"
                size={14}
                flip
              />
            }
          />
          <AppImage
            source={{ uri: this.props.images[this.state.currentIndex] }}
            width={75}
            height={70}
          />
          <AppButton
            transparent
            touchableOpacity
            onPress={() => {
              if (this.state.currentIndex < this.props.images.length - 1) {
                this.setState(prevState => ({
                  currentIndex: prevState.currentIndex + 1,
                }));
              }
            }}
            leftIcon={
              <AppIcon
                type="ion"
                name="ios-arrow-forward"
                color="white"
                size={14}
                flip
              />
            }
          />
        </AppView>

        <AppView row marginTop={5}>
          <AppButton
            backgroundColor="white"
            color="primary"
            touchableOpacity
            onPress={() => {
              this.props.changeState(false);
            }}
            circleRadius={14}
            leftIcon={<AppIcon type="font-awesome" name="close" size={9} />}
            marginHorizontal={2}
          />
          <AppButton
            backgroundColor="white"
            color="primary"
            touchableOpacity
            onPress={() => {
              this.removeImage();
            }}
            circleRadius={14}
            leftIcon={<AppIcon type="font-awesome" name="trash" size={9} />}
            marginHorizontal={2}
          />
        </AppView>
      </AppModal>
    );
  }
}

export default InfoModal;

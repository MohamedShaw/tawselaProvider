import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import {
  AppView,
  AppText,
  getColors,
  AppImage,
  AppScrollView,
} from '../common';
import embty from '../assets/imgs/embty.png';

class EmptyContent extends Component {
  renderImageSection = () => {
    const { text, marginTop, marginTopText } = this.props;
    return (
      <AppView marginTop={marginTop || 22} centerX stretch>
        <AppImage
          source={embty}
          width={100}
          height={30}
          resizeMode="contain"
          marginBottom={4}
        />

        <AppView centerX marginTop={marginTopText || 15}>
          <AppText bold color={getColors().primary}>
            {I18n.t('home-empty-content-title')}
          </AppText>
          <AppText
            marginTop={3.5}
            lineHeight={10.5}
            center
            marginHorizontal={20}
          >
            {text && text}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  render() {
    const { ...rest } = this.props;
    return (
      <AppScrollView flex stretch>
        {this.renderImageSection()}
      </AppScrollView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmptyContent);

import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';

import {
  AppView,
  AppText,
  AppButton,
  AppImage,
  AppIcon,
  AppStarRating,
} from '../common';

import avatar from '../assets/imgs/avatar.png';

class ClientCardInfo extends Component {
  componentDidMount() {
    console.log('propssssssssssssssssssssssssssssss', this.props.currentUser);
  }

  renderClientCard = () => {
    const { currentUser, rtl } = this.props;

    return (
      <AppView row stretch paddingHorizontal={7}>
        <AppView stretch>
          <AppImage
            source={{ uri: currentUser.user.profileImage }}
            equalSize={16}
            resizeMode="stretch"
            stretch
            flex
          />
        </AppView>

        <AppView paddingHorizontal={7} stretch flex>
          <AppText bold size={7.5}>
            {rtl ? currentUser.user.name.ar : currentUser.user.name.en}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  render() {
    const { ...rest } = this.props;

    return (
      <AppView {...rest} stretch>
        {this.renderClientCard()}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientCardInfo);

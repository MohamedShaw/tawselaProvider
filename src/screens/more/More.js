import React, { Component } from 'react';
import { SafeAreaView, Platform, Switch } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import PropTypes from 'prop-types';

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  AppFormLocation,
  AppScrollView,
} from '../../common';
import {
  CustomBottomTabs,
  ClientCardInfo,
  ItemMore,
  LogoutModal,
  NoInternet,
} from '../../components';
import Navigation from '../../common/Navigation';
import { initLang, setLang } from '../../actions/lang';
import store from '../../store';

const BAR_HEIGHT_ANDROID = 56;
const BAR_HEIGHT_IOS = 49;
const barHeight = Platform.OS === 'ios' ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;

class More extends Component {
  state = {
    isLogOutVisible: false,
    isArabic: this.props.rtl,
  };

  renderSwitch = () => {
    const { data } = this.props;
    return (
      <>
        <AppView stretch paddingVertical={5} paddingHorizontal={5}>
          <ItemMore
            leftItem={
              <Switch
                trackColor={{
                  true: '#4CD964',
                }}
                ios_backgroundColor="#ccc"
                thumbColor="white"
                value={this.state.isArabic}
                onValueChange={v => {
                  this.setState({
                    isArabic: v,
                  });
                }}
              />
            }
            rightItem={
              <AppView row paddingHorizontal={2}>
                <AppIcon name="language" type="entypo" size={8} />
                <AppText size={5.5} marginHorizontal={10}>
                  {I18n.t('more-language')}
                </AppText>
              </AppView>
            }
          />
        </AppView>
      </>
    );
  };

  renderOption = () => (
    <AppScrollView stretch>
      {this.renderSwitch()}

      <AppView
        stretch
        // backgroundColor="white"
        borderTopColor="#ccc"
        borderTopWidth={0.5}
      >
        {/* <ItemMore
          name="address"
          type="entypo"
          size={8}
          text={I18n.t('more-address')}
          nameLeft="ios-arrow-forward"
          typeLeft="ion"
          paddingVertical={7}
          borderBottomColor="#ccc"
          borderBottomWidth={0.5}
        />  */}
        <AppFormLocation
          // {...injectFormProps('location')}
          placeholder={I18n.t('more-address')}
          leftItems={[<AppIcon name="address" type="entypo" size={8} />]}
          backgroundColor="#fff"
          bc="#E6E8EA"
        />
      </AppView>

      <AppView
        stretch
        marginTop={8}
        backgroundColor="white"
        borderTopColor="#ccc"
        borderTopWidth={0.5}
      >
        <ItemMore
          name="setting"
          type="ant"
          size={7}
          text={I18n.t('more-setting')}
          onPress={() => {
            AppNavigation.push('updateProfile');
          }}
          paddingVertical={7}
          borderBottomColor="#ccc"
          borderBottomWidth={0.5}
        />
        <ItemMore
          name="ios-call"
          type="ion"
          size={7}
          text={I18n.t('more-contact-us')}
          onPress={() => {
            Navigation.push({
              name: 'contactUs',
            });
          }}
          paddingVertical={7}
          borderBottomColor="#ccc"
          borderBottomWidth={0.5}
        />
        <ItemMore
          name="ios-call"
          type="ion"
          size={7}
          text={I18n.t('more-about-app')}
          onPress={() => {
            AppNavigation.push({
              name: 'aboutUs',
            });
          }}
          paddingVertical={7}
          borderBottomColor="#ccc"
          borderBottomWidth={0.5}
        />
      </AppView>
      <AppView
        stretch
        marginTop={8}
        backgroundColor="white"
        borderTopColor="#ccc"
        borderTopWidth={0.5}
      >
        <ItemMore
          name="logout"
          type="ant"
          size={7}
          text={I18n.t('more-log-out')}
          onPress={() => {
            this.setState({
              isLogOutVisible: true,
            });
          }}
          paddingVertical={7}
          borderBottomColor="#ccc"
          borderBottomWidth={0.5}
        />
      </AppView>
    </AppScrollView>
  );

  render() {
    const { currentUser, isConnected } = this.props;

    if (!currentUser) return null;
    if (!isConnected) {
      return (
        <AppView flex stretch backgroundColor="#ECEFEF">
          <NoInternet />
          <CustomBottomTabs componentId={this.props.componentId} />
        </AppView>
      );
    }

    if (this.state.isArabic) {
      setLang('ar', true)(store.dispatch);
    } else {
      setLang('en', false)(store.dispatch);
    }

    return (
      <AppView
        style={{
          paddingBottom: barHeight,
        }}
        flex
        stretch
        backgroundColor="#ECEFEF"
      >
        <SafeAreaView
          style={{ backgroundColor: '#fff', alignSelf: 'stretch' }}
        />
        {this.renderOption()}
        <CustomBottomTabs componentId={this.props.componentId} />
        <LogoutModal
          isVisible={this.state.isLogOutVisible}
          message={I18n.t('password-changed-success')}
          changeState={v => {
            this.setState({
              isLogOutVisible: v,
            });
          }}
        />
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
)(More);

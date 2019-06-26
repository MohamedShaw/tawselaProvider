import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking } from 'react-native';
import I18n from 'react-native-i18n';
import {
  AppView,
  AppText,
  getColors,
  AppButton,
  AppIcon,
  AppImage,
  AppScrollView,
  AppNavigation,
} from '../../common';
import { AppHeader, NoInternet } from '../../components';
import colors from '../../common/defaults/colors';

class AboutUs extends Component {
  renderImageVersion = () => (
    <>
      <AppImage
        source={require('../../assets/imgs/tawsila.jpg')}
        circleRadius={35}
        marginTop={10}
        marginBottom={2}
        resizeMode="contain"
      />
      <AppText color="grey" size={5}>
        {I18n.t('aboutUs-version')}
      </AppText>
    </>
  );

  renderTermsPrivacyBtns = () => (
    <AppView row marginVertical={15}>
      <AppButton
        title={I18n.t('aboutUs-terms-and-conditions')}
        backgroundColor="transparent"
        color={colors.primary}
        size={5}
        onPress={() => {
          AppNavigation.push({
            name: 'termsAndConditions',
          });
        }}
      />
      <AppText bold color={colors.grey}>
        .
      </AppText>
      <AppButton
        title={I18n.t('aboutUs-privacy')}
        backgroundColor="transparent"
        color={colors.primary}
        size={5}
        onPress={() => {
          AppNavigation.push({
            name: 'privacyPolicy',
          });
        }}
      />
    </AppView>
  );

  renderDescription = () => (
    <AppView marginVertical={5} paddingHorizontal={10} center stretch>
      <AppText lineHeight={10} color="#000" center>
        {I18n.t('aboutUs-description')}
      </AppText>
    </AppView>
  );

  renderCopyRights = () => (
    <AppView paddingVertical={2} center stretch backgroundColor="#E6E8EA">
      <AppText size={5} color="#858686">
        {I18n.t('aboutUs-copyRights')}
      </AppText>
    </AppView>
  );

  renderCompanies = () => (
    <AppView stretch paddingTop={5}>
      {/* <AppView
          row
          centerY
          stretch
          marginLeft={5}
          paddingLeft={5}
          borderBottomWidth={0.5}
          borderBottomColor={colors.grey}
          spaceBetween
        >
          <AppView row stretch centerY>
            <AppImage
              source={require('../../assets/imgs/ourservices.png')}
              width={10}
              height={8}
              resizeMode="contain"
            />
            <AppView marginHorizontal={10} marginTop={-2}>
              <AppText color="#000" marginBottom={2}>
                {I18n.t('aboutUs-5dmaty')}
              </AppText>
              <AppText size={5} color={colors.grey}>
                {I18n.t('aboutUs-operated-developed-company')}
              </AppText>
            </AppView>
          </AppView>
          <AppIcon
            flip
            name="ios-arrow-forward"
            type="ion"
            size={8}
            color="grey"
            marginHorizontal={10}
          />
        </AppView> */}
      <AppView row centerY stretch paddingLeft={10} spaceBetween marginTop={3}>
        <AppView row stretch centerY>
          <AppImage
            source={require('../../assets/imgs/avatar.png')}
            width={10}
            height={8}
            resizeMode="contain"
          />
          <AppView marginHorizontal={10} marginTop={-2}>
            <AppText color="#000" marginBottom={2}>
              {I18n.t('aboutUs-index')}
            </AppText>
            <AppText size={5} color={colors.grey}>
              {I18n.t('aboutUs-designed-programmed-company')}
            </AppText>
          </AppView>
        </AppView>
        <AppIcon
          flip
          name="ios-arrow-forward"
          type="ion"
          size={8}
          color="grey"
          marginHorizontal={10}
        />
      </AppView>
    </AppView>
  );

  render() {
    return (
      <AppView flex stretch backgroundColor="#F8F8F8">
        <AppHeader title={I18n.t('aboutUs-header')} />
        <AppScrollView stretch center flexGrow>
          {this.renderImageVersion()}
          {this.renderDescription()}
          <AppView flex />
          {this.renderTermsPrivacyBtns()}
          {this.renderCopyRights()}
          {this.renderCompanies()}
        </AppScrollView>
      </AppView>
    );
  }
}

export default connect()(AboutUs);

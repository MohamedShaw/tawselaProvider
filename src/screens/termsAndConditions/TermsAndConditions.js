import React, { Component } from 'react';
import { AppText, AppView, AppScrollView } from '../../common';
import { AppHeader } from '../../components';
import I18n from 'react-native-i18n';

export default class TermsAndConditions extends Component {
  render() {
    return (
      <AppView>
        <AppHeader title={I18n.t('terms-and-condition-title')} />
        <AppScrollView>
          <AppView marginTop={10} marginBottom = {30} marginHorizontal={17}>
            <AppView>
              <AppText bold>
                {I18n.t('terms-and-condition-first-header')}
              </AppText>
            </AppView>
            <AppView>
              <AppText>{I18n.t('terms-and-condition-first-details')}</AppText>
            </AppView>
            <AppView marginTop={15}>
              <AppText bold>
                {I18n.t('terms-and-condition-second-header')}
              </AppText>
            </AppView>
            <AppView>
              <AppText>{I18n.t('terms-and-condition-second-details')}</AppText>
            </AppView>
          </AppView>
        </AppScrollView>
      </AppView>
    );
  }
}

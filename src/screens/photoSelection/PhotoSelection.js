import React, { Component } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import I18n from 'react-native-i18n';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { AppView, AppNavigation, AppSpinner, showError } from '../../common';

import { AppHeader } from '../../components';

class PhotoSelection extends Component {
  constructor(props) {
    super(props);

    this.selected = false;
    this.state = {
      granted: Platform.OS === 'ios',
    };
  }

  async componentWillMount() {
    if (Platform.OS === 'ios') return;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({
          granted: true,
        });
      } else {
        AppNavigation.pop();
      }
    } catch (err) {
      showError(I18n.t('ui-error'));
    }
  }

  getSelectedImages = images => {
    if (this.selected) return;

    this.selected = true;
    const { action } = this.props;
    if (action) {
      action(images[0].uri);
    }
    AppNavigation.pop();
  };

  render() {
    return (
      <AppView centerX flex stretch>
        <AppHeader title={I18n.t('chooseImage')} />
        {this.state.granted && (
          <CameraRollPicker
            maximum={1}
            backgroundColor="white"
            selected={[]}
            loader={<AppSpinner color="primary" />}
            callback={this.getSelectedImages}
            selectSingleItem={false}
          />
        )}
      </AppView>
    );
  }
}
export default PhotoSelection;

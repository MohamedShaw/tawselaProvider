import React, { Component } from 'react';
import I18n from 'react-native-i18n';

import { AppView, SelectionOptionsGroup } from '../common';

import OptionButton from './optionButton/OptionButton';
import male from '../assets/imgs/homeCooker.png';
import girl from '../assets/imgs/girl.png';

class PurposeTypeSelect extends Component {
  static defaultProps = {};

  render() {
    const { name, initialValue, onSelect, ...rest } = this.props;

    return (
      <AppView row center {...rest} stretch>
        <SelectionOptionsGroup
          name={name}
          initialValue={initialValue}
          onSelect={onSelect}
          horizontal
        >
          <OptionButton
            text={I18n.t('provider-type-home-cooker-boy')}
            name={male}
            value="MALE"
            gender
            marginHorizontal={3}
          />
          <OptionButton
            text={I18n.t('provider-type-home-cooker-girl')}
            name={girl}
            value="FEMALE"
            gender
            marginHorizontal={3}
          />
        </SelectionOptionsGroup>
      </AppView>
    );
  }
}

export default PurposeTypeSelect;

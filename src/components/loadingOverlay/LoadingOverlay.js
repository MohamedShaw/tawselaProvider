import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import colors from '../../common/defaults/colors';
import { AppSpinner } from '../../common';

class LoadingOverlay extends Component {
  static propTypes = {
    showSpinner: PropTypes.bool,
  };

  static defaultProps = {
    showSpinner: true,
  };

  render() {
    const { showSpinner } = this.props;
    return (
      <View style={styles.container}>
        {showSpinner && (
          <AppSpinner size={14} color={this.props.color || colors.primary} />
        )}
      </View>
    );
  }
}


export default LoadingOverlay;

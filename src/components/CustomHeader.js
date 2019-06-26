import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { AppView, AppText, AppIcon, AppNavigation } from '../common';
import colors from '../common/defaults/colors';

class CustomHeader extends Component {
  static propTypes = {
    showNotification: PropTypes.bool,
    showChat: PropTypes.bool,
    border: PropTypes.bool,
    size: PropTypes.number,
    subTitle: PropTypes.any,
  };

  static defaultProps = {
    showNotification: false,
    showChat: false,
    border: false,
    size: 10,
    subTitle: null,
  };

  renderTitle = () => (
    <AppView flex={3} stretch centerY>
      <AppView row>
        <AppText size={this.props.size} bold>
          {this.props.title}
        </AppText>
      </AppView>
    </AppView>
  );

  render() {
    const border = this.props.border
      ? { borderBottomColor: colors.inputBorderColor, borderBottomWidth: 0.5 }
      : {};
    return (
      <SafeAreaView
        style={{
          alignSelf: 'stretch',
          ...border,
        }}
      >
        <AppView
          stretch
          paddingVertical={5}
          marginHorizontal={8}
          row
          spaceBetween
        >
          {this.renderTitle()}

          <AppView flex stretch row reverse />
        </AppView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomHeader);

import React, { Component } from 'react';
import { Switch, Platform } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { AppView, AppTabs, AppSpinner } from '../../common';
import { CustomBottomTabs, NoInternet } from '../../components';

import CustomTabBar from './CustomTabBar';
import Pending from './Pending';
import InProgress from './InProgress';
import Finished from './Finished';
import CustomHeader from './CustomHeader';

const BAR_HEIGHT_ANDROID = 56;
const BAR_HEIGHT_IOS = 49;
const barHeight = Platform.OS === 'ios' ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;

class Home extends Component {
  constructor(props) {
    super(props);

    console.log('Current User =====>>>>', props.currentUser);

    this.state = {
      visable: true,
    };
  }

  async componentDidAppear() {
    console.log('AHHHH***************************');

    this.setState({
      visable: true,
    });
  }

  componentDidDisappear() {
    this.setState({
      visable: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rtl !== this.props.rtl) {
      this.setState({
        visable: true,
      });
    }
  }

  render() {
    const { currentUser } = this.props;
    if (!currentUser) return null;

    if (!this.props.isConnected) {
      return (
        <AppView flex stretch backgroundColor="#ECEFEF">
          <CustomHeader title={I18n.t('home')} />

          <NoInternet />
          <CustomBottomTabs componentId={this.props.componentId} />
        </AppView>
      );
    }
    return (
      <AppView
        flex
        stretch
        style={{
          paddingBottom: barHeight,
        }}
      >
        <CustomHeader />
        {this.state.visable ? (
          <AppTabs customTabBar={<CustomTabBar />}>
            <Pending
              tabLabel={I18n.t('order-pending')}
              componentId={this.props.componentId}
              index={0}
            />
            <InProgress
              tabLabel={I18n.t('order-inProgress')}
              componentId={this.props.componentId}
              index={1}
            />
            <Finished
              tabLabel={I18n.t('order-finished')}
              componentId={this.props.componentId}
              index={2}
            />
          </AppTabs>
        ) : null}

        <CustomBottomTabs componentId={this.props.componentId} />
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
)(Home);

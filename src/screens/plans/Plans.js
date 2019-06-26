import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { Platform, Keyboard } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Axios from 'axios';
import {
  AppView,
  AppScrollView,
  AppText,
  responsiveHeight,
  responsiveWidth,
  moderateScale,
  AppNavigation,
  AppButton,
  AppModal,
  AppInput,
  AppImage,
  AppIcon,
  AppList,
} from '../../common';
import {
  CustomBottomTabs,
  NoInternet,
  SearchHeader,
  AppHeader,
  ProviderCard,
  Plan,
} from '../../components';
import {
  windowHeight,
  windowWidth,
  screenHeight,
} from '../../common/utils/responsiveDimensions';
import { API_ENDPOINT_FOOD_SERVICE } from '../../utils/Config';
// 
class Plans extends Component {
  constructor(props) {
    super(props);
    this.backPressed = 0;
    Navigation.events().bindComponent(this);
  }

  state = {
    visable: false,
    animate: true,
    data: [],
  };

  async componentDidAppear() {
    this.setState({
      visable: true,
    });
  }

  renderPostPlan = () => {
    const {} = this.props;
    return (
      <AppView
        backgroundColor="primary"
        circleRadius={15}
        style={{ position: 'absolute', right: 15, bottom: 65 }}
        center
        onPress={() => {
          AppNavigation.push('addPlan');
        }}
      >
        <AppIcon name="md-add" type="ion" size={8} color="white" />
      </AppView>
    );
  };

  render() {
    if (!this.props.currentUser) return null;
    return (
      <AppView stretch flex paddingBottom={26}>
        <AppView stretch height={6} />
        <AppList
          flatlist
          flex
          stretch
          apiRequest={{
            url: `${API_ENDPOINT_FOOD_SERVICE}plans`,

            responseResolver: response => {
              console.log('********', response.data.data);

              return {
                data: response.data.data,
                pageCount: response.data.pageCount,
              };
            },

            onError: error => {
              console.log(JSON.parse(JSON.stringify(error)));
              I18n.t('ui-error-happened');
            },
          }}
          data={this.state.data}
          rowRenderer={data => <Plan data={data} />}
          noResultsComponent={
            <AppView center stretch flex>
              <AppText> LIST IS Empty</AppText>
            </AppView>
          }
          refreshControl={this.props.homeList}
        />

        {this.renderPostPlan()}
        <CustomBottomTabs componentId={this.props.componentId} />
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
  rtl: state.lang.rtl,
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Plans);

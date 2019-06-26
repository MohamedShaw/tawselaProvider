import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Platform, StyleSheet, BackHandler } from 'react-native';
import I18n from 'react-native-i18n';
import {
  AppView,
  AppButton,
  AppIcon,
  AppText,
  AppModal,
  responsiveWidth,
} from '../common';
import Fonts from '../common/defaults/fonts';
import { onSelectTab } from '../actions/BottomTabsActions';
import Colors from '../common/defaults/colors';
import { getBottomSpace } from '../utils/iphoneHelper';

const BAR_HEIGHT_ANDROID = 56;
const BAR_HEIGHT_IOS = 49;
const barHeight = Platform.OS === 'ios' ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;
const bc = 'white';
const tabsAr = [
  { name: 'home', type: 'custom', index: 0, label: 'الرئيسية' },

  { name: 'more', type: 'custom', index: 1, label: 'المزيد' },
];
const tabsEn = [
  { name: 'home', type: 'custom', index: 0, label: 'Home' },

  { name: 'more', type: 'custom', index: 1, label: 'More' },
];

class CustomBottomTabs extends Component {
  constructor(props) {
    super(props);
    this.backPressed = 0;
    Navigation.events().bindComponent(this);
  }

  state = {
    isModalVisible: false,
  };

  handleBackPress = () => {
    if (this.backPressed && this.backPressed > 0) {
      this.setState({
        isModalVisible: false,
      });
      this.backPressed = 0;
      return true;
    }

    this.backPressed = 1;
    this.setState({
      isModalVisible: true,
    });
    return true;
  };

  onSelectTab = currentTabIndex => {
    this.props.selectTab(currentTabIndex);

    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex,
      },
    });
  };

  componentDidAppear() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentDidDisappear() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  renderTab = item => {
    const color =
      item.index === this.props.selectedIndx
        ? {
            color: Colors.primary,
          }
        : { color: Colors.darkgrey };
    return (
      <AppButton
        key={`${item.name}${item.type}`}
        style={styles.tabButton}
        backgroundColor={bc}
        stretch
        flex
        borderRadius={0}
        row={false}
        center
        onPress={() => this.onSelectTab(item.index)}
      >
        <AppText
          numberOfLines={1}
          style={[
            styles.tabText,
            color,
            item.label === 'قائمة الطعام' ? { fontSize: 9 } : {},
          ]}
        >
          {item.label}
        </AppText>
      </AppButton>
    );
  };

  renderSection = rtl => (
    <AppView
      row
      flex
      backgroundColor={bc}
      style={styles.barSection}
      spaceAround
    >
      {rtl
        ? tabsAr.map(item => this.renderTab(item))
        : tabsEn
            .slice()
            .reverse()
            .map(item => this.renderTab(item))}
    </AppView>
  );

  renderExitAppModal = () => {
    const { ...rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={this.state.isModalVisible}
        closeable
        changeState={v => {
          this.backPressed = 0;
          this.setState({
            isModalVisible: v,
          });
        }}
        {...rest}
      >
        <AppView
          width={75}
          backgroundColor="white"
          padding={6}
          borderRadius={5}
          center
          touchableOpacity
        >
          <AppText
            center
            marginVertical={9}
            color="#5F5F5F"
            size={6}
            bold
            lineHeight={9}
          >
            {I18n.t('exit-app-confirm')}
          </AppText>

          <AppView stretch row height={8}>
            <AppButton
              title={I18n.t('yes')}
              backgroundColor="primary"
              flex
              stretch
              margin={3}
              touchableOpacity
              onPress={() => {
                BackHandler.exitApp();
              }}
            />

            <AppButton
              title={I18n.t('no')}
              backgroundColor="grey"
              flex
              stretch
              margin={3}
              touchableOpacity
              onPress={() => {
                this.setState(prevState => ({
                  isModalVisible: !prevState.isModalVisible,
                }));
                this.backPressed = 0;
              }}
            />
          </AppView>
        </AppView>
      </AppModal>
    );
  };

  render() {
    return (
      <AppView style={styles.bar} row center>
        {this.renderSection(this.props.rtl)}
        {this.state.isModalVisible && this.renderExitAppModal()}
      </AppView>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    height: barHeight,
    overflow: 'visible',
    borderTopColor: Colors.inputBorderColor,
    borderTopWidth: 0.5,
  },
  barSection: { height: barHeight + getBottomSpace() },
  tabText: {
    fontFamily: Fonts.normal,
    fontSize: 10,
    width: '100%',
    textAlign: 'center',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabButton: {
    marginHorizontal: 10,
  },
});

const mapDispatchToProps = dispatch => ({
  selectTab: index => dispatch(onSelectTab(index)),
});

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  selectedIndx: state.bottomTabs.selectedIndx,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomBottomTabs);

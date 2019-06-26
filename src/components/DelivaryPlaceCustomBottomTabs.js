import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Text } from 'react-native';
// import SpinKit from 'react-native-spinkit';
import { AppView, AppButton, AppIcon, AppText } from '../common';
import Fonts from '../common/defaults/fonts';
import { delivaryPlaceOnSelectTab } from '../actions/DelivaryPlaceBottomTabsActions';
import Colors from '../common/defaults/colors';
import colors from '../common/defaults/colors';

const BAR_HEIGHT_ANDROID = 56;
const BAR_HEIGHT_IOS = 49;
const barHeight = Platform.OS === 'ios' ? BAR_HEIGHT_IOS : BAR_HEIGHT_ANDROID;
const bc = 'white';
const tabsAr = [
  { name: 'home', type: 'custom', index: 0, label: 'الرئيسية' },
  {
    name: 'partner',
    type: 'custom',
    index: 1,
    label: 'شركائي',
  },
  {
    name: 'wallet',
    type: 'custom',
    index: 2,
    label: 'المستحقات',
  },
  {
    name: 'more',
    type: 'custom',
    index: 3,
    label: 'المزيد',
  },
];
const tabsEn = [
  { name: 'home', type: 'custom', index: 0, label: 'Home' },
  {
    name: 'Path',
    type: 'custom',
    index: 1,
    label: 'My Parteners',
  },
  {
    name: 'wallet',
    type: 'custom',
    index: 2,
    label: 'Wallet',
  },

  { name: 'more', type: 'custom', index: 3, label: 'More' },
];

class DelivaryPlaceCustomBottomTabs extends Component {
  onSelectTab = currentTabIndex => {
    this.props.selectTab(currentTabIndex);

    Navigation.mergeOptions(this.props.componentId, {
      bottomTabs: {
        currentTabIndex,
      },
    });
  };

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
        borderRadius={0}
        row={false}
        center
        onPress={() => this.onSelectTab(item.index)}
      >
        <AppIcon
          style={[styles.tabIcon, color]}
          name={item.name}
          type={item.type}
        />
        {item.index === 2 && this.props.totalEarnings > 0 && (
          <>
            {/* <SpinKit
              style={{
                position: 'absolute',
                right: 9,
                bottom: barHeight / 2 - 10,
              }}
              isVisible={this.props.totalEarnings > 0}
              // size={20}
              type="Pulse"
              color="red"
            /> */}
            <AppView
              circleRadius={3}
              backgroundColor="white"
              style={{
                position: 'absolute',
                right: barHeight / 2 - 3,
                bottom: barHeight / 2 + 2,
                zIndex: 10000,
              }}
              center
            >
              <AppView circleRadius={2.5} backgroundColor="red" />
            </AppView>
          </>
        )}
        <AppText style={[styles.tabText, color]}>{item.label}</AppText>
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

  render() {
    return (
      <AppView style={styles.bar} row center>
        {this.renderSection(this.props.rtl)}
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
    borderTopColor: colors.inputBorderColor,
    borderTopWidth: 0.5,
  },
  barSection: { height: barHeight },
  tabText: {
    fontFamily: Fonts.normal,
    fontSize: 12,
    alignSelf: 'stretch',
  },
  tabIcon: {
    fontSize: 20,
  },
  tabButton: {
    marginHorizontal: 10,
  },
});

const mapDispatchToProps = dispatch => ({
  selectTab: index => dispatch(delivaryPlaceOnSelectTab(index)),
});

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  selectedIndx: state.delivaryPlaceBottomTabs.selectedIndx,
  totalEarnings: state.wallet.totalEarnings,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DelivaryPlaceCustomBottomTabs);

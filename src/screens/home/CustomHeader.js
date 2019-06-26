import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppView, AppText, AppIcon, AppNavigation } from '../../common';

class CustomHeader extends Component {
  renderTitle = () => (
    <AppView flex={3} stretch centerY>
      <AppText size={8} bold>
        {I18n.t('home')}
      </AppText>
    </AppView>
  );

  renderNotification = () => {
    const { unseenCountNotifications } = this.props;
    return (
      <AppView
        stretch
        flex
        transparent
        onPress={() => AppNavigation.push({ name: 'notifications' })}
        center
      >
        <AppIcon name="notification" type="custom" size={10} />
        {unseenCountNotifications > 0 && (
          <AppView
            borderColor="#fff"
            borderWidth={2}
            backgroundColor="#D0021B"
            circleRadius={5.5}
            style={{
              position: 'absolute',
              bottom: 1,
              right: 0,
              zIndex: 10000,
            }}
            center
          >
            <AppText size={4.5} bold color="#FFF">
              {unseenCountNotifications > 9 ? '+9' : unseenCountNotifications}
            </AppText>
          </AppView>
        )}
      </AppView>
    );
  };

  renderChat = () => {
    const { unseenCountMessages } = this.props;

    return (
      <AppView
        stretch
        flex
        transparent
        onPress={() => AppNavigation.push({ name: 'lastMessage' })}
        center
      >
        <AppIcon name="chat" type="custom" size={10} />
        {unseenCountMessages > 0 && (
          <AppView
            borderColor="#fff"
            borderWidth={2}
            backgroundColor="#D0021B"
            circleRadius={5.5}
            style={{
              position: 'absolute',
              bottom: 1,
              right: 0,
              zIndex: 10000,
            }}
            center
          >
            <AppText size={4.5} bold color="#FFF">
              {unseenCountMessages > 9 ? '+9' : unseenCountMessages}
            </AppText>
          </AppView>
        )}
      </AppView>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ alignSelf: 'stretch' }}>
        <AppView
          stretch
          paddingVertical={5}
          marginHorizontal={8}
          row
          spaceBetween
        >
          {this.renderTitle()}

          <AppView flex stretch row spaceBetween center>
            {this.renderNotification()}
            {this.renderChat()}
          </AppView>
        </AppView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  rtl: state.lang.rtl,
  unseenCountMessages: state.messages.unseenCount,
  unseenCountNotifications: state.notifications.unseenCount,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomHeader);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Platform,
  Animated,
  Text,
  View,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { responsiveHeight, AppView, AppText } from '../common';
import colors from '../common/defaults/colors';

const AnimatedAppView = Animated.createAnimatedComponent(AppView);

const { height: SCREEN_HEIGHT } = Dimensions.get('screen');
const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 170;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = '#3498db';
const DEFAULT_BACKGROUND_COLOR = '#303F9F';
const DEFAULT_TITLE_COLOR = 'white';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULT_NAVBAR_COLOR,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    backgroundColor: 'white',
    position: 'absolute',
    top: statusBarHeight,
    left: 0,
    right: 0,
    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  headerText: {
    color: DEFAULT_TITLE_COLOR,
    textAlign: 'center',
    fontSize: 16,
  },
  statusBar: {
    height: statusBarHeight,
    backgroundColor: colors.statusBar,
  },
});

class RNParallax extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      screenHeight: 0,
    };
    this.canHideStatusBar = true;
    this.state.scrollY.addListener(v => {
      const threshold = 200;
      const Value = v.value;
      if (Value > threshold && this.canHideStatusBar) {
        StatusBar.setBackgroundColor(colors.statusBar, true);
        this.canHideStatusBar = false;
      } else if (Value < threshold && !this.canHideStatusBar) {
        StatusBar.setBackgroundColor('transparent', true);
        this.canHideStatusBar = true;
      }
    });
  }

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight;
  }

  getHeaderMinHeight() {
    const { headerMinHeight } = this.props;
    return headerMinHeight;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - this.getHeaderMinHeight();
  }

  getExtraScrollHeight() {
    const { extraScrollHeight } = this.props;
    return extraScrollHeight;
  }

  getBackgroundImageScale() {
    const { backgroundImageScale } = this.props;
    return backgroundImageScale;
  }

  getInputRange() {
    return [-this.getExtraScrollHeight(), 0, this.getHeaderScrollDistance()];
  }

  getHeaderHeight() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [
        this.getHeaderMaxHeight() + this.getExtraScrollHeight(),
        this.getHeaderMaxHeight(),
        this.getHeaderMinHeight(),
      ],
      extrapolate: 'clamp',
    });
  }

  getNavBarOpacity() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });
  }

  getNavBarForegroundOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowNavBar } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp',
    });
  }

  getImageOpacity = () => {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  };

  getImageTranslate() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    });
  }

  getImageScale() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getBackgroundImageScale(), 1, 1],
      extrapolate: 'clamp',
    });
  }

  getTitleTranslateY() {
    const { scrollY } = this.state;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [-10, 0, 0],
      extrapolate: 'clamp',
    });
  }

  getTitleOpacity() {
    const { scrollY } = this.state;
    const { alwaysShowTitle } = this.props;
    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
  }

  renderBackgroundImage() {
    const { backgroundImage, content } = this.props;
    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={[
          styles.backgroundImage,
          {
            height: this.getHeaderMaxHeight(),
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }, { scale: imageScale }],
          },
        ]}
      >
        {content()}
      </Animated.View>
    );
  }

  renderPlainBackground() {
    const { backgroundColor } = this.props;

    const imageOpacity = this.getImageOpacity();
    const imageTranslate = this.getImageTranslate();
    const imageScale = this.getImageScale();

    return (
      <Animated.View
        style={{
          height: this.getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }],
        }}
      />
    );
  }

  renderNavbarBackground() {
    const { navbarColor } = this.props;
    const navBarOpacity = this.getNavBarOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            backgroundColor: navbarColor,
            opacity: navBarOpacity,
          },
        ]}
      />
    );
  }

  renderHeaderBackground() {
    const { backgroundImage, backgroundColor, content } = this.props;
    const imageOpacity = this.getImageOpacity();

    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: this.getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          },
        ]}
      >
        {content()}
      </Animated.View>
    );
  }

  renderHeaderTitle() {
    const { title, titleStyle, renderNavBar } = this.props;
    const titleTranslateY = this.getTitleTranslateY();
    const titleOpacity = this.getTitleOpacity();

    return (
      <AnimatedAppView
        stretch
        backgroundColor="#fff"
        row
        spaceBetween
        borderBottomColor="inputBorderColor"
        style={[
          styles.headerTitle,
          {
            transform: [{ translateY: titleTranslateY }],
            height: this.getHeaderMinHeight(),
            opacity: titleOpacity,
          },
        ]}
      >
        <AppView row stretch>
          {renderNavBar()}
        </AppView>

        <AppView flex={3} center>
          <AppText size={8}>{title}</AppText>
        </AppView>
        <AppView stretch width={20} />
      </AnimatedAppView>
    );
  }

  renderHeaderForeground() {
    const { renderNavBar } = this.props;
    const navBarOpacity = this.getNavBarForegroundOpacity();

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: this.getHeaderMinHeight(),
            opacity: navBarOpacity,
          },
        ]}
      >
        {/* {renderNavBar()} */}
      </Animated.View>
    );
  }

  renderScrollView() {
    const {
      renderContent,
      scrollEventThrottle,
      scrollViewStyle,
      contentContainerStyle,
      innerContainerStyle,
      scrollViewProps,
    } = this.props;
    const { scrollY } = this.state;

    const main_node = (
      <Animated.ScrollView
        // scrollEnabled={scrollEnabled}
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ])}
        {...scrollViewProps}
      >
        <View
          style={[
            {
              marginTop:
                this.getHeaderMaxHeight() - this.props.extraScrollHeight,
            },
            innerContainerStyle,
          ]}
        >
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );

    if (Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView
          style={{ alignSelf: 'stretch', flex: 1 }}
          behavior="padding"
          enabled
        >
          {main_node}
        </KeyboardAvoidingView>
      );
    }

    return main_node;
  }

  componentDidMount = () => {
    StatusBar.setBackgroundColor('transparent', true);
    StatusBar.setTranslucent(true);
  };

  renderIos() {
    const { navbarColor, statusBarColor, containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        {this.renderScrollView()}
        {this.renderNavbarBackground()}

        {this.renderHeaderBackground()}

        {this.renderHeaderForeground()}
        {this.renderHeaderTitle()}
      </View>
    );
  }

  renderAndroid() {
    const { navbarColor, statusBarColor, containerStyle } = this.props;
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.statusBar} />
        {this.renderScrollView()}
        {this.renderNavbarBackground()}

        {this.renderHeaderForeground()}
        {this.renderHeaderTitle()}
        {this.renderHeaderBackground()}
      </View>
    );
  }

  render() {
    return Platform.OS == 'ios' ? this.renderIos() : this.renderAndroid();
  }
}

RNParallax.propTypes = {
  renderNavBar: PropTypes.func,
  renderContent: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  backgroundImage: PropTypes.any,
  navbarColor: PropTypes.string,
  title: PropTypes.any,
  titleStyle: PropTypes.any,
  headerMaxHeight: PropTypes.number,
  headerMinHeight: PropTypes.number,
  scrollEventThrottle: PropTypes.number,
  extraScrollHeight: PropTypes.number,
  backgroundImageScale: PropTypes.number,
  contentContainerStyle: PropTypes.any,
  innerContainerStyle: PropTypes.any,
  scrollViewStyle: PropTypes.any,
  containerStyle: PropTypes.any,
  alwaysShowTitle: PropTypes.bool,
  alwaysShowNavBar: PropTypes.bool,
  statusBarColor: PropTypes.string,
  scrollViewProps: PropTypes.object,
};

RNParallax.defaultProps = {
  renderNavBar: () => <View />,
  navbarColor: DEFAULT_NAVBAR_COLOR,
  backgroundColor: DEFAULT_BACKGROUND_COLOR,
  backgroundImage: null,
  title: null,
  titleStyle: styles.headerText,
  headerMaxHeight: DEFAULT_HEADER_MAX_HEIGHT,
  headerMinHeight: DEFAULT_HEADER_MIN_HEIGHT,
  scrollEventThrottle: SCROLL_EVENT_THROTTLE,
  extraScrollHeight: DEFAULT_EXTRA_SCROLL_HEIGHT,
  backgroundImageScale: DEFAULT_BACKGROUND_IMAGE_SCALE,
  contentContainerStyle: null,
  innerContainerStyle: null,
  scrollViewStyle: null,
  containerStyle: null,
  alwaysShowTitle: true,
  alwaysShowNavBar: true,
  statusBarColor: null,
  scrollViewProps: {},
};

export default connect(
  null,
  null,
  null,
  { forwardRef: true },
)(RNParallax);

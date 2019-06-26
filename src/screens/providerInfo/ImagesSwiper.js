import React, { PureComponent } from 'react';
import { Platform, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

import { ImagePlaceholder } from '../../components';
import { AppView, AppIcon, AppNavigation } from '../../common';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('screen').height;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

export default class ImagesSwiper extends PureComponent {
  renderBack = () => (
    <AppView
      stretch
      backgroundColor="#fff"
      row
      center
      style={[
        styles.headerTitle,
        {
          height: HEADER_HEIGHT,
        },
      ]}
    >
      <AppView stretch center width={20}>
        <AppView
          center
          circleRadius={10}
          touchableOpacity
          onPress={this.props.onPress}
          backgroundColor="rgba(0,0,0,.8)"
        >
          <AppIcon name="close" type="ant" size={12} color="white" />
        </AppView>
      </AppView>

      <AppView flex={3} center />
      <AppView stretch flex />
    </AppView>
  );

  render() {
    return (
      <>
        <Swiper
          loop
          horizontal
          autoplayTimeout={4}
          dotStyle={styles.dotStyles}
          activeDotStyle={[styles.dotStyles, styles.activeDotStyles]}
          index={2}
          containerStyle={styles.swiper}
        >
          {this.props.imgs.map(img => (
            <ImagePlaceholder
              key={img}
              style={{ flex: 1 }}
              duration={1000}
              showActivityIndicator={false}
              src={img}
              placeholder={img}
            />
          ))}
        </Swiper>

        {this.renderBack()}
      </>
    );
  }
}

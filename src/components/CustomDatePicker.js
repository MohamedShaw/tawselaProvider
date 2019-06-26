import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import {
  Modal,
  View as RNView,
  TouchableWithoutFeedback,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { WheelPicker as RNWheelPicker } from 'react-native-wheel-picker-android';
import Animated from 'react-native-reanimated';

import View from '../common/View';
import Icon from '../common/Icon';
import Text from '../common/Text';
import Button from '../common/Button';
import { getTheme } from '../common/Theme';
import InputError from '../common/micro/InputError';
import {
  responsiveHeight,
  windowHeight,
  windowWidth,
  screenHeight,
} from '../common/utils/responsiveDimensions';

import { runTiming } from '../utils/animation';
import colors from '../common/defaults/colors';
import { AppView } from '../common';

const { Clock } = Animated;

const styles = StyleSheet.create({
  fullscreen: {
    margin: 0,
    padding: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: windowHeight,
    width: windowWidth,
  },
});

class CustomDatePicker extends PureComponent {
  static propTypes = {
    initialValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
    name: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderColor: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    initialValue: [],
    wheels: [],
    wheelsMarginHorizontal: 10,
    ...getTheme().wheelPicker,
  };

  constructor(props) {
    super(props);

    this.clock = new Clock();
    this.yPosition = runTiming(this.clock, screenHeight, 0, 300);

    const wheels = props.wheels.map((wheel, index) => {
      const data = wheel.data || [];
      const maskData = wheel.maskData || data;
      const vIndex = data.findIndex(v => v == props.initialValue[index]);
      const selectedValue = props.initialValue[index] || '';

      return {
        ...wheel,
        data,
        maskData,
        id: index,
        selectedIndex: vIndex === -1 ? 0 : vIndex,
        selectedValue,
      };
    });

    this.state = {
      value: props.initialValue,
      wheels,
      modalVisible: false,
      valueSet: props.initialValue.length,
    };
  }

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.wheels &&
      nextProps.wheels !== this.props.wheels &&
      this.props.wallet
    ) {
      this.setState({
        wheels: nextProps.wheels,
        valueSet: false,
      });
    }
  };

  onPickerConfirm = () => {
    const valueSet = this.state.wheels.some(w => w.selectedValue);
    if (!valueSet) {
      this.setState({
        modalVisible: false,
      });
      return;
    }

    const { name, onChange } = this.props;

    const v = this.state.wheels.map(w => w.selectedValue || w.data[0]);

    this.setState({
      value: v,
      valueSet: true,
      modalVisible: false,
    });

    if (onChange) {
      if (name) onChange(name, v);
      else onChange(v);
    }
  };

  show = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hide = () => {
    const wheels = this.state.wheels.map((wheel, index) => {
      const vIndex = wheel.data.findIndex(v => v == this.state.value[index]);
      return {
        ...wheel,
        selectedValue: this.state.value[index],
        selectedIndex: vIndex,
      };
    });

    this.setState({
      modalVisible: false,
      wheels,
    });
  };

  renderStringFormat = () =>
    this.state.valueSet
      ? `${this.displayWheelValue(0)} ${this.displayWheelValue(1)}`
      : this.props.placeholder;

  displayWheelValue = wheelIndex => {
    const wheel = this.state.wheels[wheelIndex];
    const vIndex = wheel.data.findIndex(v => v == this.state.value[wheelIndex]);

    return wheel.maskData[vIndex];
  };

  renderTitle = () => {
    const { valueSet, value } = this.state;
    return (
      <View
        stretch
        height={8}
        marginHorizontal={8}
        row
        spaceBetween
        onPress={this.show}
      >
        <View row center>
          <Icon
            name="calender"
            type="custom"
            color="#555555"
            size={9}
            lineHeight={9}
          />
          <Text bold marginHorizontal={4}>
            {!valueSet ? this.props.initialValue.join(' ') : value.join(' ')}
          </Text>
        </View>
        <Icon name="ios-arrow-back" type="ion" color="#BFBFBF" size={8} />
      </View>
    );
  };

  render() {
    const { wheelsMarginHorizontal, ...rest } = this.props;

    return (
      <View>
        <SafeAreaView
          style={{
            alignSelf: 'stretch',
            borderBottomColor: colors.inputBorderColor,
            backgroundColor: 'white',
            borderWidth: 0.5,
          }}
        >
          {this.renderTitle()}
        </SafeAreaView>
        <Modal
          hardwareAccelerated
          animationType="none"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.hide();
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.hide();
            }}
          >
            <RNView
              style={[
                styles.fullscreen,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  height: screenHeight,
                  justifyContent: 'flex-end',
                },
              ]}
            >
              <RNView
                style={{
                  backgroundColor: 'white',
                  width: windowWidth,
                  height: screenHeight - windowHeight,
                }}
              />
            </RNView>
          </TouchableWithoutFeedback>

          <Animated.View
            pointerEvents="box-none"
            style={[
              styles.fullscreen,
              {
                justifyContent: 'flex-end',
                transform: [
                  {
                    translateY: this.yPosition,
                  },
                ],
              },
            ]}
          >
            <RNView
              style={{
                alignSelf: 'stretch',
                width: windowWidth,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                backgroundColor: 'white',
              }}
            >
              <View stretch row spaceBetween backgroundColor="#f3f3f3">
                {this.props.showClose ? (
                  <Button
                    transparent
                    touchableOpacity
                    leftIcon={
                      <Icon name="close" type="material" color="black" />
                    }
                    onPress={this.hide}
                  />
                ) : (
                  this.props.label && <Text> {this.props.label} </Text>
                )}
                <Button
                  title={I18n.t('ui-confirm')}
                  transparent
                  touchableOpacity
                  onPress={this.onPickerConfirm}
                />
              </View>
              <View
                backgroundColor="white"
                stretch
                paddingTop={5}
                row
                paddingHorizontal={wheelsMarginHorizontal}
              >
                {this.state.wheels.map(w => (
                  <RNWheelPicker
                    hideIndicator
                    key={String(w.id)}
                    selectedItem={w.selectedIndex}
                    data={w.maskData}
                    onItemSelected={index => {
                      const wheelIndex = this.state.wheels.findIndex(
                        i => i.id === w.id,
                      );

                      const wheels = [
                        ...this.state.wheels.slice(0, wheelIndex),
                        {
                          ...this.state.wheels[wheelIndex],
                          selectedValue: this.state.wheels[wheelIndex].data[
                            index
                          ],
                          selectedIndex: index,
                        },
                        ...this.state.wheels.slice(wheelIndex + 1),
                      ];

                      this.setState({
                        wheels,
                      });
                    }}
                    style={{
                      width: `${100 / this.state.wheels.length}%`,
                      height: Dimensions.get('window').height * 0.2,
                    }}
                  />
                ))}
              </View>
            </RNView>
          </Animated.View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(CustomDatePicker);

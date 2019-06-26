import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';

import { BasePropTypes } from './Base';
import Network from './Base/Network';
import View from './View';
import Text from './Text';
import Indicator from './Indicator';
import InputError from './micro/InputError';
import { getTheme } from './Theme';
import { AppView, AppText } from '.';
import { responsiveHeight } from './utils/responsiveDimensions';

const styles = StyleSheet.create({
  modalReset: {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Picker extends Network {
  static propTypes = {
    ...BasePropTypes,
    ...Network.propTypes,
    name: PropTypes.string,
    onChange: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.object),
    placeholder: PropTypes.string,
    leftItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    rightItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    farArrow: PropTypes.bool,
    error: PropTypes.string,
    noValidation: PropTypes.bool,
    setInitialValueAfterFetch: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.number,
      PropTypes.string,
    ]),
    loadingIndicator: PropTypes.bool,
  };

  static defaultProps = {
    ...Network.defaultProps,
    ...getTheme().picker,
    placeholder: '',
    paging: false,
    farArrow: true,
    data: [],
    leftItems: [],
    rightItems: [],
    loadingIndicator: false,
  };

  constructor(props) {
    super(props);

    // const obj = props.initialValue
    //   ? props.data.find(i => i.value === props.initialValue)
    //   : null;

    // const label = obj ? obj.label : props.placeholder;
    this.mainIndicator = 'loading';

    this.state = {
      label: props.placeholder,
      data: props.data,
      loading: false,
      networkError: false,
      filterText: '',
    };
  }

  async componentDidMount() {
    if (!this.props.data || this.props.data.length === 0) {
      super.componentDidMount();
    }

    if (Array.isArray(this.props.data) && this.props.data.length) {
      this.setEndFetching(this.props.data);
    }
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps, () => {
      this.onChange({ label: this.props.placeholder, value: '' }, true);
    });

    if (nextProps.reset !== this.props.reset) {
      this.clear();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  setStartFetching() {
    this.setState({
      networkError: false,
    });
  }

  setData = (data, cb) => {
    this.setState({ data }, cb);
  };

  setError = errorLabel => {
    this.setState({
      networkError: true,
    });
  };

  setEndFetching(data) {
    const { setInitialValueAfterFetch, onChange, name } = this.props;

    if (setInitialValueAfterFetch && data.length) {
      let { label, value } = data[0];

      if (typeof setInitialValueAfterFetch === 'number') {
        const target = data.find(
          item => item.value === setInitialValueAfterFetch,
        );
        if (target) {
          label = target.label;
          value = target.value;
        }
      }

      this.onChange({ label, value });
    } else if (!data.length) {
      this.setState({
        label: this.props.noResultsLabel || I18n.t('ui-noResultsFound'),
      });
    }
  }

  onChange = ({ label, value, ...rest }, noValidate) => {
    const { name, onChange } = this.props;

    this.setState({
      label,
    });

    if (onChange) {
      if (name) onChange(name, value, noValidate, rest);
      else onChange(value, rest);
    }
  };

  clear = () => {
    this.onChange({ label: this.props.placeholder || '', value: '' }, true);
  };

  renderItems = items => {
    const { size, color } = this.props;

    const nodes = items.map(item => {
      if (
        item.type.WrappedComponent &&
        (item.type.WrappedComponent.displayName === 'Button' ||
          item.type.WrappedComponent.displayName === 'Icon')
      ) {
        return React.cloneElement(item, {
          key: String(Math.random()),
          transparent: true,
          stretch: item.type.WrappedComponent.displayName === 'Button',
          color: item.props.color || color,
          size: item.props.size || size * 1.5,
          backgroundColor: 'transparent',
          ph: item.props.ph || size / 1.5,
          pv: 0,
        });
      }
      return React.cloneElement(item, {
        key: String(Math.random()),
      });
    });

    return nodes;
  };

  render() {
    const {
      rtl,
      size,
      color,
      backgroundColor,
      width,
      height,
      borderRadius,
      center,
      farArrow,
      error,
      flex,
      elevation,
      onChange,
      name,
      noValidation,
      margin,
      marginHorizontal,
      marginVertical,
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
      m,
      mh,
      mv,
      mt,
      mb,
      ml,
      mr,
      bw,
      btw,
      bbw,
      blw,
      brw,
      bc,
      btc,
      bbc,
      blc,
      brc,
      hideSearch,
      title,
      searchTitle,
      iconType,
      iconName,
      touchableOpacity,
      disable,
      errorTextMarginBottom,
    } = this.props;

    let { leftItems, rightItems } = this.props;

    if (leftItems && !leftItems.map) leftItems = [leftItems];
    if (rightItems && !rightItems.map) rightItems = [rightItems];

    const ButtonContainer = touchableOpacity ? TouchableOpacity : RectButton;

    return (
      <View
        stretch
        flex={flex}
        m={m}
        mh={mh}
        mv={mv}
        mt={mt}
        mb={mb}
        ml={ml}
        mr={mr}
        margin={margin}
        marginVertical={marginVertical}
        marginHorizontal={marginHorizontal}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        marginBottom={marginBottom}
        width={width}
      >
        <View
          stretch
          row
          height={height}
          backgroundColor={backgroundColor}
          borderRadius={borderRadius}
          elevation={elevation}
          bw={bw}
          btw={btw}
          bbw={bbw}
          blw={blw}
          brw={brw}
          bc={bc}
          btc={btc}
          bbc={bbc}
          blc={blc}
          brc={brc}
          style={{ overflow: 'visible' }}
        >
          {this.state.label !== this.props.placeholder ? (
            <AppView
              marginHorizontal={4}
              paddingHorizontal={3}
              borderRadius={10}
              style={{
                position: 'absolute',
                top: -responsiveHeight(3.5) / 2,
              }}
              height={3.5}
              center
            >
              <AppText color="#8A8A8A" size={0.8 * size}>
                {/* {this.props.placeholder} */}
              </AppText>
            </AppView>
          ) : null}
          {leftItems.length && !this.state.loading
            ? this.renderItems(leftItems)
            : null}
          {disable ? (
            <AppView
              style={[
                {
                  flexDirection: rtl ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  justifyContent:
                    this.state.loading || this.state.networkError
                      ? 'center'
                      : farArrow
                      ? 'space-between'
                      : center
                      ? 'center'
                      : 'flex-start',
                  flex: 1,
                  alignSelf: 'stretch',
                  padding: 0,
                },
              ]}
            >
              {this.state.loading ? (
                <Indicator size={size} />
              ) : this.state.networkError ? (
                <Text size={size}>{I18n.t('ui-error')}</Text>
              ) : (
                <React.Fragment>
                  {this.props.loadingIndicator ? (
                    <Indicator size={size} />
                  ) : (
                    <Text color={color} size={size} mh={3}>
                      {this.state.label}
                    </Text>
                  )}
                </React.Fragment>
              )}
            </AppView>
          ) : (
            <ButtonContainer
              onPress={() => {
                // if (this.state.loading || this.state.networkError) return;

                Navigation.showModal({
                  stack: {
                    children: [
                      {
                        component: {
                          name: 'appPickerModal',
                          passProps: {
                            hideSearch,
                            title,
                            searchTitle,
                            data: this.state.data,
                            iconType,
                            iconName,
                            onChange: v => {
                              this.onChange(v);
                            },
                          },
                        },
                      },
                    ],
                  },
                });
              }}
              style={[
                {
                  flexDirection: rtl ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  justifyContent:
                    this.state.loading || this.state.networkError
                      ? 'center'
                      : farArrow
                      ? 'space-between'
                      : center
                      ? 'center'
                      : 'flex-start',
                  flex: 1,
                  alignSelf: 'stretch',
                  padding: 0,
                },
              ]}
            >
              {this.state.loading ? (
                <Indicator size={size} />
              ) : this.state.networkError ? (
                <Text size={size}>{I18n.t('ui-error')}</Text>
              ) : (
                <React.Fragment>
                  {this.props.loadingIndicator ? (
                    <Indicator size={size} />
                  ) : (
                    <Text color={color} size={size} mh={3}>
                      {this.state.label}
                    </Text>
                  )}
                  {/* <Icon
                  name="arrow-drop-down"
                  type="material"
                  size={size * 1.3}
                  color={color}
                /> */}
                </React.Fragment>
              )}
            </ButtonContainer>
          )}
          {rightItems.length && !this.state.loading
            ? this.renderItems(rightItems)
            : null}
        </View>

        {!noValidation ? (
          <InputError
            error={error}
            size={size}
            errorTextMarginBottom={errorTextMarginBottom}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

export default connect(mapStateToProps)(Picker);

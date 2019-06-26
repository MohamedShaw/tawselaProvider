import React, { Component } from 'react';
import { Keyboard, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import { AppView, AppIcon, AppButton, AppInput } from '../../common';
import AppPickerHeader from './AppPickerHeader';

class AppPickerModal extends Component {
  state = {
    searchText: '',
    data: this.props.data,
  };

  renderPickerData = () => (
    <FlatList
      style={{
        alignSelf: 'stretch',
      }}
      data={this.state.data}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => (
        <AppView stretch borderBottomColor="grey" borderBottomWidth={0.2}>
          <AppButton
            onPress={() => {
              this.props.onChange(item);
              Navigation.dismissModal(this.props.componentId);
            }}
            center={false}
            title={item.label}
            stretch
            flex
            backgroundColor="#FFF"
            height={7}
            color="#000"
            paddingHorizontal={15}
            size={5.5}
            bold
          />
        </AppView>
      )}
    />
  );

  renderSearchInput = () => (
    <AppView
      stretch
      paddingHorizontal={5}
      paddingVertical={4}
      borderBottomWidth={0.1}
      elevation={2}
    >
      <AppInput
        stretch
        noValidation
        initialValue={this.state.searchText}
        onChange={text => {
          const filterData = this.props.data.filter(item =>
            item.label.toLowerCase().includes(text.toString().toLowerCase()),
          );

          this.setState({
            searchText: text,
            data: filterData,
          });
        }}
        placeholder={this.props.searchTitle}
        leftItems={[
          <AppIcon
            color="#8A8A8A"
            name={this.props.iconName}
            type={this.props.iconType}
            size={8}
            marginHorizontal={5}
          />,
        ]}
        onSubmitEditing={() => {
          Keyboard.dismiss();
        }}
        borderRadius={5}
        height={7}
        paddingHorizontal={5}
      />
    </AppView>
  );

  render() {
    const { title, hideSearch } = this.props;

    return (
      <AppView flex stretch>
        <AppPickerHeader showClose title={title} />
        {!hideSearch && this.renderSearchInput()}
        {this.renderPickerData()}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppPickerModal);

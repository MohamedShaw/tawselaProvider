import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { AppView, AppText, AppList } from '../../common';

import NoOrdersList from './NoOrdersList';
import OrderItem from '../../components/orderItem/OrderItem';
import { API_ENDPOINT_FOOD_SERVICE } from '../../utils/Config';

class Finished extends Component {
  state = {
    totalCount: 0,
  };

  renderList = () => {
    const { currentUser, activePage, index } = this.props;

    if (activePage !== index) return null;

    return (
      <>
        <AppView stretch height={4} centerY>
          {!!this.state.totalCount && (
            <AppText color="#677077" paddingHorizontal={8}>
              <AppText bold>{this.state.totalCount}</AppText> {I18n.t('order')}
            </AppText>
          )}
        </AppView>
        <AppList
          flex
          stretch
          refreshControl={this.props.finishedOrdersList}
          noResultsComponent={<NoOrdersList />}
          apiRequest={{
            url: `${API_ENDPOINT_FOOD_SERVICE}orders?providerId=${
              currentUser.user._id
            }&status=FINISHED`,
            responseResolver: response => {
              this.setState({
                totalCount: response.data.totalCount,
              });

              return {
                data: response.data.data,
                pageCount: response.data.pageCount,
              };
            },
            onError: error => error[1].message,
          }}
          rowHeight={85}
          rowRenderer={item => <OrderItem data={item} />}
        />
      </>
    );
  };

  render() {
    return (
      <AppView flex stretch backgroundColor="#F2F2F2">
        {this.renderList()}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  finishedOrdersList: state.list.finishedOrders,
});

export default connect(mapStateToProps)(Finished);

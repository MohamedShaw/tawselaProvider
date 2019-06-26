import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import axios from 'axios';

import {
  AppView,
  AppText,
  AppList,
  AppTextArea,
  AppButton,
  showError,
  AppSpinner,
} from '../../common';

import NoOrdersList from './NoOrdersList';
import OrderItem from '../../components/orderItem/OrderItem';
import { API_ENDPOINT_FOOD_SERVICE } from '../../utils/Config';
import { refreshList } from '../../actions/list';

import BottomSheet from '../../components/BottomSheet';

const { CancelToken } = axios;

class Pending extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      totalCount: 0,
      refuseReason: '',
      selectedOrderId: null,
    };

    this.bottomSheetRef = React.createRef();
  }

  refuseOrder = async () => {
    const { currentUser } = this.props;
    const orderId = this.state.selectedOrderId;

    this.source = CancelToken.source();

    try {
      this.setState({
        loading: true,
      });

      await axios.patch(
        `${API_ENDPOINT_FOOD_SERVICE}${currentUser.providerUrl}/${
          currentUser.user.id
        }/orders/${orderId}/status`,
        {
          status: 'REFUSED',
          ...(this.state.refuseReason.trim()
            ? { reason: this.state.refuseReason.trim() }
            : {}),
        },
        {
          cancelToken: this.source.token,
        },
      );

      this.setState({
        loading: false,
      });
      this.bottomSheetRef.current.hide();

      this.props.refreshList([
        'pendingOrders',
        'acceptedOrders',
        'finishedOrders',
      ]);
    } catch (error) {
      if (!axios.isCancel(error[0])) {
        this.setState({
          loading: false,
        });
        if (error[2].status) {
          showError(error[2].status);
        } else if (error[1].message) {
          showError(error[1].message);
        } else {
          showError(I18n.t('ui-error-happened'));
        }
      }
    }
  };

  renderBottomSheet = () => (
    <BottomSheet ref={this.bottomSheetRef} height={41}>
      <AppView stretch centerX paddingVertical={7}>
        <AppText bold>{I18n.t('refuse-order')}</AppText>
        <AppTextArea
          height={16}
          placeholder={I18n.t('enter-refuse-reason')}
          marginTop={10}
          marginHorizontal={6}
          noValidation
          onChange={t => {
            this.setState({
              refuseReason: t,
            });
          }}
        />
      </AppView>
      <AppView
        marginHorizontal={6}
        row
        stretch
        flex
        borderTopColor="grey"
        borderTopWidth={0.5}
        paddingTop={7}
        center={this.state.loading}
      >
        {this.state.loading ? (
          <AppSpinner />
        ) : (
          <>
            <AppButton
              backgroundColor="primary"
              title={I18n.t('orderDetails-refuse')}
              flex
              marginLeft={3}
              stretch
              touchableOpacity
              onPress={() => {
                this.refuseOrder();
              }}
            />
            <AppButton
              backgroundColor="grey"
              title={I18n.t('orderDetails-notNow')}
              marginRight={3}
              flex
              stretch
              touchableOpacity
              onPress={() => {
                this.bottomSheetRef.current.hide();
              }}
            />
          </>
        )}
      </AppView>
    </BottomSheet>
  );

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
          refreshControl={this.props.pendingOrdersList}
          noResultsComponent={<NoOrdersList />}
          apiRequest={{
            url: `${API_ENDPOINT_FOOD_SERVICE}${currentUser.providerUrl}/${
              currentUser.user.id
            }/orders?status=PENDING`,
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
          rowRenderer={item => (
            <OrderItem
              data={item}
              onRefusedOrder={id => {
                this.bottomSheetRef.current.show();
                this.setState({
                  selectedOrderId: id,
                  refuseReason: '',
                });
              }}
            />
          )}
        />
        {this.renderBottomSheet()}
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
  pendingOrdersList: state.list.pendingOrders,
});

const mapDispatchToProps = dispatch => ({
  refreshList: bindActionCreators(refreshList, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pending);

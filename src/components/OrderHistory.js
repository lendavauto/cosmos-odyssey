import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStateValue } from '../StateProvider';
import { db } from '../firebase';
import Order from './Order';

const OrderHistoryWrapper = styled.div`
  height: calc(100% - 54px);
  width: calc(100% - 19px);
  overflow-y: scroll;
`;

const OrderHistory = () => {
  const [{ user, historyModalOpen }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (historyModalOpen) {
      db.collection('users')
        .doc(user?.email)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
      );
    } else {
      setOrders([]);
    }
  }, [historyModalOpen]);

  return (
    <OrderHistoryWrapper>
      {orders?.map((order) => {
        return <Order order={order} />;
      })}
    </OrderHistoryWrapper>
  );
};

export default OrderHistory;

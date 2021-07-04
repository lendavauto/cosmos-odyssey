import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { FaSpaceShuttle } from 'react-icons/fa';
import { CgDollar } from 'react-icons/cg';


const OrderWrapper = styled.article`
  width: 100%;
  height: fit-content;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #1a78ab;

  .order-nr {
    font-size: 10px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 4px;
    border-bottom: 1px solid lightgray;
    span {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 2px;
    }
  }
  .order-item-container {
    height: fit-content;
  }
  .cart-item-nr {
    font-size: 10px;
    margin: 4px 15px;
    border-bottom: 1px solid lightgray;
    span {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 2px;
    }
  }
  .cart-item-details-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 15px;
    border-bottom: 1px solid lightgray;
    overflow-wrap: break-word;
    p {
      font-size: 10px;
      flex: 0.4;
      span {
        text-transform: capitalize;
        font-weight: bold;
        margin-right: 2px;
      }
    }
    .flight-icon {
      font-size: 15px;
      margin-top: 5px;
    }
  }
  .price-icon {
    font-size: 18px;
    color: #222;
  }
  .order-total {
    border-bottom: 1px solid #1a78ab;
  }
`;

const Order = ({ order }) => {
  const formatPrice = (x) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts[1]?.length > 3) {
      parts[1] = parts[1].slice(0, 2);
    }
    return parts.join('.');
  };
  console.log(order.data);
  return (
    <OrderWrapper>
      <p className='order-nr'>
        <span>order nr</span>: {order.id}
      </p>
      <p className='order-nr'>
        <span>purchase date</span>:{' '}
        {moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}
      </p>
      {order.data.cart.map(
        ({
          amount,
          company_name,
          flight_id,
          first_name,
          last_name,
          flight_time,
          price,
          route_from,
          route_to,
          user_email,
        }) => {
          return (
            <article
              className='order-item-container'
              key={flight_id}
            >
              <p className='cart-item-nr'>
                <span>flight nr</span>:{flight_id}
              </p>
              <p className='cart-item-nr'>
                <span>company</span>:{company_name}
              </p>
              <div className='cart-item-details-container'>
                <p>
                  <span>first name</span>: {first_name}
                </p>
                <p>
                  <span>last name</span>: {last_name}
                </p>
                <p>
                  <span>email</span>: {user_email}
                </p>
              </div>
              <div className='cart-item-details-container'>
                <p>
                  <span>from:</span>
                  {route_from}
                </p>
                <FaSpaceShuttle className='flight-icon' />
                <p>
                  <span>to:</span>
                  {route_to}
                </p>
              </div>
              <div className='cart-item-price-container'>
                <p>
                  <span>Amount:</span> {amount}
                </p>
              </div>
              <div className='cart-item-price-container'>
                <p>
                  <span>price: </span>
                  {formatPrice(price * amount)}
                  <CgDollar className='price-icon' />
                </p>
                <p>
                  <span>Flight time:</span>
                  {flight_time}
                  <span className='hours-span'>Hours</span>
                </p>
              </div>
            </article>
          );
        }
      )}
      {/* <div className='cart-item-price-container order-total'>
        <p>
          <span>Order total:</span> {formatPrice(order.data.amount / 100)}
        </p>
      </div> */}
    </OrderWrapper>
  );
};

export default Order;

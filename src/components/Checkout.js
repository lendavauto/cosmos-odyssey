import React, { useEffect, useRef } from 'react';
import { useStateValue } from '../StateProvider';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TiArrowBackOutline } from 'react-icons/ti';
import { AiOutlineHistory } from 'react-icons/ai';
import { FaSpaceShuttle } from 'react-icons/fa';
import { CgDollar } from 'react-icons/cg';
import { CgRemove } from 'react-icons/cg';
import { CgAdd } from 'react-icons/cg';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { IoBagCheckOutline } from 'react-icons/io5';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import logo from '../images/stripe-logo.png';
import StripeCheckout from './StripeCheckout';

const CheckoutWrapper = styled.div`
  flex: 0.7;
  height: 100%;
  background-color: #fff;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: 900px) {
    flex: 1;
  }
  .checkout-title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 100%;
    background-color: #5fa7c9;
    border-bottom: 1px solid #1a78ab;
    h1 {
      color: #fff;
      font-size: 15px;
      @media (max-width: 900px) {
        margin-top: -10px;
      }
    }
    @media (max-width: 900px) {
      display: none;
    }
  }
  .checkout-count {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #5fa7c9;
    color: #fff;
    height: 38px;
    border-bottom: 1px solid #1a78ab;
    h1 {
      font-size: 15px;
    }
    span {
      color: #082b44;
    }
  }
  .back-icon {
    position: absolute;
    left: 0;
    font-size: 30px;
    color: #fff;
    margin-left: 15px;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      color: #aad7e3;
    }
  }
  .item-counter {
    p {
      text-transform: capitalize;
      font-weight: bold;
      font-size: 14px;
    }
  }
  .checkout-message-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 195px);
    overflow: hidden;
    h1 {
      color: #222;
      font-size: 18px;
      letter-spacing: 0.5px;
      font-family: 'Zen Dots', cursive;
    }
    button {
      display: block;
      margin: 0 auto;
      padding: 10px;
      color: #222;
      text-transform: capitalize;
      border-radius: 5px;
      border: 1px solid lightgray;
      transition: 0.2s ease-in;
      cursor: pointer;
      :hover {
        background-color: #aad7e3;
        border: 1px solid #222;
      }
    }
  }

  .checkout-container {
    position: relative;
    height: calc(100% - 195px);
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    @media (max-width: 900px) {
      height: calc(100% - 169px);
    }
  }
  .history-icon {
    position: absolute;
    right: 0;
    margin-right: 15px;
    font-size: 25px;
    color: #fff;
    transition: 0.3s ease-in-out;
    cursor: pointer;
    :hover {
      color: #aad7e3;
    }
  }
  .cart-item-container {
    height: 191px;
    border-bottom: 1px solid #1a78ab;
    @media (max-width: 900px) {
      height: 200px;
    }
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
    p {
      font-size: 10px;
      margin-right: 15px;
      margin-top: 4px;
      span {
        text-transform: capitalize;
        font-weight: bold;
        margin-right: 2px;
      }
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
      flex: 0.2;
      font-size: 15px;
      margin-top: 5px;
    }
  }
  .cart-item-price-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 15px;
    padding-bottom: 4px;
    border-bottom: 1px solid lightgray;
    button {
      padding: 5px;
      color: #222;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      :hover {
        color: #f41f1f;
      }
      .remove-icon {
        font-size: 18px;
      }
    }
    .price-icon {
      font-size: 18px;
      color: #222;
    }
    .amount-icon {
      font-size: 22px;
      color: #222;
      transition: 0.3s ease-in-out;
      cursor: pointer;
    }
    .left {
      :hover {
        color: #f41f1f;
      }
    }
    .right {
      :hover {
        color: #24a95d;
      }
    }
    .hours-span {
      margin-left: 10px;
    }
    p {
      flex: 0.5;
      display: flex;
      align-items: center;
      font-size: 13px;
    }
    span {
      text-transform: capitalize;
      font-weight: bold;
      margin-right: 10px;
    }
  }
  .cart-total-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 104px;
    background-color: #5fa7c9;
    border-top: 1px solid #1a78ab;
    @media (max-width: 900px) {
      height: 129px;
    }
    .cart-total-icon {
      color: #082b44;
      font-size: 22px;
      margin-left: 5px;
    }
    p {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: #082b44;
      font-size: 14px;
      margin-left: 15px;
      border-bottom: 1px solid #fff;
      span {
        font-size: 14px;
        color: #fff;
        font-weight: bold;
        margin-left: 15px;
        width: 65px;
      }
    }
    button {
      display: flex;
      align-items: center;
      font-weight: bold;
      margin-left: 30px;
      padding: 5px;
      font-size: 13px;
      border: 1px solid #222;
      border-radius: 5px;
      transition: 0.2s ease-in;
      cursor: pointer;
      -webkit-box-shadow: 0px 10px 13px -7px #000000,
        5px 5px 15px 5px rgba(0, 0, 0, 0);
      box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
      :hover {
        .checkout-icon {
          transition: 0.2s ease-in;
          color: #24a95d;
        }
      }
      .checkout-icon {
        font-size: 18px;
        margin-right: 5px;
      }
      :hover {
        background-color: #aad7e3;
        border: 1px solid #222;
      }
    }
  }
  .history-modal {
    position: absolute;
    background-color: #fff;
    height: calc(100% - 30px);
    width: 100%;
    margin-left: 15px;
    margin-top: 15px;
    border: 1px solid #1a78ab;
    border-radius: 5px;
    transform: translateX(100%);
    transition: 0.3s ease-in-out;
  }
  .history-modal-empty {
    position: absolute;
    background-color: #fff;
    height: calc(100% - 30px);
    width: 100%;
    margin-left: 15px;
    margin-top: 15px;
    border: 1px solid #1a78ab;
    border-radius: 5px;
    transform: translateX(100%);
    transition: 0.3s ease-in-out;
  }
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    border-bottom: 1px solid #1a78ab;
    h1 {
      flex: 0.9;
      color: #082b44;
      font-size: 18px;
      text-transform: capitalize;
    }
    .modal-close-icon {
      flex: 0.1;
      font-size: 28px;
      margin-right: 15px;
      color: #082b44;
      cursor: pointer;
      :hover {
        color: #f41f1f;
      }
    }
  }
  .payment-modal {
    position: absolute;
    background-color: #fff;
    height: calc(100% - 30px);
    width: 95%;
    margin-left: 15px;
    margin-top: 15px;
    border: 1px solid #1a78ab;
    border-radius: 5px;
  }
`;

const Checkout = () => {
  const [
    { cart, total_items, total_amount, historyModalOpen, paymentModalOpen },
    dispatch,
  ] = useStateValue();
  const historyModalRef = useRef(0);
  const paymentModalRef = useRef(0);

  const historyModal = (value) => {
    if (value === 'open') {
      dispatch({
        type: 'HISTORY_MODAL_OPEN',
      });
    }
    if (value === 'close') {
      dispatch({
        type: 'HISTORY_MODAL_CLOSE',
      });
    }
  };

  const paymentModal = (value) => {
    if (value === 'open') {
      dispatch({
        type: 'PAYMENT_MODAL_OPEN',
      });
    }
    if (value === 'close') {
      dispatch({
        type: 'PAYMENT_MODAL_CLOSE',
      });
    }
  };

  const removeItem = (id) => {
    dispatch({
      type: 'REMOVE_CART_ITEM',
      payload: id,
    });
  };

  const toggleAmount = (id, value) => {
    dispatch({
      type: 'TOGGLE_ITEM_AMOUNT',
      payload: { id, value },
    });
  };
  const increaseAmount = (id) => {
    toggleAmount(id, 'inc');
  };

  const decreaseAmount = (id) => {
    toggleAmount(id, 'dec');
  };

  const formatPrice = (x) => {
    var parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    if (parts[1]?.length > 3) {
      parts[1] = parts[1].slice(0, 2);
    }
    return parts.join('.');
  };

  const findTotalPrice = () => {
    let t = 0;
    cart.map(({ price }) => (t = t + price));
    return t;
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({
      type: 'COUNT_CART_TOTALS',
    });
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0) {
      if (historyModalOpen === true) {
        historyModalRef.current.style.transform = 'translateX(0px)';
      }
      if (historyModalOpen === false) {
        historyModalRef.current.style.transform = 'translateX(100%)';
      }
      if (paymentModalOpen === false) {
        paymentModalRef.current.style = 'visibility:hidden';
      }
      if (paymentModalOpen === true) {
        paymentModalRef.current.style = 'visibility:visible';
      }
    }
  }, [cart, historyModalOpen, paymentModalOpen]);

  useEffect(() => {
    if (cart.length <= 0) {
      if (historyModalOpen === true) {
        historyModalRef.current.style.transform = 'translateX(0px)';
      }
      if (historyModalOpen === false) {
        historyModalRef.current.style.transform = 'translateX(100%)';
      }
    }
  }, [historyModalOpen]);
  return (
    <CheckoutWrapper>
      <div className='checkout-title'>
        <h1>Checkout</h1>
      </div>
      <div className='checkout-count'>
        <Link to='/' className='back-icon'>
          <TiArrowBackOutline />
        </Link>
        <div className='item-counter'>
          <p>
            total items: <span>{total_items}</span>
          </p>
        </div>
        <AiOutlineHistory
          className='history-icon'
          onClick={() => historyModal('open')}
        />
      </div>
      {cart.length < 1 ? (
        <div className='checkout-message-container'>
          <h1>Your cart is empty...</h1>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <button>shop now</button>
          </Link>
          <div className='history-modal-empty' ref={historyModalRef}>
            <div className='modal-header'>
              <IoMdCloseCircleOutline
                className='modal-close-icon'
                onClick={() => historyModal('close')}
              />
              <h1>purchase history</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className='checkout-container'>
          <div className='history-modal' ref={historyModalRef}>
            <div className='modal-header'>
              <IoMdCloseCircleOutline
                className='modal-close-icon'
                onClick={() => historyModal('close')}
              />
              <h1>purchase history</h1>
            </div>
          </div>
          <div className='payment-modal' ref={paymentModalRef}>
            <div className='modal-header'>
              <IoMdCloseCircleOutline
                className='modal-close-icon'
                onClick={() => paymentModal('close')}
              />
              <h1>confirm payment</h1>
            </div>
            <StripeCheckout />
          </div>
          {cart?.map(
            ({
              flight_id,
              user_email,
              company_name,
              first_name,
              last_name,
              price,
              route_from,
              route_to,
              valid_until,
              flight_time,
              amount,
            }) => {
              return (
                <article className='cart-item-container' key={flight_id}>
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
                  <div className='cart-item-price-container'>
                    <p>
                      <span>Amount:</span>
                    </p>
                    <CgRemove
                      className='amount-icon left'
                      onClick={() => decreaseAmount(flight_id)}
                    />
                    <span>{amount}</span>
                    <CgAdd
                      className='amount-icon right'
                      onClick={() => increaseAmount(flight_id)}
                    />
                    <button>
                      <MdRemoveShoppingCart
                        className='remove-icon'
                        onClick={() => removeItem(flight_id)}
                      />
                    </button>
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}
      {total_amount < 1 ? null : (
        <div className='cart-total-container'>
          <div className='cart-totals'>
            <p>
              <span>Subtotal:</span>
              <CgDollar className='cart-total-icon' />
              {formatPrice((total_amount / 100) * 80)}
            </p>
            <p>
              <span>Tax:</span>
              <CgDollar className='cart-total-icon' />
              {formatPrice((total_amount / 100) * 20)}
            </p>
            <p>
              <span>Total:</span>
              <CgDollar className='cart-total-icon' />
              {formatPrice(total_amount)}
            </p>
          </div>
          <button onClick={() => paymentModal('open')}>
            <IoBagCheckOutline className='checkout-icon' />
            Confirm and Pay
          </button>
        </div>
      )}
    </CheckoutWrapper>
  );
};

export default Checkout;

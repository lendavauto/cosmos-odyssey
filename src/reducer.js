const getLocalStorage = () => {
  let cart = localStorage.getItem('cart');
  if (cart) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};

export const initialState = {
  user: null,
  apiData: [],
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  priceListDate: '',
  routeFrom: '',
  routeTo: '',
  flightsList: [],
  historyModalOpen: false,
  paymentModalOpen: false,
  offersLoading: false,
  flightsLoading: false,
  offersError: false,
  flightsError: false,
  filteredOffers: [],
  clearedOffers: [],
  filter: '',
  flFilter: '',
  destinationFrom: '',
  destinationTo: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING_TRUE':
      return { ...state, offersLoading: true };
    case 'FLIGHTS_LOADING_TRUE':
      return { ...state, flightsLoading: true };
    case 'SET_DATA':
      return {
        ...state,
        apiData: action.payload,
        filteredOffers: action.payload,
        clearedOffers: action.payload,
        offersLoading: false,
      };
    case 'SET_PRICELIST_DATE':
      return { ...state, priceListDate: action.payload };
    case 'SET_ROUTE_FROM':
      return { ...state, routeFrom: action.payload };
    case 'SET_ROUTE_TO':
      return { ...state, routeTo: action.payload };
    case 'FETCH_OFFERS_ERROR':
      return {
        ...state,
        offersLoading: false,
        offersError: true,
        offersErrorMessage: action.payload,
      };
    case 'FETCH_FLIGHTS':
      return { ...state, flightsList: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOG_OUT':
      return { ...state, user: null };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_CART':
      const { flight_id, amount } = action.payload;
      const tempItem = state.cart.find((i) => i.flight_id === flight_id);
      if (tempItem) {
        return { ...state };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case 'REMOVE_CART_ITEM':
      const tempCart = state.cart.filter(
        (item) => item.flight_id !== action.payload
      );
      return { ...state, cart: tempCart };
    case 'TOGGLE_ITEM_AMOUNT':
      const { id, value } = action.payload;
      const newCart = state.cart.map((item) => {
        if (item.flight_id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            return { ...item, amount: newAmount };
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        } else {
          return item;
        }
      });
      return { ...state, cart: newCart };
    case 'COUNT_CART_TOTALS':
      const { total_items, total_amount } = state.cart.reduce(
        (total, cart) => {
          const { amount, price } = cart;
          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_items, total_amount };
    case 'SHOW_HISTORY':
      return { ...state, historyModalOpen: true };
    case 'HISTORY_MODAL_OPEN':
      return { ...state, historyModalOpen: true, paymentModalOpen: false };
    case 'HISTORY_MODAL_CLOSE':
      return { ...state, historyModalOpen: false };
    case 'PAYMENT_MODAL_OPEN':
      return { ...state, paymentModalOpen: true, historyModalOpen: false };
    case 'PAYMENT_MODAL_CLOSE':
      return { ...state, paymentModalOpen: false };
    case 'UPDATE_FILTER':
      return { ...state, filter: action.payload };
    case 'UPDATE_FLIGHTS_FILTER':
      return { ...state, flFilter: action.payload };
    case 'FILTER_FLIGHTS':
      const { flFilter, flightsList } = state;
      let tempFlights = [...flightsList];

      if (flFilter === 'price-lowest') {
        tempFlights = tempFlights.sort(
          (current, next) => current.price - next.price
        );
      }
      if (flFilter === 'price-highest') {
        tempFlights = tempFlights.sort(
          (current, next) => next.price - current.price
        );
      }
      if (flFilter === 'company-name-a') {
        tempFlights = tempFlights.sort((current, next) => {
          return current.company.name.localeCompare(next.company.name);
        });
      }
      if (flFilter === 'company-name-z') {
        tempFlights = tempFlights.sort((current, next) => {
          return next.company.name.localeCompare(current.company.name);
        });
      }
      return { ...state, flightsList: tempFlights };
    case 'FILTER_OFFERS':
      const { filter, apiData, filteredOffers } = state;
      let tempOffers = [...apiData];
      let uniqueOffers = [...filteredOffers];

      if (filter === 'dist-lowest') {
        tempOffers = tempOffers.sort(
          (current, next) =>
            current.routeInfo.distance - next.routeInfo.distance
        );
      }
      if (filter === 'dist-highest') {
        tempOffers = tempOffers.sort(
          (current, next) =>
            next.routeInfo.distance - current.routeInfo.distance
        );
      }
      if (filter === 'name-a') {
        tempOffers = tempOffers.sort((current, next) => {
          return current.routeInfo.from.name.localeCompare(
            next.routeInfo.from.name
          );
        });
      }
      if (filter === 'name-z') {
        tempOffers = tempOffers.sort((current, next) => {
          return next.routeInfo.from.name.localeCompare(
            current.routeInfo.from.name
          );
        });
      }
      if (filter === 'from-earth') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Earth'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'from-jupiter') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Jupiter'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'from-mars') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Mars'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'from-mercury') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Mercury'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'from-neptune') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Neptune'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'from-saturn') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Saturn'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'from-uranus') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Uranus'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'from-venus') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.from.name === 'Venus'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-earth') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Earth'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-jupiter') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Jupiter'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-mars') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Mars'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-mercury') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Mercury'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-neptune') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Neptune'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-saturn') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Saturn'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-uranus') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Uranus'
        );
        return { ...state, apiData: filteredDestinations };
      }
      if (filter === 'to-venus') {
        let filteredDestinations = uniqueOffers.filter(
          (offer) => offer.routeInfo.to.name === 'Venus'
        );
        return { ...state, apiData: filteredDestinations };
      }
      return { ...state, apiData: tempOffers };
    case 'CLEAR_FILTER':
      const { clearedOffers } = state;
      return { ...state, apiData: clearedOffers };
    default:
      return state;
  }
};

export default reducer;

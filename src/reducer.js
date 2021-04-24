export const initialState = {
  user: null,
  apiData: [],
  priceList: '',
  routeFrom: '',
  routeTo: '',
  reservationsList: [],
  flightsList: [],
  offersLoading: false,
  flightsLoading: false,
  offersError: false,
  flightsError: false,
  filteredOffers: [],
  filter: 'price-lowest',
  destinationFrom: '',
  destinationTo: '',
};

const reducer = (state, action) => {
  console.log(action);
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
        offersLoading: false,
      };
    case 'SET_RESERVATIONS':
      return { ...state, reservationsList: action.payload };
    case 'SET_PRICELIST':
      return { ...state, priceList: action.payload };
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
      return { ...state, flightsLoading: false, flightsList: action.payload };
    case 'FETCH_FLIGHTS_ERROR':
      return { ...state, flightsLoading: false, flightsError: true };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOG_OUT':
      return { ...state, user: null };
    case 'UPDATE_FILTER':
      return { ...state, filter: action.payload };
    case 'FILTER_OFFERS':
      const { filter, apiData } = state;
      let tempOffers = [...apiData];
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
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'from-jupiter') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "jupiter"?');
        });
      }
      if (filter === 'from-mars') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'from-mercury') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'from-neptune') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'from-saturn') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'from-uranus') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'from-venus') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'to-earth') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'to-jupiter') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "jupiter"?');
        });
      }
      if (filter === 'to-mars') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'to-mercury') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'to-neptune') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'to-saturn') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'to-uranus') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      if (filter === 'to-venus') {
        tempOffers = tempOffers.sort((current, next) => {
          console.log('When can we leave this "earth"?');
        });
      }
      return { ...state, apiData: tempOffers };
    default:
      return state;
  }
};

export default reducer;

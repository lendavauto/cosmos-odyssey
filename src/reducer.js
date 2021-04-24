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
  clearedOffers: [],
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
        clearedOffers: action.payload,
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

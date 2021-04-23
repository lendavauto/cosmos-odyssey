export const initialState = {
  user: null,
  apiData: [],
  priceList: '',
  routeFrom: '',
  routeTo: '',
  reservationsList: [],
  flightsList: [],
  isModalOpen: false,
  offersLoading: false,
  flightsLoading: false,
  offersError: false,
  offersErrorMessage: '',
  flightsError: false,
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
        apiData: [...(state.apiData = action.payload)],
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
    default:
      return state;
  }
};

export default reducer;

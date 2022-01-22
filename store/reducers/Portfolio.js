import { GET_CLIENTS, STORE_CLIENTS } from "../actions/Portfolio";

const initialState = { clients: [], brokers: [], clientInfo: [], totQty: 0 };

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      // const clients = action.clients;
      // const brokers = action.brokers;
      // if (clients.length !== 0 && brokers.length !== 0) {
      //   return { ...state, clients: clients, brokers: brokers };
      // } else if (clients.length === 0 && brokers.length !== 0) {
      //   return { ...state, brokers: brokers };
      // } else if (clients.length !== 0 && brokers.length === 0) {
      //   return { ...state, clients: clients };
      // } else {
      //   return state;
      // }
      return { ...state, clients: clients, brokers: brokers };
    case STORE_CLIENTS:
      return { ...state, clientInfo: action.clientInfo, totQty: action.totQty };
    default:
      return state;
  }
};

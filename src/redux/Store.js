import { createStore } from 'redux';

// Example reducer (you can customize this)
const initialState = {
  isAuthenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

export default store;

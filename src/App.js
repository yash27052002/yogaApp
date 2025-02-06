import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import { store } from './redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      {/* Wrap AppNavigator with the provider without Tailwind */}
      <AppNavigator />
    </Provider>
  );
}

import "tw-elements-react/dist/css/tw-elements-react.min.css";
import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

const TOPICS_LIST = ['IT', 'Образования', 'Игры', 'Наука', 'Спорт', 'Путешествия']

const el = document.querySelector('#root');
const root = createRoot(el);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export default TOPICS_LIST;

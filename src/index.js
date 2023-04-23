import React, { StrictMode } from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import store from "./redux/store";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

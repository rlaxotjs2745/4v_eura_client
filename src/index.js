import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {CookiesProvider} from "react-cookie";
import ScrollToTop from "./Components/Layout/ScrollToTop";
import HttpsRedirect from 'react-https-redirect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    <HttpsRedirect>
      <CookiesProvider>
          <BrowserRouter>
              <ScrollToTop/>
              <App />
              <div id="shade"></div>
              <div id="shade2"></div>
          </BrowserRouter>
      </CookiesProvider>
    </HttpsRedirect>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

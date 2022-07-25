import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import {Provider} from 'react-redux';
import store from './services/store';

import setupInterceptor from './services/setupInterceptors';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}><App /></Provider>
);

setupInterceptor(store);

reportWebVitals();

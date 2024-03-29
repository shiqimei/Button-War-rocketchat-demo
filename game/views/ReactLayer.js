import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import { Provider } from 'react-redux';
import reduxStore from '../lib/createStore';


const rootElement = document.querySelector('#react-layer');
ReactDOM.render(
	<Provider store={reduxStore}>
		<App />
	</Provider>,
	rootElement
);
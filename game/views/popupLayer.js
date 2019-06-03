import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import AuthPanel from '../components/AuthPanel';

import { Provider } from 'react-redux';
import reduxStore from '../createStore';


const rootElement = document.querySelector('#popup-layer');
ReactDOM.render(
	<Provider store={reduxStore}>
		<AuthPanel />
	</Provider>,
	rootElement
);
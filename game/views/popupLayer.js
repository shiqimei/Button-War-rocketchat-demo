import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import AuthPanel from '../components/AuthPanel';

const layer = document.querySelector('#popup-layer');
ReactDOM.render(
	<AuthPanel />,
	layer
);
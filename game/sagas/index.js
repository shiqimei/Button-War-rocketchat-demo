import { all } from 'redux-saga/effects';
import App from './App';
import room from './room';

const root = function* root() {
	yield all([
		App(),
		room()
	]);
};

export default root;
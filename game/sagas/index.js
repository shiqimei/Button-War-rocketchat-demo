import { all } from 'redux-saga/effects';
import room from './room';

const root = function* root() {
	yield all([
		room()
	]);
};

export default root;
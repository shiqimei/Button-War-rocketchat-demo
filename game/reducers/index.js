import { combineReducers } from 'redux';
import App from './App';
import lastAction from './lastAction';
import room from './room';

export default combineReducers({
	App,
	room,
	lastAction
});
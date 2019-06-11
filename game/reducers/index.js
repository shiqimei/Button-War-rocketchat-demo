import { combineReducers } from 'redux';
import authPanel from './authPanel';
import App from './App';
import lastAction from './lastAction';
import room from './room';

export default combineReducers({
	App,
	authPanel,
	room,
	lastAction
});
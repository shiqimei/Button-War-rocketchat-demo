import { combineReducers } from 'redux';
import authPanel from './authPanel';
import App from './App';
import lastAction from './lastAction';

export default combineReducers({
	App,
	authPanel,
	lastAction
});
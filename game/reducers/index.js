import { combineReducers } from 'redux';
import authPanel from './authPanel';
import App from './App';

export default combineReducers({
	App,
	authPanel
});
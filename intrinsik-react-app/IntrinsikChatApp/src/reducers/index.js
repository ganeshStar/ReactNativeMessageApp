import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './auth';
import chatReducer from './chat';

const reducers = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

const middleware = [ReduxThunk];

const store = createStore(reducers, {}, applyMiddleware(...middleware));

export default store;

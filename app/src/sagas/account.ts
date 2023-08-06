import { /* call, put, takeEvery, */ takeLatest } from 'redux-saga/effects'
import {
  loginRequest,
  logoutRequest,
  // loginSuccess,
  // loginFailure,
} from '../reducers/account';
// import Api from '../api';


function* loginAsyncRequest(action: any) {}

function* logoutAsyncRequest(action: any) {}

function* mySaga() {
  yield takeLatest(loginRequest, loginAsyncRequest);
  yield takeLatest(logoutRequest, logoutAsyncRequest);  
}

export default mySaga;

import { call, put,/*  takeEvery, */ takeLatest } from 'redux-saga/effects';
import {
  productsRequest,
  productsSuccess,
  productsFailure,
} from '../reducers/product';
import Api from '../api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* productsAsyncRequest(action: any) {
  try {
    // @ts-ignore
    const data = yield call(Api.product.productsRequest/* , action.payload */)
    yield put(productsSuccess(data));
  } catch (e: any) {
    yield put(productsFailure(e));
  }
}

function* mySaga() {
  yield takeLatest(productsRequest, productsAsyncRequest);
}

export default mySaga;

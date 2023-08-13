import { call, put,/*  takeEvery, */ takeLatest } from 'redux-saga/effects';
import {
  productsRequest,
  productsSuccess,
  productsFailure,
  productRequest,
  productSuccess,
  productFailure,
} from '../reducers/product';
import Api from '../api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* productsAsyncRequest(action: any) {
  try {
    // @ts-ignore
    const data = yield call(Api.product.productsRequest/* , action.payload */);
    yield put(productsSuccess(data));
  } catch (e: any) {
    yield put(productsFailure(e));
  }
}

function* productAsyncRequest(action: any) {
  try {
    // @ts-ignore
    const data = yield call(Api.product.productRequest, action.payload);
    yield put(productSuccess(data));
  } catch (e: any) {
    yield put(productFailure(e));
  }
}

function* mySaga() {
  yield takeLatest(productsRequest, productsAsyncRequest);
  yield takeLatest(productRequest, productAsyncRequest);
}

export default mySaga;

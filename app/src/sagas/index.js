import { all } from 'redux-saga/effects';
import account from './account';
import product from './product';

export default function* rootSaga() {
  yield all([
    account(),
    product(),
  ]);
}

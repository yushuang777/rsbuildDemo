import { delay, put } from 'redux-saga/effects';
import { decrement, increment } from './reducer';
function* incrementAsync(number: number) {
  try {
    yield delay(1000);
    yield put(increment(number));
  } catch (err) {
    console.log(err);
  }
}

function* decrementAsync(number: number) {
  try {
    yield delay(1000);
    yield put(decrement(number));
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield incrementAsync(10);
  yield decrementAsync(10);
}
